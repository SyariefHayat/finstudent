"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const registerSchema = z.object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    status: z.string().min(1, "Pilih status mahasiswa"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            status: "",
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || "Terjadi kesalahan saat registrasi");
                return;
            }

            // Redirect ke login setelah berhasil
            router.push("/login?registered=true");
        } catch {
            setError("Terjadi kesalahan saat registrasi");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="border-none shadow-none">
            <CardHeader className="space-y-1 px-0">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Buat Akun Baru
                </CardTitle>
                <CardDescription>
                    Isi data diri untuk mulai mengelola keuanganmu.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="grid gap-4 px-0">
                    {error && (
                        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                            {error}
                        </div>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                            id="name"
                            placeholder="Andi Saputra"
                            disabled={isLoading}
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-destructive text-sm">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email Kampus / Pribadi</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="nama@mahasiswa.ac.id"
                            disabled={isLoading}
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-destructive text-sm">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status Mahasiswa</Label>
                        <Select
                            onValueChange={(value) => setValue("status", value)}
                            disabled={isLoading}
                        >
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Pilih status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Mahasiswa Aktif</SelectItem>
                                <SelectItem value="gap_year">Cuti / Gap Year</SelectItem>
                                <SelectItem value="fresh_grad">Fresh Graduate</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.status && (
                            <p className="text-destructive text-sm">
                                {errors.status.message}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            disabled={isLoading}
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-destructive text-sm">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 px-0">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            "Daftar Akun"
                        )}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                        Sudah punya akun?{" "}
                        <Link
                            href="/login"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Masuk
                        </Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
}
