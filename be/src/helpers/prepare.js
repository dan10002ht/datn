import formatDateFields from './formatDateFields';

export function prepareDoc({doc, data = {}}) {
  if (doc) {
    data = typeof doc.data() === 'undefined' ? {} : {...doc.data(), id: doc.id};
  }
  return formatDateFields(data);
}
