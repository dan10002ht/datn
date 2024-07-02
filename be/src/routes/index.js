import {Router} from 'express';
import userRoutes from './userRoutes';
import timeRoutes from './timeRoutes';
import logRoutes from './logRoutes';
import cronRoutes from './cronRoutes';
import tokenRoutes from './tokenRoutes';
import uploadRoutes from './uploadRoutes';
import {authenticateToken} from '../middlewares/auth';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const router = new Router();

export default function route(app) {
  app.use('/api', router);
  router.use((req, res, next) => {
    if (req.path.includes('token') || req.path.includes('/login')) {
      return next();
    }
    return authenticateToken(req, res, next);
  });
  router.post('/login', async (req, res) => {
    try {
      const {username, password} = req.body;
      console.log({username, password});
      const isValidUserName = username === 'danlaanh202';
      if (!isValidUserName) {
        return res.status(500).json({success: false, message: 'Invalid username'});
      }
      const isValidPassword = password === 'danlaanh202';
      if (!isValidPassword) {
        return res.status(500).json({success: false, message: 'Invalid password'});
      }
      const token = jwt.sign({apiKey: process.env.SECRET_KEY}, process.env.SECRET_KEY, {
        expiresIn: '24h',
      });
      // res.cookie('token', token, {httpOnly: true});
      return res.status(200).json({success: true, token});
    } catch (e) {
      return res.status(500).json({success: false, message: 'Error when login'});
    }
  });
  // for mocking upload images
  router.use('/upload', uploadRoutes);
  // for get token after token is expired or first login
  router.use('/token', tokenRoutes);
  // for get cron job routes
  router.use('/cron', cronRoutes);

  router.use('/user', userRoutes);
  router.use('/time', timeRoutes);
  router.use('/logs', logRoutes);
}
