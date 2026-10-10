require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Inisialisasi Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Root Endpoint
app.get('/', (req, res) => {
    res.json({ message: "API Peminjaman Buku Perpustakaan Berjalan!" });
});

// READ & FILTER: Ambil semua data peminjaman (dengan filter opsional)
app.get('/loans', async (req, res) => {
    const { status } = req.query;
    let query = supabase.from('loans').select('*');
    
    // Filter berdasarkan status jika query param tersedia
    if (status) {
        query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    res.json({ data });
});

// READ: Ambil data peminjaman berdasarkan ID
app.get('/loans/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('loans').select('*').eq('id', id).single();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ data });
});

// CREATE: Tambah data peminjaman baru
app.post('/loans', async (req, res) => {
    const { book_title, borrower_name, borrow_date, due_date, status } = req.body;
    const { data, error } = await supabase.from('loans')
        .insert([{ book_title, borrower_name, borrow_date, due_date, status }])
        .select();
        
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ data });
});

// UPDATE: Perbarui data peminjaman
app.put('/loans/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const { data, error } = await supabase.from('loans')
        .update(updates)
        .eq('id', id)
        .select();

    if (error) return res.status(500).json({ error: error.message });
    res.json({ data });
});

// DELETE: Hapus data peminjaman
app.delete('/loans/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('loans').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Data peminjaman berhasil dihapus' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export app untuk Vercel Serverless
module.exports = app;