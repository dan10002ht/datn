import {generateLog} from '../repositories/logRepository';
import {
  create,
  getDailyRecords,
  getHours,
  getMonthlyRecords,
  getSingleRecordInRange,
} from '../repositories/timeRepository';
import {handleUpload} from '../services/cloudinaryServices';

export const mark = async (req, res) => {
  try {
    const {file} = req;
    const response = await handleUpload(file);
    const {userId} = req.params;
    await create({userId, url: response.url});
    await generateLog({userId, type: 'TIME_KEEP'});
    return res.status(200).json({success: true});
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({success: false});
  }
};

export const getOne = async (req, res) => {
  try {
    const {userId} = req.params;
    const {fromDate, toDate} = req.query;
    const timeMarks = await getSingleRecordInRange({userId, fromDate, toDate});
    return res.status(200).json({success: true, data: timeMarks});
  } catch (e) {
    console.log(error);
    return res.status(500).json({success: false, message: e.message});
  }
};

export const getDocs = async (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json({success: false, message: e.message});
  }
};

export const getDailyAnalytics = async (_, res) => {
  try {
    const data = await getDailyRecords();
    return res.status(200).json({data, success: true});
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({success: false, message: e.message});
  }
};

export const getMonthlyAnalytics = async (_, res) => {
  try {
    const data = await getMonthlyRecords();
    return res.status(200).json({data, success: true});
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({success: false, message: e.message});
  }
};

export const getWorkingHours = async (req, res) => {
  try {
    const {period} = req.params;
    const data = await getHours(period);
    return res.status(200).json({data, success: true});
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({success: false, message: e.message});
  }
};
