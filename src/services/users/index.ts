import { postgresPool } from '@libs';
import Boom from '@hapi/boom';
import { Pool } from 'pg';
import { DataHash, sendMail, signJWT } from '@helpers';
import { envVarConfig } from '@config';

const CONFIRMATION_TOKEN_EXPIRATION = '30m';

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

  // TODO: continuar confirmacion de mail. Crear el endpoint para recibir el token enviado y confirmar el email.
  // Agregar la validación en algunas features para impedir a un usuario no validado usarlas, dándole un acceso parcial a la app hasta que se valide.
  // Agregar un endpoint que permita reenviar el mail de validación.
  // Handlear errores
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
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING id`;
      const {
        rows: [{ id }],
      } = await this.pool.query(query, values);
      const emailConfirmationToken = signJWT({ id }, CONFIRMATION_TOKEN_EXPIRATION);
      this.saveAuxTokenToDB(emailConfirmationToken, 'emailConfirmationToken', id);
      sendMail(
        envVarConfig.email_user,
        email,
        'Completá tu registro',
        emailConfirmationToken,
        `<p>${emailConfirmationToken}</p>`
      );
    } catch (error) {
      throw error;
    }
  }

  /* TODO:
   * - Reemplazar el uso de clases por programación funcional
   * - Si eso resuelve el problema de la dependencia circular, esa función puede borrarse y tomarse de Auth.
   * - Si eso no resuelve el problema, se deben llevar las funciones relacionadas a auxTokens a un nuevo servicio.
   */
  public async saveAuxTokenToDB(token: string, type: string, user_id: number) {
    const query = `INSERT INTO "auxToken" (
      token,
      type,
      user_id
    ) VALUES ($1, $2, $3)`;

    const values = [token, type, user_id];

    await this.pool.query(query, values);
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
