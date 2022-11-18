import { Fade, IconButton, Tooltip } from "@mui/material";
import React from "react";

const CustomIconButton = ({
  children,
  link = "about:blank",
  title = "Button",
}) => {
  const onClick = () => {
    window.open(link);
  };
  return (
    <Tooltip
      title={title}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 400 }}
    >
      <IconButton
        onClick={onClick}
        sx={{ color: "white", my: 1, mx: 2 }}
        size="large"
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default CustomIconButton;
