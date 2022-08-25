import express from 'express';
import UserService from '@services/users';
const router = express.Router()
const Users = new UserService()

router.get('/', (req, res) => {
  res.json(Users.findAll())
  
})

router.post('/', async (req, res) => {
  try {
    const {first_name, last_name, email, password, role} = req.body;
    const user = await Users.createUser(first_name, last_name, email, password, role);
    res.json({
      message: 'Usuario creado',
      data: user
    })
  }
  catch(error){
    console.error(error)
    res.status(500).send('Algo salio mal, no se pudo crear el usuario')
  }
})

router.get('/:id', (req, res) => {
  res.json(Users.findById(req.params.id))
})

export default router;