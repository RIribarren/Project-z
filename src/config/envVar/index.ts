import * as dotenv from 'dotenv';

dotenv.config();

const envVar = {
  host: process.env.HOST,
  port: parseInt(process.env.PORT ?? ''),
  user: encodeURIComponent(process.env.DB_USER ?? ''),
  database: process.env.DATABASE,
  password: encodeURIComponent(process.env.PASSWORD ?? ''),
  jwt_secret: process.env.JWT_SECRET,
  email_host: process.env.EMAIL_HOST ?? '',
  email_port: parseInt(process.env.EMAIL_PORT ?? ''),
  email_user: process.env.EMAIL_USER ?? '',
  email_pass: process.env.EMAIL_PASS ?? '',
};

export default envVar;
