const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

//Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR ${err.message}`);
  console.log("Shutting down error due to uncaught exception");
  process.exit(1);
});

//Setting up config file
dotenv.config({ path: "backend/config/config.env" });

//Connecting to DataBase
connectDatabase();

//Setting up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started at Port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//Handle UnHandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`ERROR : ${err.message}`);
  console.log("Shutting down the server");
  server.close(() => {
    process.exit(1);
  });
});
