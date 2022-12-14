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
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/test" element={<Regular />} />
                  <Route path="*" element={<Error />} />
                  <Route
                    path="/admin"
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
