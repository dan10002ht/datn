import formatDateFields from './formatDateFields';

const DEFAULT_PAGE_SIZE = 100;
/**
 * @param {Query} queriedRef
 * @param {CollectionReference} collection
 * @param query
 * @param selectFields
 * @returns {Promise<{data: *[], hasNext: boolean, hasPre: boolean, count}>}
 */
export async function paginateQuery(queriedRef, collection, query = {}, selectFields = []) {
  const limit = parseInt(query.limitPerPage || DEFAULT_PAGE_SIZE);
  let hasPre = false;
  let hasNext = false;
  const total = await countQueriedRef(queriedRef);
  if (query.sort) {
    queriedRef = queriedRef.orderBy('createdAt', query.sort);
  }
  if (query.gender && query.gender !== 'all') {
    queriedRef = queriedRef.where('gender', '==', query.gender);
  }
  if (query.after) {
    const after = await collection.doc(query.after).get();
    queriedRef = queriedRef.startAfter(after);
    hasPre = true;
  }
  if (query.before) {
    const before = await collection.doc(query.before).get();
    queriedRef = queriedRef.endBefore(before).limitToLast(limit);
    hasNext = true;
  } else {
    queriedRef = queriedRef.limit(limit);
  }
  if (selectFields.length > 0) {
    queriedRef = queriedRef.select(...selectFields);
  }
  const docs = await queriedRef.get();
  const data =
    docs.docs.map((doc) => {
      return {...formatDateFields(doc.data()), id: doc.id};
    }) || [];

  if (!hasPre || !hasNext) {
    const [resultHasPre, resultHasNext] = await Promise.all([
      verifyHasPre(docs, queriedRef),
      verifyHasNext(docs, queriedRef),
    ]);
    if (!hasPre) {
      hasPre = resultHasPre;
    }
    if (!hasNext) {
      hasNext = resultHasNext;
    }
  }

  return {
    data,
    hasPre,
    hasNext,
    count: docs.size,
    total,
    docs,
    previousCursor: hasPre && data[0].id,
    nextCursor: hasNext && data[data.length - 1].id,
  };
}

/**
 * @param {QuerySnapshot} objectDocs
 * @param {Query} queriedRef
 * @returns {Promise<boolean>}
 */
export async function verifyHasPre(objectDocs, queriedRef) {
  if (objectDocs.empty) {
    return false;
  }

  const preRef = await queriedRef.endBefore(objectDocs.docs[0]).limit(1).get();

  return !preRef.empty;
}

/**
 * @param {QuerySnapshot} objectDocs
 * @param {Query} queriedRef
 * @returns {Promise<boolean>}
 */
export async function verifyHasNext(objectDocs, queriedRef) {
  if (objectDocs.empty) {
    return false;
  }

  const nextRef = await queriedRef
    .startAfter(objectDocs.docs[objectDocs.size - 1])
    .limitToLast(1)
    .get();

  return !nextRef.empty;
}

/**
 * @param {Query} queriedRef
 * @returns {Promise<Number>}
 */
export async function countQueriedRef(queriedRef) {
  const snapshots = await queriedRef.count().get();
  return snapshots.data().count;
}
