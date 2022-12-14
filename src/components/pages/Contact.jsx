import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { setCurrPage } from "../../context/features/Reducer";
import emailjs from "@emailjs/browser";
import Loader from "./Loader";
import {
  CssBaseline,
  Grid,
  TextField,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import swal from "sweetalert";
import CustomIconButton from "../../functions/buttons/CustomIconButton";
import { VscGithubInverted as GithubIcon } from "react-icons/vsc";
import {
  RiInstagramFill as InstaIcon,
  RiWhatsappFill as WappIcon,
} from "react-icons/ri";
import { BsLinkedin as LinkedinIcon } from "react-icons/bs";
import { MdDownloadForOffline as DownloadIcon } from "react-icons/md";
import { SiGmail as GmailIcon } from "react-icons/si";

const DarkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const swalOptions = {
  buttons: false,
  closeOnEsc: false,
  closeOnClickOutside: false,
};
const iconList = {
  GitHub: <GithubIcon />,
  LinkedIn: <LinkedinIcon />,
  Instagram: <InstaIcon />,
  Gmail: <GmailIcon />,
  WhatsApp: <WappIcon />,
  Resume: <DownloadIcon />,
};
const Contact = () => {
  const dispatch = useDispatch();
  const form = useRef();
  useEffect(() => {
    dispatch(setCurrPage(4));
    // eslint-disable-next-line
  }, []);
  const info = useSelector((state) => state.Reducer.info);
  const initLoading = useSelector((state) => state.Reducer.initLoading);
  useEffect(() => {
    if (initLoading) {
      document.getElementById("loader").style.clipPath =
        "circle(100% at 50% 50%)";
    } else {
      document.getElementById("loader").style.clipPath =
        "circle(0% at 50% 50%)";
    }
  }, [initLoading]);
  const sendEmail = async (e) => {
    e.preventDefault();
    swal({
      text: "Sending Email...",
      ...swalOptions,
    });
    const send = await emailjs.sendForm(
      info?.emailJsServiceId,
      info?.emailJsTemplateId,
      form.current,
      info?.emailJsPublicKey
    );
    if (send.status === 200) {
      swal({
        icon: "success",
        text: "Email Sent",
        timer: 2000,
        ...swalOptions,
      });
    } else {
      swal({
        icon: "error",
        text: "Internal Server Error!",
        timer: 2000,
        ...swalOptions,
      });
    }
  };
  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />
      <div className="contact--container">
        <Helmet>
          <title>Govind Bajaj - Contact</title>
          <meta name="Govind Bajaj Resume" content="Contact Me" />
        </Helmet>
        <Loader link="https://assets1.lottiefiles.com/packages/lf20_wcuzj8fl.json" />
        <div className="contact-left">
          <Typography
            component="h1"
            variant="h5"
            className="fw-bold text-center"
          >
            Send Me Email
          </Typography>
          <Box
            sx={{ mt: 3 }}
            component="form"
            id="contact-form"
            ref={form}
            onSubmit={sendEmail}
          >
            <Grid container spacing={1.5}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="user_name"
                  label="Enter Name"
                  name="user_name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="user_email"
                  label="Enter Email"
                  name="user_email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  multiline
                  rows={4}
                  fullWidth
                  id="user_message"
                  label="Enter Message"
                  name="user_message"
                />
              </Grid>
              <Grid item xs={6} sx={{ display: "grid", placeItems: "center" }}>
                <Button color="error" sx={{ width: "70%" }} type="reset">
                  Reset
                </Button>
              </Grid>
              <Grid item xs={6} sx={{ display: "grid", placeItems: "center" }}>
                <Button sx={{ width: "70%" }} color="success" type="submit">
                  send
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>
        <div className="contact-right">
          <Typography
            component="h1"
            variant="h5"
            className="fw-bold text-center my-2"
          >
            Other Pages
          </Typography>
          <div className="contact-right-icons">
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
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Contact;
