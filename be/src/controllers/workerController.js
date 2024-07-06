import {generateLog} from '../repositories/logRepository';
import {
  create,
  updateWorkerByUserId,
  bulkDelete,
  getAll,
  getUserData,
  getUsersWithTimeKeepingData,
  getUsersWithQuery,
  deleteUserByUserId,
  getSearchUser,
  getWorkerCountWithPeriod,
  isUserExisted,
} from '../repositories/workerRepository';

export const generateWorkerId = async (req, res) => {
  try {
    const {userId} = req.body;
    const isExisted = await isUserExisted(userId);
    if (isExisted) {
      return res.status(500).json({success: false, message: 'User is existed'});
    }
    const createdId = await create(userId);
    await generateLog({userId, type: 'WORKER_REQUEST'});
    return res.status(500).json({success: true, data: createdId});
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({success: false, message: e.message});
  }
};

export const updateWorkerData = async (req, res) => {
  try {
    const {userId} = req.params;
    const data = req.body;
    await updateWorkerByUserId({userId: `${userId}`, data});
    await generateLog({userId, type: 'UPDATE_WORKER_DATA', ...data});
    return res.status(200).json({success: true});
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({success: false, message: e.message});
  }
};

export const getListByQuery = async (req, res) => {
  try {
    let {searchText, isUpdateInformation = false} = req.query;
    if (isUpdateInformation === 'false') {
      isUpdateInformation = false;
    }

    const {data, ...pagination} =
      searchText && searchText.trim() !== ''
        ? await getSearchUser(req.query, isUpdateInformation)
        : await getUsersWithQuery(!!isUpdateInformation, req.query);
    return res.status(200).json({success: true, data, pagination});
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({success: false, message: e.message});
  }
};

export const getWorkersData = async (req, res) => {
  try {
    const workers = await getAll();
    return res.status(200).json({success: true, data: workers});
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({success: false, message: e.message});
  }
};

export const getUser = async (req, res) => {
  try {
    const {userId} = req.params;
    const worker = await getUserData(userId);
    return res.status(200).json({success: true, data: worker});
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({success: false, message: e.message});
  }
};

export const deleteWorker = async (req, res) => {
  try {
    const workerIds = req.body;
    await bulkDelete({ids: workerIds});
    return res.status(200).json({success: true});
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({success: false, message: e.message});
  }
};

export const getWorkerIds = async (req, res) => {
  try {
  } catch (e) {
    console.log(e.message);
  }
};

export const getWorkersWithTimeKeeping = async (req, res) => {
  try {
    const {selectedDate, period} = req.query;
    const {hasPre, hasNext, nextCursor, previousCursor, data, total} =
      await getUsersWithTimeKeepingData({
        selectedDate,
        period,
        query: req.query,
      });

    return res.status(200).json({
      success: true,
      data: data.filter((x) => x.userData?.name),
      pagination: {
        total,
        hasPre,
        hasNext,
        previousCursor,
        nextCursor,
      },
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({success: false, message: e.message});
  }
};

export const deleteUser = async (req, res) => {
  try {
    const {userId} = req.params;
    await deleteUserByUserId(userId);
    return res.status(200).json({success: true});
  } catch (e) {
    console.log(e);
    return res.status(500).json({success: false, message: e.message});
  }
};

export const getNewWorkerCount = async (req, res) => {
  try {
    const {period} = req.params;
    const data = await getWorkerCountWithPeriod(period);
    return res.status(200).json({success: true, data});
  } catch (e) {
    console.log(e);
    return res.status(500).json({success: false, message: e.message});
  }
};
