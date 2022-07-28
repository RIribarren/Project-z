import express from 'express';
import routerApi from '@routes';
import UserService from '@services/users';

export const GlobalUsers = new UserService()
GlobalUsers.generate()

const app = express();
const port = 8080;

routerApi(app);

app.listen(port, () => {
  console.log(`My port: ${port}`);
});
