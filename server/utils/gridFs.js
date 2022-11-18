const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const p = require("./P");
dotenv.config({
  path: "./config.env",
});
const DB = process.env.DATABASE;

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

const deleteImage = (id) => {
  p(`deleting image ${id}`);
  try {
    if (!id || id === "undefined")
      return {
        status: 404,
        error: true,
        message: "no image id",
      };
    const _id = new mongoose.Types.ObjectId(id);
    gfs.delete(_id, (err) => {
      if (err) {
        return {
          status: 500,
          error: true,
          message: "image deletion error",
        };
      } else {
        return {
          status: 200,
          error: false,
          message: "image deleted successfully",
        };
      }
    });
  } catch (error) {
    return {
      status: 500,
      error: true,
      message: error,
    };
  }
};

module.exports = { deleteImage };
