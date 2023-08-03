import { Router } from "express";
import { validateAuth } from "../middleware/validateAuth.js";
import { deleteUrl, getUrls, urlRedirect, urlShorten } from "../controllers/urls.controllers.js";
import { validateParamSchema, validateSchema } from "../middleware/validateSchema.js";
import { idSchema, shortSchema, shortenSchema } from "../schemas/urls.schmas.js";

const urlsRouter = Router()

urlsRouter.post("/urls/shorten",validateAuth,validateSchema(shortenSchema),urlShorten)
urlsRouter.get("/urls/:id",validateParamSchema(idSchema),getUrls)
urlsRouter.get("/urls/open/:shortUrl",validateParamSchema(shortSchema),urlRedirect)
urlsRouter.delete("/urls/:id",validateAuth,validateParamSchema(idSchema),deleteUrl)

export default urlsRouter