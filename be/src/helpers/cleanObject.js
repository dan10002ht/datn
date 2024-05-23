/**
 * Remove null attributes from object
 * @param {object} obj
 * @returns {*}
 */
export default function cleanObject(obj) {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') cleanObject(obj[key]);
    else if (obj[key] === undefined || obj[key] === null || obj[key] === false) delete obj[key];
  });
  return obj;
}
