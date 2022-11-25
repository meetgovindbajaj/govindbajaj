const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { deleteImage } = require("../utils/gridFs");
router.get(/* link */, async (req, res) => {
  try {
    const projects = await Project.find({});
    if (projects) {
      return res
        .status(200)
        .json({ status: 200, error: false, message: "success", projects });
    }
    return res
      .status(404)
      .json({ status: 404, error: true, message: "failed", projects: [] });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: true, message: error, projects: [] });
  }
});
router.post(/* link */, async (req, res) => {
  try {
    const newProject = req.body;
    const createNewProject = new Project(newProject);
    const saveProject = await createNewProject.save();
    if (saveProject) {
      const getProjects = await Project.find({});
      if (getProjects) {
        return res.status(200).json({
          status: 200,
          error: false,
          message: "success",
          projects: getProjects,
        });
      } else {
        return res
          .status(403)
          .json({ status: 403, error: true, message: "failed", projects: [] });
      }
    }
    return res
      .status(404)
      .json({ status: 404, error: true, message: "failed", projects: [] });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: true, message: error, projects: [] });
  }
});
router.post(/* link */, async (req, res) => {
  const { id } = req.body;
  try {
    const projectInfo = await Project.findById(id);
    deleteImage(projectInfo.image);
    const delProject = await projectInfo.deleteOne();
    if (delProject) {
      const getProjects = await Project.find({});
      if (getProjects) {
        return res.status(200).json({
          status: 200,
          error: false,
          message: "success",
          projects: getProjects,
        });
      } else {
        return res
          .status(403)
          .json({ status: 403, error: true, message: "failed", projects: [] });
      }
    } else {
      return res
        .status(404)
        .json({ status: 404, error: true, message: "failed", projects: [] });
    }
  } catch (error) {
    console.log(` -------------------------------------------------------`);
    console.log(`file: Project.js : line 75 : router.post : error`, error);
    console.log(` -------------------------------------------------------`);
    return res
      .status(500)
      .json({ status: 500, error: true, message: error, projects: [] });
  }
});
module.exports = router;
