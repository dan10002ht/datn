import {Router} from 'express';
import userRoutes from './userRoutes';
import timeRoutes from './timeRoutes';
import logRoutes from './logRoutes';

const router = new Router();

export default function route(app) {
  app.use('/api', router);
  router.use('/user', userRoutes);
  router.use('/time', timeRoutes);
  router.use('/logs', logRoutes);
}
