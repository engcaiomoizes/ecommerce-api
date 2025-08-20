import { Request, Response } from "express";
import prisma from "../db";
import { comparePasswords } from "../bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "chavejwt";

export const login = async (req: Request, res: Response) => {
    try {
        const { login, password } = req.body;

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: login },
                    { cpf: login },
                ]
            },
        });

        if (!user)
            return res.status(401).json({ message: "Usuário não encontrado." });

        const pass = await comparePasswords(password, user.password);
        if (!pass)
            return res.status(401).json({ message: "Login e/ou senha incorreta." });

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login realizado com sucesso!",
            token,
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (err) {
        return res.status(500).json({
            message: "Erro no login.",
            err
        });
    }
};