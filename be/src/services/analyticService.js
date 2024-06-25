import * as xl from 'excel4node';
import {getUsersWithTimeKeepingData} from '../repositories/workerRepository';

export const exportExcelFile = async (req, res) => {
  try {
    const wb = new xl.Workbook();
    const ws1 = wb.addWorksheet('Sheet 1');
    const {data} = await getUsersWithTimeKeepingData({
      selectedDate: new Date(),
      period: 'month',
    });
    console.log({data});
    ws1.cell(1, 1).string('');
    data.forEach(({userData, timeData}, index) => {
      ws1.cell(index + 2, 1).string(userData.name);
      timeData.forEach((time, _index) => {
        ws1.cell(index + 2, _index + 2).string(`${}`);
      });
    });

    wb.write('test.xlsx');

    return res.status(200).json({success: true, data});
  } catch (e) {
    return res.status(500).json({error: e, success: false});
  }
};
