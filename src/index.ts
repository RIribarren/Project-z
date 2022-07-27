import express from 'express';
// import routerApi from '@routes';
import 'dotenv/config'
import ConectwithMongoose from "./dbMongoose"
import mongoRouter from './routes/users/mongoRouter';
import mongooseRouter from './routes/users/mongooseRouter';
import config from "./config/mongo.config"
import connectWithMongo from './dbMongo';

const app = express();  

// Conection to DB 
ConectwithMongoose(config.DB_URI)
// connectWithMongo(config.DB_URI) 

//Middlewares
app.use(express.json())

// Routers
// routerApi(app);
app.use("/mongoose",mongooseRouter)
app.use("/mongo",mongoRouter)

app.get('/', async(_req, res) => {
  res.send('Hola mundo!')
});

app.listen(config.PORT, () => { 
  console.log(`My port: ${config.PORT}`);
});