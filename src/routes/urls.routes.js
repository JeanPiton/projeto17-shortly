import { Router } from "express";
import { validateAuth } from "../middleware/validateAuth.js";
import { urlShorten } from "../controllers/urls.controllers.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { shortenSchema } from "../schemas/urls.schmas.js";

const urlsRouter = Router()

urlsRouter.post("/urls/shorten",validateAuth,validateSchema(shortenSchema),urlShorten)

export default urlsRouter