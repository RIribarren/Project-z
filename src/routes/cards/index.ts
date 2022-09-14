import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Todas las cards');
});

router.post('/', (req, res) => {
  res.send('Card creada');
});

router.get('/:id', (req, res) => {
  res.send('Card especifica');
});

export default router;
