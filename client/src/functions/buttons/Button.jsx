import React from "react";
import { Button } from "@mui/material";
const CustomButton = ({
  onClick = () => {},
  text = "text",
  variant = 3,
  s = 2,
}) => {
  const type = {
    1: "contained",
    2: "outlined",
    3: "text",
  };
  const size = {
    1: "large",
    2: "medium",
    3: "small",
  };
  return (
    <Button
      variant={type[variant]}
      onClick={onClick}
      sx={{ color: "white" }}
      size={size[s]}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
