import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();

router.get("*", (req: Request, res: Response, next: NextFunction) => {
  res.set("~~uwu~~", "fuck me daddy");
  next();
});

router.use("/", require("./index"));
router.use("/api/upload", require("./api/upload"));

router.get("*", (req: Request, res: Response, error: any) => {
  return res.status(500).json({
    error: true,
    status: error ? "404" : "500",
    message: error ? "Content not found" : "Internal server error: " + error,
  });
});

export default router;