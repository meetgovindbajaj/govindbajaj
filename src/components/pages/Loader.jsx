import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

const Loader = ({
  link = "https://assets3.lottiefiles.com/packages/lf20_usmfx6bp.json",
}) => {
  return (
    <Player id="loader" autoplay loop src={link} className="loader"></Player>
  );
};
export default Loader;
