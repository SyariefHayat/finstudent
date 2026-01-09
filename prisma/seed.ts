import "dotenv/config";
import { prisma } from "../lib/prisma";

const categories = [
    { name: "Makanan & Minuman", type: "expense", icon: "🍔" },
    { name: "Transportasi", type: "expense", icon: "🚗" },
    { name: "Hiburan", type: "expense", icon: "🎮" },
    { name: "Pendidikan", type: "expense", icon: "📚" },
    { name: "Belanja", type: "expense", icon: "🛒" },
    { name: "Kesehatan", type: "expense", icon: "💊" },
    { name: "Tagihan", type: "expense", icon: "📄" },
    { name: "Lainnya", type: "both", icon: "📦" },
    { name: "Gaji", type: "income", icon: "💰" },
    { name: "Kiriman Orang Tua", type: "income", icon: "👨‍👩‍👧" },
    { name: "Freelance", type: "income", icon: "💻" },
    { name: "Beasiswa", type: "income", icon: "🎓" },
    { name: "Investasi", type: "income", icon: "📈" },
];

async function main() {
    console.log("Seeding categories...");

    for (const category of categories) {
        await prisma.category.upsert({
            where: { name: category.name },
            update: {},
            create: category,
        });
    }

    console.log("Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
