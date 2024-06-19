import {Router} from 'express';
import * as timeController from '../controllers/timeController';
import {upload} from '../services/cloudinaryServices';

const router = new Router();

router.get('/', timeController.getDocs);
router.get('/daily', timeController.getDailyAnalytics);
router.get('/monthly', timeController.getMonthlyAnalytics);
router.get('/working-hours/:period', timeController.getWorkingHours);
router.post('/:userId', upload.single('image'), timeController.mark);
router.get('/:userId', timeController.getOne);

export default router;
