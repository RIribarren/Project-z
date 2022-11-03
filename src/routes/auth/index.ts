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

router.post('/password/recover', async (req, res, next) => {
  try {
    const { email } = req.body;
    await Auth.requestPasswordRecovery(email);
  } catch (error) {
    console.error(error);
  } finally {
    res.json({ message: 'Mail enviado' });
  }
});

router.patch('/password/recover', async (req, res, next) => {
  try {
    const { new_password } = req.body;
    const { recovery_token } = req.headers;
    if (await Auth.recoverPassword(String(recovery_token), new_password)) {
      res.status(200).send('¡Cambiaste tu contraseña con éxito!');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
