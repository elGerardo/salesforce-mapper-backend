import express from "express";
import { Request, Response } from "express";
import SalesforceConnectionMiddleware from "../middlewares/SalesforceConnectionMiddleware";
import JSForceController from "../controllers/JSForceController";

const router = express.Router();

router.get("/live", (_req: Request, res: Response) => {
  res.send({ service: "salesforce mapper", version: 1 });
});

router.post("/salesforce/login", JSForceController.login);

router.get(
  "/salesforce/describe/:sobject",
  SalesforceConnectionMiddleware.handle,
  JSForceController.getDescribe
);

router.get(
  "/salesforce/get/:sobject",
  SalesforceConnectionMiddleware.handle,
  JSForceController.get
);
router.get(
  "/salesforce/find/:sobject",
  SalesforceConnectionMiddleware.handle,
  JSForceController.find
);
router.post(
  "/salesforce/create/:sobject",
  SalesforceConnectionMiddleware.handle,
  JSForceController.find
);
router.put("/salesforce/update/:sobject", (_req, res) => {
  res.send("update");
});
router.delete("/salesforce/delete/:sobject", (_req, res) => {
  res.send("delete");
});

export default router;
