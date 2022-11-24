import express from 'express';
import passport from 'passport';
import {
  createVoteSession,
  findAllVoteSessions,
  findVoteSessionById,
  removeVoteSession,
  updateVoteSession,
  updateFacilitatorByVoteSession
} from '@services';

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
    const facilitator_id = req?.user?.user_id;
    const { title, description } = req.body;
    if (facilitator_id) {
      await createVoteSession(title, description, facilitator_id);
    }
    res.json({
      message: 'Sesión de votación creada',
      data: {
        title,
        description,
        facilitator_id,
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

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await removeVoteSession(Number(id));
    res.json({
      message: 'Sesión de votos borrada',
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    await updateVoteSession(Number(id), title, description);
    res.json({
      message: 'Vote session updated',
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/take-facilitator-role', async (req, res, next) => {
  try {
    const { id,  } = req.params;
    const facilitator_id = req?.user?.user_id;
    await updateFacilitatorByVoteSession(Number(id), Number(facilitator_id));
    res.json({
      message: 'Facilitator updated',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
