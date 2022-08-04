import express from 'express';
import routerApi from '@routes';

const app = express();
const port = 8080;

routerApi(app);

app.listen(port, () => {
  console.log(`My port: ${port}`);
});
