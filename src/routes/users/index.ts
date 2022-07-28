import express from 'express';
import UserService from '@services/users';
const router = express.Router()
const Users = new UserService()

router.get('/', (req, res) => {
  res.json(Users.findAll())
  
})

router.post('/', (req, res) => {
  res.send('Usuario creado');
})

router.get('/:id', (req, res) => {
  res.json(Users.findById(req.params.id))
})

export default router;