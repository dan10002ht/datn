import {Router} from 'express';

const router = new Router();

router.get('/', async () => {
  console.log('running a task every midnight');
  await createOrUpdateAnalytics();
});

export default router;
