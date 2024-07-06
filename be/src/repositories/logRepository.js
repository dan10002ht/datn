import db from '../const/db';
import {prepareDoc} from '../helpers/prepare';
import {getUserData} from './workerRepository';

const collection = db.collection('log');

export const generateLog = async ({type, userId, ...data}) => {
  return collection.add({type, userId: parseInt(userId), ...data, createdAt: new Date()});
};

export const getLogs = async () => {
  const docs = await collection.get();
  return await Promise.all(
    docs.docs.map(async (doc) => {
      const data = prepareDoc({doc});
      const userData = await getUserData(data.userId, true);
      return {...userData, ...data};
    }),
  );
};
