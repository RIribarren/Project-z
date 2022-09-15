import express from 'express';
import routerApi from '@routes';
import { errorLogger, boomErrorHandler, genericErrorHandler } from '@middlewares';

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorLogger);
app.use(boomErrorHandler);
app.use(genericErrorHandler);

routerApi(app);

app.listen(port, () => {
  console.log(`My port: ${port}`);
});
