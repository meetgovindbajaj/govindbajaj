const express = require("express");
const router = express.Router();
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Info = require("../models/Info");
const uploadMiddleware = require("../middlewares/upload");
dotenv.config({
  path: "./config.env",
});
const DB = process.env.DATABASE;
const deleteImage = (id) => {
  if (!id || id === "undefined") return res.status(400).send("no image id");
  const _id = new mongoose.Types.ObjectId(id);
  console.log("deleting image ", id);
  gfs.delete(_id, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
// @routes configuring Grid File System Storage
Grid.mongo = mongoose.mongo;
let gfs;
const conn = mongoose.createConnection(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "photos",
  });
});

// @routes upload file
router.post(/* link */, uploadMiddleware, async (req, res) => {
  try {
    const { file } = req;
    const { id } = file;
    if (file.size > 5000000) {
      deleteImage(id);
      return res.status(400).json({
        status: 400,
        error: true,
        message: "image must not exceed 5mb",
        id: "",
      });
    }
    return res.status(200).json({
      status: 200,
      error: false,
      message: "image uploaded successfully",
      id: file.id,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      error: true,
      message: "error uploading file",
      id: "",
    });
  }
});

// @routes delete file
router.get(/* link */, async (req, res) => {
  try {
    if (!req.params.id || req.params.id === "undefined")
      return res.status(400).json({ status: 400, message: "no image id" });
    const _id = new mongoose.Types.ObjectId(req.params.id);
    gfs.delete(_id, (err) => {
      if (err)
        return res
          .status(500)
          .json({ status: 500, error: true, message: "image deletion error" });
      else
        return res.status(200).json({
          status: 200,
          error: false,
          message: "image deleted successfully",
        });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: true, message: "image deletion error" });
  }
});
// @routes render file
router.get(/* link */, async ({ params: { id } }, res) => {
  try {
    if (!id || id === "undefined")
      return res
        .status(400)
        .json({ status: 400, error: true, message: "no image id" });
    const _id = new mongoose.Types.ObjectId(id);
    gfs.find({ _id }).toArray((err, files) => {
      if (!files || files.length === 0)
        return res
          .status(400)
          .json({ status: 400, error: true, message: "no files exist" });
      gfs.openDownloadStream(_id).pipe(res);
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: 400, error: true, message: "no files exist" });
  }
});
module.exports = router;
