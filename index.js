const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

// app.get("/", (req, res) => {
//     res.send("server is up and running");
// })

app.use("/auth", authRoutes);

app.listen(port, () => {
    console.log("Server is running on port", port)
})

