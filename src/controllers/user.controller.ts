import { Request, Response } from "express";
import prisma from "../db";
import { hashPassword } from "../bcrypt";

export const all = async (req: Request, res: Response) => {
    try {
        const response = await prisma.user.findMany({
            include: {
                addresses: true,
            },
        });

        res.json(response);
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter Clientes." });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const { name, cpf, celphone, gender, birth, type, credit, email, password, receiveNewsletter } = req.body;
        const response = await prisma.user.create({
            data: {
                name,
                cpf,
                celphone,
                gender,
                birth,
                type,
                credit,
                email,
                password: await hashPassword(password),
                receiveNewsletter,
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
        const { name, cpf, celphone, gender, birth, type, credit, email, receiveNewsletter, id } = req.body;
        const response = await prisma.user.update({
            data: {
                name,
                cpf,
                celphone,
                gender,
                birth,
                type,
                credit,
                email,
                receiveNewsletter,
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
        const response = await prisma.user.findUnique({
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
        const response = await prisma.user.delete({
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

// ADDRESSES ==============================================================================
export const getAddresses = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await prisma.address.findMany({
            where: {
                userId: id,
            },
        });

        res.json(response);
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter Endereços." })
    }
};

export const createAddress = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { main, identification, zipCode, street, number, complement, district, reference, city, state } = req.body;
        const response = await prisma.address.create({
            data: {
                userId: id,
                main,
                identification,
                zipCode,
                street,
                number,
                complement,
                district,
                reference,
                city,
                state,
                address: `${street}${number ? `, ${number}` : ''} - ${district} - ${city}/${state}`,
            },
        });

        res.json({
            message: "Endereço cadastrado com sucesso!",
            response
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao cadastrar Endereço." });
    }
};