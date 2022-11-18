import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { setProjects } from "../../context/features/Reducer";
const swalOptions = {
  buttons: false,
  closeOnEsc: false,
  closeOnClickOutside: false,
};
const CustomCard = ({
  id,
  img,
  date,
  name,
  desc,
  link = "about:blank",
  github = false,
  del = false,
}) => {
  const dispatch = useDispatch();
  const onClick = () => {
    window.open(link);
  };
  const handleDelete = async () => {
    const reqDel = await axios.post(
      "/project/delete",
      { id },
      {
        onUploadProgress: () => {
          swal({
            text: "Deleting Project...",
            ...swalOptions,
          });
        },
      }
    );
    if (reqDel.status === 200) {
      swal({
        icon: "success",
        text: "Project Deleted",
        timer: 2000,
        ...swalOptions,
      });
      dispatch(setProjects(reqDel.data.projects));
    } else {
      swal({
        icon: "error",
        text: "Internal Server Error",
        timer: 2000,
        ...swalOptions,
      });
    }
  };
  return (
    <div
      className="card--container"
      style={{ cursor: del ? "default" : "pointer" }}
      onClick={!del ? onClick : () => {}}
    >
      {!github && (
        <section className="card--img-wrapper">
          <img
            className="card--img"
            width="100%"
            height="100%"
            src={img}
            alt={name}
          />
        </section>
      )}

      <section className="card--name">{name}</section>
      <div className="card--hr" />
      <section className="card--date">{date}</section>
      {!github && (
        <>
          <div className="card--hr" />
          <section className="card--desc">{desc}</section>
        </>
      )}

      {!github && del && (
        <>
          <div className="card--hr" />
          <section className="card--date">{link}</section>
          <div className="card--hr" />
          <Button onClick={handleDelete}>delete</Button>
        </>
      )}
    </div>
  );
};

export default CustomCard;
