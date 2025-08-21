import { Request, Response } from "express";
import prisma from "../db";
import productsJsonRaw from "../public/hardware.json";
import { Size } from "@prisma/client";

const productsJson = productsJsonRaw as any;

const getCategoryId = (key: string) => {
    switch (key) {
        case "cpu": return 2;
        case "gpu": return 3; 
        case "motherboard": return 4;
        case "ram": return 5;
        case "fonte": return 6;
        case "ssd": return 7;
        case "airCooler": return 9;
        case "waterCooler": return 10;
        case "fan": return 11;
        default: return null;
    }
};

export const products = async (req: Request, res: Response) => {
    try {
        for (const categoryKey in productsJson) {
            const categoryProducts = productsJson[categoryKey];

            for (const product of categoryProducts) {
                const allImages = [
                    ...(product.images?.map((url: string) => ({ url, size: "original" as Size })) || []),
                    ...(product.photos?.p.map((url: string) => ({ url, size: "p" as Size })) || []),
                    ...(product.photos?.m.map((url: string) => ({ url, size: "m" as Size })) || []),
                    ...(product.photos?.g.map((url: string) => ({ url, size: "g" as Size })) || []),
                    ...(product.photos?.gg.map((url: string) => ({ url, size: "gg" as Size })) || []),
                ];

                await prisma.product.create({
                    data: {
                        name: product.name,
                        description: product.description,
                        slug: product.slug,
                        image: product.image,
                        price: product.price,
                        priceWithDiscount: product.priceWithDiscount,
                        oldPrice: product.oldPrice,
                        discountPercentage: product.discountPercentage,
                        maxInstallment: product.maxInstallment,
                        quantity: product.quantity,
                        available: true,
                        categoryId: getCategoryId(categoryKey),

                        ...(product.offer && {
                            offers: {
                                create: {
                                    offerId: 1,
                                    price: product.offer?.price,
                                    priceWithDiscount: product.offer?.priceWithDiscount,
                                    discountPercentage: product.offer?.discountPercentage,
                                    quantityAvailable: product.offer?.quantityAvailable,
                                },
                            },
                        }),

                        ...(allImages.length > 0 && {
                            images: {
                                create: allImages,
                            },
                        }),
                    },
                });
            }
        }

        return res.json({
            message: "Produtos semeados com sucesso!",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao semear Produtos." });
    }
};