import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid"

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

export async function getUrls(req,res){
    const {id} = req.params
    
    try {
        const {rows:[urls]} = await db.query(`SELECT * FROM urls WHERE id=$1`,[id])
        if(urls==undefined) return res.sendStatus(404)
        res.status(200).send({id,shortUrl:urls.shortUrl,url:urls.url})
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function urlRedirect(req,res){
    const {shortUrl} = req.params

    try {
        const {rows:[url]} = await db.query(`SELECT * FROM urls WHERE "shortUrl"=$1`,[shortUrl])
        if(url==undefined) return res.sendStatus(404)
        await db.query(`UPDATE urls SET "visitCounter"="visitCounter"+1 WHERE id=$1`,[url.id])
        res.redirect(url.url)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteUrl(req,res){
    const userId = res.locals.session
    const {id} = req.params

    try {
        const {rows} = await db.query(`SELECT * FROM urls WHERE id=$1`,[id])
        if(rows.length == 0) return res.sendStatus(404)
        if(rows[0].ownerId!=userId) return res.sendStatus(401)
        await db.query(`DELETE FROM urls WHERE id=$1`,[id])
        res.sendStatus(204)
    } catch (err) {
        res.status(500).send(err.message)
    }
}