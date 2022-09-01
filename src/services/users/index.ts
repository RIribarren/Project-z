import pool from '@libs/postgres';
import { Pool} from '@types/pg'
import DataHash from '@helpers/utils/dataHash';
class User {
  pool: Pool
  constructor(name: string, lastName: string) {
    this.pool = pool
  }

  public findById(id: string) {
    //return this.users.find(item => item.id === id)
  }

  public async findByEmail(email: string) {
    const query = 'SELECT first_name, last_name, password, email, role FROM "user" WHERE email = $1';
    const values = [email]
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }
  
  public async findAll() {
    const query = 'SELECT first_name, last_name, email, role FROM "user"';
    const result = await this.pool.query(query)
    return result.rows
  }

  public async createUser(first_name: string, last_name: string, email: string, password: string, role: string) {
    const hashedPass = await DataHash.hash(password);
    const values = [first_name, last_name, email, hashedPass, role]
    const query = `INSERT INTO "user" (
      first_name,
      last_name,
      email,
      password,
      role
    ) VALUES ($1, $2, $3, $4, $5)`
    await this.pool.query(query,values)
  }

  public updateUser() {

  }

  public deleteUser() {

  }
}

export default User