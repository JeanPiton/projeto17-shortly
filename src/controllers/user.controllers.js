import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

export async function signUp(req,res){
    const {name,email,password} = req.body
    const hash = bcrypt.hashSync(password,10)

    try {
        await db.query(`INSERT INTO users(name,email,password) VALUES ($1,$2,$3)`,[name,email,hash])
        res.sendStatus(201)
    } catch (err) {
        if(err.code == '23505') return res.status(409).send("email alredy registered")
        res.status(501).send(err.message)
    }
}

export async function signIn(req,res){
    const {email,password} = req.body
    const hash = bcrypt.hashSync(password,10)

    try {
        const {rows:[user]} = await db.query(`SELECT * FROM users WHERE email=$1`,[email])
        if(user==undefined || !bcrypt.compareSync(password,user.password)) return res.status(401).send("email/password is wrong")
        const token = uuid()
        await db.query(`INSERT INTO sessions("userId",token) VALUES ($1,$2)`,[user.id,token])
        res.status(200).send({token})
    } catch (err) {
        console.log(err)
        res.status(501).send(err.message)
    }
}

export async function userInfo(req,res){
    const userId = res.locals.session

    try {
        const {rows:[user]} = await db.query(`SELECT users.id,users.name,SUM(urls."visitCounter") AS "visitCount",json_agg(json_build_object(
            'id',urls.id,
            'url',urls.url,
            'shortUrl',urls."shortUrl",
            'visitCounter',urls."visitCounter"
        )) AS "shortenedUrls" FROM users
        JOIN urls ON urls."ownerId" = users.id
        WHERE users.id = $1
        GROUP BY users.id`,[userId])
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getRank(req,res){
    try {
        const {rows} = await db.query(`SELECT users.id, users.name, COUNT(urls.*) AS "linksCount", COALESCE(SUM(urls."visitCounter"),0) AS "visitCount" FROM users
            LEFT JOIN urls ON urls."ownerId"=users.id
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10`)
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}