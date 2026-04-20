const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: "https://finessekart.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

// routes
const routes = require('./routes');
app.use('/', routes);

// DB connect
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("Mongo connection error:", err));

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));