import joi from "joi"

export const shortenSchema = joi.object({
    url:joi.string().required()
})

export const idSchema = joi.object({
    id:joi.number().integer().required()
})