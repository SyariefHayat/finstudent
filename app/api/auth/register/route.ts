import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password, status } = body;

        // Validasi input
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Nama, email, dan password harus diisi" },
                { status: 400 }
            );
        }

        // Cek email sudah terdaftar
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Email sudah terdaftar" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat user baru
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                status: status || "active",
            },
        });

        return NextResponse.json(
            {
                message: "Registrasi berhasil",
                user: { id: user.id, name: user.name, email: user.email },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Register error:", error);
        return NextResponse.json(
            { error: "Terjadi kesalahan saat registrasi" },
            { status: 500 }
        );
    }
}
