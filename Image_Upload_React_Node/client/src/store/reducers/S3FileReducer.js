import {
  GET_UPLOAD_URL_REQUEST,
  GET_UPLOAD_URL_SUCCESS,
  GET_UPLOAD_URL_FAILED,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILED,
} from "../constants/S3Constants";

export const getUrlReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_UPLOAD_URL_REQUEST:
      return {
        loading: true,
        error: null,
        url: null,
      };
    case GET_UPLOAD_URL_SUCCESS:
      return {
        loading: false,
        error: null,
        url: action.payload,
      };
    case GET_UPLOAD_URL_FAILED:
      return {
        loading: false,
        error: action.payload,
        url: null,
      };
    default:
      return { ...state };
  }
};

export const uploadFileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
      return {
        loading: true,
        error: null,
        success: false,
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        loading: false,
        error: null,
        success: true,
      };
    case UPLOAD_FILE_FAILED:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return { ...state };
  }
};
