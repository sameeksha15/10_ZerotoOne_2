import React from "react";
import classes from "./InProgressSpinner.module.css";
import { useSelector, useDispatch } from "react-redux";

function InProgressSpinner() {
  const {
    loading: forwardRequestLoading,
    error: forwardRequestError,
    success: forwardRequestStatus,
  } = useSelector((state) => state.forwardToBackend);
  return (
    <>
      <div className={classes["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}

export default InProgressSpinner;
