import { postgresPool } from '@libs';
import Boom from '@hapi/boom';
import { Pool } from 'pg';
import { DataHash } from '@helpers';

class User {
  pool: Pool;

  constructor() {
    this.pool = postgresPool;
  }

  public async findById(id: number) {
    try {
      const query = 'SELECT first_name, last_name, email, role FROM "user" WHERE id = $1';
      const values = [id];
      const result = await this.pool.query(query, values);
      if (result.rows.length < 1) {
        throw Boom.notFound('User not found!');
      }
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  public async findByEmail(email: string) {
    try {
      const query =
        'SELECT first_name, last_name, password, email, role, id FROM "user" WHERE email = $1';
      const values = [email];
      const result = await this.pool.query(query, values);
      if (result.rows.length < 1) {
        throw Boom.notFound('Email not found!');
      }
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  public async findAll() {
    try {
      const query = 'SELECT first_name, last_name, email, role, id FROM "user"';
      const result = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  //TODO: agregar confirmacion de mail
  public async createUser(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: string
  ) {
    try {
      if (!first_name) {
        throw Boom.badRequest('missing first_name field');
      }
      if (!last_name) {
        throw Boom.badRequest('missing last_name field');
      }
      if (!email) {
        throw Boom.badRequest('missing email field');
      }
      if (!password) {
        throw Boom.badRequest('missing password field');
      }
      if (!role) {
        throw Boom.badRequest('missing role field');
      }
      const hashedPass = await DataHash.hash(password);
      const values = [first_name, last_name, email, hashedPass, role];
      const query = `INSERT INTO "user" (
        first_name,
        last_name,
        email,
        password,
        role
      ) VALUES ($1, $2, $3, $4, $5)`;
      await this.pool.query(query, values);
    } catch (error) {
      throw error;
    }
  }

  //TODO:
  public updateUser() {}

  public async disableUser(id: number) {
    try {
      const values = [id];
      const query = `UPDATE "user" SET active = false WHERE id=$1 AND active=true`;
      const { rowCount } = await this.pool.query(query, values);
      if (rowCount === 0) {
        throw Boom.notFound('User not found!');
      }
    } catch (error) {
      throw error;
    }
  }
}

export default User;
