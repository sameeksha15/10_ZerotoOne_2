import React, { useEffect, useState } from "react";
import classes from "./UploadLocal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../layout/CustomAlert";
import UploadsInProgress from "./UploadsInProgress";
import { createFile, forwardRequest } from "../../store/actions/FileActions";

import Loader from "../layout/Loader";

import { FiUploadCloud } from "react-icons/fi";

import { FcEmptyTrash } from "react-icons/fc";
import { FiUpload } from "react-icons/fi";
import { BiUpload } from "react-icons/bi";
import classNames from "classnames";
import {
  getFileUploadUrl,
  uploadFilesToS3,
} from "../../store/actions/S3Actions";

function UploadToS3() {
  const name = "file";
  const types = [".jpg", ".png"];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const [dragging, setDragging] = useState(false);

  const {
    loading: getUrlLoading,
    error: getUrlError,
    url: uploadUrl,
  } = useSelector((state) => state.getUrl);

  const {
    loading: uploadFileLoading,
    error: uploadFileError,
    success: uploadStatus,
  } = useSelector((state) => state.uploadFile);

  const {
    loading: createFileLoading,
    error: createFileError,
    fileId,
  } = useSelector((state) => state.createFile);

  const {
    loading: forwardRequestLoading,
    error: forwardRequestError,
    success: forwardRequestStatus,
  } = useSelector((state) => state.forwardToBackend);

  const uploadFileChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files || event.target.files;
    if (files) {
      setSelectedFile(files[0]);
    }
  };

  const uploadFileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const arr = file.name.split(".");
    dispatch(getFileUploadUrl(arr[arr.length - 1], s3UrlHandler));
  };

  const s3UrlHandler = (status, data) => {
    if (status) {
      dispatch(uploadFilesToS3(file, data, uploadCompleteHandler));
    } else {
      setLoading(false);
      setAlertMessage("Failed to upload file");
      setShowAlert(true);
      setAlertType("error");
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  const uploadCompleteHandler = (status, data, fileName) => {
    if (status) {
      setAlertMessage("File uploaded successfully");
      setAlertType("success");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      const s3Name = data.split("?")[0].split("/")[3];
      const today = new Date();
      const fileInfo = {
        s3Name: s3Name,
        fileName,
        fileSize: (file.size / 1024000).toFixed(2),
        date: {
          day: today.getDate(),
          month: today.getMonth() + 1,
          year: today.getFullYear(),
        },
        time: `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`,
      };
      dispatch(createFile(fileInfo, data, createFileHandler));
    } else {
      setLoading(false);
      setAlertMessage("Failed to upload file");
      setShowAlert(true);
      setAlertType("error");
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  const createFileHandler = (status, data, url) => {
    if (status) {
      setShowAlert(true);
      setAlertType("success");
      setAlertMessage("Processing File");
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      const s3Name = url.split("?")[0].split("/")[3];
      const content = { s3Name, fileId: data };
      dispatch(forwardRequest(content, forwardCompleteHandler));
    } else {
      setLoading(false);
      setAlertMessage("Failed to upload file");
      setAlertType("error");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  const forwardCompleteHandler = (status, fileId, data) => {
    if (status) {
      setAlertMessage("Processed file successfully");
      setShowAlert(true);
      setAlertType("success");
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      setTimeout(() => {
        navigate("/files");
      }, 2000);
    } else {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     dispatch(getAlls());
  //   }, []);

  return (
    <>
      <div className={classes.main_area}>
        {showAlert && (
          <CustomAlert
            type={alertType}
            message={alertMessage}
            onClose={() => setShowAlert(false)}
            index={1000}
          />
        )}
        <div className={`${classes.upload_area}`}>
          {(
            forwardRequestLoading ||
            uploadFileLoading ||
            getUrlLoading ||
            createFileLoading) && <Loader />}
          <div className={classes.upload}>
            <div className={classes.topUploadArea}>
              <FiUploadCloud className={classes.upload_icon} />
              <p className={classes.heading}>
                Upload an image file to generate insights
              </p>
              <p>
                Depending on the size of the image file, it will be processed in
                1 - 2 mins
              </p>
            </div>
            <div className={classes.dragAndDropArea}>
              <div className={classes.dragAndDrop}>
                <form
                  onSubmit={uploadFileSubmit}
                  className={classes.dragAndDropForm}
                  encType="multipart/form-data"
                  s
                >
                  <div
                    className={classes.fileUploader}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className={classes.uploadOptions}>
                      <label className={classes.fileLabel}>
                        <input
                          type="file"
                          name={name}
                          className={classes.fileInput}
                          accept={types.join(",")}
                          onChange={uploadFileChangeHandler}
                        />
                        <FiUpload className={classes.browseIcon} />
                        <div className={classes.uploadText}>Browse files</div>
                      </label>
                      <p className={classes.or}>OR</p>
                      <div
                        className={classNames(classes.uploadButton, {
                          [classes.dragging]: dragging,
                        })}
                      >
                        <div className={classes.uploadText}>
                          {dragging
                            ? "Drop files here"
                            : "Drag and drop image file here."}
                        </div>
                      </div>
                      <p className={classes.selectedFile}>
                        Selected file: {file ? file.name : "none"}
                      </p>
                    </div>
                  </div>
                  {/* </div> */}
                  <button type="submit" className={classes.submit}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* <div className={classes.files_upload_in_progress}>
            {!files ||
              (files.mIncomplete.length === 0 && (
                <div className={classes.no_uploads}>
                  <span>
                    <FcEmptyTrash />
                  </span>
                  <h2>You have no recent uploads </h2>
                </div>
              ))}
            {files && files.mIncomplete.length > 0 && (
              <div className={classes.uploads_in_progress}>
                {files.mIncomplete.map(
                  (files, idx) =>
                    file.fileType === "Upload (Local)" && (
                      <UploadsInProgress
                        key={file._id}
                        filename={file.fileName}
                        fileSize={file.fileSize}
                      />
                    )
                )}
              </div>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default UploadToS3;
