import UserRouter from './users';
import CardsRouter from './cards';
import SessionVotingRouter from './sessionVoting'

const RouterApp = (app) => {
  app.use('/users', UserRouter);
  app.use('/cards', CardsRouter);
  app.use('/sessionVoting', SessionVotingRouter);
}

export default RouterApp
