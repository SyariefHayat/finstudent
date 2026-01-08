"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Plus, Filter } from "lucide-react"

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

const transactions = [
    {
        id: "TRX-9874",
        date: new Date(2024, 0, 15),
        description: "Makan Siang Warteg",
        category: "Makanan",
        amount: 15000,
        type: "expense",
    },
    {
        id: "TRX-9875",
        date: new Date(2024, 0, 16),
        description: "Transport Gojek Kampus",
        category: "Transportasi",
        amount: 12000,
        type: "expense",
    },
    {
        id: "TRX-9876",
        date: new Date(2024, 0, 17),
        description: "Transfer Bulanan Ortu",
        category: "Pemasukan",
        amount: 1500000,
        type: "income",
    },
    {
        id: "TRX-9877",
        date: new Date(2024, 0, 18),
        description: "Netflix Subscription",
        category: "Hiburan",
        amount: 50000,
        type: "expense",
    },
    {
        id: "TRX-9878",
        date: new Date(2024, 0, 20),
        description: "Buku Paket Kuliah",
        category: "Pendidikan",
        amount: 85000,
        type: "expense",
    },
]

export default function TransactionsPage() {
    const [date, setDate] = React.useState<Date>()

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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" className="h-8 gap-1">
                                <Plus className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Input Transaksi
                                </span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
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
                                    <RadioGroup defaultValue="expense" className="col-span-3 flex gap-4">
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
                                        <Input id="amount" className="pl-9" type="number" placeholder="0" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">
                                        Kategori
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="food">Makanan</SelectItem>
                                            <SelectItem value="transport">Transportasi</SelectItem>
                                            <SelectItem value="entertainment">Hiburan</SelectItem>
                                            <SelectItem value="education">Pendidikan</SelectItem>
                                            <SelectItem value="others">Lainnya</SelectItem>
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
                                    <Input id="note" className="col-span-3" placeholder="Contoh: Makan siang warteg" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Simpan Transaksi</Button>
                            </DialogFooter>
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell className="font-medium">
                                    {format(transaction.date, "dd MMM yyyy")}
                                </TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20">
                                        {transaction.category}
                                    </span>
                                </TableCell>
                                <TableCell className={cn("text-right font-medium", transaction.type === 'income' ? 'text-green-600' : 'text-red-600')}>
                                    {transaction.type === 'income' ? '+' : '-'} Rp {transaction.amount.toLocaleString('id-ID')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
