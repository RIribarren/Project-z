import express from 'express';
import routerApi from '@routes';


const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routerApi(app);

app.listen(port, () => {
  console.log(`My port: ${port}`);
});
