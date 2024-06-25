import db from '../const/db';
import convertVietnameseToEnglish from '../helpers/convertVietnameseToEnglish';

const collection = db.collection('cache');

const fields = {
  name: 'searchName',
  userId: 'userId',
};

export const getCacheByType = async (
  type,
  search = '',
  isUpdateInformation = false,
  shouldFilter = false,
  searchField = 'name',
  gender = 'all',
) => {
  const cacheDocs = await collection.where('type', '==', type).limit(1).get();
  if (cacheDocs.size > 0) {
    const [doc] = cacheDocs.docs;
    const {dataJson} = doc.data();
    const cacheData = JSON.parse(dataJson).filter((data) => {
      const searchFilter =
        (data?.[fields[searchField]]
          ?.toLowerCase()
          ?.includes(convertVietnameseToEnglish(search?.toLowerCase())) ||
          search === '') &&
        (shouldFilter ? data.isUpdateInformation === isUpdateInformation : true);
      if (gender === 'all') return searchFilter;
      return searchFilter && data.gender === gender;
    });
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
