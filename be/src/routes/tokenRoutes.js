import {Router} from 'express';
import * as tokenController from '../controllers/tokenController';

const router = new Router();

router.post('/', tokenController.generateToken);

export default router;
