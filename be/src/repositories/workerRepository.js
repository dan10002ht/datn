import db from '../const/db';
import {TYPE_USER} from '../const/common';
import formatDateFields from '../helpers/formatDateFields';
import getByIds from '../helpers/getByIds';
import {paginateQuery} from '../helpers/paginateQuery';
import {prepareDoc} from '../helpers/prepare';
import {convertVietnameseToEnglish} from '../helpers/removeDiacritics';
import {getStartAndEndOfMonth} from '../helpers/time';
import {createOrUpdateCache, getCacheByType} from './cacheRepository';
import {getPeriodTimeData} from './timeRepository';

const collection = db.collection('worker');

export const isUserExisted = async (userId) => {
  const docs = await collection.where('userId', '==', parseInt(userId)).limit(1).get();
  return !docs.empty;
};

export const create = async (userId) => {
  const doc = await collection.add({userId, isUpdateInformation: false, createdAt: new Date()});
  return doc.id;
};

export const getAll = async () => {
  const docs = await collection.get();
  return docs.docs.map((doc) => prepareDoc({doc}));
};

export const getDocByUserId = async (userId) => {
  const docs = await collection.where('userId', '==', parseInt(userId)).limit(1).get();
  const [doc] = docs.docs;
  return doc;
};

export const getUserData = async (userId) => {
  const doc = await getDocByUserId(userId);
  return prepareDoc({doc});
};

export const updateWorkerByUserId = async ({userId, data}) => {
  const doc = await getDocByUserId(userId);
  const updatedData = {...data, isUpdateInformation: true};
  const [cacheData] = await getCacheByType(TYPE_USER, '');
  const isExisted = cacheData.some((x) => x.id === doc.id);
  const updatedCacheData = {
    ...updatedData,
    searchName: convertVietnameseToEnglish(updatedData.name),
    id: doc.id,
  };
  const dataArray = isExisted
    ? cacheData.map((x) => (x.id === doc.id ? {...x, ...updatedCacheData} : x))
    : [...cacheData, updatedCacheData];

  await createOrUpdateCache({
    type: TYPE_USER,
    dataJson: JSON.stringify(dataArray),
  });
  return doc.ref.update({...updatedData, createdAt: new Date(data.createdAt)});
};

export const getUsersWithQuery = async (isUpdateInformation, query) => {
  const docRef = collection.where('isUpdateInformation', '==', isUpdateInformation);
  const {data, hasPre, total, hasNext, previousCursor, nextCursor} = await paginateQuery(
    docRef,
    collection,
    query,
  );
  return {data, hasPre, total, hasNext, previousCursor, nextCursor};
};

export const update = async ({id, data}) => {
  return await collection.doc(id).update(formatDateFields(data));
};

export const bulkDelete = async ({ids}) => {
  return await Promise.all(ids.map((id) => collection.doc(id).delete()));
};

export const getUsersWithTimeKeepingData = async ({selectedDate, period, query}) => {
  let userRef = collection;
  const {searchText} = query;
  const {
    data = [],
    hasPre,
    total,
    hasNext,
    previousCursor,
    nextCursor,
  } = searchText && searchText.trim() !== ''
    ? await getSearchUser(query, true)
    : await paginateQuery(userRef, collection, query);
  console.log({data});
  const timeKeepingData = await Promise.all(
    data.map(async ({userId, name}) => ({
      userData: {
        name,
      },
      timeData: await getPeriodTimeData({period, userId, selectedDate}),
    })),
  );
  return {hasPre, hasNext, total, previousCursor, nextCursor, data: timeKeepingData};
};

export const deleteUserByUserId = async (userId) => {
  const docs = await collection.where('userId', '==', userId).limit(1).get();
  if (docs.empty) {
    return;
  }
  const [doc] = docs.docs;
  return await doc.ref.delete();
};

export const getSearchUser = async (query, isUpdateInformation) => {
  try {
    const {searchText, page} = query;
    const limit = parseInt(query.limitPerPage || 10);
    const pageNum = parseInt(page || 1);
    const [suggestions] = await getCacheByType(TYPE_USER, searchText, isUpdateInformation);
    if (query.sort) {
      suggestions.sort((a, b) =>
        query.sort === 'desc'
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt),
      );
    }
    const ids = suggestions.slice(limit * (pageNum - 1), limit * pageNum).map((x) => x.id);
    const data = await getByIds({collection, ids, selectDoc: true});
    const hasPre = pageNum > 1;
    const hasNext = suggestions.length > limit * pageNum;
    return {
      data,
      hasPre,
      hasNext,
      total: suggestions.length,
      previousCursor: hasPre && data[0].id,
      nextCursor: hasNext && data[data.length - 1].id,
    };
  } catch (e) {
    return {data: [], error: e.message};
  }
};

export const getWorkersAmount = async () => {
  const countDoc = await collection.where('isUpdateInformation', '==', true).count().get();
  return countDoc.data().count;
};

export const getWorkerAmountInRange = async (range) => {
  const countSnapshot = await collection
    .where('isUpdateInformation', '==', true)
    .where('createdAt', '>=', new Date(range.fromDate))
    .where('createdAt', '<', new Date(range.toDate))
    .count()
    .get();

  return countSnapshot.data().count;
};

export const getWorkerCountWithPeriod = async (period) => {
  switch (period) {
    case 'month': {
      const thisMonthRange = getStartAndEndOfMonth(new Date());
      const previousMonthRange = getStartAndEndOfMonth(
        new Date(new Date().setMonth(new Date().getMonth() - 1)),
      );
      const [thisMonthCount, previousMonthCount] = await Promise.all([
        getWorkerAmountInRange(thisMonthRange),
        getWorkerAmountInRange(previousMonthRange),
      ]);
      return {thisMonthCount, previousMonthCount};
      break;
    }
  }
};
