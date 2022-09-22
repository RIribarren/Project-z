import { Strategy, ExtractJwt } from 'passport-jwt';
import { envVarConfig } from '@config';

var options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: envVarConfig.jwt_secret
}

const jwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload)
});

export default jwtStrategy;