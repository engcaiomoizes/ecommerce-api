import { Request, Response } from "express";
import prisma from "../db";

export const all = async (req: Request, res: Response) => {
    try {
        const response = await prisma.produtos.findMany();

        res.json(response);
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter Produtos." });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const { name, description, friendlyName, image, price, priceWithDiscount, oldPrice, discountPercentage } = req.body;
        const response = await prisma.produtos.create({
            data: {
                name,
                description,
                friendlyName,
                image,
                price,
                priceWithDiscount,
                oldPrice,
                discountPercentage,
            },
        });

        res.json({
            message: "Produto cadastrado com sucesso!",
            response
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao cadastrar Produto." });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { name, description, friendlyName, image, price, priceWithDiscount, oldPrice, discountPercentage, id } = req.body;
        const response = await prisma.produtos.update({
            data: {
                name,
                description,
                friendlyName,
                image,
                price,
                priceWithDiscount,
                oldPrice,
                discountPercentage,
            },
            where: {
                id,
            },
        });

        res.json({
            message: "Produto atualizado com sucesso!",
            response
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar Produto." });
    }
};

export const get = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await prisma.produtos.findUnique({
            where: {
                id: Number(id),
            },
        });

        res.json(response);
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter Produto." });
    }
};