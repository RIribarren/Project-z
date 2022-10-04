import express from 'express';
import passport from 'passport';

import { findAllCards, findCardById, createCard, updateCard, removeCard } from '@services';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const response = await findAllCards();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const { title, link } = req.body;
    await createCard(title, link);
    res.json({
      message: 'Card creada',
      data: {
        title,
        link,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await findCardById(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, link } = req.body;
    await updateCard(id, title, link);
    res.json({
      message: 'Card actualizada',
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await removeCard(id);
    res.json({
      message: 'Card borrada',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
