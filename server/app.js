const express = require("express");
const cors = require("cors");
// const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const indexRoutes = require("./routes/indexRoutes");
const chatRoutes = require("./routes/chatRoutes");
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", chatRoutes);
app.use("/", indexRoutes);

// Call the functions after the server starts
app.listen(PORT, async () => {
  console.log(`Server is running on port:${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port:${PORT}`);
// });
