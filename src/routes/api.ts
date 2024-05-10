import express from "express";
import { Request, Response, NextFunction } from "express";
//import GetDescribe from "../actions/salesforce/GetDescribe";
import SalesforceConnectionMiddleware from "../middlewares/SalesforceConnectionMiddleware";
import GetDescribe from "../actions/salesforce/GetDescribe";

const router = express.Router();

router.get("/live", (_req: Request, res: Response) => {
  res.send({ service: "salesforce mapper", version: 1 });
});

router.post("/salesforce/login", (_req, res) => {
  res.send("login");
});
router.get(
  "/salesforce/describe/:sobject",
  (req: Request, res: Response, next: NextFunction) => {
    SalesforceConnectionMiddleware.handle(req, res, next);
  },
  async (req, res) => {
    const { result, success } = await GetDescribe.handle(
      res.locals.sfConn,
      req.params.sobject
    );
    if (success) {
      for (let i = 0; i < result.fields.length; i++) {
        const { name, label } = result.fields[i];
        result.fields[i] = { name, label };
      }

      res.status(200).json(result.fields);
      return;
    }

    res.status(404).json({ message: result });
  }
);
router.get("/salesforce/get/:sobject", (_req, res) => {
  res.send("get");
});
router.get("/salesforce/find/:sobject", (_req, res) => {
  res.send("find");
});
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
