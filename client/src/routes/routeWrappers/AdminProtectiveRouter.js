import { Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import AuthCode from "react-auth-code-input";
import AuthCodeRef from "react-auth-code-input";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrPage,
  setIsAdminAuthFalse,
  setIsAdminAuthTrue,
} from "../../context/features/Reducer";
const header = {
  1: {
    headerColor: "white",
    headerText: "Enter Password",
  },
  2: {
    headerColor: "red",
    headerText: "Enter Correct Password!",
  },
  3: {
    headerColor: "orange",
    headerText: "Server Not Responding! Try Again Later.",
  },
  4: {
    headerColor: "cyan",
    headerText: "Verifying...",
  },
};
const AdminProtectiveRouter = ({ children }) => {
  const dispatch = useDispatch();
  const isAdminAuth = useSelector((state) => state.Reducer.isAdminAuth);
  const info = useSelector((state) => state.Reducer.info);
  const [headerInfo, setHeaderInfo] = useState(header[1]);
  const [checking, setChecking] = useState(false);
  const AuthInputRef = useRef(AuthCodeRef);
  const [result, setResult] = useState();
  const controller = new AbortController();
  useEffect(() => {
    dispatch(setCurrPage(isAdminAuth ? 7 : 8));
    // eslint-disable-next-line
  }, [isAdminAuth]);
  const checkPassword = async () => {
    setHeaderInfo(header[4]);
    setChecking(true);
    try {
      const res = await fetch("/info/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          passcode: result,
        }),
      });
      const serverRes = await res.json();
      if (serverRes.error === false) {
        AuthInputRef.current?.clear();
        setHeaderInfo(header[1]);
        dispatch(setIsAdminAuthTrue());
      } else {
        document.getElementsByClassName("otp--container")[0].style.outline =
          "3px solid red";
        setHeaderInfo(header[2]);
        dispatch(setIsAdminAuthFalse());
      }
    } catch (error) {
      document.getElementsByClassName("otp--container")[0].style.outline =
        "3px solid orange";
      setHeaderInfo(header[3]);
      dispatch(setIsAdminAuthFalse());
    }
    setChecking(false);
  };
  const handleOnChange = (res) => {
    setResult(res);
  };
  return (
    <>
      <Helmet>
        <title>{info?.name ?? "Govind Bajaj"} - Admin</title>
        <meta name="Govind Bajaj Admin" content="Protective Route" />
      </Helmet>
      {isAdminAuth ? (
        children
      ) : (
        <div
          className="admin--auth"
          onKeyUpCapture={(e) => {
            if (e.key === "Enter" && result?.length === 4) {
              checkPassword();
            }
          }}
        >
          <h2 style={{ color: headerInfo.headerColor }}>
            {headerInfo.headerText}
          </h2>
          <AuthCode
            id="otp-box"
            allowedCharacters="numeric"
            containerClassName="otp--container"
            inputClassName="otp--input"
            ariaLabel="adminPassword"
            disabled={checking}
            length={4}
            onChange={handleOnChange}
            ref={AuthInputRef}
          />
          <div>
            <Button
              color="error"
              disabled={
                result || checking
                  ? result.length !== 0
                    ? checking
                      ? true
                      : false
                    : true
                  : true
              }
              onClick={() => {
                AuthInputRef.current?.clear();
                document.getElementsByClassName(
                  "otp--container"
                )[0].style.outline = "3px solid gray";
                setHeaderInfo(header[1]);
              }}
            >
              Reset
            </Button>
            <Button
              color="success"
              disabled={
                result
                  ? result.length === 4
                    ? checking
                      ? true
                      : false
                    : true
                  : true
              }
              onClick={checkPassword}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProtectiveRouter;
