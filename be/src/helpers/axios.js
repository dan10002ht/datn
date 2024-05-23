import axios from 'axios';
import delay from './delay';

const client = axios.create();

export async function api({url, data, method = 'GET', params = {}, resp = 'data'}) {
  return client
    .request({
      ...options,
      data,
      headers: options.headers || {},
      method,
      params,
      url
    })
    .then(res => res[resp]);
}

export async function makePinterestApi({url, method, data}) {
  const headers = {
    'Content-Type': 'application/json'
  };
  const handler = () => api({url, method, data, headers});
  return await retryMakeApi(handler, {maxRetries: 5});
}

async function retryMakeApi(handler, {maxRetries, attempt = 0}) {
  try {
    return await handler();
  } catch (e) {
    console.error(e);
    attempt++;
    const shouldRetry = e.statusCode === 429;
    if (shouldRetry || attempt < maxRetries) {
      throw new Error(e.message);
    }
    await delay((attempt + Math.random()) * 1000);
    return await retryMakeApi(handler, {maxRetries, attempt});
  }
}
