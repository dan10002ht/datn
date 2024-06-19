import axios from "axios";

export const client = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  timeout: 60000,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? token : "";
  return config;
});

const handleGetToken = async () => {
  const data = await api({
    url: "/token",
    method: "POST",
    data: { apiKey: import.meta.env.VITE_SECRET_KEY },
  });
  localStorage.setItem("token", data.token);
  return data.token;
};

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log({ error });
    const originalRequest = error.config;
    if ([401, 403].includes(error.response.status)) {
      handleGetToken().then((token) => {
        originalRequest.headers["Authorization"] = token;
        return axios(originalRequest);
      });
    }
    return error;
  }
);

export async function api({
  url,
  data = {},
  method = "GET",
  params = {},
  options = {},
}) {
  const token = localStorage.getItem("token") || "";
  return client
    .request({
      ...options,
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: token,
        ...(options.headers || {}),
        // "X-Auth-Token": idToken,
      },
      url,
      method,
      data,
      params,
    })
    .then((res) => res.data);
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
