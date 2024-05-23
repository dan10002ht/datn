import { useState } from "react";
import { fetchAuthenticatedApi } from "../../helpers/api";

export default function useCreateApi({
  url,
  defaultState = false,
  fullResp = false,
  catchError = true,
  successCallback = (_p) => {},
  errorCallback = (_p) => {},
  successMsg = "Create successfully",
  errorMsg = "Create failed",
}) {
  const [creating, setCreating] = useState(defaultState);

  const handleCreate = async (data = {}) => {
    try {
      setCreating(true);
      const resp = await fetchAuthenticatedApi(url, {
        method: "POST",
        body: data,
      });
      if (resp.success) {
        console.log(successMsg);
        successCallback(resp);
      }
      if (!resp.success) {
        errorCallback(resp);
        console.log(errorMsg);
      }
      if (resp.error) {
        console.log(resp.error);
      }
      return fullResp ? resp : resp.success;
    } catch (e) {
      if (!catchError) throw new Error(e);
      console.log(e);
      console.log(errorMsg);
      return fullResp ? { success: false, error: e.message } : false;
    } finally {
      setCreating(false);
    }
  };
  return { creating, handleCreate };
}
