import useFetchApi from "./useFetchApi";
import querystring from "query-string";
import { useState } from "react";

export default function useFetchWithPagination({
  apiUrl,
  defaultSortValue = "",
  defaultFetchFilter = {},
}) {
  const [filters, setFilters] = useState(defaultFetchFilter);
  const {
    data,
    setData,
    loading,
    setLoading,
    fetched,
    refetch,
    total,
    setTotal,
    pagination,
    setPagination,
  } = useFetchApi({
    url: `${apiUrl}?${querystring.stringify(defaultFetchFilter)}`,
  });
  const [sortValue, setSortValue] = useState(defaultSortValue);
  const [afterPage, setAfterPage] = useState(null);

  const handleChangeFilters = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRefetchByQuery = async (
    customFilters = {},
    keepPreviousData = false
  ) => {
    console.log({ customFilters });
    const { page, before } = customFilters;
    if (customFilters.searchText) setTotal(0);

    const queryFilters = filters;
    setFilters((prev) => ({
      ...prev,
      ...customFilters,
    }));
    if (sortValue && !customFilters.sort) {
      queryFilters["sort"] = sortValue;
    }
    console.log({ queryFilters: queryFilters, customFilters });
    await refetch(
      `${apiUrl}?${querystring.stringify({
        ...queryFilters,
        ...customFilters,
      })}`,
      null,
      keepPreviousData
    );
    if (page && !before)
      setAfterPage((prev) => ({
        ...prev,
        [page]: page === 1 ? null : pagination.nextCursor,
      }));
  };

  const handleRefetchByDefault = (keepPreviousData = false) => {
    setFilters(defaultFetchFilter);
    refetch(
      `${apiUrl}?${querystring.stringify(defaultFetchFilter)}`,
      null,
      keepPreviousData
    );
  };

  const onSortChange = (selected) => {
    setSortValue(selected);
    handleRefetchByQuery({ sort: selected });
  };

  return {
    data,
    total,
    loading,
    fetched,
    refetch,
    setFilters,
    setSortValue,
    onSortChange,
    sortValue,
    pagination,
    setPagination,
    handleChangeFilters,
    filters,
    handleRefetchByQuery,
    setLoading,
    setData,
    handleRefetchByDefault,
    afterPage,
  };
}
