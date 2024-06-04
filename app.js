const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const config = require("config");

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(cors());

const routes = require("./routes")(app);

// const PORT = config.PORT || 3001;
const PORT = 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
