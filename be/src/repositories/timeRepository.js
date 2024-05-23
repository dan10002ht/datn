import {HOUR} from '../const/common';
import db from '../const/db';
import formatDateFields from '../helpers/formatDateFields';
import getStartDate from '../helpers/getStartDate';
import {prepareDoc} from '../helpers/prepare';
import {prepareSeconds} from '../helpers/prepareDateToSeconds';
import {getDateRanges, getStartAndEndOfPeriod} from '../helpers/time';
import {getWorkersAmount} from './workerRepository';

const collection = db.collection('time');

export const TYPE_OUT = 'out';
export const TYPE_IN = 'in';

export const create = async (data) => {
  const {userId: stringUserId} = data;
  const userId = parseInt(stringUserId);
  const startDateOfToday = getStartDate();
  const docs = await collection
    .where('userId', '==', userId)
    .where('checkInDate', '>=', startDateOfToday)
    .limit(1)
    .get();
  const currentDate = new Date();
  const [doc] = docs.docs;
  if (!doc || !doc.exists) {
    return await collection.add({
      ...data,
      checkInDate: currentDate,
      checkInTime: prepareSeconds(currentDate),
      checkOutDate: currentDate,
      checkOutTime: prepareSeconds(currentDate),
      createdAt: currentDate,
    });
  }
  return doc.ref.update({checkOutDate: currentDate, checkOutTime: prepareSeconds(currentDate)});
};

export const getRecordsBetweenDate = async ({fromDate, toDate}) => {
  const docs = await collection
    .where('createdAt', '>=', fromDate)
    .where('createdAt', '<=', toDate)
    .get();
  return docs.docs.map((doc) => prepareDoc({doc}));
};

export const getSingleRecordInRange = async ({userId, fromDate, toDate}) => {
  let queryRef = collection.where('userId', '==', userId);
  if (fromDate) {
    queryRef.where('createdAt', '>=', fromDate);
  }
  if (toDate) {
    queryRef.where('createdAt', '<=', toDate);
  }
  const docs = await queryRef.get();
  return docs.docs.map((doc) => prepareDoc({doc}));
};

export const getSingleRecordInDay = async ({userId, fromDate, toDate}) => {
  const docs = await collection
    .where('userId', '==', userId)
    .where('createdAt', '>=', fromDate)
    .where('createdAt', '<=', toDate)
    .limit(1)
    .get();
  if (docs.empty) {
    return {};
  }
  const [doc] = docs.docs;
  return formatDateFields(prepareDoc({doc}));
};

export const getPeriodTimeData = async ({period, userId, selectedDate = new Date()}) => {
  const {fromDate, toDate} = getStartAndEndOfPeriod({date: selectedDate, period});
  const dateArrays = getDateRanges(fromDate, toDate);

  return await Promise.all(
    dateArrays.map((dateRange) => getSingleRecordInDay({userId, ...dateRange})),
  );
};

export const getDailyRecords = async () => {
  const {fromDate, toDate} = getStartAndEndOfPeriod({date: new Date(), period: 'day'});
  const inTimeQuery = collection
    .where('checkInDate', '>=', fromDate)
    .where('checkOutDate', '<=', toDate)
    .where('checkInTime', '<=', 8 * HOUR)
    .count()
    .get();
  const lateTimeQuery = collection
    .where('checkInDate', '>=', fromDate)
    .where('checkOutDate', '<=', toDate)
    .where('checkInTime', '>', 8 * HOUR)
    .count()
    .get();

  const [intTimeSnapshot, lateTimeSnapshot, workersAmount] = await Promise.all([
    inTimeQuery,
    lateTimeQuery,
    getWorkersAmount(),
  ]);
  const inTimeCount = intTimeSnapshot.data().count;
  const lateTimeCount = lateTimeSnapshot.data().count;

  return {
    inTimeCount,
    lateTimeCount,
    nonInCount: workersAmount - inTimeCount - lateTimeCount,
  };
};

export const getMonthlyRecords = async () => {
  const {fromDate, toDate} = getStartAndEndOfPeriod({date: new Date(), period: 'month'});
  const inTimeQuery = collection
    .where('checkInDate', '>=', fromDate)
    .where('checkOutDate', '<=', toDate)
    .where('checkInTime', '<=', 8 * HOUR)
    .count()
    .get();
  const lateTimeQuery = collection
    .where('checkInDate', '>=', fromDate)
    .where('checkOutDate', '<=', toDate)
    .where('checkInTime', '>', 8 * HOUR)
    .count()
    .get();

  const [intTimeSnapshot, lateTimeSnapshot, workersAmount] = await Promise.all([
    inTimeQuery,
    lateTimeQuery,
    getWorkersAmount(),
  ]);
  const inTimeCount = intTimeSnapshot.data().count;
  const lateTimeCount = lateTimeSnapshot.data().count;

  return {
    inTimeCount,
    lateTimeCount,
    nonInCount: workersAmount - inTimeCount - lateTimeCount,
  };
};

export const getHours = async (period = 'month') => {
  const {fromDate, toDate} = getStartAndEndOfPeriod({date: new Date(), period});
};
