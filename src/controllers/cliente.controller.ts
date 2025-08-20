import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../db";
import { hashPassword } from "../bcrypt";

export const all = async (req: Request, res: Response) => {
    try {
        const response = await prisma.clientes.findMany();

        res.json(response);
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter Clientes." });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const { nome, cpf, dataNascimento, telefone, email, password } = req.body;
        const response = await prisma.clientes.create({
            data: {
                nome,
                cpf,
                dataNascimento,
                telefone,
                email,
                password: await hashPassword(password),
            },
        });

        res.json({
            message: "Cliente cadastrado com sucesso!",
            response
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao cadastrar Cliente." });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { nome, cpf, dataNascimento, telefone, email, id } = req.body;
        const response = await prisma.clientes.update({
            data: {
                nome,
                cpf,
                dataNascimento,
                telefone,
                email,
            },
            where: {
                id,
            },
        });

        res.json({
            message: "Cliente atualizado com sucesso!",
            response
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar Cliente." });
    }
};

export const get = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await prisma.clientes.findUnique({
            where: {
                id,
            },
        });

        res.json(response);
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter Cliente." });
    }
};

export const del = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const response = await prisma.clientes.delete({
            where: {
                id,
            },
        });

        res.json({
            message: "Cliente deletado com sucesso!",
            response
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao deletar Cliente." });
    }
};