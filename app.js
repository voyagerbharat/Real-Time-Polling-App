import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import { dirname } from "path";
import path from "path";
import poll from "./routes/poll.js";
import Connection from "./config/db.js";

const app = express();

// set public folder
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// body parser middle ware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// enable cors
app.use(cors());

//routes
app.use("/poll", poll);

//db connect
Connection();

//start server
const port = 3001;
app.listen(port, () => {
  console.log(`Server Started on Port no ${port}`);
});
