import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Pelatihan() {
  const [pelatihan, setPelatihan] = useState([]);
  const [pengajar, setPengajar] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    judul: '',
    deskripsi: '',
    tanggal: '',
    kuota: '',
    pengajar_id: '',
  });

  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchData = async () => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    try {
      const { data, error } = await supabase
        .from('pelatihan')
        .select(
          `
        *,
        profiles:pengajar_id (
          full_name,
          role
        )
      `
        )
        .eq('profiles.role', 'Pengajar') // ✅ FILTER langsung di Supabase
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      const mapped = data.map((item) => ({
        ...item,
        pengajar_nama: item.profiles?.full_name ?? '-', // ✅ langsung ambil dari relasi
      }));

      setPelatihan(mapped || []);
    } catch (error) {
      console.error('Error fetching pelatihan:', error);
      alert('Gagal memuat data pelatihan');
    }
  };

  const fetchPengajar = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('user_id, full_name').eq('role', 'Pengajar');

      if (error) throw error;

      setPengajar(data || []);
    } catch (error) {
      console.error('Error fetching pengajar:', error);
      alert('Gagal memuat data pengajar');
    }
  };

  const handleOpen = (item = null) => {
    setSelected(item);
    setForm({
      judul: item?.judul || '',
      deskripsi: item?.deskripsi || '',
      tanggal: item?.tanggal ? item.tanggal.split('T')[0] : '',
      kuota: item?.kuota || '',
      pengajar_id: item?.pengajar_id || '',
    });
    setOpenModal(true);
  };

  const handleSave = async () => {
    if (!form.pengajar_id) {
      alert('Pilih pengajar terlebih dahulu.');
      return;
    }

    const payload = {
      judul: form.judul,
      deskripsi: form.deskripsi,
      tanggal: form.tanggal,
      kuota: parseInt(form.kuota) || 0,
      pengajar_id: form.pengajar_id,
    };

    try {
      if (selected) {
        const { error } = await supabase.from('pelatihan').update(payload).eq('id_pelatihan', selected.id_pelatihan);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('pelatihan').insert([payload]);
        if (error) throw error;
      }

      setOpenModal(false);
      fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus pelatihan ini?')) return;

    try {
      const { error } = await supabase.from('pelatihan').delete().eq('id_pelatihan', id);

      if (error) throw error;

      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Terjadi kesalahan saat menghapus data');
    }
  };

  useEffect(() => {
    fetchData();
    fetchPengajar();
  }, [page]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Kelola Pelatihan</h1>
        <button onClick={() => handleOpen()} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          <PlusIcon className="h-5 w-5" /> Tambah
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Judul</th>
              <th className="p-2 border">Deskripsi</th>
              <th className="p-2 border">Tanggal</th>
              <th className="p-2 border">Pengajar</th>
              <th className="p-2 border">Kuota</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pelatihan.map((item, index) => (
              <tr key={item.id_pelatihan}>
                <td className="p-2 border">{(page - 1) * limit + index + 1}</td>
                <td className="p-2 border">{item.judul}</td>
                <td className="p-2 border">{item.deskripsi}</td>
                <td className="p-2 border">{item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-'}</td>
                <td className="p-2 border">{item.pengajar_nama || '-'}</td>
                <td className="p-2 border">{item.kuota || '-'}</td>
                <td className="p-2 border">
                  <div className="flex gap-2">
                    <button onClick={() => handleOpen(item)} className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id_pelatihan)} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end gap-2">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 border rounded disabled:opacity-50">
          Prev
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button onClick={() => setPage(page + 1)} className="px-4 py-2 border rounded" disabled={pelatihan.length < limit}>
          Next
        </button>
      </div>

      {/* Modal Form */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">{selected ? 'Edit Pelatihan' : 'Tambah Pelatihan'}</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Judul" value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} className="w-full p-2 border rounded" required />
              <textarea placeholder="Deskripsi" value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} className="w-full p-2 border rounded" required />
              <input type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} className="w-full p-2 border rounded" required />
              <input type="number" placeholder="Kuota" value={form.kuota} onChange={(e) => setForm({ ...form, kuota: e.target.value })} className="w-full p-2 border rounded" min="1" />

              {/* Dropdown Pilih Pengajar */}
              <select value={form.pengajar_id} onChange={(e) => setForm({ ...form, pengajar_id: e.target.value })} className="w-full p-2 border rounded" required>
                <option value="">Pilih Pengajar</option>
                {pengajar.map((p) => (
                  <option key={p.user_id} value={p.user_id}>
                    {p.full_name}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setOpenModal(false)} className="px-4 py-2 border rounded">
                  Batal
                </button>
                <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
                  {selected ? 'Update' : 'Simpan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
