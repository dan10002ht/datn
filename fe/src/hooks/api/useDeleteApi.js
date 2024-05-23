import { useState } from "react";
import { fetchAuthenticatedApi } from "../../helpers/api";

export default function useDeleteApi({ url, successCallback = () => {}, errorCallback = () => {} }) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true)
      const resp = await fetchAuthenticatedApi(url, {
        method: "DELETE",
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
      return resp;
    } catch (e) {
      console.log(e)
    } finally {
      setDeleting(false)
    }
  }
  return {deleting, setDeleting, handleDelete}
}