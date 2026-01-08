"use client"

import * as React from "react"
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react"

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
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function BudgetPage() {
    const [income, setIncome] = React.useState(2500000)
    const [needs, setNeeds] = React.useState(50)
    const [wants, setWants] = React.useState(30)
    const [savings, setSavings] = React.useState(20)

    // Recalculate based on slider changes
    const handleNeedsChange = (val: number[]) => {
        setNeeds(val[0])
        // Simplified logic: adjust wants/savings ideally, here just clamped for UI demo
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Perencanaan Anggaran</h1>
                <Button>Buat Kategori Baru</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Budget Calculator (50/30/20)</CardTitle>
                        <CardDescription>
                            Metode budgeting populer untuk mahasiswa. Masukkan pemasukan bulananmu.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="monthly-income">Pemasukan Bulanan (Rp)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">Rp</span>
                                <Input
                                    id="monthly-income"
                                    className="pl-9"
                                    type="number"
                                    value={income}
                                    onChange={(e) => setIncome(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">Kebutuhan (Needs) - {needs}%</span>
                                    <span className="text-muted-foreground">Rp {(income * needs / 100).toLocaleString('id-ID')}</span>
                                </div>
                                <Slider defaultValue={[50]} max={100} step={5} onValueChange={handleNeedsChange} />
                                <p className="text-xs text-muted-foreground">Makan, Kost, Listrik, Transport</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">Keinginan (Wants) - {wants}%</span>
                                    <span className="text-muted-foreground">Rp {(income * wants / 100).toLocaleString('id-ID')}</span>
                                </div>
                                <Progress value={30} className="h-2" />
                                <p className="text-xs text-muted-foreground">Netflix, Hangout, Hobi</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">Tabungan (Savings) - {savings}%</span>
                                    <span className="text-muted-foreground">Rp {(income * savings / 100).toLocaleString('id-ID')}</span>
                                </div>
                                <Progress value={20} className="h-2" />
                                <p className="text-xs text-muted-foreground">Dana Darurat, Investasi</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Alert className="bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-900">
                            <TrendingUp className="h-4 w-4" />
                            <AlertTitle>Tips Hemat</AlertTitle>
                            <AlertDescription>
                                Jika mengurangi budget 'Keinginan' sebesar 5%, kamu bisa menambah tabungan hingga Rp 125.000 bulan ini!
                            </AlertDescription>
                        </Alert>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Status Budget Bulan Ini</CardTitle>
                        <CardDescription>Pantau realisasi pengeluaran vs rencana.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <div className="font-medium">Makanan & Minuman</div>
                                <div className="text-sm font-bold text-red-500">Over Budget!</div>
                            </div>
                            <Progress value={110} className="h-2 bg-red-100 dark:bg-red-900/20" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Terpakai: Rp 1.650.000</span>
                                <span>Batas: Rp 1.500.000</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <div className="font-medium">Transportasi</div>
                                <div className="text-sm font-bold text-green-600">Aman</div>
                            </div>
                            <Progress value={45} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Terpakai: Rp 225.000</span>
                                <span>Batas: Rp 500.000</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <div className="font-medium">Hiburan</div>
                                <div className="text-sm font-bold text-yellow-600">Waspada</div>
                            </div>
                            <Progress value={85} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Terpakai: Rp 425.000</span>
                                <span>Batas: Rp 500.000</span>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Button variant="outline" className="w-full">Lihat Detail Kategori</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Simulasi Tabungan</CardTitle>
                        <CardDescription>Lihat dampak menabung kecil setiap hari.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-center gap-8">
                        <div className="space-y-4 w-full md:w-1/2">
                            <div className="space-y-2">
                                <Label>Nominal Menabung Harian</Label>
                                <Select defaultValue="10000">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5000">Rp 5.000 / hari</SelectItem>
                                        <SelectItem value="10000">Rp 10.000 / hari</SelectItem>
                                        <SelectItem value="20000">Rp 20.000 / hari</SelectItem>
                                        <SelectItem value="50000">Rp 50.000 / hari</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Durasi</Label>
                                <Select defaultValue="12">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="6">6 Bulan</SelectItem>
                                        <SelectItem value="12">1 Tahun</SelectItem>
                                        <SelectItem value="24">2 Tahun</SelectItem>
                                        <SelectItem value="48">4 Tahun (Lulus Kuliah)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 bg-muted/50 p-6 rounded-lg text-center space-y-2">
                            <p className="text-muted-foreground">Estimasi Perolehan:</p>
                            <h3 className="text-4xl font-bold text-primary">Rp 3.650.000</h3>
                            <p className="text-sm text-muted-foreground">Cukup untuk beli tiket liburan atau upgrade laptop!</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
