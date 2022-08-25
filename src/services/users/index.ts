
import { faker } from '@faker-js/faker';
import pool from '@libs/postgres';
import { Pool} from '@types/pg'
class User {
  pool: Pool
  constructor(name: string, lastName: string) {
    this.pool = pool
  }

  public findById(id: string) {
    //return this.users.find(item => item.id === id)
  }

  public async findAll() {
    //return this.users;
    const query = "SELECT * FROM users";
    const result = await this.pool.query(query)
    console.log(result)
    return result.rows
  }

  public async createUser(first_name, last_name, email, password, role) {
    const values = [faker.datatype.number({min: 10000, max: 1000000}), first_name, last_name, email, password, role]
    const query = `INSERT INTO "user" (
      id,
      first_name,
      last_name,
      email,
      password,
      role
    ) VALUES ($1, $2, $3, $4, $5, $6)`
    await this.pool.query(query,values)
  }

  public updateUser() {

  }

  public deleteUser() {

  }
}

export default User