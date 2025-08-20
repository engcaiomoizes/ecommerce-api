import { Request, Response } from "express";
import prisma from "../db";

export const all = async (req: Request, res: Response) => {
    try {
        const query = req.query;
        const filters = query["facet-filters"];
        const page = query["page"];
        const sort = query["sort"];

        const response = await prisma.product.findMany({
            include: {
                category: true,
                images: true,
            },
        });

        res.json(response);
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter Produtos." });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const { name, description, slug, image, price, priceWithDiscount, oldPrice, discountPercentage, quantity, available, categoryId } = req.body;
        const response = await prisma.product.create({
            data: {
                name,
                description,
                slug,
                image,
                price,
                priceWithDiscount,
                oldPrice,
                discountPercentage,
                quantity,
                available,
                categoryId,
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
        const { name, description, slug, image, price, priceWithDiscount, oldPrice, discountPercentage, quantity, available, categoryId, id } = req.body;
        const response = await prisma.product.update({
            data: {
                name,
                description,
                slug,
                image,
                price,
                priceWithDiscount,
                oldPrice,
                discountPercentage,
                quantity,
                available,
                categoryId,
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
        const response = await prisma.product.findUnique({
            where: {
                id: Number(id),
            },
        });

        res.json(response);
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter Produto." });
    }
};

export const del = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const response = await prisma.product.delete({
            where: {
                id,
            },
        });

        res.json({
            message: "Produto deletado com sucesso!",
            response
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao deletar Produto." });
    }
};