import express from 'express';
import * as mongoServices from '../../services/mongoServices';
const mongoRouter = express.Router()

mongoRouter.get('/Find',mongoServices.getAllUsers);
mongoRouter.post("/Post",mongoServices.post)  

export default mongoRouter