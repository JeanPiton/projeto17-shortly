import {Router} from "express"
import { validateSchema } from "../middleware/validateSchema.js"
import { signinSchema, signupSchema } from "../schemas/user.schemas.js"
import { signIn, signUp } from "../controllers/user.controllers.js"

const userRouter = Router()

userRouter.post("/signup",validateSchema(signupSchema),signUp)
userRouter.post("/signin",validateSchema(signinSchema),signIn)

export default userRouter