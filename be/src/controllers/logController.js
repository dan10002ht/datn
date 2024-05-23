import {getLogs} from '../repositories/logRepository';

export const get = async (req, res) => {
  try {
    const data = await getLogs();
    return res.status(200).json({data, success: true});
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({success: false, message: e.message});
  }
};
