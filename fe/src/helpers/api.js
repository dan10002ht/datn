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

export const handleGetToken = async () => {
  const data = await api({
    url: "/token",
    method: "POST",
    data: { apiKey: import.meta.env.VITE_SECRET_KEY },
  });
  localStorage.setItem("token", data.token);
  return data.token;
};

export const login = async ({ username, password }) => {
  const data = await api({
    url: "/login",
    method: "POST",
    data: { username, password },
  });
  if (data.success) localStorage.setItem("token", data.token);
  return data;
};

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log({ error });
    // const originalRequest = error.config;
    if ([401, 403].includes(error.response.status)) {
      localStorage.removeItem("token");
      window.location.href = "/login";
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
