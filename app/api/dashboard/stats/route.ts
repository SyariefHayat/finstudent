import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/dashboard/stats - Get dashboard statistics
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
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Get start and end of current month
        const startOfMonth = new Date(currentYear, currentMonth, 1);
        const endOfMonth = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);

        // Get all transactions for current month
        const monthlyTransactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
            },
            include: { category: true },
        });

        // Calculate totals
        const totalIncome = monthlyTransactions
            .filter((t: any) => t.type === "income")
            .reduce((sum: number, t: any) => sum + t.amount, 0);

        const totalExpense = monthlyTransactions
            .filter((t: any) => t.type === "expense")
            .reduce((sum: number, t: any) => sum + t.amount, 0);

        const balance = totalIncome - totalExpense;

        // Get spending by category for current month
        const expensesByCategory = monthlyTransactions
            .filter((t: any) => t.type === "expense")
            .reduce((acc: Record<string, number>, t: any) => {
                const categoryName = t.category?.name || "Lainnya";
                acc[categoryName] = (acc[categoryName] || 0) + t.amount;
                return acc;
            }, {} as Record<string, number>);

        // Get top expense categories
        const topCategories = Object.entries(expensesByCategory)
            .sort(([, a]: any, [, b]: any) => b - a)
            .slice(0, 3)
            .map(([name]) => name);

        // Get chart data for last 6 months
        const chartData = [];
        for (let i = 5; i >= 0; i--) {
            const monthDate = new Date(currentYear, currentMonth - i, 1);
            const monthEnd = new Date(currentYear, currentMonth - i + 1, 0, 23, 59, 59);

            const monthTransactions = await prisma.transaction.findMany({
                where: {
                    userId,
                    date: {
                        gte: monthDate,
                        lte: monthEnd,
                    },
                },
            });

            const monthIncome = monthTransactions
                .filter((t: any) => t.type === "income")
                .reduce((sum: number, t: any) => sum + t.amount, 0);

            const monthExpense = monthTransactions
                .filter((t: any) => t.type === "expense")
                .reduce((sum: number, t: any) => sum + t.amount, 0);

            chartData.push({
                month: monthDate.toLocaleString("id-ID", { month: "long" }),
                income: monthIncome,
                expense: monthExpense,
            });
        }

        // Get recent transactions (last 5)
        const recentTransactions = await prisma.transaction.findMany({
            where: { userId },
            include: { category: true },
            orderBy: { date: "desc" },
            take: 5,
        });

        return NextResponse.json({
            balance,
            totalIncome,
            totalExpense,
            topCategories,
            chartData,
            expensesByCategory,
            recentTransactions,
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
