import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
    return (
        <Card className="border-none shadow-none">
            <CardHeader className="space-y-1 px-0">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Login ke Akun
                </CardTitle>
                <CardDescription>
                    Masukkan email dan password untuk mengakses dashboard keuanganmu.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 px-0">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="nama@mahasiswa.ac.id" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                </div>
                <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                    Lupa password?
                </Link>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 px-0">
                <Button className="w-full">Masuk</Button>
                <div className="text-center text-sm text-muted-foreground">
                    Belum punya akun?{" "}
                    <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                        Daftar sekarang
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
