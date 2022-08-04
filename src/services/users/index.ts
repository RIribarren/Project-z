
import { faker } from '@faker-js/faker';
import pool from '@libs/postgres';
class User {
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

  public createUser() {
    
  }

  public updateUser() {

  }

  public deleteUser() {

  }
}

export default User