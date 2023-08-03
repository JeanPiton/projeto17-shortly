import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function urlShorten(req,res){
    const userId = res.locals.session
    const {url} = req.body
    const short = nanoid(8)

    try {
        await db.query(`INSERT INTO urls(url,"shortUrl","ownerId") VALUES ($1,$2,$3)`,[url,short,userId])
        res.status(201).send({id:userId,shortUrl:short})
    } catch (err) {
        res.status(500).send(err.message)
    }
}