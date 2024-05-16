import express from "express";
import router from "./routes/api";
import cors from "cors";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import dotenv from "dotenv"

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log("Server Running");
});
