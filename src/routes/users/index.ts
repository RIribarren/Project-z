import express from 'express';
import passport from 'passport';
import { UserService } from '@services';
import { SendMail } from '@helpers';
import { envVarConfig } from '@config';

const router = express.Router();
const Users = new UserService();

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const response = await Users.findAll();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;
    const user = await Users.createUser(first_name, last_name, email, password, role);
    res.json({
      message: 'Usuario creado',
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// TODO
// - Verificar que el email está efectivamente asociado a un usuario antes de mandar el mail
// - Loguear los casos de error, por más que no se los informemos al usuario
// - Crear el token que se le va a mandar al usuario
router.post('/password/recover', async (req, res, next) => {
  try {
    const { email } = req.body;
    SendMail(
      envVarConfig.email_user,
      email,
      'Cambiá tu contraseña',
      'Un token',
      '<h1>Un token</h1>'
    );
    res.json({ message: 'Mail enviado' });
  } catch (error) {
    res.json({ message: 'Mail enviado' });
  }
});

export default router;
