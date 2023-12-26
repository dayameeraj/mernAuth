const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

const bodyParser = require("body-parser");
const userRoute = require("./routes/authRoute");
const songRouter = require("./routes/songRoute");

const app = express();

app.use(bodyParser.json());
app.use("/api", userRoute);
app.use("/api/sng", songRouter);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
