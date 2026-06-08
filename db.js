const supabaseUrl = 'https://chslvyymbshzmvjksqer.supabase.co';
const supabaseKey = 'sb_publishable_awCUz9VfJfBUZpkoAIO9KQ_g_68J5TC';
const sb = supabase.createClient(supabaseUrl, supabaseKey);

const hariNama = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const namaBulanPendek = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const namaBulanFull = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

// Timestamp Presisi untuk Finalisasi
function getPreciseTimestamp() {
    const d = new Date();
    return `${hariNama[d.getDay()]}, ${d.getDate()} ${namaBulanPendek[d.getMonth()]} ${d.getFullYear()} - ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} WIB`;
}

// Format Tanggal Terpadu (Cth: Senin, 08 Juni 2026 | 13.00 WIB)
function formatTanggalIndo(dateStr, timeStr = null) {
    const d = new Date(dateStr);
    const hari = hariNama[d.getDay()];
    const tgl = String(d.getDate()).padStart(2, '0');
    const bln = namaBulanFull[d.getMonth()];
    const thn = d.getFullYear();
    
    let base = `${hari}, ${tgl} ${bln} ${thn}`;
    if (timeStr) {
        const jam = timeStr.substring(0, 5).replace(':', '.');
        return `${base} | ${jam} WIB`;
    }
    return base;
}

// Fetch Data dengan Cache
async function fetchReservations(forceRefresh = false) {
    if (!forceRefresh && sessionStorage.getItem('arasa_schedules')) {
        return JSON.parse(sessionStorage.getItem('arasa_schedules'));
    }
    showLoading();
    const { data, error } = await sb.from('reservations').select('*').eq('is_active', true);
    hideLoading();
    if (!error && data) {
        sessionStorage.setItem('arasa_schedules', JSON.stringify(data));
        return data;
    }
    return [];
}

// Global UI Loaders
function showLoading() { 
    const el = document.getElementById('loading-overlay');
    if(el) el.classList.replace('hidden', 'flex'); 
}
function hideLoading() { 
    const el = document.getElementById('loading-overlay');
    if(el) el.classList.replace('flex', 'hidden'); 
}

// Global Actions (Tanpa PIN)
async function updateDbStatus(id, newStatus) {
    showLoading();
    await sb.from('reservations').update({ status: newStatus }).eq('id', id);
    await fetchReservations(true); 
    hideLoading();
}

async function updateDbTracking(id, fieldName, value) {
    showLoading();
    await sb.from('reservations').update({ [fieldName]: value }).eq('id', id);
    await fetchReservations(true);
    hideLoading();
}

async function finalizeDbTask(id, isDikirim) {
    showLoading();
    const timeStamp = isDikirim ? getPreciseTimestamp() : null;
    await sb.from('reservations').update({ is_dikirim: isDikirim, waktu_finalisasi: timeStamp }).eq('id', id);
    await fetchReservations(true);
    hideLoading();
}

async function deleteDbTask(id) {
    showLoading();
    await sb.from('reservations').delete().eq('id', id);
    await fetchReservations(true);
    hideLoading();
}