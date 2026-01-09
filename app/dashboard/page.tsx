"use client"

import * as React from "react"
import { TrendingDown, DollarSign, Wallet, Loader2 } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    income: {
        label: "Pemasukan",
        color: "hsl(var(--chart-1))",
    },
    expense: {
        label: "Pengeluaran",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

interface DashboardStats {
    balance: number
    totalIncome: number
    totalExpense: number
    topCategories: string[]
    chartData: { month: string; income: number; expense: number }[]
    expensesByCategory: Record<string, number>
}

export default function DashboardPage() {
    const [stats, setStats] = React.useState<DashboardStats | null>(null)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        fetchStats()
    }, [])

    async function fetchStats() {
        try {
            const res = await fetch("/api/dashboard/stats")
            if (res.ok) {
                const data = await res.json()
                setStats(data)
            }
        } catch (error) {
            console.error("Error fetching stats:", error)
        } finally {
            setIsLoading(false)
        }
    }

    function formatCurrency(amount: number) {
        return new Intl.NumberFormat("id-ID").format(amount)
    }

    if (isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    // Get top 4 expense categories for budget display
    const budgetCategories = stats?.expensesByCategory
        ? Object.entries(stats.expensesByCategory)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 4)
        : []

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-4">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Saldo
                        </CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${(stats?.balance || 0) >= 0 ? '' : 'text-red-600'}`}>
                            Rp {formatCurrency(stats?.balance || 0)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Pemasukan - Pengeluaran bulan ini
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pemasukan Bulan Ini
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            Rp {formatCurrency(stats?.totalIncome || 0)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {stats?.topCategories?.filter((_, i) => i < 2).join(" & ") || "Belum ada pemasukan"}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pengeluaran Bulan Ini
                        </CardTitle>
                        <TrendingDown className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            Rp {formatCurrency(stats?.totalExpense || 0)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {stats?.topCategories?.slice(0, 3).join(", ") || "Belum ada pengeluaran"}
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview Keuangan</CardTitle>
                        <CardDescription>
                            Perbandingan pemasukan dan pengeluaran 6 bulan terakhir.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <BarChart accessibilityLayer data={stats?.chartData || []}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dashed" />}
                                />
                                <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                                <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Pengeluaran per Kategori</CardTitle>
                        <CardDescription>
                            4 kategori pengeluaran terbesar bulan ini.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {budgetCategories.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    Belum ada data pengeluaran
                                </p>
                            ) : (
                                budgetCategories.map(([category, amount]) => {
                                    const percentage = stats?.totalExpense
                                        ? Math.round((amount / stats.totalExpense) * 100)
                                        : 0
                                    return (
                                        <div key={category} className="flex items-center">
                                            <div className="ml-4 space-y-1 flex-1">
                                                <p className="text-sm font-medium leading-none">{category}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Rp {formatCurrency(amount)}
                                                </p>
                                            </div>
                                            <div className={`font-medium ${percentage >= 50 ? 'text-red-600' : percentage >= 30 ? 'text-yellow-600' : 'text-green-600'}`}>
                                                {percentage}%
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
