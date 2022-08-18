import express from 'express';
import routerApi from '@routes';
import cors from 'cors';

const app = express();
const port = 8080;

// Whitelist
// const whitelist = ['http://localhost:3000', 'http://localhost:4000'];
// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (whitelist.includes(origin)) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
//Permitir whitelist
// app.use(cors(corsOptions));

// Permitir cualquier origen
app.use(cors());

routerApi(app);

app.listen(port, () => {
  console.log(`My port: ${port}`);
});
