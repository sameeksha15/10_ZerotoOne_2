import React from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./components/home/Home";
import Loader from "./components/layout/Loader";
import PageNotFound from "./components/layout/PageNotFound";
import UploadToS3 from "./components/upload/UploadToS3";
import ShowFiles from "./components/files/ShowFiles";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      {/* {<Loader />} */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<UploadToS3 />} />
        <Route path="/files" element={<ShowFiles />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
