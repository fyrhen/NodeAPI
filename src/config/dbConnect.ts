import mongoose from "mongoose";
require("dotenv").config();

mongoose.connect(process.env.MONGODB || "");
let db = mongoose.connection;

export default db;
