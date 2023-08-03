import {Router} from "express"
import { validateSchema } from "../middleware/validateSchema.js"
import { signinSchema, signupSchema } from "../schemas/user.schemas.js"
import { signIn, signUp, userInfo } from "../controllers/user.controllers.js"
import { validateAuth } from "../middleware/validateAuth.js"

const userRouter = Router()

userRouter.post("/signup",validateSchema(signupSchema),signUp)
userRouter.post("/signin",validateSchema(signinSchema),signIn)
userRouter.get("/users/me",validateAuth,userInfo)

export default userRouter