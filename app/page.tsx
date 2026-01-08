import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, PieChart, Wallet, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2 font-bold text-xl">
          <GraduationCap className="h-6 w-6" />
          <span>FinStudent</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="#" className="hover:text-primary">Fitur</Link>
          <Link href="#" className="hover:text-primary">Edukasi</Link>
          <Link href="#" className="hover:text-primary">Testimoni</Link>
        </nav>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost">Masuk</Button>
          </Link>
          <Link href="/register">
            <Button>Daftar Sekarang</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-6 text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Kelola Keuangan Kampus <br className="hidden md:block" />
            <span className="text-primary">Lebih Cerdas & Terencana</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Platform manajemen keuangan khusus mahasiswa. Catat pengeluaran, atur budget bulanan, dan pelajari literasi finansial dalam satu aplikasi.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Mulai Gratis <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Pelajari Fitur
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Preview */}
        <section id="features" className="py-20 bg-muted/50 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-xl border shadow-sm space-y-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <Wallet className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Tracking Pengeluaran</h3>
              <p className="text-muted-foreground">
                Catat setiap jajan dan biaya kuliah. Pantau sisa uang saku secara real-time.
              </p>
            </div>
            <div className="bg-background p-8 rounded-xl border shadow-sm space-y-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <PieChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Budgeting Cerdas</h3>
              <p className="text-muted-foreground">
                Terapkan metode 50/30/20. Dapatkan notifikasi saat pengeluaran hampir over budget.
              </p>
            </div>
            <div className="bg-background p-8 rounded-xl border shadow-sm space-y-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Edukasi Keuangan</h3>
              <p className="text-muted-foreground">
                Artikel dan tips praktis tentang cara menabung dan investasi untuk mahasiswa.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} FinStudent. Dibuat untuk Mahasiswa Indonesia.
      </footer>
    </div>
  );
}
