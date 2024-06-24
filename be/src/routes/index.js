import {Router} from 'express';
import userRoutes from './userRoutes';
import timeRoutes from './timeRoutes';
import logRoutes from './logRoutes';
import cronRoutes from './cronRoutes';
import tokenRoutes from './tokenRoutes';
import uploadRoutes from './uploadRoutes';
import {authenticateToken} from '../middlewares/auth';

const router = new Router();

export default function route(app) {
  app.use('/api', router);
  router.use((req, res, next) => {
    if (req.path.includes('token')) {
      return next();
    }
    return authenticateToken(req, res, next);
  });
  router.use('/upload', uploadRoutes);
  router.use('/token', tokenRoutes);
  router.use('/cron', cronRoutes);
  router.use('/user', userRoutes);
  router.use('/time', timeRoutes);
  router.use('/logs', logRoutes);
}
