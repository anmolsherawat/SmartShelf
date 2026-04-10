import express from "express";
import { getBook, generateAndAddBook, getBookSummary } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);
router.post("/generate", generateAndAddBook);
router.get("/summarize/:id", getBookSummary);

export default router;