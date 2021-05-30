import express from "express";
import imageRouter from "./api/image";

const router = express.Router();

router.use("/", imageRouter);

export default router;
