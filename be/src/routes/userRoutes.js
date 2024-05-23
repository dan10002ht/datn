import {Router} from 'express';
import * as workerController from '../controllers/workerController';

const router = new Router();

router.post('/', workerController.generateWorkerId);
router.get('/', workerController.getWorkersData);
router.delete('/', workerController.deleteWorker);
router.get('/list-time-keeping', workerController.getWorkersWithTimeKeeping);
router.get('/list', workerController.getListByQuery);
router.get('/request', workerController.getListByQuery);
router.get('/count/:period', workerController.getNewWorkerCount);
router.put('/:userId', workerController.updateWorkerData);
router.get('/:userId', workerController.getUser);
router.delete('/:userId', workerController.deleteUser);

export default router;
