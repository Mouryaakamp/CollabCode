import prisma from "../DB.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../Config/Config.js"



export async function register(req, res) {
    const { username, email, password } = req.body;

    const checkUser = await prisma.user.findFirst({
        where: {
            OR: [
                { username },
                { email }
            ]
        }
    })
    if (checkUser) {
        return res.status(409).send("username or email already exist please check again")
    }
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);


    const user = await prisma.user.create({
        data: { username, email, password: hashedPass }
    })

    const token=jwt.sign({
        id: user.id
    },
        config.JWT_SECRET,
        {
            expiresIn: "1d"
        })

    res.status(200).json({
        message: "User created successfully ",
        user:{
            username:user.username,
            email:user.email
        },
        token
    });

}