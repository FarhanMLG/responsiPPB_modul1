# API Pencatatan Peminjaman Buku Perpustakaan

## 📌 Deskripsi Umum
Proyek ini adalah REST API untuk mengelola layanan pencatatan peminjaman buku perpustakaan. Dibangun menggunakan **Node.js dan Express.js**, dengan **Supabase** sebagai layanan *Database as a Service* (PostgreSQL). API ini mendukung operasi CRUD penuh (Create, Read, Update, Delete) dan memiliki fitur filter query untuk pencarian spesifik (contoh: status keterlambatan).

## 🗄️ Struktur Data (Schema)
Tabel: `loans` (Supabase / PostgreSQL)

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | uuid | Primary Key (Auto-generated) |
| `book_title` | text | Judul buku yang dipinjam |
| `borrower_name` | text | Nama peminjam |
| `borrow_date` | date | Tanggal peminjaman |
| `due_date` | date | Tenggat waktu pengembalian |
| `status` | text | Status ("Dipinjam", "Dikembalikan", "Terlambat") |
| `created_at` | timestamp | Waktu data dicatat ke sistem |

## 🚀 Panduan Instalasi & Cara Menjalankan Lokal

Panduan ini ditujukan bagi evaluator (asprak) yang ingin menjalankan proyek ini secara lokal.

1. **Clone repository ini**
   ```bash
   git clone https://github.com/[LINK-REPO-GITHUB-KAMU]
   cd perpustakaan-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables**
   Buat file bernama `.env` di root folder proyek, lalu masukkan kredensial Supabase. (Catatan untuk asprak: silakan gunakan kredensial Supabase penguji, atau hubungi praktikan untuk test-key):
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-anon-public-key
   PORT=3000
   ```

4. **Jalankan Server**
   ```bash
   node index.js
   ```
   Server akan berjalan secara lokal di `http://localhost:3000`

---

## 📡 Contoh Request dan Response

### 1. CREATE: Tambah Peminjaman Baru
- **Endpoint:** `POST /loans`
- **Request Body (JSON):**
  ```json
  {
    "book_title": "Clean Code",
    "borrower_name": "Farhan Abdillah",
    "borrow_date": "2026-10-10",
    "due_date": "2026-10-17",
    "status": "Dipinjam"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "data": [
      {
        "id": "abc-123-uuid",
        "book_title": "Clean Code",
        "borrower_name": "Farhan Abdillah",
        "borrow_date": "2026-10-10",
        "due_date": "2026-10-17",
        "status": "Dipinjam",
        "created_at": "2026-10-10T13:00:00Z"
      }
    ]
  }
  ```

### 2. READ: Ambil Semua Data Peminjaman
- **Endpoint:** `GET /loans`
- **Response (200 OK):**
  ```json
  {
    "data": [
      {
        "id": "abc-123-uuid",
        "book_title": "Clean Code",
        "borrower_name": "Farhan Abdillah",
        "borrow_date": "2026-10-10",
        "due_date": "2026-10-17",
        "status": "Dipinjam",
        "created_at": "2026-10-10T13:00:00Z"
      }
    ]
  }
  ```

### 3. READ (Filter): Ambil Data Berdasarkan Status
- **Endpoint:** `GET /loans?status=Terlambat`
- **Response (200 OK):**
  ```json
  {
    "data": [
      {
        "id": "def-456-uuid",
        "book_title": "Sistem Operasi",
        "borrower_name": "Budi",
        "borrow_date": "2026-09-01",
        "due_date": "2026-09-08",
        "status": "Terlambat",
        "created_at": "2026-09-01T10:00:00Z"
      }
    ]
  }
  ```

### 4. READ (Spesifik): Ambil Data Berdasarkan ID
- **Endpoint:** `GET /loans/:id`
- **Contoh Request:** `GET /loans/abc-123-uuid`
- **Response (200 OK):** Mengembalikan satu objek data dengan ID yang sesuai.

### 5. UPDATE: Perbarui Data Peminjaman
- **Endpoint:** `PUT /loans/:id`
- **Request Body (JSON):**
  ```json
  {
    "status": "Dikembalikan"
  }
  ```
- **Response (200 OK):** Mengembalikan objek data terbaru yang statusnya telah diperbarui.

### 6. DELETE: Hapus Data Peminjaman
- **Endpoint:** `DELETE /loans/:id`
- **Response (200 OK):**
  ```json
  {
    "message": "Data peminjaman berhasil dihapus"
  }
  ```

---

## 🌐 Link Deployment Vercel
API dapat diakses dan diuji secara publik melalui Base URL berikut:
👉 **[https://[LINK-VERCEL-KAMU].vercel.app](https://[LINK-VERCEL-KAMU].vercel.app)**