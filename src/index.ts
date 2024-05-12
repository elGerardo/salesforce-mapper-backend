import express from "express";
import router from "./routes/api";
import cors from "cors";
import { ErrorHandler } from "./middlewares/ErrorHandler";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(ErrorHandler);
const PORT = 3000;
app.listen(PORT, async () => {
  console.log("Server Running");
});
