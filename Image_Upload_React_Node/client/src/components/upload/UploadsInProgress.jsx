import React, { useState } from "react";
import classes from "./UploadsInProgress.module.css";
import { BsFillFileEarmarkMusicFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import InProgressSpinner from "../layout/InProgressSpinner.jsx";

function UploadsInProgress({ filename, fileSize }) {
  const {
    loading: forwardRequestLoading,
    error: forwardRequestError,
    success: forwardRequestStatus,
  } = useSelector((state) => state.forwardToBackend);

  return (
    <div className={classes.single_upload_in_progress}>
      <div className={classes.single_upload}>
        <div className={classes.left_area}>
          <span className={classes.music_icon}>
            {<BsFillFileEarmarkMusicFill className={classes.icon} />}
          </span>
          <div className={classes.fileData}>
            <span className={classes.fileName}>
              <Link> {filename} </Link> <span> {fileSize} Mb</span>
            </span>
          </div>
        </div>
        <div className={classes.inProgressIcon}>
          <InProgressSpinner />
        </div>
      </div>
    </div>
  );
}

export default UploadsInProgress;
