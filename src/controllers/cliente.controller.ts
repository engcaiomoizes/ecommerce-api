import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = PrismaClient();

exports.create = async function (req: Request, res: Response) {
    try {
        const { nome, cpf, dataNascimento, telefone, email, senha  } = req.body();
        const newClient = await prisma.clients.create({
            data: {
                nome,
                cpf,
                dataNascimento,
                telefone,
                email,
                senha,
            },
        });

        res.json(newClient);
    } catch (err) {
        res.status(500).json({ error: "Erro ao cadastrar Cliente." });
    } finally {
        //
    }
};