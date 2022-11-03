import passport from 'passport';
import UserRouter from './users';
import CardsRouter from './cards';
import voteSessionsRouter from './voteSessions';
import AuthRouter from './auth';

const RouterApp = (app: any) => {
  app.use('/users', UserRouter);
  app.use('/cards', CardsRouter);
  app.use('/voteSessions', voteSessionsRouter);
  app.use('/auth', AuthRouter);
};

export default RouterApp;
