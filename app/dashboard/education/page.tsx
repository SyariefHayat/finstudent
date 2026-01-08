"use client"

import { BookOpen, PlayCircle, TrendingUp, Lightbulb, Wallet, ArrowRight } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AspectRatio } from "@/components/ui/aspect-ratio"


export default function EducationPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Pusat Edukasi</h1>
                <div className="flex items-center gap-2">
                    {/* Search functionality can be added here */}
                </div>
            </div>

            <Tabs defaultValue="articles" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="articles">Artikel & Tips</TabsTrigger>
                    <TabsTrigger value="videos">Video Pembelajaran</TabsTrigger>
                    <TabsTrigger value="glossary">Kamus Istilah</TabsTrigger>
                </TabsList>

                <TabsContent value="articles" className="space-y-4">
                    {/* Featured Article */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4 border-none shadow-none bg-primary/5 dark:bg-primary/10">
                            <CardHeader>
                                <Badge className="w-fit mb-2">Topik Minggu Ini</Badge>
                                <CardTitle className="text-2xl">Strategi Menabung di Era 'Latte Factor'</CardTitle>
                                <CardDescription className="text-base text-foreground/80">
                                    Sadarkah kamu kalau jajan kopi setiap hari bisa menghabiskan hingga 1 juta per bulan? Simak cara mengatasinya tanpa berhenti ngopi total.
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button className="gap-2">Baca Selengkapnya <ArrowRight className="h-4 w-4" /></Button>
                            </CardFooter>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Rekomendasi Personal</CardTitle>
                                <CardDescription>Berdasarkan pengeluaranmu bulan lalu di kategori 'Makanan'.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <Link href="#" className="flex items-start gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors">
                                    <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                                        <Lightbulb className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">Masak Sendiri vs Beli Makan</h4>
                                        <p className="text-xs text-muted-foreground line-clamp-2">Perbandingan biaya makan anak kost yang masak nasi sendiri dibanding beli full.</p>
                                    </div>
                                </Link>
                                <Link href="#" className="flex items-start gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors">
                                    <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                        <Wallet className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">5 Aplikasi Promo Makanan</h4>
                                        <p className="text-xs text-muted-foreground line-clamp-2">Daftar aplikasi yang sering kasih diskon gede buat mahasiswa.</p>
                                    </div>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Card key={i} className="flex flex-col">
                                <div className="w-full aspect-video bg-muted relative rounded-t-xl overflow-hidden">
                                    {/* Placeholder image logic or actual image component */}
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gray-100 dark:bg-gray-800">
                                        <BookOpen className="h-10 w-10 opactiy-20" />
                                    </div>
                                </div>
                                <CardHeader>
                                    <div className="flex justify-between items-center mb-2">
                                        <Badge variant="outline">Dasar</Badge>
                                        <span className="text-xs text-muted-foreground">5 min baca</span>
                                    </div>
                                    <CardTitle className="text-lg">Dasar-dasar Investasi Saham</CardTitle>
                                    <CardDescription>Apa itu saham, IHSG, dan bagaimana cara memulainya dengan modal 100 ribu.</CardDescription>
                                </CardHeader>
                                <CardFooter className="mt-auto">
                                    <Button variant="ghost" className="w-full justify-start p-0 h-auto font-semibold hover:bg-transparent hover:text-primary">
                                        Baca Artikel
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="videos" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <Card key={i}>
                                <CardContent className="p-0">
                                    <AspectRatio ratio={16 / 9} className="bg-muted rounded-t-xl overflow-hidden relative group cursor-pointer">
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                                            <PlayCircle className="h-12 w-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
                                        </div>
                                    </AspectRatio>
                                    <div className="p-4 space-y-2">
                                        <h3 className="font-semibold leading-none tracking-tight">Cara Mengatur Gaji Magang Pertama</h3>
                                        <p className="text-sm text-muted-foreground">Oleh: Felicia Putri</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
