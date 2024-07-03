import * as xl from 'excel4node';
import {getUsersWithTimeKeepingData} from '../repositories/workerRepository';
import {getLabels} from '../helpers/prepareTitle';
import dayjs from 'dayjs';

const formatDate = (date) => {
  const currentDate = new Date(date);
  return new Date(currentDate.setHours(currentDate.getHours() + 7));
};

export const exportExcelFile = async (req, res) => {
  try {
    const {previous = 0} = req.params;
    const wb = new xl.Workbook();
    const ws1 = wb.addWorksheet('Sheet 1');
    const selectedDate = new Date(new Date().setMonth(new Date().getMonth() - parseInt(previous)));
    const {data} = await getUsersWithTimeKeepingData({
      selectedDate,
      period: 'month',
    });
    const titles = getLabels({date: selectedDate});
    ws1.cell(1, 1).string('');
    titles.forEach((title, index) => {
      ws1.cell(1, index + 2).string(title);
    });
    data.forEach(({userData, timeData}, index) => {
      ws1.cell(index + 2, 1).string(userData.name);
      timeData.forEach((time, _index) => {
        console.log({time});
        let cellString = '';
        if (time.checkInDate) {
          cellString = dayjs(formatDate(time.checkInDate)).format('HH:mm');
        }
        if (time.checkOutDate) {
          cellString += `-${dayjs(formatDate(time.checkOutDate)).format('HH:mm')}`;
        }
        // const style = wb.createStyle({
        //   font: {
        //     color: '#FF0000',
        //     size: 14,
        //   },
        // });
        if (!cellString.trim()) {
          cellString = 'X';
        }
        ws1.cell(index + 2, _index + 2).string(cellString);
      });
    });

    wb.write('test.xlsx', res);

    // return res.status(200).json({success: true, data});
  } catch (e) {
    return res.status(500).json({error: e, success: false});
  }
};
