import passport from "passport";
import jwtStrategy from './jwtStrategy';

const activatePassportStrategies = () => { 
  passport.use(jwtStrategy);
}

export default activatePassportStrategies;