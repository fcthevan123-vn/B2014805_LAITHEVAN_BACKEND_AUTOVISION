import express from "express";
import cookieParser from "cookie-parser";
import route from "./routers";
import connectDb from "./config";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// use cookie
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://192.168.0.115:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Connect to db
connectDb();

route(app);

app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`);
});
