import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { getUrlReducer, uploadFileReducer } from "./reducers/S3FileReducer";

import {
  createFileReducer,
  forwardRequestReducer,
} from "./reducers/FileReducer";

let initialState = {};
const middleware = [thunk];

const reducer = combineReducers({
  getUrl: getUrlReducer,
  uploadFile: uploadFileReducer,
  createFile: createFileReducer,
  forwardToBackend: forwardRequestReducer,
});

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
