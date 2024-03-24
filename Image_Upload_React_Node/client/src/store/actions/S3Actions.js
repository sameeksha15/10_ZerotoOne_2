import {
  GET_UPLOAD_URL_REQUEST,
  GET_UPLOAD_URL_SUCCESS,
  GET_UPLOAD_URL_FAILED,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILED,
} from "../constants/S3Constants";
import axios from "axios";

export const getFileUploadUrl = (fileType, callback) => async (dispatch) => {
  try {
    dispatch({
      type: GET_UPLOAD_URL_REQUEST,
    });

    const config = {
      method: "PUT",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/api/v1/getFileUploadUrl",
      headers: {
        "Content-Type": "application/json",
      },
      data: { fileType },
    };

    const response = await axios(config);
    if (response) {
      if (response.status === 200) {
        dispatch({
          type: GET_UPLOAD_URL_SUCCESS,
          payload: response.data.url,
        });
        callback(true, response.data.url);
      } else {
        dispatch({
          type: GET_UPLOAD_URL_FAILED,
          payload: response.data.message,
        });
        callback(false, response.data.message);
      }
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: GET_UPLOAD_URL_FAILED,
        payload: error.response.data.message,
      });
      callback(false, error.response.data.message);
    } else if (error.request) {
      dispatch({
        type: GET_UPLOAD_URL_FAILED,
        payload: "Check your internet connection and try again ",
      });
      callback(false, "Check your internet connection and try again");
    }
  }
};

export const uploadFilesToS3 = (file, URL, callback) => async (dispatch) => {
  try {
    dispatch({
      type: UPLOAD_FILE_REQUEST,
    });
    const config = {
      method: "PUT",
      url: URL,
      "Content-Type": "multipart/form-data",
      data: file,
    };
    const response = await axios(config);
    if (response) {
      if (response.status === 200) {
        dispatch({ type: UPLOAD_FILE_SUCCESS });
        callback(true, URL, file.name);
      } else {
        dispatch({
          type: UPLOAD_FILE_FAILED,
          payload: response.data.message,
        });
        callback(false, response.data.message, file.name);
      }
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: UPLOAD_FILE_FAILED,
        payload: error.response.data.message,
      });
      callback(false, error.response.data.message, file.name);
    } else if (error.request) {
      dispatch({
        type: UPLOAD_FILE_FAILED,
        payload: "Check your internet connection and try again",
      });
      callback(
        false,
        "Check your internet connection and try again ",
        file.name
      );
    }
  }
};
