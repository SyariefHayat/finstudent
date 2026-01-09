"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Plus, Filter, Trash2, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface Category {
    id: string
    name: string
    type: string
    icon: string | null
}

interface Transaction {
    id: string
    amount: number
    type: "income" | "expense"
    description: string
    date: string
    category: Category
}

export default function TransactionsPage() {
    const [transactions, setTransactions] = React.useState<Transaction[]>([])
    const [categories, setCategories] = React.useState<Category[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)

    // Form states
    const [date, setDate] = React.useState<Date>()
    const [type, setType] = React.useState<"income" | "expense">("expense")
    const [amount, setAmount] = React.useState("")
    const [categoryId, setCategoryId] = React.useState("")
    const [description, setDescription] = React.useState("")

    // Fetch transactions and categories on mount
    React.useEffect(() => {
        fetchTransactions()
        fetchCategories()
    }, [])

    async function fetchTransactions() {
        try {
            const res = await fetch("/api/transactions")
            if (res.ok) {
                const data = await res.json()
                setTransactions(data)
            }
        } catch (error) {
            console.error("Error fetching transactions:", error)
        } finally {
            setIsLoading(false)
        }
    }

    async function fetchCategories() {
        try {
            const res = await fetch("/api/categories")
            if (res.ok) {
                const data = await res.json()
                setCategories(data)
            }
        } catch (error) {
            console.error("Error fetching categories:", error)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!amount || !categoryId || !date || !description) {
            alert("Semua field harus diisi")
            return
        }

        setIsSubmitting(true)
        try {
            const res = await fetch("/api/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    type,
                    categoryId,
                    date: date.toISOString(),
                    description,
                }),
            })

            if (res.ok) {
                const newTransaction = await res.json()
                setTransactions([newTransaction, ...transactions])
                resetForm()
                setIsDialogOpen(false)
            } else {
                const error = await res.json()
                alert(error.error || "Gagal menyimpan transaksi")
            }
        } catch (error) {
            console.error("Error creating transaction:", error)
            alert("Terjadi kesalahan")
        } finally {
            setIsSubmitting(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Apakah kamu yakin ingin menghapus transaksi ini?")) return

        try {
            const res = await fetch(`/api/transactions/${id}`, {
                method: "DELETE",
            })

            if (res.ok) {
                setTransactions(transactions.filter((t) => t.id !== id))
            } else {
                alert("Gagal menghapus transaksi")
            }
        } catch (error) {
            console.error("Error deleting transaction:", error)
            alert("Terjadi kesalahan")
        }
    }

    function resetForm() {
        setDate(undefined)
        setType("expense")
        setAmount("")
        setCategoryId("")
        setDescription("")
    }

    // Filter categories based on transaction type
    const filteredCategories = categories.filter(
        (cat) => cat.type === type || cat.type === "both"
    )

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Riwayat Transaksi</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filter
                        </span>
                    </Button>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm" className="h-8 gap-1">
                                <Plus className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Input Transaksi
                                </span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>Input Transaksi Baru</DialogTitle>
                                    <DialogDescription>
                                        Catat pemasukan atau pengeluaranmu di sini.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="type" className="text-right">
                                            Tipe
                                        </Label>
                                        <RadioGroup
                                            value={type}
                                            onValueChange={(v) => {
                                                setType(v as "income" | "expense")
                                                setCategoryId("")
                                            }}
                                            className="col-span-3 flex gap-4"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="income" id="income" />
                                                <Label htmlFor="income">Pemasukan</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="expense" id="expense" />
                                                <Label htmlFor="expense">Pengeluaran</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="amount" className="text-right">
                                            Jumlah
                                        </Label>
                                        <div className="col-span-3 relative">
                                            <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">Rp</span>
                                            <Input
                                                id="amount"
                                                className="pl-9"
                                                type="number"
                                                placeholder="0"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="category" className="text-right">
                                            Kategori
                                        </Label>
                                        <Select value={categoryId} onValueChange={setCategoryId}>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Pilih kategori" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filteredCategories.map((cat) => (
                                                    <SelectItem key={cat.id} value={cat.id}>
                                                        {cat.icon} {cat.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="date" className="text-right">
                                            Tanggal
                                        </Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "col-span-3 justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : <span>Pilih tanggal</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="note" className="text-right">
                                            Catatan
                                        </Label>
                                        <Input
                                            id="note"
                                            className="col-span-3"
                                            placeholder="Contoh: Makan siang warteg"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Simpan Transaksi
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Deskripsi</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead className="text-right">Jumlah</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                </TableCell>
                            </TableRow>
                        ) : transactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    Belum ada transaksi. Klik &quot;Input Transaksi&quot; untuk memulai.
                                </TableCell>
                            </TableRow>
                        ) : (
                            transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="font-medium">
                                        {format(new Date(transaction.date), "dd MMM yyyy")}
                                    </TableCell>
                                    <TableCell>{transaction.description}</TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20">
                                            {transaction.category?.icon} {transaction.category?.name}
                                        </span>
                                    </TableCell>
                                    <TableCell className={cn("text-right font-medium", transaction.type === 'income' ? 'text-green-600' : 'text-red-600')}>
                                        {transaction.type === 'income' ? '+' : '-'} Rp {transaction.amount.toLocaleString('id-ID')}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                            onClick={() => handleDelete(transaction.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
