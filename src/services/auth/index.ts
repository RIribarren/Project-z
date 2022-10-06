import { postgresPool } from '@libs';
import { Pool } from 'pg';
import UserService from '../users';
import { DataHash } from '@helpers';
import jwt from 'jsonwebtoken';

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

    console.log('UP`DEATEANDOO!!ASDÑLFKASDJÑFL');

    await this.pool.query(query, values);
  }

  public async checkJWTByUserId(user_id: number) {
    const query = `SELECT * FROM "authToken" WHERE id = $1`;

    const values = [user_id];

    const result = await this.pool.query(query, values);
    console.log('result.rows ', result.rows);
    return Boolean(result.rows.length);
  }

  public async verifyJwt(token: string) {
    const query = `SELECT * from "authToken" where `;
  }
}

export default Auth;
