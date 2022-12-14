import React, { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Chip } from "@mui/material";
import { VscGithubInverted as GithubIcon } from "react-icons/vsc";
import {
  RiInstagramFill as InstaIcon,
  RiWhatsappFill as WappIcon,
} from "react-icons/ri";
import { BsLinkedin as LinkedinIcon } from "react-icons/bs";
import { MdDownloadForOffline as DownloadIcon } from "react-icons/md";
import { SiGmail as GmailIcon } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { setCurrPage } from "../../context/features/Reducer";
import { Helmet } from "react-helmet";
import CustomIconButton from "../../functions/buttons/CustomIconButton";
import Loader from "./Loader";
const iconList = {
  GitHub: <GithubIcon />,
  LinkedIn: <LinkedinIcon />,
  Instagram: <InstaIcon />,
  Gmail: <GmailIcon />,
  WhatsApp: <WappIcon />,
  Resume: <DownloadIcon />,
};
const Home = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.Reducer.info);
  const initLoading = useSelector((state) => state.Reducer.initLoading);
  useEffect(() => {
    dispatch(setCurrPage(1));
    // eslint-disable-next-line
  }, []);
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
    <div className="home--container">
      <Loader />
      <Helmet>
        <title>{info?.name ?? "Govind Bajaj"}</title>
        <meta name="Govind Bajaj Resume" content="Profile" />
      </Helmet>
      <section className="home--section-left">
        <div className="home--section-left-top">
          <section className="home--section-left-img">
            {info?.image && (
              <img
                src={`/api/image/${info?.image}`}
                alt={info?.name}
                className="round-img"
              />
            )}
          </section>
          <section className="home--section-left-body">
            <div className="home--section-left-body-name">{info?.name}</div>
            <div className="home--section-left-body-desc">{info?.desc}</div>
            <div className="home--section-left-body-lang">
              {info?.languages?.map((ele, index) => {
                return (
                  <Chip
                    key={`langs${index}`}
                    sx={{
                      color: "white",
                      background: "var(--smoke-light)",
                      m: 0.5,
                    }}
                    label={ele}
                  />
                );
              })}
            </div>
          </section>
        </div>
        <div className="home--section-left-down">
          {info?.links
            ?.filter((link) => link.show !== false)
            .map((link) => {
              return (
                <CustomIconButton
                  key={link?._id}
                  children={iconList[link?.name]}
                  title={link?.helperText}
                  link={link?.link}
                />
              );
            })}
        </div>
      </section>
      <section className="home--section-right">
        <Player
          autoplay
          loop
          src="https://assets2.lottiefiles.com/private_files/lf30_obidsi0t.json"
          className="home--player"
        ></Player>
      </section>
    </div>
  );
};
export default Home;
