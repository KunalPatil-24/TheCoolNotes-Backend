const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");

const client = require("./config/DB");

const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");


const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.use("/auth", authRoutes);
app.use("/note", noteRoutes);

client.connect(() => {
    console.log("Connected to Database!")
})
app.listen(port, () => {
    console.log("Server is running on port", port)
})

