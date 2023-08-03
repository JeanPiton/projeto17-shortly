import {Router} from "express"
import { validateSchema } from "../middleware/validateSchema.js"
import { signupSchema } from "../schemas/user.schemas.js"
import { signUp } from "../controllers/user.controllers.js"

const userRouter = Router()

userRouter.post("/signup",validateSchema(signupSchema),signUp)

export default userRouter