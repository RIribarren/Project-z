import express from 'express';
import passport from 'passport';
import { createVoteSession, findAllVoteSessions, findVoteSessionById } from '@services';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', async (req, res, next) => {
  try {
    const response = await findAllVoteSessions();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user_id = req?.user?.user_id;
    const { title, description,  } = req.body;
    if (user_id) {
      await createVoteSession(title, description, user_id);
    }
    res.json({
      message: 'Card creada',
      data: {
        title,
        description,
        user_id
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await findVoteSessionById(Number(id));
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
