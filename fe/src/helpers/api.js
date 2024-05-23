import axios from "axios";

export async function api({
  url,
  data = {},
  method = "GET",
  params = {},
  options = {},
  clientConfig = {
    baseURL: "http://localhost:4000/api",
    timeout: 60000,
  },
}) {
  const client = axios.create(clientConfig);
  //   const idToken = await auth.currentUser.getIdToken(false);
  return client
    .request({
      ...options,
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        ...(options.headers || {}),
        // "X-Auth-Token": idToken,
      },
      url,
      method,
      data,
      params,
    })
    .then((res) => res.data)
    .catch((e) => console.log(e));
}

const getAuthenticatedFetchApi = () => {
  const fetchFunction = api;
  return async (uri, options = {}) => {
    return fetchFunction({
      url: uri,
      data: options.body,
      method: options.method,
    });
  };
};

export const fetchAuthenticatedApi = getAuthenticatedFetchApi();
