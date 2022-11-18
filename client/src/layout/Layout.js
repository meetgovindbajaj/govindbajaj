import React, { useEffect } from "react";
import { useState } from "react";
import NewNavbarPanel from "../components/header/NavbarPanel";
import backgroundVideo from "../files/background.mp4";
import Wrapper from "../functions/errorWrapper/Wrapper.js";
const Layout = ({ children }) => {
  const [vidError, setVidError] = useState(false);
  useEffect(() => {
    const lout = document.getElementById("Layout");
    if (vidError) {
      lout.style.background = "black";
    } else {
      lout.style.background = "transparent";
    }
  }, [vidError]);
  return (
    <Wrapper
      children={
        <div id="Layout" style={LayoutStyle}>
          <video
            loop
            id="mbackground"
            onError={() => {
              setVidError(true);
            }}
            autoPlay
            muted
            style={{ pointerEvents: "none" }}
            src={backgroundVideo}
            type="video/mp4"
          />
          <div id="mbackgroundblur"></div>
          <Wrapper children={<NewNavbarPanel />} />
          {children}
        </div>
      }
    />
  );
};
const LayoutStyle = {
  width: "100vw",
  height: "100vh",
  position: "relative",
};
export default Layout;
