import { postgresPool } from '@libs';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import Boom from '@hapi/boom';
import UserService from '../users';
import { DataHash } from '@helpers';

const Users = new UserService();

const ACCESS_TOKEN_EXPIRATION = '1m';
const REFRESH_TOKEN_EXPIRATION = '2m';

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

    if (await this.checkJWTByUserId(user.id)) {
      await this.updateJWTByUserId(accessToken, refreshToken, user.id);
    } else {
      await this.saveJWTToDB(accessToken, refreshToken, user.id);
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

  public async saveJWTToDB(access_token: string, refresh_token: string, user_id: number) {
    const query = `INSERT INTO "authToken" (
      access_token,
      refresh_token,
      user_id
    ) VALUES ($1, $2, $3)`;

    const values = [access_token, refresh_token, user_id];

    await this.pool.query(query, values);
  }

  public async updateJWTByUserId(access_token: string, refresh_token: string, user_id: number) {
    const query = `UPDATE "authToken" SET access_token = $2, refresh_token = $3 WHERE id = $1`;

    const values = [user_id, access_token, refresh_token];


    await this.pool.query(query, values);
  }

  public async checkJWTByUserId(user_id: number) {
    const query = `SELECT * FROM "authToken" WHERE id = $1`;

    const values = [user_id];

    const result = await this.pool.query(query, values);
    return Boolean(result.rows.length);
  }

  public async refreshJWT(user_id: number, refresh_token: string ) {
    const query = `SELECT * FROM "authToken" WHERE id = $1`;
    const values = [user_id];
    const result = await this.pool.query(query, values);
    if (Boolean(result.rows.length)) {
      const item = result.rows[0]
      if (item.refresh_token === refresh_token) {
        const accessToken = this.signJWT({ user_id }, ACCESS_TOKEN_EXPIRATION);
        const refreshToken = this.signJWT({ user_id }, REFRESH_TOKEN_EXPIRATION);
        await this.updateJWTByUserId(accessToken, refreshToken, user_id);
        return { accessToken, refreshToken };
      }
    }
    throw Boom.unauthorized('Refresh token not valid');
  }
}

export default Auth;
