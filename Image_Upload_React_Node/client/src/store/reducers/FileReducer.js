import {
  CREATE_FILE_REQUEST,
  CREATE_FILE_SUCCESS,
  CREATE_FILE_FAILED,
  FORWARD_REQUEST_REQUEST,
  FORWARD_REQUEST_SUCCESS,
  FORWARD_REQUEST_FAILED,
} from "../constants/FileConstants";

export const createFileReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_FILE_REQUEST:
      return {
        ...state,
        loading: true,
        fileId: null,
        error: null,
      };
    case CREATE_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        fileId: action.payload,
        error: null,
      };
    case CREATE_FILE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const forwardRequestReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case FORWARD_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case FORWARD_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case FORWARD_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return { ...state };
  }
};
