import { Request, Response } from "express";
import prisma from "../db";

export const create = async (req: Request, res: Response) => {
    try {
        const { name, referenceBanner, startsAt, endsAt } = req.body;
        const response = await prisma.offer.create({
            data: {
                name,
                referenceBanner,
                startsAt: new Date(1754084700),
                endsAt: new Date(1754917200),
            },
        });

        return res.json({
            message: "Oferta cadastrada com sucesso!",
            response
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao cadastrar Oferta." });
    }
};