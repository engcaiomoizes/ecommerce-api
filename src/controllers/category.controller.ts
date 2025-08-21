import { Request, Response } from "express";
import prisma from "../db";

export const all = async (req: Request, res: Response) => {
    try {
        const response = await prisma.category.findMany({
            include: {
                parent: {
                    include: {
                        parent: true,
                    },
                },
                parents: true,
            },
        });

        res.json(response);
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter Categorias." });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const { parentId, name, slug } = req.body;
        const response = await prisma.category.create({
            data: {
                parentId,
                name,
                slug,
            },
        });

        res.json({
            message: "Categoria cadastrada com sucesso!",
            response
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao cadastrar Categoria." });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { parentId, name, slug, id } = req.body;
        const response = await prisma.category.update({
            data: {
                parentId,
                name,
                slug,
            },
            where: {
                id,
            },
        });

        res.json({
            message: "Categoria atualizada com sucesso!",
            response
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar Categoria." });
    }
};

export const get = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await prisma.category.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                parent: {
                    include: {
                        parent: true,
                    },
                },
                parents: true,
            },
        });

        res.json(response);
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter Categoria." });
    }
};

export const del = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const response = await prisma.category.delete({
            where: {
                id,
            },
        });

        res.json({
            message: "Categoria deletada com sucesso!",
            response
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao deletar Categoria." });
    }
};