import { postgresPool } from '@libs';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import Boom from '@hapi/boom';
import UserService from '../users';
import { DataHash, sendMail, signJWT } from '@helpers';
import { envVarConfig } from '@config';

const Users = new UserService();

const ACCESS_TOKEN_EXPIRATION = '1h';
const REFRESH_TOKEN_EXPIRATION = '2h';
const RECOVER_TOKEN_EXPIRATION = '30m';

interface JwtPayload {
  user_id: number;
}

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

    const accessToken = signJWT({ user_id: user.id }, ACCESS_TOKEN_EXPIRATION);
    const refreshToken = signJWT({ user_id: user.id }, REFRESH_TOKEN_EXPIRATION);

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

  public async saveAuthTokenToDB(access_token: string, refresh_token: string, user_id: number) {
    const query = `INSERT INTO "authToken" (
      access_token,
      refresh_token,
      user_id
    ) VALUES ($1, $2, $3)`;

    const values = [access_token, refresh_token, user_id];

    await this.pool.query(query, values);
  }

  public async updateAuthTokenByUserId(
    access_token: string,
    refresh_token: string,
    user_id: number
  ) {
    const query = `UPDATE "authToken" SET access_token = $2, refresh_token = $3 WHERE user_id = $1`;

    const values = [user_id, access_token, refresh_token];

    await this.pool.query(query, values);
  }

  public async checkAuxTokenByUserId(user_id: number, type: string) {
    const query = `SELECT * FROM "auxToken" WHERE user_id = $1 AND type = $2`;

    const values = [user_id, type];

    const result = await this.pool.query(query, values);
    return Boolean(result.rows.length);
  }

  public async checkAuthTokenByUserId(user_id: number) {
    const query = `SELECT * FROM "authToken" WHERE user_id = $1`;

    const values = [user_id];

    const result = await this.pool.query(query, values);
    return Boolean(result.rows.length);
  }

  public async refreshJWT(user_id: number, refresh_token: string) {
    const query = `SELECT * FROM "authToken" WHERE user_id = $1`;
    const values = [user_id];
    const result = await this.pool.query(query, values);
    if (Boolean(result.rows.length)) {
      const item = result.rows[0];
      if (item.refresh_token === refresh_token) {
        const accessToken = signJWT({ user_id }, ACCESS_TOKEN_EXPIRATION);
        const refreshToken = signJWT({ user_id }, REFRESH_TOKEN_EXPIRATION);
        await this.updateAuthTokenByUserId(accessToken, refreshToken, user_id);
        return { accessToken, refreshToken };
      }
    }
    throw Boom.unauthorized('Refresh token not valid');
  }

  public async requestPasswordRecovery(email: string) {
    try {
      const user = await Users.findByEmail(email);
      const recoveryToken = signJWT({ user_id: user.id }, RECOVER_TOKEN_EXPIRATION);
      if (await this.checkAuxTokenByUserId(user.id, 'recoveryToken')) {
        await this.updateAuxTokenByUserId(recoveryToken, 'recoveryToken', user.id);
      } else {
        await this.saveAuxTokenToDB(recoveryToken, 'recoveryToken', user.id);
      }
      if (user) {
        sendMail(
          envVarConfig.email_user,
          email,
          'Cambiá tu contraseña',
          recoveryToken,
          `<p>${recoveryToken}</p>`
        );
      }
    } catch (error) {
      throw error;
    }
  }

  public async recoverPassword(recoveryToken: string, newPassword: string) {
    try {
      const { user_id } = (await jwt.verify(
        recoveryToken,
        process.env.JWT_SECRET ?? ''
      )) as JwtPayload;

      const recoveryTokenInDB = await this.getAuxTokenByUserId('recoveryToken', user_id);

      const tokenMatch = recoveryToken === recoveryTokenInDB;
      if (tokenMatch) {
        const hashedPass = await DataHash.hash(newPassword);

        const query = `UPDATE "user" SET password = $1 WHERE id = $2`;
        const values = [hashedPass, user_id];

        await this.pool.query(query, values);
        this.deleteAuxTokenByUserId('recoveryToken', user_id);
        return true;
      } else {
        throw { message: 'El token ya fue utilizado' };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getAuxTokenByUserId(type: string, user_id: number) {
    try {
      const query = `SELECT "token" FROM "auxToken" WHERE type = $1 AND user_id = $2`;

      const values = [type, user_id];

      const { rows } = await this.pool.query(query, values);

      return rows[0]?.token;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async saveAuxTokenToDB(token: string, type: string, user_id: number) {
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
  public async deleteAuxTokenByUserId(type: string, user_id: number) {
    const query = `DELETE from "auxToken" WHERE type = $1 AND user_id = $2`;
    const values = [type, user_id];
    await this.pool.query(query, values);
  }
}

export default Auth;
