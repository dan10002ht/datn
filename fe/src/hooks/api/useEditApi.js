import { useState } from "react";
import { fetchAuthenticatedApi } from "../../helpers/api";

/**
 * @param url
 * @param defaultState
 * @param fullResp
 * @param useToast
 * @param successMsg
 * @param errorMsg
 * @returns {{editing: boolean, handleEdit}}
 */
export default function useEditApi({
  url,
  defaultState = false,
  fullResp = false,
  useToast = true,
}) {
  const [editing, setEditing] = useState(defaultState);

  /**
   * @param data
   * @param newEditing
   * @param path
   * @returns {Promise<boolean>}
   */
  const handleEdit = async (data, newEditing = true, path = "") => {
    try {
      setEditing((prev) =>
        typeof newEditing === "boolean"
          ? newEditing
          : { ...prev, [newEditing]: true }
      );
      const resp = await fetchAuthenticatedApi(url + path, {
        body: data,
        method: "PUT",
      });
      if (resp.success && useToast) {
        console.log("success");
      }
      if (resp.error) {
        console.log("error");
      }
      return fullResp ? resp : resp.success;
    } catch (e) {
      console.error(e);
      return fullResp ? { success: false, error: e.message } : false;
    } finally {
      setEditing((prev) =>
        typeof newEditing === "boolean"
          ? !newEditing
          : { ...prev, [newEditing]: false }
      );
    }
  };

  return { editing, handleEdit };
}
