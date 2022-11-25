import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Fab, Box, Slide, useScrollTrigger, Fade } from "@mui/material";
import {
  Close as CloseIcon,
  Menu as MenuIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBarFocusFalse,
  setBarFocusTrue,
  setBarOpenFalse,
  setBarOpenTrue,
} from "../../context/features/Reducer";
const HideOnScroll = ({ children, window, width, barOpen }) => {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide
      appear={false}
      direction="down"
      in={width <= 1200 && barOpen ? true : !trigger}
    >
      {children}
    </Slide>
  );
};
HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
  width: PropTypes.number,
  barOpen: PropTypes.bool,
};
const ScrollTop = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );
    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };
  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}
      >
        {children}
      </Box>
    </Fade>
  );
};
ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
const NewNavbarPanel = () => {
  const width = useSelector((state) => state.Reducer.width);
  const barOpen = useSelector((state) => state.Reducer.barOpen);
  const barFocus = useSelector((state) => state.Reducer.barFocus);
  const currPage = useSelector((state) => state.Reducer.currPage);
  const dispatch = useDispatch();
  const handleToggle = () => {
    if (width <= 1200) {
      const navbarMain = document.querySelector(".navbar--main");
      const visible = navbarMain.getAttribute("data-visible");
      navbarMain.setAttribute(
        "data-visible",
        visible === "true" ? "false" : "true"
      );
      dispatch(visible === "true" ? setBarOpenFalse() : setBarOpenTrue());
      dispatch(visible === "true" ? setBarFocusFalse() : setBarFocusTrue());
    }
  };
  useEffect(() => {
    if (!barFocus && barOpen) {
      handleToggle();
    }
    // eslint-disable-next-line
  }, [barFocus]);
  return (
    <>
      <div
        id="back-to-top-anchor"
        aria-hidden="true"
        className="visually-hidden"
      ></div>
      <HideOnScroll width={width} barOpen={barOpen}>
        <div
          id="navbar"
          className="d-flex align-items-center justify-content-between"
          onClick={() => {
            if (width <= 1200 && !barFocus) {
              dispatch(setBarFocusTrue());
            }
          }}
        >
          <section className="navbar--logo">
            <NavLink style={NavHeaderStyle}>{currPage}</NavLink>
          </section>
          {width <= 1200 && (
            <Button
              aria-controls="navbar--mainMenu"
              area-expanded="false"
              sx={mobileNavButtonStyle}
              size="medium"
              onClick={handleToggle}
            >
              <span className="sr-only">menu</span>
              {barOpen ? (
                <CloseIcon sx={{ color: "white" }} />
              ) : (
                <MenuIcon sx={{ color: "white" }} />
              )}
            </Button>
          )}

          <section
            className="navbar--main"
            id="navbar--mainMenu"
            data-visible="false"
          >
            <ul className="d-flex align-items-center">
              <li>
                <NavLink onClick={handleToggle} to={/* link */}>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleToggle} to={/* link */}>
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleToggle} to={/* link */}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleToggle} to={/* link */}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </section>
        </div>
      </HideOnScroll>
      <ScrollTop>
        <Fab
          size="small"
          aria-label="scroll back to top"
          sx={{
            background: "var(--smoke-black)",
            color: "white",
            backdropFilter: "var(--blur-5)",
            ":hover": {
              background: "var(--smoke-black)",
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};
const mobileNavButtonStyle = {
  zIndex: 99999,
};
const NavHeaderStyle = {
  textDecoration: "none",
  fontWeight: "700",
  color: "white",
  fontSize: "1.5rem",
};
export default NewNavbarPanel;
