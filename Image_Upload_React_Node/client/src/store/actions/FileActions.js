import {
  CREATE_FILE_REQUEST,
  CREATE_FILE_SUCCESS,
  CREATE_FILE_FAILED,
  FORWARD_REQUEST_REQUEST,
  FORWARD_REQUEST_SUCCESS,
  FORWARD_REQUEST_FAILED,
} from "../constants/FileConstants";
import axios from "axios";

export const createFile =
  (fileInfo, fileData, callback) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_FILE_REQUEST,
      });
      const config = {
        method: "POST",
        url: "http://127.0.0.1:8000/api/v1/upload/file",
        "Content-Type": "application/json",
        data: fileInfo,
      };
      const response = await axios(config);
      if (response) {
        if (response.status === 200) {
          dispatch({
            type: CREATE_FILE_SUCCESS,
            payload: response.data.fileId,
          });
          callback(true, response.data.fileId, fileData);
        } else {
          dispatch({
            type: CREATE_FILE_FAILED,
            payload: response.data.sessage,
          });
          callback(false, response.data.message, fileData);
        }
      }
    } catch (error) {
      if (error.response) {
        dispatch({
          type: CREATE_FILE_FAILED,
          payload: error.response.data.message,
        });
        callback(false, error.response.data.message, fileData);
      } else if (error.request) {
        dispatch({
          type: CREATE_FILE_FAILED,
          payload: "Check your internet connection and try again ",
        });
        callback(
          false,
          "Check your internet connection and try again",
          fileData
        );
      }
    }
  };

export const forwardRequest = (data, callback) => async (dispatch) => {
  try {
    dispatch({
      type: FORWARD_REQUEST_REQUEST,
    });
    const config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/v1/forward-to-backend",
      "Content-Type": "application/json",
      data: { content: data },
    };
    const response = await axios(config);
    if (response) {
      if (response.status === 200) {
        dispatch({
          type: FORWARD_REQUEST_SUCCESS,
        });
        callback(true, data.fileId, response.data.message);
      } else {
        dispatch({
          type: FORWARD_REQUEST_FAILED,
          payload: response.data.message,
        });
        callback(false, data.fileId, response.data.message);
      }
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: FORWARD_REQUEST_FAILED,
        payload: error.response.data.message,
      });
      callback(false, data.fileId, error.response.data.message);
    } else if (error.request) {
      dispatch({
        type: FORWARD_REQUEST_FAILED,
        payload: "Check your internet connection and try again",
      });
      callback(
        false,
        data.fileId,
        "Check your internet connection and try again"
      );
    }
  }
};
