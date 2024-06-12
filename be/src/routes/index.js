import {Router} from 'express';
import userRoutes from './userRoutes';
import timeRoutes from './timeRoutes';
import logRoutes from './logRoutes';
import cronRoutes from './cronRoutes';

const router = new Router();

export default function route(app) {
  app.use('/api', router);
  router.use('/cron', cronRoutes);
  router.use('/user', userRoutes);
  router.use('/time', timeRoutes);
  router.use('/logs', logRoutes);
}
