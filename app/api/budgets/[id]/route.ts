import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// DELETE /api/budgets/[id] - Delete a budget
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;

        // Check if budget belongs to user
        const budget = await prisma.budget.findFirst({
            where: {
                id,
                userId: session.user.id,
            },
        });

        if (!budget) {
            return NextResponse.json(
                { error: "Budget tidak ditemukan" },
                { status: 404 }
            );
        }

        await prisma.budget.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Budget berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting budget:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
