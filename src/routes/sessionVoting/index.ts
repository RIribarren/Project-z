import express from 'express';
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Todas las sessions voting');
})

router.post('/', (req, res) => {
  res.send('Session voting creada');
})

router.get('/:id', (req, res) => {
  res.send('Session voting especifica');
})

export default router;