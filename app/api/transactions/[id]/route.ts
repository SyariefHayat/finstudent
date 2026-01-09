import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// DELETE /api/transactions/[id] - Delete a transaction
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

        // Check if transaction belongs to user
        const transaction = await prisma.transaction.findFirst({
            where: {
                id,
                userId: session.user.id,
            },
        });

        if (!transaction) {
            return NextResponse.json(
                { error: "Transaksi tidak ditemukan" },
                { status: 404 }
            );
        }

        await prisma.transaction.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Transaksi berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
