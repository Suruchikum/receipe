const express = require("express");
const cors = require("cors");
require("dotenv").config();

const indexRoutes = require("./routes/indexRoutes");
const chatRoutes = require("./routes/chatRoutes");
const app = express();
const PORT = 4700;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoutes);
app.use("/api", chatRoutes);

// Call the functions after the server starts
app.listen(PORT, async () => {
  console.log(`Server is running on port:${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port:${PORT}`);
// });
