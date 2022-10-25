import UserRouter from './users';
import CardsRouter from './cards';
import SessionVotingRouter from './sessionVoting';
import AuthRouter from './auth';
import RedisDemoRouter from './redisDemo';

const RouterApp = (app: any) => {
  app.use('/users', UserRouter);
  app.use('/cards', CardsRouter);
  app.use('/sessionVoting', SessionVotingRouter);
  app.use('/auth', AuthRouter);
  app.use('/redisDemo', RedisDemoRouter);
};

export default RouterApp;
