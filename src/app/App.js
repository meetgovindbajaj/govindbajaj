import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBarFocusFalse,
  setBarOpenFalse,
  setGithubRepos,
  setInfo,
  setInitLoadingFalse,
  setInitLoadingTrue,
  setProjects,
  setWidth,
} from "../context/features/Reducer";
import Layout from "../layout/Layout";
import Routers from "../routes/Routes";
import swal from "sweetalert";
const swalOptions = {
  buttons: false,
  closeOnEsc: false,
  closeOnClickOutside: false,
};
const App = () => {
  const dispatch = useDispatch();
  const barOpen = useSelector((state) => state.Reducer.barOpen);
  const width = useSelector((state) => state.Reducer.width);
  const info = useSelector((state) => state.Reducer.info);
  window.onresize = () => {
    dispatch(setWidth());
    if (width > 1200 && barOpen) {
      const navbarMain = document.querySelector(".navbar--main");
      dispatch(setBarOpenFalse());
      dispatch(setBarFocusFalse());
      navbarMain.setAttribute("data-visible", "false");
    }
  };
  ScreenOrientation.onchange = () => {
    dispatch(setWidth());
    if (width > 1200 && barOpen) {
      const navbarMain = document.querySelector(".navbar--main");
      dispatch(setBarOpenFalse());
      dispatch(setBarFocusFalse());
      navbarMain.setAttribute("data-visible", "false");
    }
  };
  const InfoController = new AbortController();
  const ProjectController = new AbortController();
  const getInfo = async () => {
    dispatch(setInitLoadingTrue());
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/api/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: InfoController.signal,
      });
      const serverResponse = await res.json();
      if (serverResponse?.error === false) {
        dispatch(setInfo(serverResponse?.info[0]));
      }
    } catch (error) {
      // swal({
      //   icon: "warning",
      //   text: "Server Not Responding!",
      //   timer: 2000,
      //   ...swalOptions,
      // });
    }
    dispatch(setInitLoadingFalse());
  };
  const getProjects = async () => {
    dispatch(setInitLoadingTrue());
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/api/project`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: ProjectController.signal,
      });
      const serverResponse = await res.json();
      if (serverResponse?.error === false) {
        dispatch(setProjects(serverResponse?.projects));
        const api = await fetch(
          `https://api.github.com/users/${info?.gitUserId}/repos`
        );
        const data = await api.json();
        let repos = [],
          obj = {};
        for (let i of data) {
          obj = {
            name: i.name,
            date: i.created_at.split("T")[0],
            link: i.html_url,
            id: i.id,
          };
          repos.push(obj);
        }
        dispatch(setGithubRepos(repos));
      }
    } catch (error) {
      // swal({
      //   icon: "warning",
      //   text: "Server Not Responding!",
      //   timer: 2000,
      //   ...swalOptions,
      // });
    }
    dispatch(setInitLoadingFalse());
  };
  useEffect(() => {
    getInfo();
    return () => {
      InfoController.abort();
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getProjects();
    return () => {
      ProjectController.abort();
    }; // eslint-disable-next-line
  }, [info]);

  return <Layout children={<Routers />} />;
};

export default App;
