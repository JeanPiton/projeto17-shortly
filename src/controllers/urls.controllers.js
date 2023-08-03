import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function urlShorten(req,res){
    const userId = res.locals.session
    const {url} = req.body
    const short = nanoid(8)

    try {
        const {rows} = await db.query(`INSERT INTO urls(url,"shortUrl","ownerId") VALUES ($1,$2,$3) RETURNING id`,[url,short,userId])
        res.status(201).send({id:rows[0].id,shortUrl:short})
    } catch (err) {
        res.status(500).send(err.message)
    }
}