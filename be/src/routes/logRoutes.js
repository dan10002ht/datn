import {Router} from 'express';
import * as logController from '../controllers/logController';

const router = new Router();

router.get('/', logController.get);

export default router;
