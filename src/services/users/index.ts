import { postgresPool } from '@libs';
import Boom from '@hapi/boom';
import { Pool } from 'pg';
import { DataHash } from '@helpers';

class User {
  pool: Pool;

  constructor() {
    this.pool = postgresPool;
  }

  public async findById(id: string) {
    try {
      const query = 'SELECT first_name, last_name, email, role FROM "user" WHERE id = $1';
      const values = [id];
      const result = await this.pool.query(query, values);
      if (result.rows.length < 1) {
        Boom.notFound('User not found!');
      }
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  public async findByEmail(email: string) {
    const query =
      'SELECT first_name, last_name, password, email, role, id FROM "user" WHERE email = $1';
    const values = [email];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  public async findAll() {
    const query = 'SELECT first_name, last_name, email, role FROM "user"';
    const result = await this.pool.query(query);
    return result.rows;
  }

  public async createUser(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: string
  ) {
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
  }

  public updateUser() {}

  public deleteUser() {}
}

export default User;
