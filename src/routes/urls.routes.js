import { Router } from "express";
import { validateAuth } from "../middleware/validateAuth.js";
import { getUrls, urlShorten } from "../controllers/urls.controllers.js";
import { validateParamSchema, validateSchema } from "../middleware/validateSchema.js";
import { idSchema, shortenSchema } from "../schemas/urls.schmas.js";

const urlsRouter = Router()

urlsRouter.post("/urls/shorten",validateAuth,validateSchema(shortenSchema),urlShorten)
urlsRouter.get("/urls/:id",validateParamSchema(idSchema),getUrls)

export default urlsRouter