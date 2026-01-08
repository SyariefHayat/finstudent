"use client"

import * as React from "react"
import { Calculator, Coffee, ShoppingBag, PiggyBank, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export default function SimulationPage() {
    const [latteCost, setLatteCost] = React.useState(25000)
    const [latteFreq, setLatteFreq] = React.useState(5)
    const [latteResult, setLatteResult] = React.useState(0)

    React.useEffect(() => {
        setLatteResult(latteCost * latteFreq * 4 * 12) // Annual cost
    }, [latteCost, latteFreq])

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Simulasi Keuangan</h1>
            </div>

            <Tabs defaultValue="impulse" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                    <TabsTrigger value="impulse">Impulsive Buying</TabsTrigger>
                    <TabsTrigger value="savings">Target Menabung</TabsTrigger>
                </TabsList>

                <TabsContent value="impulse" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Coffee className="h-5 w-5 text-orange-600" />
                                    The "Latte Factor"
                                </CardTitle>
                                <CardDescription>
                                    Lihat seberapa besar dampak jajan kecil setiap hari terhadap keuanganmu dalam setahun.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Harga Jajan / Kopi (Rp)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">Rp</span>
                                        <Input
                                            type="number"
                                            className="pl-9"
                                            value={latteCost}
                                            onChange={(e) => setLatteCost(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <Label>Frekuensi per Minggu</Label>
                                        <span className="font-medium text-sm">{latteFreq}x seminggu</span>
                                    </div>
                                    <Slider
                                        value={[latteFreq]}
                                        max={7}
                                        step={1}
                                        onValueChange={(val) => setLatteFreq(val[0])}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20">
                            <CardHeader>
                                <CardTitle>Hasil Simulasi (1 Tahun)</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center py-6">
                                    <p className="text-muted-foreground mb-2">Kamu bisa menghemat:</p>
                                    <h2 className="text-4xl font-extrabold text-primary">Rp {latteResult.toLocaleString('id-ID')}</h2>
                                </div>
                                <div className="bg-background p-4 rounded-lg space-y-2 border">
                                    <p className="font-semibold text-sm">Dengan uang segini, kamu bisa beli:</p>
                                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                                        <li>Tiket Konser Festival (VIP)</li>
                                        <li>Smartphone Mid-range Baru</li>
                                        <li>Modal Usaha Kecil-kecilan</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="savings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Kalkulator Target Menabung</CardTitle>
                            <CardDescription>
                                Hitung berapa lama kamu harus menabung untuk barang impianmu.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center p-12 text-muted-foreground border-2 border-dashed rounded-lg">
                                <p>Fitur Kalkulator Menabung akan segera hadir!</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
