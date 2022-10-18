import express from 'express';
import passport from 'passport';
import Boom from '@hapi/boom';
import { AuthService } from '@services';

const router = express.Router();
const Auth = new AuthService();

declare global {
  namespace Express {
    interface User {
      user_id: number;
    }
  }
}

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await Auth.login(email, password);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/refresh-token',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user_id = req?.user?.user_id;
      if (!user_id) {
        throw Boom.unauthorized('Access token not valid');
      } else {
        const { refresh_token } = req.body;
        const response = await Auth.refreshJWT(user_id, refresh_token);
        res.json(response);
      }
    } catch (error) {
      next(error);
    }
  }
);

// TODO
// - Loguear los casos de error, por más que no se los informemos al usuario
// - Probar que llegue el email con el token

router.post('/password/recover', async (req, res, next) => {
  try {
    const { email } = req.body;
    await Auth.recoverPassword(email);
  } catch (error) {
    console.error(error);
  } finally {
    res.json({ message: 'Mail enviado' });
  }
});

export default router;
