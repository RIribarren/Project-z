import { postgresPool } from '@libs';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import Boom from '@hapi/boom';
import UserService from '../users';
import { DataHash, SendMail } from '@helpers';
import { envVarConfig } from '@config';

const Users = new UserService();

const ACCESS_TOKEN_EXPIRATION = '1m';
const REFRESH_TOKEN_EXPIRATION = '2m';
const RECOVER_TOKEN_EXPIRATION = '30m';

class Auth {
  pool: Pool;
  constructor() {
    this.pool = postgresPool;
  }

  public async login(email: string, pass: string) {
    const user = await Users.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isMatch = await DataHash.verify(user.password, pass);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const { password, ...response } = user;

    const accessToken = this.signJWT({ user_id: user.id }, ACCESS_TOKEN_EXPIRATION);
    const refreshToken = this.signJWT({ user_id: user.id }, REFRESH_TOKEN_EXPIRATION);

    if (await this.checkAuthTokenByUserId(user.id)) {
      await this.updateAuthTokenByUserId(accessToken, refreshToken, user.id);
    } else {
      await this.saveAuthTokenToDB(accessToken, refreshToken, user.id);
    }

    return {
      ...response,
      accessToken,
      refreshToken,
    };
  }

  public signJWT(payload: object, expiresIn: string | number) {
    var token = jwt.sign(payload, process.env.JWT_SECRET ?? '', {
      expiresIn,
    });
    return token;
  }

  public async saveAuthTokenToDB(access_token: string, refresh_token: string, user_id: number) {
    const query = `INSERT INTO "authToken" (
      access_token,
      refresh_token,
      user_id
    ) VALUES ($1, $2, $3)`;

    const values = [access_token, refresh_token, user_id];

    await this.pool.query(query, values);
  }

  //TODO: revisar el WHERE
  public async updateAuthTokenByUserId(access_token: string, refresh_token: string, user_id: number) {
    const query = `UPDATE "authToken" SET access_token = $2, refresh_token = $3 WHERE id = $1`;

    const values = [user_id, access_token, refresh_token];

    await this.pool.query(query, values);
  }

  public async checkAuxTokenByUserId(user_id: number, type: string) {
    const query = `SELECT * FROM "auxToken" WHERE user_id = $1 AND type = $2`;

    const values = [user_id, type];

    const result = await this.pool.query(query, values);
    return Boolean(result.rows.length);
  }

  //TODO: Revisar el where de la query
  public async checkAuthTokenByUserId(user_id: number) {
    const query = `SELECT * FROM "authToken" WHERE id = $1`;

    const values = [user_id];

    const result = await this.pool.query(query, values);
    return Boolean(result.rows.length);
  }

  public async refreshJWT(user_id: number, refresh_token: string) {
    const query = `SELECT * FROM "authToken" WHERE id = $1`;
    const values = [user_id];
    const result = await this.pool.query(query, values);
    if (Boolean(result.rows.length)) {
      const item = result.rows[0];
      if (item.refresh_token === refresh_token) {
        const accessToken = this.signJWT({ user_id }, ACCESS_TOKEN_EXPIRATION);
        const refreshToken = this.signJWT({ user_id }, REFRESH_TOKEN_EXPIRATION);
        await this.updateAuthTokenByUserId(accessToken, refreshToken, user_id);
        return { accessToken, refreshToken };
      }
    }
    throw Boom.unauthorized('Refresh token not valid');
  }

  public async requestPasswordRecovery(email: string) {
    try {
      const user = await Users.findByEmail(email);
      const token = this.signJWT({ user_id: user.id }, RECOVER_TOKEN_EXPIRATION);
      if (await this.checkAuxTokenByUserId(user.id, 'recoveryToken')) {
        await this.updateAuxTokenByUserId(token, 'recoveryToken', user.id);
      } else {
        await this.saveAuxTokenToDB(token, 'recoveryToken', user.id);
      }
      if (user) {
        SendMail(envVarConfig.email_user, email, 'Cambiá tu contraseña', token, `<p>${token}</p>`);
      }
    } catch (error) {
      throw error;
    }
  }

  public async saveAuxTokenToDB(token: string, type:string, user_id: number) {
    const query = `INSERT INTO "auxToken" (
      token,
      type,
      user_id
    ) VALUES ($1, $2, $3)`;
  
    const values = [token, type, user_id];
  
    await this.pool.query(query, values);
  }

  public async updateAuxTokenByUserId(token: string, type: string, user_id: number) {
    const query = `UPDATE "auxToken" SET token = $1 WHERE type = $2 AND user_id = $3`;

    const values = [token, type, user_id];

    await this.pool.query(query, values);
  }

}

export default Auth;
