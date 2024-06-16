const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const config = require("config");

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use("/bannerImage", express.static(path.join(__dirname, "bannerImage")));
app.use("/contentImage", express.static(path.join(__dirname, "contentImage")));

const routes = require("./routes");
routes(app);

const PORT = 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
