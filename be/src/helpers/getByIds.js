import {prepareDoc} from './prepare';

export default async function getByIds({collection, ids}) {
  const docs = await Promise.all(
    ids.map(async (id) => {
      const doc = await collection.doc(id).get();
      return prepareDoc({doc});
    }),
  );
  return docs;
}
