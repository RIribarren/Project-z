
import { faker } from '@faker-js/faker';

class User {
  private name: string;
  private lastName: string;
  private id: string;
  private users: Array<Object>
  constructor(name: string, lastName: string) {
    this.name = name;
    this.lastName = lastName;
    this.id = faker.datatype.uuid();
    this.users = []
    this.generate()
  }

  public findById(id: string) {
    return this.users.find(item => item.id === id)
  }

  public findAll() {
    return this.users;
  }

  public createUser() {
    
  }

  public updateUser() {

  }

  public deleteUser() {

  }

  generate() {
    for(let i = 0; i<50; i++) {
      this.users.push({ name: faker.name.firstName(), lastName: faker.name.lastName(), id: faker.datatype.uuid() })
    }
  }
}

export default User