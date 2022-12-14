import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { setCurrPage } from "../../context/features/Reducer";
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const [count, setCount] = useState(7);
  if (count > 0) {
    setTimeout(() => {
      setCount(count - 1);
    }, 1000);
  } else {
    setCount(10);
    resetErrorBoundary();
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrPage(6));
    // eslint-disable-next-line
  }, []);
  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center"
      style={{ height: "calc(100vh - 3.7rem)" }}
    >
      <Helmet>
        <title>Govind Bajaj - Error [500]</title>
        <meta name="Govind Bajaj Resume" content="Internal server error!" />
      </Helmet>
      <div role="alert" className="p-3" id="errorWrapper">
        <h4>Something went wrong:</h4>
        {count > 5 ? (
          count > 6 ? (
            <span style={{ color: "green" }}>Rendering Now...</span>
          ) : (
            <span style={{ color: "red" }}>Rendering Failed!</span>
          )
        ) : (
          <span style={{ color: "gray" }}>Retrying in {count}s...</span>
        )}
        <br />
        <Button
          onClick={resetErrorBoundary}
          color="error"
          variant="contained"
          size="small"
        >
          Try again Now
        </Button>
        <hr />
        <h2>{error.message}</h2>
      </div>
    </div>
  );
};
const Wrapper = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};

export default Wrapper;
