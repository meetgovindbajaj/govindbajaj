const mongoose = require("mongoose");
const dotenv = require("dotenv");
const p = require("../utils/P");
dotenv.config({
  path: "./config.env",
});
const DB = process.env.DATABASE;
const server = () => {
  try {
    mongoose.connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      appName: "SansHerbal",
    });
    const database = mongoose.connection;
    database.once("open", () => {
      p(`[ MongoDB Database ]\n\nStatus\t: Connected\n\n[ API Requests ]\n`);
    });
    database.on(
      "error",
      console.error.bind(
        console,
        `[ MongoDB Database ]\n\nStatus\t: Disconnected\n\n[ Error Message ]\n\nConnection error\n\n`
      )
    );
  } catch (error) {
    p(
      `[ MongoDB Database ]\n\nStatus\t: Disconnected\n\n[ Error Message ]\n\n${error?.message}\n\n[ Error Summary ]\n\n${error}\n\n`
    );
  }
};
module.exports = server();
