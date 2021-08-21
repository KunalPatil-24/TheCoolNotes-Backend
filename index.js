const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const client = require("./config/DB");


const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.use("/auth", authRoutes);

client.connect(() => {
    console.log("Connected to Database!")
})
app.listen(port, () => {
    console.log("Server is running on port", port)
})

