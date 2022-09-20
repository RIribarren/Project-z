import express from 'express';
import routerApi from '@routes';
import { errorLogger, boomErrorHandler, genericErrorHandler } from '@middlewares';

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routerApi(app);
app.use(errorLogger);
app.use(boomErrorHandler);
app.use(genericErrorHandler);

app.listen(port, () => {
  console.log(`My port: ${port}`);
});
