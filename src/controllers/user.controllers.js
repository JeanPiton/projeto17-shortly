import { db } from "../database/database.connection.js";

export async function signUp(req,res){
    const {name,email,password} = req.body

    try {
        await db.query(`INSERT INTO users(name,email,password) VALUES ($1,$2,$3)`,[name,email,password])
        res.sendStatus(201)
    } catch (err) {
        if(err.code == '23505') return res.status(409).send("email alredy registered")
        res.status(501).send(err.message)
    }
}