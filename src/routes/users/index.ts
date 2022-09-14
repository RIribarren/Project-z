import express from 'express';
import { UserService } from '@services';
const router = express.Router();
const Users = new UserService();

router.get('/', async (req, res) => {
  try {
    const response = await Users.findAll();
    res.json(response);
  } catch (error) {
    console.error(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;
    const user = await Users.createUser(first_name, last_name, email, password, role);
    res.json({
      message: 'Usuario creado',
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Algo salio mal, no se pudo crear el usuario');
  }
});

router.get('/:id', async (req, res) => {
  const user = await Users.findById(req.params.id);
  res.json(user);
});

export default router;
