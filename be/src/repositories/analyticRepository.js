import {FieldValue} from 'firebase-admin/firestore';
import db from '../const/db';
import {getStartAndEndOfMonth} from '../helpers/time';
import {getDailyRecords} from './timeRepository';

const collection = db.collection('analytics');

export const TYPE_CHECKIN = 'check-in';
export const TYPE_CHECKOUT = 'check-out';

export const createOrUpdateAnalytics = async () => {
  const currentDate = new Date();
  const docs = await collection
    .where('startDate', '<=', currentDate)
    .where('endDate', '>', currentDate)
    .limit(1)
    .get();
  let doc;
  if (docs.empty) {
    const {fromDate, toDate} = getStartAndEndOfMonth();
    doc = await collection.add({
      inTimeCount: 0,
      lateTimeCount: 0,
      nonInCount: 0,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
    });
  } else {
    doc = docs.docs[0];
  }
  const {inTimeCount, lateTimeCount, nonInCount} = await getDailyRecords();
  await doc.update({
    inTimeCount: FieldValue.increment(inTimeCount),
    lateTimeCount: FieldValue.increment(lateTimeCount),
    nonInCount: FieldValue.increment(nonInCount),
  });
};
