const express = require("express");
const cors = require("cors");
const { connection } = require("./Config/db");
const { AdRouter } = require("./Routes/ad.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("OLX Backend");
});
app.use("/ads", AdRouter);

app.listen(8080, async () => {
  try {
    connection;
    console.log("connected to db");
  } catch (e) {
    console.log(e);
  }
  console.log("Server is running at http://localhost:8080");
});
