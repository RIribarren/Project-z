import express from 'express';
import routerApi from '@routes';
import { errorHandler } from '@middlewares';

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
routerApi(app);

app.listen(port, () => {
  console.log(`My port: ${port}`);
});
