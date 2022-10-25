import express, { RequestHandler } from 'express';
import { redisClient } from '@libs';
const router = express.Router();

const API_URL = 'https://rickandmortyapi.com/api/character';

const checkCache: RequestHandler = async (req, res, next) => {
  try {
    console.log('Cache function');
    const { id } = req.params;

    const redisData = await redisClient.get(id);

    if (redisData !== null) {
      console.log('Returning cache data');

      res.send(JSON.parse(redisData));
    } else {
      console.log('No cache found');
      next();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

router.get('/characters/:id', checkCache, async (req, res) => {
  const { id } = req.params;
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();

  console.log(`SETTING TO REDIS ID: ${id}, DATA: `, data);

  await redisClient.setEx(id, 30, JSON.stringify(data));

  res.json(data);
});

export default router;
