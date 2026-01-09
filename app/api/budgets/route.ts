import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/budgets - Get all budgets with spent amounts for current month
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = session.user.id;
        const now = new Date();
        const currentMonth = now.getMonth() + 1; // 1-12
        const currentYear = now.getFullYear();

        // Get start and end of current month for transaction calculation
        const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
        const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59);

        // Get all budgets for current month
        const budgets = await prisma.budget.findMany({
            where: {
                userId,
                month: currentMonth,
                year: currentYear,
            },
            include: { category: true },
        });

        // Get all expense transactions for current month
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                type: "expense",
                date: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
            },
        });

        // Calculate spent per category
        const spentByCategory = transactions.reduce((acc: Record<string, number>, t: { categoryId: string; amount: number }) => {
            acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount;
            return acc;
        }, {} as Record<string, number>);

        // Combine budget with spent data
        const budgetsWithSpent = budgets.map((budget) => ({
            ...budget,
            spent: spentByCategory[budget.categoryId] || 0,
            percentage: Math.round(
                ((spentByCategory[budget.categoryId] || 0) / budget.amount) * 100
            ),
        }));

        // Get expense categories for budget creation
        const expenseCategories = await prisma.category.findMany({
            where: {
                type: { in: ["expense", "both"] },
            },
            orderBy: { name: "asc" },
        });

        return NextResponse.json({
            budgets: budgetsWithSpent,
            categories: expenseCategories,
            month: currentMonth,
            year: currentYear,
        });
    } catch (error) {
        console.error("Error fetching budgets:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// POST /api/budgets - Create or update a budget
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { amount, categoryId } = body;

        if (!amount || !categoryId) {
            return NextResponse.json(
                { error: "Amount dan category harus diisi" },
                { status: 400 }
            );
        }

        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        // Upsert: create or update if exists
        const budget = await prisma.budget.upsert({
            where: {
                userId_categoryId_month_year: {
                    userId: session.user.id,
                    categoryId,
                    month: currentMonth,
                    year: currentYear,
                },
            },
            update: { amount: parseFloat(amount) },
            create: {
                amount: parseFloat(amount),
                month: currentMonth,
                year: currentYear,
                userId: session.user.id,
                categoryId,
            },
            include: { category: true },
        });

        return NextResponse.json(budget, { status: 201 });
    } catch (error) {
        console.error("Error creating budget:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
