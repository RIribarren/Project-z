import passport from 'passport';
import jwtStrategy from './jwtStrategy';

export const activatePassportStrategies = () => {
  passport.use(jwtStrategy);
};
