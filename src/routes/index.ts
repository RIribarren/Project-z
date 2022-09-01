import UserRouter from './users';
import CardsRouter from './cards';
import SessionVotingRouter from './sessionVoting';
import AuthRouter from './auth';

const RouterApp = (app) => {
  app.use('/users', UserRouter);
  app.use('/cards', CardsRouter);
  app.use('/sessionVoting', SessionVotingRouter);
  app.use('/auth', AuthRouter);
}

export default RouterApp
