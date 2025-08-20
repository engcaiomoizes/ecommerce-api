import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
    //
    console.log("Database seeded!");
    await prisma.$disconnect();
}

seed().catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});