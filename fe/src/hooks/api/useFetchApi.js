import { useEffect, useState } from "react";
import { fetchAuthenticatedApi } from "../../helpers/api";
import isEmpty from "../../helpers/isEmpty";

/**
 * set state recursively
 * @param prevData
 * @param newData
 * @returns {*}
 */
export function recursiveSetData(prevData, newData) {
  return mergeDeep({ ...prevData }, newData);
}

function mergeDeep(prev, next) {
  if (typeof prev === "object" && typeof next === "object") {
    // eslint-disable-next-line guard-for-in
    for (const key in next) {
      if (next.hasOwnProperty(key)) {
        prev[key] = mergeDeep(prev[key] || {}, next[key]);
      }
    }
    return prev;
  }
  return next;
}

/**
 * useFetchApi hook for fetch data from api with url
 *
 * @param url
 * @param defaultData
 * @param {*} presentDataFunc
 * @param initLoad
 * @param method
 * @param postData
 * @returns {{setTotal: (value: (((prevState: number) => number) | number)) => void, setPagination: (value: (((prevState: {}) => {}) | {})) => void, pagination: {}, data: *[], setData: (value: (((prevState: *[]) => *[]) | *[])) => void, refetch: ((function(*): Promise<undefined|*>)|*), loading: boolean, setErrors: (value: (((prevState: *[]) => *[]) | *[])) => void, handleChangeInput: (function(*, *): void), total: number, setLoading: (value: (((prevState: boolean) => boolean) | boolean)) => void, errors: *[], fetched: boolean}}
 */
export default function useFetchApi({
  url,
  defaultData = [],
  presentDataFunc = null,
  initLoad = true,
  method = "GET",
  postData = {},
  initQueries = {},
  successCallback = () => {},
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(defaultData);
  const [pagination, setPagination] = useState({});
  const [errors, setErrors] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [total, setTotal] = useState(0);
  const [pageInfo, setPageInfo] = useState({});

  async function fetchApi() {
    if (url === "") {
      return;
    }
    setLoading(true);
    try {
      const resp =
        method === "GET"
          ? await fetchAuthenticatedApi(url)
          : await fetchAuthenticatedApi(url, { body: postData, method });

      if (resp.data) {
        const newData = presentDataFunc
          ? presentDataFunc(resp.data)
          : resp.data;
        if (!isEmpty(defaultData)) {
          setData((prev) => recursiveSetData(prev, newData));
        } else {
          setData(newData);
        }
      }
      if (resp.pageInfo) setPageInfo(resp.pageInfo);
      if (resp.pagination) {
        const { pagination } = resp;
        setPagination(pagination);
        if (Object.hasOwn(pagination, "total")) setTotal(pagination.total);
      }
      if (resp.errors) setErrors([...errors, resp.errors]);
    } catch (e) {
      console.log(e);
      setErrors([...errors, e.message]);
    } finally {
      setLoading(false);
      setFetched(true);
    }
  }

  async function refetch(reFetchUrl = url, reFetchBody = postData) {
    if (reFetchUrl === "") {
      return;
    }
    try {
      setLoading(true);
      const resp =
        method === "GET"
          ? await fetchAuthenticatedApi(reFetchUrl)
          : await fetchAuthenticatedApi(reFetchUrl, {
              body: reFetchBody,
              method,
            });
      if (resp.data) {
        const newData = presentDataFunc
          ? presentDataFunc(resp.data)
          : resp.data;
        if (!isEmpty(defaultData)) {
          setData((prev) => recursiveSetData(prev, newData));
        } else {
          setData(newData);
        }
        if (resp.pageInfo) setPageInfo(resp.pageInfo);
        if (resp.pagination) {
          const pagination = resp.pagination;
          setPagination(pagination);
          if (Object.hasOwn(pagination, "total")) setTotal(pagination.total);
        }

        return newData;
      }

      setErrors([...errors, resp.errors]);
    } catch (e) {
      setErrors([...errors, e.message]);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (initLoad && !fetched) {
      fetchApi().then(() => {});
    }
  }, []);

  const handleChangeInput = (key, value) =>
    setData((prev) => ({ ...prev, [key]: value }));

  return {
    loading,
    data,
    setData,
    total,
    setTotal,
    pagination,
    setPagination,
    fetchApi,
    refetch,
    errors,
    setLoading,
    fetched,
    setErrors,
    handleChangeInput,
    pageInfo,
  };
}
