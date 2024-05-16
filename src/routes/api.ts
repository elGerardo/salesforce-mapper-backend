import express from "express";
import { Request, Response } from "express";
import SalesforceConnectionMiddleware from "../middlewares/SalesforceConnectionMiddleware";
import JSForceController from "../controllers/JSForceController";
import { TryCatch } from "../utils/TryCatch";

const router = express.Router();

router.get("/live", (_req: Request, res: Response) => {
  res.send({ service: "salesforce mapper", version: 1 });
});

router.post("/salesforce/login", TryCatch(JSForceController.login));

router.get(
  "/salesforce/describe/:sobject",
  SalesforceConnectionMiddleware.handle,
  TryCatch(JSForceController.getDescribe)
);

router.get(
  "/salesforce/query/:sobject",
  SalesforceConnectionMiddleware.handle,
  TryCatch(JSForceController.query)
);

router.get(
  "/salesforce/get/:sobject",
  SalesforceConnectionMiddleware.handle,
  TryCatch(JSForceController.get)
);

router.get(
  "/salesforce/find/:sobject",
  SalesforceConnectionMiddleware.handle,
  TryCatch(JSForceController.find)
);

router.post("/salesforce/create/:sobject", (_req, res) => {
  res.send("create");
});
router.put("/salesforce/update/:sobject", (_req, res) => {
  res.send("update");
});
router.delete("/salesforce/delete/:sobject", (_req, res) => {
  res.send("delete");
});

export default router;
