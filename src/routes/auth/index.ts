import express from 'express';
import AuthService from '@services/auth';
const router = express.Router();
const Auth = new AuthService()

router.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body;
    const response = await Auth.login(email, password);
    res.json(response);
  } catch (error) {
    console.error(error);
  }
})

export default router;