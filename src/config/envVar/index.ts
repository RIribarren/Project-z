import * as dotenv from 'dotenv';

dotenv.config();

const envVar = {
  host: process.env.HOST,
  port: parseInt(process.env.PORT ?? ''),
  user: encodeURIComponent(process.env.DB_USER ?? ''),
  database: process.env.DATABASE,
  password: encodeURIComponent(process.env.PASSWORD ?? ''),
  jwt_secret: process.env.JWT_SECRET,
};

export default envVar;
