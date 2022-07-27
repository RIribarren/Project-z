import express from 'express';
import * as mongooseServices from '../../services/mongooseServices';
const mongooseRouter = express.Router()

mongooseRouter.get("/Find",mongooseServices.getAllUsers)
mongooseRouter.post("/Post",mongooseServices.post)

export default mongooseRouter