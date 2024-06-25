import {Router} from 'express';
import * as logController from '../controllers/logController';
import {exportExcelFile} from '../services/analyticService';

const router = new Router();

router.get('/', logController.get);
router.get('/excel', exportExcelFile);

export default router;
