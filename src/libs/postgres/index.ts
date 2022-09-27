import { Pool } from 'pg';
import { envVarConfig } from '@config';

const { host, port, user, database, password } = envVarConfig;

const pool = new Pool({
  host: host,
  port: port,
  user: user,
  database: database,
  password: password,
});

export default pool;
