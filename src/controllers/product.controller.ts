import { Request, Response } from "express";
import prisma from "../db";
import { analyseFilters, formatCategory } from "../lib/utils";

export const all = async (req: Request, res: Response) => {
    try {
        const query = req.query;
        const filters = query["facet-filters"];
        const page = Number(query["page"] || 1);
        const limit = Number(query["limit"] || 20);
        const sort = query["sort"];

        const skip = (Number(page) - 1) * Number(limit);

        let where: any = {};

        if (filters) {
            const filt = analyseFilters(filters.toString());
            console.log(filt);
        }

        const response = await prisma.product.findMany({
            include: {
                category: {
                    include: {
                        parent: true,
                    },
                },
                images: true,
                offers: {
                    omit: {
                        productId: true,
                    },
                    include: {
                        offer: true,
                    },
                },
            },
            omit: {
                categoryId: true,
            },
            ...(isNaN(limit) ? {} : { take: limit, skip: skip }),
        });

        const formattedResponse = response.map((product) => {
            const offerPivot = product.offers[0];
            const images = product.images.filter(photo => photo.size === "original");
            const photosP = product.images.filter(photo => photo.size === "p");
            const photosM = product.images.filter(photo => photo.size === "m");
            const photosG = product.images.filter(photo => photo.size === "g");
            const photosGG = product.images.filter(photo => photo.size === "gg");

            return {
                ...product,
                offer: offerPivot ? {
                    id: offerPivot.offerId,
                    name: offerPivot.offer.name,
                    referenceBanner: offerPivot.offer.referenceBanner,
                    startAt: offerPivot.offer.startsAt,
                    endsAt: offerPivot.offer.endsAt,
                    price: offerPivot.price,
                    priceWithDiscount: offerPivot.priceWithDiscount,
                    discountPercentage: offerPivot.discountPercentage,
                    quantityAvailable: offerPivot.quantityAvailable,
                    hashCode: offerPivot.hashCode,
                } : null,
                offers: undefined,
                images: images.map(img => img.url),
                photos: {
                    p: photosP.map(photo => photo.url),
                    m: photosM.map(photo => photo.url),
                    g: photosG.map(photo => photo.url),
                    gg: photosGG.map(photo => photo.url),
                },
                category: formatCategory(product.category),
            };
        });

        res.json(formattedResponse);
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter Produtos." });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const { name, description, slug, image, price, priceWithDiscount, oldPrice, discountPercentage, maxInstallment, quantity, available, categoryId } = req.body;
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
                maxInstallment,
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
        const { name, description, slug, image, price, priceWithDiscount, oldPrice, discountPercentage, maxInstallment, quantity, available, categoryId, id } = req.body;
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
                maxInstallment,
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
            include: {
                category: true,
                images: true,
                offers: {
                    omit: {
                        productId: true,
                    },
                    include: {
                        offer: true,
                    },
                },
            },
        });

        if (response) {
            const offerPivot = response.offers[0];
            const images = response.images.filter(photo => photo.size === "original");
            const photosP = response.images.filter(photo => photo.size === "p");
            const photosM = response.images.filter(photo => photo.size === "m");
            const photosG = response.images.filter(photo => photo.size === "g");
            const photosGG = response.images.filter(photo => photo.size === "gg");

            return res.json({response: {
                ...response,
                offer: offerPivot ? {
                    id: offerPivot.offerId,
                    name: offerPivot.offer.name,
                    referenceBanner: offerPivot.offer.referenceBanner,
                    startAt: offerPivot.offer.startsAt,
                    endsAt: offerPivot.offer.endsAt,
                    price: offerPivot.price,
                    priceWithDiscount: offerPivot.priceWithDiscount,
                    discountPercentage: offerPivot.discountPercentage,
                    quantityAvailable: offerPivot.quantityAvailable,
                    hashCode: offerPivot.hashCode,
                } : null,
                offers: undefined,
                images: images.map(img => img.url),
                photos: {
                    p: photosP.map(photo => photo.url),
                    m: photosM.map(photo => photo.url),
                    g: photosG.map(photo => photo.url),
                    gg: photosGG.map(photo => photo.url),
                },
                category: formatCategory(response.category),
            }});
        }

        return res.status(404).json({ message: "Nenhum Produto encontrado." });
    } catch (err) {
        return res.status(500).json({ error: "Erro ao obter Produto." });
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

export const delAll = async (req: Request, res: Response) => {
    try {
        const response = await prisma.product.deleteMany();

        return res.json({
            message: "Todos os Produtos foram deletados com sucesso!",
            response
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao deletar todos os Produtos." });
    }
};

export const allByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.params;

        const query = req.query;
        const filters = query["facet-filters"];
        const page = Number(query["page"] || 1);
        const limit = Number(query["limit"] || 20);
        const sort = query["sort"];

        const skip = (Number(page) - 1) * Number(limit);

        let where: any = {};

        if (filters) {
            const filt = analyseFilters(filters.toString());
            console.log(filt);
        }

        const response = await prisma.product.findMany({
            include: {
                category: {
                    include: {
                        parent: {
                            include: {
                                parent: true,
                            },
                        },
                    },
                },
                images: true,
                offers: {
                    omit: {
                        productId: true,
                    },
                    include: {
                        offer: true,
                    },
                },
            },
            omit: {
                categoryId: true,
            },
            ...(isNaN(limit) ? {} : { take: limit, skip: skip }),
            where: {
                category: {
                    slug: category,
                },
            },
        });

        const formattedResponse = response.map((product) => {
            const offerPivot = product.offers[0];
            const images = product.images.filter(photo => photo.size === "original");
            const photosP = product.images.filter(photo => photo.size === "p");
            const photosM = product.images.filter(photo => photo.size === "m");
            const photosG = product.images.filter(photo => photo.size === "g");
            const photosGG = product.images.filter(photo => photo.size === "gg");

            return {
                ...product,
                offer: offerPivot ? {
                    id: offerPivot.offerId,
                    name: offerPivot.offer.name,
                    referenceBanner: offerPivot.offer.referenceBanner,
                    startAt: offerPivot.offer.startsAt,
                    endsAt: offerPivot.offer.endsAt,
                    price: offerPivot.price,
                    priceWithDiscount: offerPivot.priceWithDiscount,
                    discountPercentage: offerPivot.discountPercentage,
                    quantityAvailable: offerPivot.quantityAvailable,
                    hashCode: offerPivot.hashCode,
                } : null,
                offers: undefined,
                images: images.map(img => img.url),
                photos: {
                    p: photosP.map(photo => photo.url),
                    m: photosM.map(photo => photo.url),
                    g: photosG.map(photo => photo.url),
                    gg: photosGG.map(photo => photo.url),
                },
                category: formatCategory(product.category),
            };
        });

        res.json(formattedResponse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao obter Produtos." });
    }
};