"use client"

import * as React from "react"
import { Calculator, Coffee, PiggyBank, TrendingUp, CreditCard, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function SimulationPage() {
    // Latte Factor state
    const [latteCost, setLatteCost] = React.useState(25000)
    const [latteFreq, setLatteFreq] = React.useState(5)

    // Savings Goal state
    const [targetAmount, setTargetAmount] = React.useState(5000000)
    const [monthlyDeposit, setMonthlyDeposit] = React.useState(500000)
    const [interestRate, setInterestRate] = React.useState(5)

    // Investment state
    const [investAmount, setInvestAmount] = React.useState(1000000)
    const [investMonthly, setInvestMonthly] = React.useState(500000)
    const [investYears, setInvestYears] = React.useState(5)
    const [investReturn, setInvestReturn] = React.useState(12)

    // Loan state
    const [loanAmount, setLoanAmount] = React.useState(10000000)
    const [loanTenor, setLoanTenor] = React.useState(12)
    const [loanInterest, setLoanInterest] = React.useState(15)

    function formatCurrency(num: number): string {
        return new Intl.NumberFormat("id-ID").format(Math.round(num))
    }

    // Latte Factor calculation
    const latteAnnual = latteCost * latteFreq * 4 * 12
    const latte5Years = latteAnnual * 5

    // Savings Goal calculation
    const monthsToGoal = Math.ceil(targetAmount / monthlyDeposit)
    const yearsToGoal = Math.floor(monthsToGoal / 12)
    const remainingMonths = monthsToGoal % 12

    // Investment calculation (compound interest)
    function calculateInvestment() {
        const monthlyRate = investReturn / 100 / 12
        const months = investYears * 12
        let total = investAmount

        for (let i = 0; i < months; i++) {
            total = total * (1 + monthlyRate) + investMonthly
        }

        const totalDeposit = investAmount + (investMonthly * months)
        const profit = total - totalDeposit

        return { total, totalDeposit, profit }
    }

    const investment = calculateInvestment()

    // Loan calculation (flat rate for simplicity)
    const totalLoanInterest = (loanAmount * (loanInterest / 100) * loanTenor) / 12
    const totalLoan = loanAmount + totalLoanInterest
    const monthlyPayment = totalLoan / loanTenor

    // Suggestions based on latte result
    function getSuggestions(amount: number) {
        if (amount >= 10000000) {
            return ["iPhone terbaru", "Liburan ke Bali", "Modal usaha online"]
        } else if (amount >= 5000000) {
            return ["Smartphone mid-range", "Tiket konser VIP", "Kursus online premium"]
        } else if (amount >= 2000000) {
            return ["Headphone bagus", "Sepatu branded", "Langganan gym 1 tahun"]
        }
        return ["Buku-buku keren", "Aksesori gadget", "Hangout bareng teman"]
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Simulasi Keuangan</h1>
                    <p className="text-muted-foreground">Hitung dan rencanakan keuanganmu</p>
                </div>
            </div>

            <Tabs defaultValue="latte" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
                    <TabsTrigger value="latte" className="gap-2">
                        <Coffee className="h-4 w-4" />
                        <span className="hidden sm:inline">Latte Factor</span>
                    </TabsTrigger>
                    <TabsTrigger value="savings" className="gap-2">
                        <Target className="h-4 w-4" />
                        <span className="hidden sm:inline">Target</span>
                    </TabsTrigger>
                    <TabsTrigger value="invest" className="gap-2">
                        <TrendingUp className="h-4 w-4" />
                        <span className="hidden sm:inline">Investasi</span>
                    </TabsTrigger>
                    <TabsTrigger value="loan" className="gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span className="hidden sm:inline">Cicilan</span>
                    </TabsTrigger>
                </TabsList>

                {/* LATTE FACTOR TAB */}
                <TabsContent value="latte" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Coffee className="h-5 w-5 text-orange-500" />
                                    The Latte Factor
                                </CardTitle>
                                <CardDescription>
                                    Lihat dampak jajan kecil setiap hari terhadap keuanganmu
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
                                        min={1}
                                        step={1}
                                        onValueChange={(val) => setLatteFreq(val[0])}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-linear-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-900">
                            <CardHeader>
                                <CardTitle>Hasil Simulasi</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-background/80 rounded-lg">
                                        <p className="text-sm text-muted-foreground">1 Tahun</p>
                                        <p className="text-2xl font-bold text-orange-600">Rp {formatCurrency(latteAnnual)}</p>
                                    </div>
                                    <div className="text-center p-4 bg-background/80 rounded-lg">
                                        <p className="text-sm text-muted-foreground">5 Tahun</p>
                                        <p className="text-2xl font-bold text-orange-600">Rp {formatCurrency(latte5Years)}</p>
                                    </div>
                                </div>
                                <div className="bg-background p-4 rounded-lg space-y-2">
                                    <p className="font-semibold text-sm">💡 Dengan uang segini, kamu bisa:</p>
                                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                                        {getSuggestions(latteAnnual).map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* SAVINGS GOAL TAB */}
                <TabsContent value="savings" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-green-500" />
                                    Kalkulator Target Menabung
                                </CardTitle>
                                <CardDescription>
                                    Hitung berapa lama untuk mencapai target tabunganmu
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Target Tabungan (Rp)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">Rp</span>
                                        <Input
                                            type="number"
                                            className="pl-9"
                                            value={targetAmount}
                                            onChange={(e) => setTargetAmount(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Setoran per Bulan (Rp)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">Rp</span>
                                        <Input
                                            type="number"
                                            className="pl-9"
                                            value={monthlyDeposit}
                                            onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="outline" onClick={() => setTargetAmount(3000000)}>
                                        HP Baru
                                    </Button>
                                    <Button variant="outline" onClick={() => setTargetAmount(10000000)}>
                                        Laptop
                                    </Button>
                                    <Button variant="outline" onClick={() => setTargetAmount(5000000)}>
                                        Liburan
                                    </Button>
                                    <Button variant="outline" onClick={() => setTargetAmount(20000000)}>
                                        Motor
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-900">
                            <CardHeader>
                                <CardTitle>⏱️ Waktu yang Dibutuhkan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center py-6">
                                    <p className="text-4xl font-bold text-green-600">
                                        {yearsToGoal > 0 && `${yearsToGoal} tahun `}
                                        {remainingMonths > 0 && `${remainingMonths} bulan`}
                                        {monthsToGoal === 0 && "0 bulan"}
                                    </p>
                                    <p className="text-muted-foreground mt-2">
                                        ({monthsToGoal} bulan total)
                                    </p>
                                </div>
                                <div className="bg-background p-4 rounded-lg space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Target:</span>
                                        <span className="font-medium">Rp {formatCurrency(targetAmount)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Setoran/bulan:</span>
                                        <span className="font-medium">Rp {formatCurrency(monthlyDeposit)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* INVESTMENT TAB */}
                <TabsContent value="invest" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-purple-500" />
                                    Simulasi Investasi
                                </CardTitle>
                                <CardDescription>
                                    Lihat potensi pertumbuhan investasimu dengan bunga majemuk
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Modal Awal (Rp)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">Rp</span>
                                        <Input
                                            type="number"
                                            className="pl-9"
                                            value={investAmount}
                                            onChange={(e) => setInvestAmount(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Investasi Rutin per Bulan (Rp)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">Rp</span>
                                        <Input
                                            type="number"
                                            className="pl-9"
                                            value={investMonthly}
                                            onChange={(e) => setInvestMonthly(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Jangka Waktu</Label>
                                        <Select value={investYears.toString()} onValueChange={(v) => setInvestYears(Number(v))}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1 Tahun</SelectItem>
                                                <SelectItem value="3">3 Tahun</SelectItem>
                                                <SelectItem value="5">5 Tahun</SelectItem>
                                                <SelectItem value="10">10 Tahun</SelectItem>
                                                <SelectItem value="20">20 Tahun</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Return per Tahun</Label>
                                        <Select value={investReturn.toString()} onValueChange={(v) => setInvestReturn(Number(v))}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="6">6% (Reksa Dana Pasar Uang)</SelectItem>
                                                <SelectItem value="8">8% (Reksa Dana Obligasi)</SelectItem>
                                                <SelectItem value="12">12% (Reksa Dana Saham)</SelectItem>
                                                <SelectItem value="15">15% (Saham Agresif)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-linear-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 dark:border-purple-900">
                            <CardHeader>
                                <CardTitle>📈 Proyeksi Investasi</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center py-4">
                                    <p className="text-sm text-muted-foreground">Total setelah {investYears} tahun</p>
                                    <p className="text-4xl font-bold text-purple-600">
                                        Rp {formatCurrency(investment.total)}
                                    </p>
                                </div>
                                <div className="bg-background p-4 rounded-lg space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span>Total Setoran:</span>
                                        <span className="font-medium">Rp {formatCurrency(investment.totalDeposit)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Keuntungan:</span>
                                        <span className="font-bold">+Rp {formatCurrency(investment.profit)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>Return:</span>
                                        <span>{((investment.profit / investment.totalDeposit) * 100).toFixed(1)}%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* LOAN TAB */}
                <TabsContent value="loan" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-red-500" />
                                    Kalkulator Cicilan
                                </CardTitle>
                                <CardDescription>
                                    Hitung cicilan bulanan untuk pinjaman atau kredit
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Jumlah Pinjaman (Rp)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">Rp</span>
                                        <Input
                                            type="number"
                                            className="pl-9"
                                            value={loanAmount}
                                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Tenor (Bulan)</Label>
                                        <Select value={loanTenor.toString()} onValueChange={(v) => setLoanTenor(Number(v))}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="3">3 Bulan</SelectItem>
                                                <SelectItem value="6">6 Bulan</SelectItem>
                                                <SelectItem value="12">12 Bulan</SelectItem>
                                                <SelectItem value="24">24 Bulan</SelectItem>
                                                <SelectItem value="36">36 Bulan</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Bunga per Tahun</Label>
                                        <Select value={loanInterest.toString()} onValueChange={(v) => setLoanInterest(Number(v))}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="5">5% (KPR Bank)</SelectItem>
                                                <SelectItem value="10">10% (Kredit Motor)</SelectItem>
                                                <SelectItem value="15">15% (Kredit HP)</SelectItem>
                                                <SelectItem value="24">24% (Paylater)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <Button variant="outline" size="sm" onClick={() => setLoanAmount(3000000)}>
                                        HP
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => setLoanAmount(15000000)}>
                                        Motor
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => setLoanAmount(200000000)}>
                                        KPR
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-linear-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-red-200 dark:border-red-900">
                            <CardHeader>
                                <CardTitle>💳 Rincian Cicilan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center py-4">
                                    <p className="text-sm text-muted-foreground">Cicilan per Bulan</p>
                                    <p className="text-4xl font-bold text-red-600">
                                        Rp {formatCurrency(monthlyPayment)}
                                    </p>
                                </div>
                                <div className="bg-background p-4 rounded-lg space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span>Pokok Pinjaman:</span>
                                        <span className="font-medium">Rp {formatCurrency(loanAmount)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-red-600">
                                        <span>Total Bunga:</span>
                                        <span className="font-bold">Rp {formatCurrency(totalLoanInterest)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm border-t pt-2">
                                        <span>Total Bayar:</span>
                                        <span className="font-bold">Rp {formatCurrency(totalLoan)}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground text-center">
                                    ⚠️ Pastikan cicilan tidak melebihi 30% dari pendapatan bulananmu
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
