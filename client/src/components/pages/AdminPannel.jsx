import {
  Box,
  Button,
  Grid,
  TextField,
  CssBaseline,
  Switch,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setInfo,
  setInfoImage,
  setProjects,
} from "../../context/features/Reducer";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRef } from "react";
import dayjs from "dayjs";
import { DynamicSort } from "../../functions/sort/DynamicSort";
import CustomCard from "../../functions/cards/CustomCard";
import Resizer from "react-image-file-resizer";

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
const checkNullObj = (obj) => {
  let flag = false;
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== "") {
      flag = false;
    } else {
      flag = true;
      break;
    }
  }
  return flag;
};
const AdminPannel = () => {
  const dispatch = useDispatch();
  const projectRef = useRef(null);
  const info = useSelector((state) => state.Reducer.info);
  const initProject = {
    name: "",
    date: dayjs(Date.now()).format("YYYY-MM-DD"),
    desc: "",
    url: "",
  };
  let init = {
    name: info?.name,
    desc: info?.desc,
    about: info?.about,
    gitUserId: info?.gitUserId,
    languages: info?.languages,
    passcode: info?.passcode,
    emailJsServiceId: info?.emailJsServiceId,
    emailJsTemplateId: info?.emailJsTemplateId,
    emailJsPublicKey: info?.emailJsPublicKey,
  };
  let initLinks = JSON.parse(JSON.stringify(info?.links));
  const [edit, setEdit] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(init);
  const [updateLinks, setUpdateLinks] = useState(initLinks);
  const [file, setFile] = useState(null);
  const [inputContainsFile, setInputContainsFile] = useState(false);
  const [fileProject, setFileProject] = useState(null);
  const [inputContainsFileProject, setInputContainsFileProject] =
    useState(false);
  const [projectUpload, setProjectUpload] = useState(initProject);
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        280,
        280,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });
  // user data
  const handleFile = (event) => {
    setFile(event.target.files[0]);
    setInputContainsFile(true);
  };
  const handleUpload = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJh");
    const fd = new FormData();
    fd.append("image", await resizeFile(file), file.name);
    const res = await axios.post("/image/upload", fd, {
      headers: myHeaders,
      onUploadProgress: (progressEvent) => {
        let percent = Math.floor(progressEvent.progress * 100);
        swal({
          text: `Uploading Image... ${percent}%`,
          ...swalOptions,
        });
      },
    });
    let data = res.data;
    if (res.status === 200) {
      const req = {
        id: info?._id,
        updatedInfo: { image: data.id },
      };
      const reqUpdate = await axios.post("/info/update", req, {
        onUploadProgress: (progressEvent) => {
          let percent = Math.floor(progressEvent.progress * 100);
          swal({
            text: `Updating Data... ${percent}%`,
            ...swalOptions,
          });
        },
      });
      if (reqUpdate.status === 200) {
        dispatch(setInfoImage(data.id));
        setFile(null);
        setInputContainsFile(false);
      }
      swal.close();
    }
  };
  const handleUpdate = async () => {
    updateInfo.links = updateLinks;
    const req = {
      id: info?._id,
      updatedInfo: updateInfo,
    };
    const res = await axios.post("/info/update", req, {
      onUploadProgress: (progressEvent) => {
        let percent = Math.floor(progressEvent.progress * 100);
        swal({
          text: `Updating Data... ${percent}%`,
          ...swalOptions,
        });
      },
    });
    swal.close();
    if (res.status === 200) {
      dispatch(setInfo(res.data.info[0]));
      setEdit(false);
      const upInfo = res.data.info[0];
      init = {
        name: upInfo?.name,
        desc: upInfo?.desc,
        about: upInfo?.about,
        gitUserId: upInfo?.gitUserId,
        languages: upInfo?.languages,
        passcode: upInfo?.passcode,
        emailJsServiceId: upInfo?.emailJsServiceId,
        emailJsTemplateId: upInfo?.emailJsTemplateId,
        emailJsPublicKey: upInfo?.emailJsPublicKey,
      };
      initLinks = JSON.parse(JSON.stringify(upInfo?.links));
    }
    setUpdateInfo(init);
    setUpdateLinks(initLinks);
  };
  const handleReset = () => {
    setFile(null);
    setInputContainsFile(false);
  };
  // project data
  const handleFileProject = (event) => {
    setFileProject(event.target.files[0]);
    setInputContainsFileProject(true);
  };
  const handleProjectUpload = async () => {
    if (!checkNullObj(projectUpload) && fileProject) {
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJh");
      const fd = new FormData();
      fd.append("image", await resizeFile(fileProject), fileProject.name);
      const res = await axios.post("/image/upload", fd, {
        headers: myHeaders,
        onUploadProgress: (progressEvent) => {
          let percent = Math.floor(progressEvent.progress * 100);
          swal({
            text: `Uploading Image... ${percent}%`,
            ...swalOptions,
          });
        },
      });
      if (res.status === 200) {
        const data = res.data;
        projectUpload.image = data.id;
        const reqUpload = await axios.post("/project/create", projectUpload, {
          onUploadProgress: (progressEvent) => {
            let percent = Math.floor(progressEvent.progress * 100);
            swal({
              text: `Creating New Project... ${percent}%`,
              ...swalOptions,
            });
          },
        });
        if (reqUpload.status === 200) {
          dispatch(setProjects(reqUpload.data.projects));
          setFileProject(null);
          setInputContainsFileProject(false);
          setProjectUpload({
            name: "",
            date: new Date(),
            desc: "",
            url: "",
          });
        }
        swal.close();
      }
    } else {
      swal({
        icon: "warning",
        text: `Missing Arguments`,
        timer: 2000,
        ...swalOptions,
      });
    }
  };
  const handleProjectReset = () => {
    setProjectUpload({
      name: "",
      date: dayjs(Date.now()).format("YYYY-MM-DD"),
      desc: "",
      url: "",
    });
    setFileProject(null);
    setInputContainsFileProject(false);
  };
  const handleScroll = (ref) => {
    ref.current?.scrollIntoView({
      top: ref.current?.getBoundingClientRect().top + window.pageYOffset,
      behavior: "smooth",
    });
  };
  const projectArr = JSON.parse(
    JSON.stringify(useSelector((state) => state.Reducer.projects))
  );
  projectArr.sort(DynamicSort("date", true));
  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />
      <div className="admin--container">
        <div className="admin--wrapper">
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={1.5} sx={{ my: 3 }}>
              <Grid item xs={12} sx={{ display: "grid", placeItems: "center" }}>
                <img
                  src={`/image/${info?.image}`}
                  alt={info?.name + "image"}
                  style={{ padding: "1rem" }}
                  className="round-img"
                />
              </Grid>
              <Grid item xs={12} sx={{ display: "grid", placeItems: "center" }}>
                {inputContainsFile ? (
                  <div style={{ display: "flex" }}>
                    <Button onClick={handleReset} color="error">
                      cancel
                    </Button>
                    <Button onClick={handleUpload}>Update</Button>
                  </div>
                ) : (
                  <Button variant="contained" component="label">
                    upload new image
                    <input
                      accept=".png,.jpg,.jpeg,.gif"
                      type="file"
                      onChange={handleFile}
                      name="file"
                      id="admin-file"
                      hidden
                    />
                  </Button>
                )}
              </Grid>
            </Grid>
            <hr style={{ color: "white", height: "5px" }} />
            <Grid container sx={{ my: 2 }}>
              <Grid item xs={6} sx={{ display: "grid", placeItems: "center" }}>
                <Button
                  color="warning"
                  sx={{ width: "70%" }}
                  onClick={() => {
                    if (edit) {
                      setEdit(false);
                      setUpdateInfo(init);
                      setUpdateLinks(initLinks);
                    } else {
                      setEdit(true);
                    }
                  }}
                >
                  {edit ? "cancel" : "edit"}
                </Button>
              </Grid>
              <Grid item xs={6} sx={{ display: "grid", placeItems: "center" }}>
                <Button
                  sx={{ width: "70%" }}
                  color="success"
                  disabled={!edit}
                  onClick={handleUpdate}
                >
                  update
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ display: "grid", placeItems: "center" }}>
                <Button
                  color="info"
                  onClick={() => {
                    handleScroll(projectRef);
                  }}
                >
                  Create New Project
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={1.5}>
              <Grid item xs={12}>
                <TextField
                  disabled={!edit}
                  onChange={(e) => {
                    setUpdateInfo({
                      ...updateInfo,
                      ...{ name: e.target.value },
                    });
                  }}
                  required
                  fullWidth
                  value={updateInfo?.name}
                  id="name"
                  label="Update Name"
                  name="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    setUpdateInfo({
                      ...updateInfo,
                      ...{ desc: e.target.value },
                    });
                  }}
                  disabled={!edit}
                  required
                  inputProps={{ maxLength: 50 }}
                  value={updateInfo?.desc}
                  fullWidth
                  id="desc"
                  label={`Update Desc (${updateInfo?.desc?.length}/50)`}
                  name="desc"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    setUpdateInfo({
                      ...updateInfo,
                      ...{ about: e.target.value },
                    });
                  }}
                  disabled={!edit}
                  required
                  multiline
                  rows={3}
                  fullWidth
                  value={updateInfo?.about}
                  inputProps={{ maxLength: 400 }}
                  id="about"
                  label={`Update About (${updateInfo?.about?.length}/400)`}
                  name="about"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    setUpdateInfo({
                      ...updateInfo,
                      ...{ languages: e.target.value.split(",") },
                    });
                  }}
                  disabled={!edit}
                  required
                  multiline
                  rows={2}
                  fullWidth
                  value={updateInfo?.languages}
                  id="languages"
                  label="Update Languages"
                  name="languages"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    setUpdateInfo({
                      ...updateInfo,
                      ...{ gitUserId: e.target.value },
                    });
                  }}
                  disabled={!edit}
                  required
                  fullWidth
                  value={updateInfo?.gitUserId}
                  id="gitUserId"
                  label="Update GitHub UserId"
                  name="gitUserId"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    setUpdateInfo({
                      ...updateInfo,
                      ...{ emailJsServiceId: e.target.value },
                    });
                  }}
                  disabled={!edit}
                  required
                  fullWidth
                  value={updateInfo?.emailJsServiceId}
                  id="emailJsServiceId"
                  label="Update EmailJs Service Id"
                  name="emailJsServiceId"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    setUpdateInfo({
                      ...updateInfo,
                      ...{ emailJsTemplateId: e.target.value },
                    });
                  }}
                  disabled={!edit}
                  required
                  fullWidth
                  value={updateInfo?.emailJsTemplateId}
                  id="emailJsTemplateId"
                  label="Update EmailJs Template Id"
                  name="emailJsTemplateId"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    setUpdateInfo({
                      ...updateInfo,
                      ...{ emailJsPublicKey: e.target.value },
                    });
                  }}
                  disabled={!edit}
                  required
                  fullWidth
                  value={updateInfo?.emailJsPublicKey}
                  id="emailJsPublicKey"
                  label="Update EmailJs Public Key"
                  name="emailJsPublicKey"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    setUpdateInfo({
                      ...updateInfo,
                      ...{ passcode: e.target.value.toString() },
                    });
                  }}
                  disabled={!edit}
                  required
                  inputProps={{ maxLength: 4 }}
                  type="number"
                  fullWidth
                  value={updateInfo?.passcode}
                  id="passcode"
                  label={`Update Passcode (${updateInfo?.passcode?.length}/4)`}
                  name="passcode"
                />
              </Grid>
            </Grid>
            <Typography sx={{ m: 2, fontWeight: "bolder", fontSize: "1.5rem" }}>
              Links
            </Typography>
            {updateLinks?.map((link, index) => {
              return (
                <div key={`adminLinks--${index}-${link._id}`}>
                  <hr style={{ color: "white", height: "5px" }} />
                  <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                      <TextField
                        disabled={true}
                        required
                        fullWidth
                        value={link.name}
                        id={`${link._id}--name`}
                        label="Name"
                        name={`${link._id}--name`}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        disabled={!edit}
                        onChange={(e) => {
                          let l = e.target.value;
                          if (link.name === "Resume") {
                            l = l
                              .split("https://drive.google.com/file/d/")[1]
                              .split("/view?usp=sharing")[0];
                            link.link = `https://drive.google.com/u/0/uc?id=${l}&export=download`;
                          } else {
                            link.link = l;
                          }
                          setUpdateLinks([...updateLinks]);
                        }}
                        required
                        fullWidth
                        value={link.link}
                        id={`${link._id}--link`}
                        label="Update Link"
                        name={`${link._id}--link`}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        labelPlacement="start"
                        control={
                          <Switch
                            disabled={!edit || link.name === "Resume"}
                            onChange={() => {
                              link.show = !link.show;
                              setUpdateLinks([...updateLinks]);
                            }}
                            checked={link.show}
                            id={`${link._id}--show`}
                            name={`${link._id}--show`}
                          />
                        }
                        label={`Show`}
                      />
                    </Grid>
                  </Grid>
                </div>
              );
            })}
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={6} sx={{ display: "grid", placeItems: "center" }}>
                <Button
                  color="warning"
                  sx={{ width: "70%" }}
                  onClick={() => {
                    if (edit) {
                      setEdit(false);
                      setUpdateInfo(init);
                      setUpdateLinks(initLinks);
                    } else {
                      setEdit(true);
                    }
                  }}
                >
                  {edit ? "cancel" : "edit"}
                </Button>
              </Grid>
              <Grid item xs={6} sx={{ display: "grid", placeItems: "center" }}>
                <Button
                  sx={{ width: "70%" }}
                  color="success"
                  disabled={!edit}
                  onClick={handleUpdate}
                >
                  update
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>
        <div className="admin--wrapper" ref={projectRef}>
          <Box>
            <Grid container spacing={1.5}>
              <Grid item xs={12}>
                <Typography component="div" variant="h5">
                  Create New Project
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button component="label">
                  {inputContainsFileProject ? "Change image" : "upload image"}
                  <input
                    accept=".png,.jpg,.jpeg,.gif"
                    type="file"
                    onChange={handleFileProject}
                    name="file"
                    id="admin-file"
                    hidden
                  />
                </Button>
                {fileProject ? fileProject.name : "No image uploaded"}
                <Typography></Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="project--name"
                  label="Enter Name"
                  name="project--name"
                  value={projectUpload.name}
                  onChange={(e) => {
                    setProjectUpload({
                      ...projectUpload,
                      ...{ name: e.target.value },
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disableFuture
                    label="Enter Date"
                    openTo="day"
                    views={["year", "month", "day"]}
                    value={projectUpload.date}
                    inputFormat="YYYY-MM-DD"
                    onChange={(newValue) => {
                      setProjectUpload({
                        ...projectUpload,
                        ...{ date: dayjs(newValue).format("YYYY-MM-DD") },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth id="project--date" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="project--url"
                  label="Enter Url"
                  name="project--url"
                  value={projectUpload.url}
                  onChange={(e) => {
                    setProjectUpload({
                      ...projectUpload,
                      ...{ url: e.target.value },
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  value={projectUpload.desc}
                  onChange={(e) => {
                    setProjectUpload({
                      ...projectUpload,
                      ...{ desc: e.target.value },
                    });
                  }}
                  rows={2}
                  inputProps={{
                    maxLength: 160,
                  }}
                  id="project--desc"
                  label={`Enter Description (${projectUpload.desc.length}/160)`}
                  name="project--desc"
                />
              </Grid>
            </Grid>
            <Grid container sx={{ my: 2 }}>
              <Grid item xs={6} sx={{ display: "grid", placeItems: "center" }}>
                <Button
                  color="warning"
                  sx={{ width: "70%" }}
                  onClick={handleProjectReset}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item xs={6} sx={{ display: "grid", placeItems: "center" }}>
                <Button
                  sx={{ width: "70%" }}
                  color="success"
                  onClick={handleProjectUpload}
                >
                  create
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>
        <div className="admin--wrapper">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            {projectArr.length === 0 ? (
              <h3 align="center" style={{ color: "red", paddingBlock: "2rem" }}>
                No Projects!
              </h3>
            ) : (
              projectArr?.map((project) => {
                return (
                  <CustomCard
                    key={`adminProject-${project?._id}`}
                    id={project?._id}
                    img={`/image/${project?.image}`}
                    date={project?.date}
                    name={project?.name}
                    desc={project?.desc}
                    link={project?.url}
                    del={true}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminPannel;
