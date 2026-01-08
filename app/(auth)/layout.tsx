import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-10 text-white dark:border-r">
        <div className="flex items-center gap-2 text-lg font-medium">
          <GraduationCap className="h-6 w-6" />
          FinStudent
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Mengatur keuangan sejak dini adalah kunci kebebasan finansial di masa depan. Aplikasi ini membantu saya memantau setiap pengeluaran kampus dengan mudah.&rdquo;
            </p>
            <footer className="text-sm">Andi Saputra - Mahasiswa Ekonomi</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          {children}
        </div>
      </div>
    </div>
  );
}
