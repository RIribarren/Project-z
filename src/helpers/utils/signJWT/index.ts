import jwt from 'jsonwebtoken';

const signJWT = (payload: object, expiresIn: string | number) => {
  var token = jwt.sign(payload, process.env.JWT_SECRET ?? '', {
    expiresIn,
  });
  return token;
};

export default signJWT;
