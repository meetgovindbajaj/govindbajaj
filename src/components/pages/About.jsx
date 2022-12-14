import { Player } from "@lottiefiles/react-lottie-player";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { setCurrPage } from "../../context/features/Reducer";
import CustomButton from "../../functions/buttons/Button";
import Loader from "./Loader";
const About = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.Reducer.info);
  const initLoading = useSelector((state) => state.Reducer.initLoading);
  useEffect(() => {
    dispatch(setCurrPage(3));
    // eslint-disable-next-line
  }, []);
  const onClick = () => {
    window.open(
      info?.links?.filter((i) => i.name === "Resume")[0].link,
      "_blank"
    );
  };
  useEffect(() => {
    if (initLoading) {
      document.getElementById("loader").style.clipPath =
        "circle(100% at 50% 50%)";
    } else {
      document.getElementById("loader").style.clipPath =
        "circle(0% at 50% 50%)";
    }
  }, [initLoading]);
  return (
    <div className="about--container">
      <Loader />
      <Helmet>
        <title>{info?.name ?? "Govind Bajaj"} - About</title>
        <meta name="Govind Bajaj Resume" content="About Me" />
      </Helmet>
      <section className="about--section-left">
        <div className="about--section-left-top">
          {info?.name}
          <hr />
          {info.about}
        </div>
        <div className="about--section-left-down">
          <CustomButton text="Download Resume" onClick={onClick} s={1} />
        </div>
      </section>
      <section className="home--section-right">
        <Player
          autoplay
          loop
          src="https://assets7.lottiefiles.com/packages/lf20_fifomona.json"
          className="home--player"
        ></Player>
      </section>
    </div>
  );
};

export default About;
