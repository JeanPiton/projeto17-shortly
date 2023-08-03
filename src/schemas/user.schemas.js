import joi from "joi"

export const signupSchema = joi.object({
    name:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().required(),
    confirmPassword:joi.string().required().equal(joi.ref("password"))
})