import React from "react";
import { Route, Routes } from "react-router-dom";
import Error from "../components/error/Error.jsx";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop.jsx";
import Home from "../components/pages/Home.jsx";
import Wrapper from "../functions/errorWrapper/Wrapper.js";
import Projects from "../components/pages/Projects.jsx";
import Contact from "../components/pages/Contact.jsx";
import About from "../components/pages/About.jsx";
import Regular from "../components/pages/Regular.jsx";
import AdminProtectiveRouter from "./routeWrappers/AdminProtectiveRouter.js";
import AdminPannel from "../components/pages/AdminPannel.jsx";
const Routers = () => {
  return (
    <Wrapper
      children={
        <ScrollToTop
          children={
            <Routes
              children={
                <>
                  <Route path=/* link */ element={<Home />} />
                  <Route path=/* link */ element={<Projects />} />
                  <Route path=/* link */ element={<Contact />} />
                  <Route path=/* link */ element={<About />} />
                  <Route path="*" element={<Error />} />
                  <Route
                    path=/* link */
                    element={
                      <AdminProtectiveRouter children={<AdminPannel />} />
                    }
                  />
                </>
              }
            />
          }
        />
      }
    />
  );
};
export default Routers;
