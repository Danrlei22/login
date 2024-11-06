const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

//Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/garagem", {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
