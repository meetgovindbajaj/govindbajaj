import React, { useEffect } from "react";
import BackButtonAbs from "../../functions/buttons/BackButtonAbs";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { setCurrPage } from "../../context/features/Reducer";
const ErrorPage = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrPage(5));
    // eslint-disable-next-line
  }, []);
  return (
    <section id="error-page">
      <Helmet>
        <title>Govind Bajaj - Error [404]</title>
        <meta name="Govind Bajaj Resume" content="Page not found" />
      </Helmet>
      <BackButtonAbs onClick={onClick} top="0" left="0" />
      <div className="glitch">
        <span aria-hidden="true">PAGE NOT FOUND</span>
        PAGE NOT FOUND
        <span aria-hidden="true">PAGE NOT FOUND</span>
      </div>
    </section>
  );
};

export default ErrorPage;
