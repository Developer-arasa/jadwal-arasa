// Variable Global untuk melacak mode Edit
window.currentEditId = null;

function renderGlobalUI() {
    const currentPath = window.location.pathname;
    
    const navHTML = `
    <div class="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-[90]">
        <div class="relative w-full h-[64px] bg-white rounded-3xl grid grid-cols-4 shadow-nav border border-pink-50 px-2 items-center">
            <a href="index.html" class="nav-btn group relative w-full h-full flex justify-center items-center ${currentPath.includes('index') || currentPath === '/' ? 'text-[#ff65a3]' : 'text-gray-300'}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </a>
            <button onclick="openAddModal()" class="group relative w-full h-full flex justify-center items-center">
                <div class="w-9 h-9 bg-pink-50 text-[#ff8cb3] rounded-full flex justify-center items-center group-hover:bg-[#ff8cb3] group-hover:text-white transition-all shadow-cute-sm transform group-hover:scale-105 border border-pink-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
                </div>
            </button>
            <a href="kunjungan.html" class="nav-btn group relative w-full h-full flex justify-center items-center ${currentPath.includes('kunjungan') ? 'text-[#ff65a3]' : 'text-gray-300'}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </a>
            <a href="pengumuman.html" class="nav-btn group relative w-full h-full flex justify-center items-center ${currentPath.includes('pengumuman') ? 'text-[#ff65a3]' : 'text-gray-300'}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </a>
        </div>
    </div>`;
    
    const modalHTML = `
    <div id="add-modal" class="fixed inset-0 bg-[#4e3c4c]/40 hidden items-end sm:items-center justify-center p-0 sm:p-4 z-[100] backdrop-blur-sm transition-opacity">
        <div class="bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 w-full max-w-md shadow-cute max-h-[85vh] overflow-y-auto border-t border-pink-50">
            <h3 id="modal-form-title" class="text-lg font-black text-[#4e3c4c] mb-4 uppercase tracking-wide text-center">Formulir Reservasi</h3>
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[10px] font-black text-gray-400 mb-1 uppercase tracking-wider">Kategori</label>
                        <select id="input-category" onchange="toggleFormFields()" class="w-full bg-pink-50/30 border border-pink-100 rounded-2xl p-3 text-xs font-bold text-gray-600 focus:ring-2 focus:ring-[#ff94c2] outline-none">
                            <option value="Belanja">Belanja</option>
                            <option value="Cooking">Cooking</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-[10px] font-black text-gray-400 mb-1 uppercase tracking-wider">Tanggal</label>
                        <input type="date" id="input-date" class="w-full bg-pink-50/30 border border-pink-100 rounded-2xl p-3 text-xs font-bold text-gray-600 focus:ring-2 focus:ring-[#ff94c2] outline-none">
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[10px] font-black text-gray-400 mb-1 uppercase tracking-wider">Jam</label>
                        <input type="time" id="input-time" class="w-full bg-pink-50/30 border border-pink-100 rounded-2xl p-3 text-xs font-bold text-gray-600 focus:ring-2 focus:ring-[#ff94c2] outline-none">
                    </div>
                    <div id="row-jumlah-peserta" class="hidden">
                        <label class="block text-[10px] font-black text-gray-400 mb-1 uppercase tracking-wider">Jumlah Peserta</label>
                        <input type="number" id="input-peserta" class="w-full bg-pink-50/30 border border-pink-100 rounded-2xl p-3 text-xs font-bold text-gray-600 focus:ring-2 focus:ring-[#ff94c2] outline-none" placeholder="0">
                    </div>
                </div>
                <div>
                    <label class="block text-[10px] font-black text-gray-400 mb-1 uppercase tracking-wider">Nama Rombongan</label>
                    <input type="text" id="input-biro" oninput="syncNamaSekolah()" class="w-full bg-pink-50/30 border border-pink-100 rounded-2xl p-3 text-xs font-bold text-gray-600 focus:ring-2 focus:ring-[#ff94c2] outline-none" placeholder="Cth: PT Sinar Maju">
                </div>
                <div id="cooking-fields" class="hidden space-y-4 border-t pt-3 border-pink-50">
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-wider">Nama Sekolah</label>
                            <label class="text-[10px] text-[#ff65a3] font-black flex items-center gap-1 cursor-pointer">
                                <input type="checkbox" id="check-samakan" onchange="handleSamakanCheckbox()" class="rounded border-pink-200 text-[#ff65a3] focus:ring-[#ff94c2]"> Sama dgn Rombongan
                            </label>
                        </div>
                        <input type="text" id="input-sekolah" class="w-full bg-pink-50/30 border border-pink-100 rounded-2xl p-3 text-xs font-bold text-gray-600 focus:ring-2 focus:ring-[#ff94c2] outline-none">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black text-gray-400 mb-1 uppercase tracking-wider">Dokumen Peserta</label>
                        <input type="file" id="input-file" accept=".xlsx,.xls,.pdf" class="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-pink-50 file:font-black file:text-[#ff8cb3]">
                    </div>
                    <div>
                        <label class="text-xs text-gray-600 font-bold flex items-center gap-2 cursor-pointer bg-pink-50/20 p-3 rounded-2xl border border-pink-100/60">
                            <input type="checkbox" id="input-dokumentasi" class="w-4 h-4 rounded text-[#ff65a3] focus:ring-[#ff94c2] border-pink-200"> Wajib Layanan Foto Dokumentasi
                        </label>
                    </div>
                </div>
                <div>
                    <label class="block text-[10px] font-black text-gray-400 mb-1 uppercase tracking-wider">Deskripsi Kegiatan</label>
                    <textarea id="input-desc" class="w-full bg-pink-50/30 border border-pink-100 rounded-2xl p-3 text-xs font-bold text-gray-600 focus:ring-2 focus:ring-[#ff94c2] outline-none" rows="2"></textarea>
                </div>
            </div>
            <div class="mt-6 flex gap-3">
                <button onclick="closeAddModal()" class="flex-1 py-3 text-xs font-bold text-gray-400 bg-gray-100 rounded-xl hover:bg-gray-200">Batal</button>
                <button onclick="saveSchedule()" class="flex-1 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#ffb5d7] to-[#cfa3ff] rounded-xl shadow-cute hover:opacity-90">Simpan Data</button>
            </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', navHTML + modalHTML);
}

// Global Toast 
function showToast(msg, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `${type === 'success' ? 'bg-[#ff7aa7]' : 'bg-red-400'} text-white px-4 py-2.5 rounded-xl shadow-cute-sm transition-all duration-300 text-xs font-bold mb-2`;
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

window.toggleFormFields = function() {
    const cat = document.getElementById('input-category').value;
    document.getElementById('row-jumlah-peserta').classList.toggle('hidden', cat !== 'Cooking');
    document.getElementById('cooking-fields').classList.toggle('hidden', cat !== 'Cooking');
};
window.syncNamaSekolah = function() { if(document.getElementById('check-samakan').checked) document.getElementById('input-sekolah').value = document.getElementById('input-biro').value; };
window.handleSamakanCheckbox = function() { document.getElementById('input-sekolah').value = document.getElementById('check-samakan').checked ? document.getElementById('input-biro').value : ''; };

// Membersihkan Form Input
function clearFormInputs() {
    document.getElementById('input-date').value = new Date().toISOString().split('T')[0]; 
    document.getElementById('input-time').value = '';
    document.getElementById('input-biro').value = '';
    document.getElementById('input-peserta').value = '';
    document.getElementById('input-sekolah').value = '';
    document.getElementById('input-desc').value = '';
    document.getElementById('input-file').value = '';
    document.getElementById('check-samakan').checked = false;
    document.getElementById('input-dokumentasi').checked = false;
    document.getElementById('input-category').value = 'Cooking';
    toggleFormFields();
}

window.openAddModal = function() {
    window.currentEditId = null;
    clearFormInputs();
    document.getElementById('modal-form-title').innerText = 'Reservasi Baru';
    document.getElementById('add-modal').classList.replace('hidden', 'flex'); 
};

// Fungsi Membuka Form untuk Edit Data
window.openEditModal = function(id) {
    window.currentEditId = id;
    const schedules = JSON.parse(sessionStorage.getItem('arasa_schedules') || '[]');
    const sch = schedules.find(s => s.id === id);
    if (!sch) return;

    clearFormInputs();
    document.getElementById('modal-form-title').innerText = 'Edit Rombongan';
    document.getElementById('input-category').value = sch.category;
    toggleFormFields();
    
    document.getElementById('input-date').value = sch.date;
    document.getElementById('input-time').value = sch.time.substring(0, 5);
    document.getElementById('input-biro').value = sch.biro;
    document.getElementById('input-desc').value = sch.description || '';
    
    if (sch.category === 'Cooking') {
        document.getElementById('input-sekolah').value = sch.nama_sekolah || '';
        document.getElementById('input-peserta').value = sch.jumlah_peserta || 0;
        document.getElementById('input-dokumentasi').checked = sch.is_dokumentasi || false;
    }

    document.getElementById('add-modal').classList.replace('hidden', 'flex'); 
};

window.closeAddModal = function() { 
    document.getElementById('add-modal').classList.replace('flex', 'hidden'); 
};

// Modifikasi Logika Save/Update
window.saveSchedule = async function() {
    const cat = document.getElementById('input-category').value;
    const date = document.getElementById('input-date').value;
    const time = document.getElementById('input-time').value;
    const biro = document.getElementById('input-biro').value;
    
    if(!date || !time || !biro) { showToast("Data utama belum lengkap!", "error"); return; }
    showLoading();
    
    let fileUrl = null;
    let isFileUploaded = false;
    const fileInput = document.getElementById('input-file');
    
    if(cat === 'Cooking' && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileName = `${Date.now()}.${file.name.split('.').pop()}`;
        const { error: uploadError } = await sb.storage.from('berkas_peserta').upload(fileName, file);
        if(!uploadError) {
            const { data: urlData } = sb.storage.from('berkas_peserta').getPublicUrl(fileName);
            fileUrl = urlData.publicUrl;
            isFileUploaded = true;
        }
    }

    let payload = { date, time, category: cat, biro, description: document.getElementById('input-desc').value };
    if(cat === 'Cooking') {
        payload.nama_sekolah = document.getElementById('input-sekolah').value;
        payload.jumlah_peserta = parseInt(document.getElementById('input-peserta').value) || 0;
        payload.is_dokumentasi = document.getElementById('input-dokumentasi').checked;
        if (isFileUploaded) payload.file_url = fileUrl; // Hanya overwrite jika ada file baru di-upload
    } else {
        payload.nama_sekolah = null;
        payload.jumlah_peserta = 0;
        payload.file_url = null;
        payload.is_dokumentasi = false;
    }

    let error;
    if (window.currentEditId) {
        // Mode UPDATE
        const res = await sb.from('reservations').update(payload).eq('id', window.currentEditId);
        error = res.error;
    } else {
        // Mode INSERT
        const res = await sb.from('reservations').insert([payload]);
        error = res.error;
    }

    if(!error) { 
        showToast(window.currentEditId ? "Perubahan berhasil disimpan!" : "Reservasi baru tersimpan!");
        closeAddModal(); 
        sessionStorage.removeItem('arasa_schedules'); // Reset Cache
        if(window.renderPage) window.renderPage(); // Trigger render UI
    } else {
        showToast("Gagal menyimpan ke server!", "error");
    }
    hideLoading();
};

document.addEventListener('DOMContentLoaded', renderGlobalUI);