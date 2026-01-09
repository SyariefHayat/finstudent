"use client"

import * as React from "react"
import { Plus, Trash2, TrendingUp, Loader2, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Category {
    id: string
    name: string
    icon: string | null
}

interface BudgetWithSpent {
    id: string
    amount: number
    categoryId: string
    category: Category
    spent: number
    percentage: number
}

export default function BudgetPage() {
    const [budgets, setBudgets] = React.useState<BudgetWithSpent[]>([])
    const [categories, setCategories] = React.useState<Category[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)

    // Form states
    const [categoryId, setCategoryId] = React.useState("")
    const [amount, setAmount] = React.useState("")

    // Savings simulation
    const [dailySaving, setDailySaving] = React.useState("10000")
    const [duration, setDuration] = React.useState("12")

    React.useEffect(() => {
        fetchBudgets()
    }, [])

    async function fetchBudgets() {
        try {
            const res = await fetch("/api/budgets")
            if (res.ok) {
                const data = await res.json()
                setBudgets(data.budgets)
                setCategories(data.categories)
            }
        } catch (error) {
            console.error("Error fetching budgets:", error)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!categoryId || !amount) {
            alert("Pilih kategori dan masukkan jumlah budget")
            return
        }

        setIsSubmitting(true)
        try {
            const res = await fetch("/api/budgets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoryId, amount: parseFloat(amount) }),
            })

            if (res.ok) {
                await fetchBudgets()
                resetForm()
                setIsDialogOpen(false)
            } else {
                const error = await res.json()
                alert(error.error || "Gagal menyimpan budget")
            }
        } catch (error) {
            console.error("Error creating budget:", error)
            alert("Terjadi kesalahan")
        } finally {
            setIsSubmitting(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Apakah kamu yakin ingin menghapus budget ini?")) return

        try {
            const res = await fetch(`/api/budgets/${id}`, { method: "DELETE" })
            if (res.ok) {
                setBudgets(budgets.filter((b) => b.id !== id))
            } else {
                alert("Gagal menghapus budget")
            }
        } catch (error) {
            console.error("Error deleting budget:", error)
        }
    }

    function resetForm() {
        setCategoryId("")
        setAmount("")
    }

    function formatCurrency(num: number) {
        return new Intl.NumberFormat("id-ID").format(num)
    }

    function getStatusInfo(percentage: number) {
        if (percentage >= 100) {
            return { label: "Over Budget!", color: "text-red-500", icon: AlertTriangle, bgColor: "bg-red-500" }
        } else if (percentage >= 80) {
            return { label: "Waspada", color: "text-yellow-500", icon: AlertCircle, bgColor: "bg-yellow-500" }
        }
        return { label: "Aman", color: "text-green-500", icon: CheckCircle, bgColor: "bg-green-500" }
    }

    // Calculate totals
    const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0)
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)
    const totalPercentage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0

    // Savings calculation
    const savingsResult = parseInt(dailySaving) * 30 * parseInt(duration)

    // Get available categories (not yet budgeted)
    const budgetedCategoryIds = budgets.map((b) => b.categoryId)
    const availableCategories = categories.filter((c) => !budgetedCategoryIds.includes(c.id))

    if (isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Perencanaan Anggaran</h1>
                    <p className="text-muted-foreground">Atur dan pantau budget per kategori</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Set Budget Kategori
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <DialogHeader>
                                <DialogTitle>Set Budget Kategori</DialogTitle>
                                <DialogDescription>
                                    Tentukan batas pengeluaran untuk kategori tertentu bulan ini.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label>Kategori</Label>
                                    <Select value={categoryId} onValueChange={setCategoryId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableCategories.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id}>
                                                    {cat.icon} {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Batas Budget (Rp)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">Rp</span>
                                        <Input
                                            className="pl-9"
                                            type="number"
                                            placeholder="100000"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Simpan Budget
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Rp {formatCurrency(totalBudget)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Terpakai</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-500">Rp {formatCurrency(totalSpent)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Sisa Budget</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${totalBudget - totalSpent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            Rp {formatCurrency(totalBudget - totalSpent)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Budget List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Status Budget Bulan Ini</CardTitle>
                        <CardDescription>Pantau realisasi pengeluaran vs rencana</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {budgets.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                <p>Belum ada budget yang diset.</p>
                                <p className="text-sm">Klik &quot;Set Budget Kategori&quot; untuk memulai.</p>
                            </div>
                        ) : (
                            budgets.map((budget) => {
                                const status = getStatusInfo(budget.percentage)
                                const StatusIcon = status.icon
                                return (
                                    <div key={budget.id} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <span>{budget.category.icon}</span>
                                                <span className="font-medium">{budget.category.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className={`flex items-center gap-1 text-sm font-bold ${status.color}`}>
                                                    <StatusIcon className="h-4 w-4" />
                                                    {status.label}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                    onClick={() => handleDelete(budget.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <Progress
                                            value={Math.min(budget.percentage, 100)}
                                            className="h-2"
                                        />
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>Terpakai: Rp {formatCurrency(budget.spent)}</span>
                                            <span>Batas: Rp {formatCurrency(budget.amount)}</span>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </CardContent>
                </Card>

                {/* Savings Simulation */}
                <Card>
                    <CardHeader>
                        <CardTitle>Simulasi Tabungan</CardTitle>
                        <CardDescription>Lihat dampak menabung setiap hari</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Nominal Menabung Harian</Label>
                                <Select value={dailySaving} onValueChange={setDailySaving}>
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
                                <Select value={duration} onValueChange={setDuration}>
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
                        <div className="bg-linear-to-br from-primary/10 to-primary/5 p-6 rounded-xl text-center space-y-2">
                            <p className="text-muted-foreground text-sm">Estimasi Perolehan:</p>
                            <h3 className="text-4xl font-bold text-primary">Rp {formatCurrency(savingsResult)}</h3>
                            <p className="text-sm text-muted-foreground">
                                {savingsResult >= 3000000 && "Cukup untuk liburan atau upgrade laptop! 🎉"}
                                {savingsResult >= 1000000 && savingsResult < 3000000 && "Bisa untuk dana darurat atau beli gadget! 📱"}
                                {savingsResult < 1000000 && "Mulai dari yang kecil, konsistensi yang penting! 💪"}
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <AlertTitle className="text-blue-800 dark:text-blue-200">Tips Menabung</AlertTitle>
                            <AlertDescription className="text-blue-700 dark:text-blue-300">
                                Sisihkan uang di awal bulan, bukan di akhir. Bayar dirimu sendiri dulu!
                            </AlertDescription>
                        </Alert>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
