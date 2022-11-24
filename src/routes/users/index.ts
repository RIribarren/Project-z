import express from 'express';
import passport from 'passport';
import { UserService } from '@services';

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
    const user = await Users.findById(Number(req.params.id));
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
