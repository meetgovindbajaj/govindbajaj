const mongoose = require("mongoose");
const infoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Govind Bajaj",
    },
    image: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    gitUserId: {
      type: String,
      required: true,
    },
    emailJsServiceId: {
      type: String,
      required: true,
    },
    emailJsTemplateId: {
      type: String,
      required: true,
    },
    emailJsPublicKey: {
      type: String,
      required: true,
    },
    links: [
      {
        name: {
          type: String,
          required: true,
        },
        link: {
          type: String,
          required: true,
        },
        helperText: {
          type: String,
          required: true,
        },
        show: {
          type: Boolean,
          default: true,
        },
      },
    ],
    languages: {
      type: Array,
      default: [],
    },
    passcode: {
      type: String,
    },
  },
  { timestamps: true }
);
const Info = mongoose.model("INFO", infoSchema);
module.exports = Info;
