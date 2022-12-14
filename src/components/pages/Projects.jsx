import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import CustomCard from "../../functions/cards/CustomCard";
import { setCurrPage } from "../../context/features/Reducer";
import { DynamicSort } from "../../functions/sort/DynamicSort";
import Loader from "./Loader";
const Projects = () => {
  const dispatch = useDispatch();
  const githubRepos = useSelector((state) => state.Reducer.githubRepos);
  const initLoading = useSelector((state) => state.Reducer.initLoading);
  const projects = useSelector((state) => state.Reducer.projects);
  useEffect(() => {
    dispatch(setCurrPage(2));
    // eslint-disable-next-line
  }, []);
  let arr = [],
    projectArr = [];
  Object.assign(arr, githubRepos);
  Object.assign(projectArr, projects);
  arr.sort(DynamicSort("date", true));
  projectArr.sort(DynamicSort("date", true));
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
    <div className="project--container p-2">
      <Helmet>
        <title>Govind Bajaj - Projects</title>
        <meta name="Govind Bajaj Resume" content="Projects" />
      </Helmet>
      <Loader link="https://assets6.lottiefiles.com/packages/lf20_w51pcehl.json" />
      <div className="git--container">
        <div align="center" className="text-white fw-bolder my-3">
          <h1>My Projects</h1>
        </div>
        <div className="d-flex flex-wrap align-items-center justify-content-center">
          {projectArr.length === 0 ? (
            <h3 align="center" style={{ color: "red", paddingBlock: "2rem" }}>
              No Projects!
            </h3>
          ) : (
            projectArr?.map((project) => {
              return (
                <CustomCard
                  key={`project-${project?._id}`}
                  id={project?._id}
                  img={`${process.env.REACT_APP_SERVER}/api/image/${project?.image}`}
                  date={project?.date}
                  name={project?.name}
                  desc={project?.desc}
                  link={project?.url}
                />
              );
            })
          )}
        </div>
      </div>
      <div className="git--container">
        <div align="center" className="text-white fw-bolder">
          <h1>Github Repositories</h1>
        </div>

        <div className="d-flex flex-wrap align-items-center justify-content-center">
          {arr.length === 0 ? (
            <h3 align="center" style={{ color: "red", paddingBlock: "2rem" }}>
              No Data!
            </h3>
          ) : (
            arr?.map((project) => {
              return (
                <CustomCard
                  key={`gitrep-${project.id}`}
                  date={project.date}
                  name={project.name}
                  link={project.link}
                  github={true}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
