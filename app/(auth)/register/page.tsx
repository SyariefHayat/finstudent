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

export default function RegisterPage() {
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
            <CardContent className="grid gap-4 px-0">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" placeholder="Andi Saputra" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email Kampus / Pribadi</Label>
                    <Input id="email" type="email" placeholder="nama@mahasiswa.ac.id" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="status">Status Mahasiswa</Label>
                    <Select>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Mahasiswa Aktif</SelectItem>
                            <SelectItem value="gap_year">Cuti / Gap Year</SelectItem>
                            <SelectItem value="fresh_grad">Fresh Graduate</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 px-0">
                <Button className="w-full">Daftar Akun</Button>
                <div className="text-center text-sm text-muted-foreground">
                    Sudah punya akun?{" "}
                    <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                        Masuk
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
