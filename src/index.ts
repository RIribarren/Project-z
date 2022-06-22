import express from 'express';
// import routerApi from '@routes';

const app = express();
const port = 8080;

// routerApi(app);
app.get('/', (_req, res) => {
  res.send('Hola mundo!');
  console.log('Hola mundo!');
});

app.listen(port, () => {
  console.log(`My port: ${port}`);
});