import express from 'express';
import routerApi from '@routes';
import { errorLogger, boomErrorHandler, genericErrorHandler } from '@middlewares';
import { activatePassportStrategies } from '@helpers';
import {createServer} from "http"
import { Server,Socket } from "socket.io";
import cors from 'cors';

const app = express();
const server = createServer(app)
export const ioServ = new Server(server,{
  cors:{origin:"*"}
})
ioServ.on("connection", (socket: Socket) => {
 console.log("socket ID",socket.id)
 socket.on("incomingMessage",(data)=>{
  console.log("message",data)
  ioServ.emit("beResponse",`Recibi ${data}`)})
  //socket.broadcast.emit("beResponse",`Recibi ${data}`)})
});
const port = 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
activatePassportStrategies();
routerApi(app);

app.use(errorLogger);
app.use(boomErrorHandler);
app.use(genericErrorHandler);

server.listen(port, () => {
  console.log(`My port: ${port}`);
});
