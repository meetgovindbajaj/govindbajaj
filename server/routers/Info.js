const express = require("express");
const router = express.Router();
const Info = require("../models/Info");
const { deleteImage } = require("../utils/gridFs");
// @router get user infomation
router.get(/* link */, async (req, res) => {
  try {
    const info = await Info.find({});
    if (info) {
      return res
        .status(200)
        .json({ status: 200, error: false, message: "success", info });
    } else {
      return res
        .status(404)
        .json({ status: 404, error: true, message: "failed", info: {} });
    }
  } catch (error) {
    console.log(` --------------------------------------------------`);
    console.log(`file: Info.js : line 19 : router.get : error`, error);
    console.log(` --------------------------------------------------`);
    return res
      .status(500)
      .json({ status: 500, error: true, message: error, info: {} });
  }
});
router.get(/* link */, async (req, res) => {
  try {
    const info = await Info.find({}, { image: 1 });
    if (info) {
      return res.status(200).redirect(`/image/${info[0].image}`);
    } else {
      return res.status(404).redirect("/image/undefined");
    }
  } catch (error) {
    return res.status(500).redirect("/image/undefined");
  }
});
router.post(/* link */, async (req, res) => {
  try {
    const { passcode } = req.body;
    const data = await Info.find({}, { passcode: 1 });
    if (passcode === data[0].passcode) {
      return res
        .status(200)
        .json({ status: 200, error: false, message: "success" });
    }
    return res
      .status(400)
      .json({ status: 400, error: true, message: "failed" });
  } catch (error) {
    return res.status(500).json({ status: 500, error: true, message: error });
  }
});
router.post(/* link */, async (req, res) => {
  try {
    const setInfo = req.body;
    const info = new Info(setInfo);
    const saveInfo = await info.save();
    if (saveInfo) {
      return res
        .status(200)
        .json({ status: 200, error: false, message: "success" });
    } else {
      return res
        .status(404)
        .json({ status: 404, error: true, message: "failed" });
    }
  } catch (error) {
    console.log(` --------------------------------------------------`);
    console.log(`file: Info.js : line 42 : router.get : error`, error);
    console.log(` --------------------------------------------------`);
    return res.status(500).json({ status: 500, error: true, message: error });
  }
});
// @router update user information
router.post(/* link */, async (req, res) => {
  try {
    const { id, updatedInfo } = req.body;
    const userinfo = await Info.findById(id);
    if (updatedInfo.image) {
      deleteImage(userinfo.image);
    }
    const update = await userinfo.updateOne({
      $set: updatedInfo,
    });
    if (update) {
      const info = await Info.find({});
      if (info) {
        return res
          .status(200)
          .json({ status: 200, error: false, message: "success", info });
      } else {
        return res
          .status(404)
          .json({ status: 404, error: true, message: "failed", info: {} });
      }
    }
    return res
      .status(404)
      .json({ status: 404, error: true, message: "failed", info: {} });
  } catch (error) {
    console.log(` ----------------------------------------------------`);
    console.log(`file: Info.js : line 71 : router.post : error`, error);
    console.log(` ----------------------------------------------------`);
    return res
      .status(500)
      .json({ status: 500, error: true, message: error, info: {} });
  }
});
module.exports = router;
