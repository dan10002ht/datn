import db from '../const/db';

const collection = db.collection('cache');

export const getCacheByType = async (
  type,
  search = '',
  isUpdateInformation = false,
  shouldFilter = false,
) => {
  const cacheDocs = await collection.where('type', '==', type).limit(1).get();
  if (cacheDocs.size > 0) {
    const [doc] = cacheDocs.docs;
    const {dataJson} = doc.data();
    const cacheData = JSON.parse(dataJson).filter(
      (data) =>
        (data?.searchName?.toLowerCase()?.includes(search?.toLowerCase()) || search === '') &&
        (shouldFilter ? data.isUpdateInformation === isUpdateInformation : true),
    );
    return [cacheData, cacheDocs];
  }
  return [[], null];
};

export const createOrUpdateCache = async ({type, dataJson}) => {
  const [, cacheDocs] = await getCacheByType(type);
  const toUpdateData = {
    dataJson,
    updatedAt: new Date(),
  };

  if (cacheDocs?.size > 0) {
    const doc = cacheDocs.docs[0];
    return doc.ref.update(toUpdateData);
  }

  return collection.add({
    type,
    ...toUpdateData,
    dataJson,
  });
};
