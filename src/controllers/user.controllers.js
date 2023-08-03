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