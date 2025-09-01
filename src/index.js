import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import errorHandler from "./middlewares/errorHandler.js";
import initDb from "../src/config/initDB.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", userRoute);
initDb();
app.use(errorHandler);

app.listen(port, () => console.log("Server running "));
