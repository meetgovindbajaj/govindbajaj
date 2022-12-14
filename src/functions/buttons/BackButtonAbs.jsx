import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const BackButtonAbs = ({
  onClick = () => {},
  top = "auto",
  bottom = "auto",
  left = "auto",
  right = "auto",
}) => {
  return (
    <div
      className="button--back-abs"
      style={{
        top,
        bottom,
        left,
        right,
      }}
    >
      <IconButton onClick={onClick} sx={{ color: "white" }}>
        <ArrowBackIcon />
      </IconButton>
    </div>
  );
};

export default BackButtonAbs;
