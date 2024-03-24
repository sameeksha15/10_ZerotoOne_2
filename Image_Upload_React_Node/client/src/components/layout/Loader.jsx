import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import classes from "./Loader.module.css";
import { useDispatch, useSelector } from "react-redux";

const Loader = () => {
  return (
    <div className={`${classes.loader}`}>
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </div>
  );
};

export default Loader;
