// Education content data for FinStudent

export interface Article {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: "dasar" | "menabung" | "investasi" | "tips";
    readTime: number; // in minutes
    featured?: boolean;
    image?: string;
}

export interface Video {
    id: string;
    title: string;
    author: string;
    duration: string;
    youtubeId: string;
    thumbnail?: string;
}

export interface GlossaryTerm {
    term: string;
    definition: string;
    example?: string;
}

// ============================================
// ARTICLES
// ============================================
export const articles: Article[] = [
    {
        id: "latte-factor",
        title: "Strategi Menabung di Era 'Latte Factor'",
        excerpt: "Sadarkah kamu kalau jajan kopi setiap hari bisa menghabiskan hingga 1 juta per bulan? Simak cara mengatasinya tanpa berhenti ngopi total.",
        content: `
## Apa Itu Latte Factor?

Latte Factor adalah istilah yang dipopulerkan oleh David Bach, penulis buku "The Automatic Millionaire". Konsep ini menjelaskan bagaimana pengeluaran kecil yang rutin bisa berdampak besar pada keuangan kita.

### Contoh Nyata

Bayangkan kamu beli kopi Rp 35.000 setiap hari:
- **Per minggu**: Rp 245.000
- **Per bulan**: Rp 1.050.000
- **Per tahun**: Rp 12.775.000

Angka yang cukup besar, bukan?

### Cara Mengatasinya

1. **Track pengeluaran kecil** - Catat semua jajan selama seminggu
2. **Set budget hiburan** - Alokasikan 20-30% untuk wants
3. **Buat kopi sendiri** - Investasi mesin kopi bisa hemat jutaan
4. **Jajan bijak** - Pilih 2-3 hari untuk treat yourself

### Tips Praktis

- Bawa tumbler ke kampus
- Cari promo dan diskon
- Ajak teman patungan
- Nabung selisihnya di celengan digital

Bukan berarti kamu harus berhenti ngopi sama sekali. Yang penting adalah sadar dan bijak dalam mengelola pengeluaran kecil yang rutin.
        `,
        category: "menabung",
        readTime: 5,
        featured: true,
    },
    {
        id: "investasi-saham-100rb",
        title: "Investasi Saham Modal 100 Ribu",
        excerpt: "Apa itu saham, IHSG, dan bagaimana cara memulainya dengan modal 100 ribu.",
        content: `
## Kenapa Harus Mulai Investasi Sekarang?

Semakin cepat kamu mulai investasi, semakin besar potensi keuntungan dari bunga majemuk (compound interest).

### Apa Itu Saham?

Saham adalah bukti kepemilikan atas suatu perusahaan. Ketika kamu beli saham, artinya kamu jadi salah satu pemilik perusahaan tersebut.

### Langkah Memulai

1. **Pilih sekuritas** - Download app seperti Stockbit, Ajaib, atau Bibit
2. **Registrasi & KYC** - Siapkan KTP dan foto selfie
3. **Deposit** - Mulai dari Rp 100.000
4. **Beli saham** - Pilih saham blue chip yang stabil

### Saham Rekomendasi Pemula

- **BBCA** - Bank BCA
- **TLKM** - Telekomunikasi Indonesia
- **UNVR** - Unilever Indonesia
- **ASII** - Astra International

### Tips Penting

- Investasi uang dingin (yang tidak dipakai dalam waktu dekat)
- Diversifikasi - jangan taruh semua telur di satu keranjang
- Belajar analisis fundamental
- Sabar dan konsisten
        `,
        category: "investasi",
        readTime: 7,
    },
    {
        id: "masak-vs-beli",
        title: "Masak Sendiri vs Beli Makan: Mana Lebih Hemat?",
        excerpt: "Perbandingan biaya makan anak kost yang masak nasi sendiri dibanding beli full.",
        content: `
## Perbandingan Biaya Bulanan

### Kalau Beli Makan Terus

| Item | Harga | Frekuensi | Total/Bulan |
|------|-------|-----------|-------------|
| Sarapan | Rp 15.000 | 30x | Rp 450.000 |
| Makan Siang | Rp 20.000 | 30x | Rp 600.000 |
| Makan Malam | Rp 25.000 | 30x | Rp 750.000 |
| **Total** | | | **Rp 1.800.000** |

### Kalau Masak Sendiri

| Item | Harga | Total/Bulan |
|------|-------|-------------|
| Beras 5kg | Rp 65.000 | Rp 65.000 |
| Telur 2 kg | Rp 50.000 | Rp 100.000 |
| Sayuran | Rp 150.000 | Rp 150.000 |
| Protein | Rp 200.000 | Rp 200.000 |
| Bumbu | Rp 50.000 | Rp 50.000 |
| **Total** | | **Rp 565.000** |

### Hemat: Rp 1.235.000/bulan!

### Tips Masak Hemat

1. Meal prep di akhir pekan
2. Beli di pasar tradisional
3. Masak porsi besar, simpan di kulkas
4. Ajak teman kost masak bareng
        `,
        category: "tips",
        readTime: 4,
    },
    {
        id: "atur-uang-kiriman",
        title: "Cara Mengatur Uang Kiriman Orang Tua",
        excerpt: "Panduan lengkap agar uang bulanan tidak habis di tengah bulan.",
        content: `
## Rumus 50/30/20

Metode budgeting paling simpel untuk mahasiswa:

- **50% Kebutuhan**: Kost, makan, transport, pulsa
- **30% Keinginan**: Hangout, Netflix, hobi
- **20% Tabungan**: Dana darurat, investasi

### Contoh Aplikasi

Jika kiriman Rp 2.000.000/bulan:

| Kategori | Alokasi | Jumlah |
|----------|---------|--------|
| Kebutuhan | 50% | Rp 1.000.000 |
| Keinginan | 30% | Rp 600.000 |
| Tabungan | 20% | Rp 400.000 |

### Tips Anti Bokek

1. **Langsung sisihkan tabungan** saat uang masuk
2. **Buat amplop virtual** di e-wallet
3. **Catat semua pengeluaran** 
4. **Review mingguan** untuk evaluasi

### Yang Sering Jadi Masalah

- Boros di awal bulan
- Lupa catat pengeluaran kecil
- FOMO (Fear Of Missing Out)
- Tidak punya dana darurat
        `,
        category: "dasar",
        readTime: 5,
    },
    {
        id: "aplikasi-promo-makanan",
        title: "5 Aplikasi Promo Makanan untuk Mahasiswa",
        excerpt: "Daftar aplikasi yang sering kasih diskon gede buat mahasiswa.",
        content: `
## 1. GrabFood

- Promo GRABHEMAT tiap hari
- Diskon hingga 50%
- Gratis ongkir dengan GrabUnlimited

## 2. GoFood

- Promo HEMAT setiap hari
- Voucher cashback sampai 40%
- Langganan GoClub untuk deals eksklusif

## 3. ShopeeFood

- Gratis ongkir tanpa minimum
- Flash sale makanan
- Cashback ShopeePay

## 4. Tokopedia NOW!

- Diskon merchant lokal
- Promo Gercep setiap hari
- Bisa pakai voucher Tokopedia

## 5. Pergikuliner

- Info promo terlengkap
- Review dari pengguna
- Filter berdasarkan lokasi

### Tips Berburu Promo

- Aktifkan notifikasi
- Cek di jam makan siang
- Gabungkan dengan promo e-wallet
- Follow akun promo di Twitter
        `,
        category: "tips",
        readTime: 4,
    },
    {
        id: "dana-darurat",
        title: "Dana Darurat: Berapa yang Ideal untuk Mahasiswa?",
        excerpt: "Kenapa kamu butuh dana darurat dan bagaimana cara membangunnya.",
        content: `
## Apa Itu Dana Darurat?

Dana darurat adalah uang yang disisihkan khusus untuk keadaan tak terduga seperti sakit, HP rusak, atau kebutuhan mendadak lainnya.

### Berapa Idealnya?

Untuk mahasiswa, minimal **3x pengeluaran bulanan**.

Contoh:
- Pengeluaran bulanan: Rp 1.500.000
- Dana darurat ideal: Rp 4.500.000

### Dimana Menyimpan?

1. **Rekening terpisah** - Jangan campur dengan uang harian
2. **E-wallet** - Yang ada fitur saving/kantong
3. **Reksa dana pasar uang** - Return lebih tinggi dari tabungan biasa

### Cara Membangun

- Sisihkan 10-20% dari uang bulanan
- Masukkan uang THR/bonus
- Challenge 52 minggu

### Kapan Boleh Dipakai?

✅ Sakit butuh ke dokter
✅ HP/laptop rusak untuk kuliah
✅ Kebutuhan keluarga mendesak

❌ Flash sale
❌ Hangout mendadak
❌ Beli skincare baru
        `,
        category: "dasar",
        readTime: 5,
    },
    {
        id: "reksa-dana-pemula",
        title: "Mengenal Reksa Dana untuk Pemula",
        excerpt: "Investasi mudah tanpa perlu ribet analisis saham satu-satu.",
        content: `
## Apa Itu Reksa Dana?

Reksa Dana adalah wadah untuk mengumpulkan dana dari banyak investor, lalu dikelola oleh Manajer Investasi profesional.

### Jenis-jenis Reksa Dana

| Jenis | Risiko | Return | Cocok Untuk |
|-------|--------|--------|-------------|
| Pasar Uang | Rendah | 4-6% | Dana darurat |
| Obligasi | Sedang | 6-9% | Tujuan 1-3 tahun |
| Campuran | Sedang | 8-12% | Tujuan 3-5 tahun |
| Saham | Tinggi | 10-20% | Tujuan 5+ tahun |

### Cara Memulai

1. Download app: Bibit, Bareksa, atau Tanamduit
2. Registrasi dan verifikasi
3. Deposit mulai Rp 10.000
4. Pilih reksa dana sesuai profil risiko

### Keuntungan

- Modal kecil
- Dikelola profesional
- Diversifikasi otomatis
- Mudah dicairkan (T+3 sampai T+7)

### Tips Memilih

- Lihat track record 3-5 tahun
- Cek expense ratio (biaya pengelolaan)
- Pilih MI (Manajer Investasi) terpercaya
        `,
        category: "investasi",
        readTime: 6,
    },
    {
        id: "hemat-belanja-online",
        title: "Tips Hemat Belanja Online Anti Kalap",
        excerpt: "Strategi agar tidak kebablasan saat ada flash sale atau promo.",
        content: `
## Kenapa Sering Kalap?

- FOMO (Fear Of Missing Out)
- Countdown timer yang bikin panik
- "Hampir habis" padahal stok banyak
- Wishlist yang menggoda

### Strategi Anti Kalap

#### 1. Aturan 24 Jam
Masukin keranjang, tunggu 24 jam. Kalau masih butuh, baru beli.

#### 2. Uninstall App
Hapus app marketplace dari HP. Install ulang hanya saat butuh.

#### 3. Budget Bulanan
Tetapkan maksimal belanja online per bulan, misal Rp 200.000.

#### 4. Wishlist Prioritas
Buat list prioritas 1-2-3. Beli dari prioritas 1 dulu.

### Kapan Waktu Terbaik Beli?

- Tanggal kembar (11.11, 12.12)
- Akhir bulan (26-31)
- Brand day masing-masing toko

### Red Flags Promo Palsu

- Harga "asli" yang di-markup dulu
- Gratis ongkir tapi harga lebih mahal
- Flash sale setiap hari (bukan limited)
        `,
        category: "tips",
        readTime: 5,
    },
];

