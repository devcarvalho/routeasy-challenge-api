require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API runnning");
});

app.use("/api/deliveries", require("./routes/deliveries"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
