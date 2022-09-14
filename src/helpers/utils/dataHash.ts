import * as argon2 from 'argon2';

class DataHash {
  static async hash(data: string) {
    try {
      const hash = await argon2.hash(data, { timeCost: 3 });
      return hash;
    } catch (err) {
      console.error(err);
    }
  }
  static async verify(hash: string, data: string) {
    try {
      return await argon2.verify(hash, data);
    } catch (err) {
      console.error(err);
    }
  }
}

export default DataHash;
