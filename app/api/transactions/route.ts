import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/transactions - Get all transactions for current user
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const transactions = await prisma.transaction.findMany({
            where: { userId: session.user.id },
            include: { category: true },
            orderBy: { date: "desc" },
        });

        return NextResponse.json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// POST /api/transactions - Create a new transaction
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Anda harus login terlebih dahulu" },
                { status: 401 }
            );
        }

        // Verify user exists in database
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User tidak ditemukan. Silakan login ulang." },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { amount, type, description, date, categoryId } = body;

        // Validation
        if (!amount || !type || !description || !date || !categoryId) {
            return NextResponse.json(
                { error: "Semua field harus diisi" },
                { status: 400 }
            );
        }

        if (!["income", "expense"].includes(type)) {
            return NextResponse.json(
                { error: "Type harus income atau expense" },
                { status: 400 }
            );
        }

        const transaction = await prisma.transaction.create({
            data: {
                amount: parseFloat(amount),
                type,
                description,
                date: new Date(date),
                userId: session.user.id,
                categoryId,
            },
            include: { category: true },
        });

        return NextResponse.json(transaction, { status: 201 });
    } catch (error) {
        console.error("Error creating transaction:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
