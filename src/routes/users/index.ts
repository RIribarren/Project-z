import express from 'express';
import UserService from '@services/users';
const router = express.Router()
const Users = new UserService()

router.get('/', async (req, res) => {
  const result = await Users.findAll()
  console.log('DB RESULT', result)
  res.json(result)
})

router.post('/', (req, res) => {
  res.send('Usuario creado');
})

router.get('/:id', (req, res) => {
  res.json(Users.findById(req.params.id))
})

export default router;