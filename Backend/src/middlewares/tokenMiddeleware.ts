import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET!
const client = new PrismaClient();
export async function tokenMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        // const authToken = req.headers['authorization']!
        const authToken = req.cookies.token
        const token = jwt.verify(authToken, JWT_SECRET) as JwtPayload
        const users = await client.user.findFirst({
            where:{
                email:token.email
            }
        })

        if (token) {
            req.email = token.email
            req.userid = users?.id
            req.username = users?.username || users?.email
            next()
        } 
    } catch (error) {
        res.status(401).json({
            error: "Unauthorize User"
        })
    }
}