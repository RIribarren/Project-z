import pool from '@libs/postgres';
import { Pool} from '@types/pg'
import UserService from '@services/users';
import DataHash from '@helpers/utils/dataHash';
const Users = new UserService()

class Auth {
  pool: Pool
  constructor() {
      this.pool = pool
  }

  public async login(email: string, pass: string) {
    const user = await Users.findByEmail(email);
    if (!user) {
      throw new Error('user does not exists');
    }
    const isMatch = await DataHash.verify(user.password, pass);
    console.log('isMatch', isMatch);
    if (!isMatch) {
      throw new Error('credentials does not exists');
    }
    const {password, ...response} = user;
    return response;
  }
}

export default Auth