// ============================================
// VIDEOS
// ============================================
export const videos: Video[] = [
    {
        id: "gaji-magang",
        title: "Cara Mengatur Gaji Magang Pertama",
        author: "Felicia Putri",
        duration: "12:34",
        youtubeId: "https://youtu.be/T0Low0xCtf8?si=Kxyjz8MwSvRhBBBr",
    },
    {
        id: "saham-pemula",
        title: "Investasi Saham untuk Pemula Banget",
        author: "Raymond Chin",
        duration: "15:22",
        youtubeId: "https://youtu.be/T0Low0xCtf8?si=Kxyjz8MwSvRhBBBr",
    },
    {
        id: "budgeting-503020",
        title: "Budgeting 50/30/20 Explained",
        author: "Ngomongin Uang",
        duration: "10:45",
        youtubeId: "https://youtu.be/T0Low0xCtf8?si=Kxyjz8MwSvRhBBBr",
    },
    {
        id: "nabung-konsisten",
        title: "Tips Nabung Konsisten Walaupun Gaji Kecil",
        author: "Finansialku",
        duration: "8:15",
        youtubeId: "https://youtu.be/T0Low0xCtf8?si=Kxyjz8MwSvRhBBBr",
    },
];

// ============================================
// GLOSSARY
// ============================================
export const glossary: GlossaryTerm[] = [
    {
        term: "Inflasi",
        definition: "Kenaikan harga barang dan jasa secara umum dalam jangka waktu tertentu, yang menyebabkan nilai uang menurun.",
        example: "Harga bakso yang dulu Rp 10.000 sekarang jadi Rp 15.000 adalah contoh inflasi.",
    },
    {
        term: "Investasi",
        definition: "Kegiatan menanamkan uang dengan harapan mendapat keuntungan di masa depan.",
        example: "Membeli reksa dana atau saham adalah bentuk investasi.",
    },
    {
        term: "Saham",
        definition: "Bukti kepemilikan atas suatu perusahaan. Pemilik saham disebut pemegang saham.",
        example: "Jika kamu punya 100 lembar saham BBCA, artinya kamu pemilik sebagian kecil Bank BCA.",
    },
    {
        term: "Obligasi",
        definition: "Surat utang yang diterbitkan perusahaan atau pemerintah dengan janji membayar bunga secara berkala.",
        example: "ORI (Obligasi Negara Ritel) adalah obligasi yang diterbitkan pemerintah Indonesia.",
    },
    {
        term: "Reksa Dana",
        definition: "Wadah investasi kolektif yang dananya dikelola oleh Manajer Investasi profesional.",
        example: "Berinvestasi di reksa dana pasar uang dengan modal Rp 100.000.",
    },
    {
        term: "Bunga Majemuk",
        definition: "Bunga yang dihitung dari pokok ditambah bunga sebelumnya, sehingga uang tumbuh lebih cepat.",
        example: "Rp 1 juta dengan bunga 10% per tahun, setelah 2 tahun jadi Rp 1.210.000 (bukan Rp 1.200.000).",
    },
    {
        term: "Diversifikasi",
        definition: "Strategi menyebar investasi ke berbagai instrumen untuk mengurangi risiko.",
        example: "Jangan taruh semua uang di saham saja, sebar ke reksa dana dan deposito juga.",
    },
    {
        term: "Likuiditas",
        definition: "Kemudahan suatu aset untuk diubah menjadi uang tunai tanpa kehilangan nilai signifikan.",
        example: "Uang di tabungan sangat likuid, sedangkan properti kurang likuid.",
    },
    {
        term: "Return",
        definition: "Keuntungan atau imbal hasil yang didapat dari investasi.",
        example: "Reksa dana saham memberi return rata-rata 10-15% per tahun.",
    },
    {
        term: "Risiko",
        definition: "Kemungkinan nilai investasi turun atau tidak sesuai ekspektasi.",
        example: "Saham punya risiko tinggi karena harganya bisa naik-turun drastis.",
    },
    {
        term: "Capital Gain",
        definition: "Keuntungan dari selisih harga beli dan harga jual aset.",
        example: "Beli saham Rp 1.000, jual Rp 1.500. Capital gain = Rp 500.",
    },
    {
        term: "Dividen",
        definition: "Pembagian keuntungan perusahaan kepada pemegang saham.",
        example: "Bank BCA membagi dividen Rp 200 per lembar saham setiap tahun.",
    },
    {
        term: "IHSG",
        definition: "Indeks Harga Saham Gabungan, indikator pergerakan harga saham di Bursa Efek Indonesia.",
        example: "IHSG naik 1% artinya rata-rata harga saham di BEI naik 1%.",
    },
    {
        term: "Blue Chip",
        definition: "Saham dari perusahaan besar, mapan, dengan kinerja keuangan stabil.",
        example: "BBCA, TLKM, dan UNVR adalah contoh saham blue chip.",
    },
    {
        term: "Dana Darurat",
        definition: "Uang yang disisihkan khusus untuk keadaan tak terduga atau darurat.",
        example: "Idealnya punya dana darurat 3-6 kali pengeluaran bulanan.",
    },
    {
        term: "Expense Ratio",
        definition: "Biaya pengelolaan reksa dana yang dibebankan kepada investor per tahun.",
        example: "Reksa dana dengan expense ratio 1% artinya biaya pengelolaannya 1% dari total dana.",
    },
];

// Helper function to get article by ID
export function getArticleById(id: string): Article | undefined {
    return articles.find((a) => a.id === id);
}

// Helper function to get category label
export function getCategoryLabel(category: Article["category"]): string {
    const labels = {
        dasar: "Dasar",
        menabung: "Menabung",
        investasi: "Investasi",
        tips: "Tips & Trik",
    };
    return labels[category];
}

// Helper function to get category color
export function getCategoryColor(category: Article["category"]): string {
    const colors = {
        dasar: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        menabung: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        investasi: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
        tips: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    };
    return colors[category];
}
