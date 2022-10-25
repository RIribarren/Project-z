import { createClient } from 'redis';

// Default port is 6379

const client = createClient({
  // url: ...    <--- En producción, hay que pasarle la URL de nuestra instancia productiva de Redis. Por default usa localhost:6379.
});

client.connect();

export default client;
