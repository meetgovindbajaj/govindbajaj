import React from "react";
import { useState } from "react";
import NewNavbarPanel from "../components/header/NavbarPanel";
import backgroundVideo from "../files/background.mp4";
import Wrapper from "../functions/errorWrapper/Wrapper.js";
const Layout = ({ children }) => {
  const [vidError, setVidError] = useState(false);
  return (
    <Wrapper
      children={
        <div id="Layout" style={LayoutStyle}>
          <video
            loop
            id="mbackground"
            onError={(e) => {
              if (!vidError) {
                setVidError((vidError) => (vidError = true));
                e.target.setAttribute("src", backgroundVideo);
              } else {
                const lout = document.getElementById("Layout");
                lout.style.background = "#000000";
              }
            }}
            autoPlay
            muted
            poster="https://drive.google.com/file/d/1eNKDxEnT75HNbGVfaI9Fg2mGZqHOsqwB/view?usp=sharing"
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
  background: "transparent",
};
export default Layout;
