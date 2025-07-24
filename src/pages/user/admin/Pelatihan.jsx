import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { PencilIcon, TrashIcon, PlusIcon, UserGroupIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

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
        .eq('profiles.role', 'Pengajar')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      const mapped = data.map((item) => ({
        ...item,
        pengajar_nama: item.profiles?.full_name ?? '-',
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-sky-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-sky-800 mb-2">Kelola Pelatihan</h1>
              <p className="text-sky-600">Manajemen program pelatihan dan pengajar</p>
            </div>
            <button 
              onClick={() => handleOpen()} 
              className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <PlusIcon className="h-5 w-5" /> 
              <span className="font-medium">Tambah Pelatihan</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md border border-sky-100 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-sky-100 rounded-full">
                <UserGroupIcon className="h-6 w-6 text-sky-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-sky-600">Total Pelatihan</p>
                <p className="text-2xl font-bold text-sky-800">{pelatihan.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-sky-100 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-cyan-100 rounded-full">
                <CalendarIcon className="h-6 w-6 text-cyan-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-cyan-600">Pengajar</p>
                <p className="text-2xl font-bold text-cyan-800">{pengajar.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-sky-100 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <ClockIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-600">Halaman</p>
                <p className="text-2xl font-bold text-blue-800">{page}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-sky-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-sky-500 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Judul Pelatihan</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Deskripsi</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Tanggal</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Pengajar</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Kuota</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-100">
                {pelatihan.map((item, index) => (
                  <tr key={item.id_pelatihan} className="hover:bg-sky-50 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm text-sky-700 font-medium">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-sky-800">{item.judul}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-sky-600 max-w-xs truncate" title={item.deskripsi}>
                        {item.deskripsi}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-sky-700">
                        <CalendarIcon className="h-4 w-4 mr-2 text-sky-500" />
                        {item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-sky-700">
                        <UserGroupIcon className="h-4 w-4 mr-2 text-sky-500" />
                        {item.pengajar_nama || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                        {item.kuota || '-'} orang
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleOpen(item)} 
                          className="p-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white rounded-lg shadow-md transition-all duration-200 transform hover:scale-110"
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id_pelatihan)} 
                          className="p-2 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white rounded-lg shadow-md transition-all duration-200 transform hover:scale-110"
                          title="Hapus"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pelatihan.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-sky-400">
                        <UserGroupIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">Belum ada data pelatihan</p>
                        <p className="text-sm">Klik tombol "Tambah Pelatihan" untuk memulai</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-sky-50 px-6 py-4 border-t border-sky-100">
            <div className="flex justify-between items-center">
              <div className="text-sm text-sky-600">
                Halaman {page}
              </div>
              <div className="flex gap-2">
                <button 
                  disabled={page === 1} 
                  onClick={() => setPage(page - 1)} 
                  className="px-4 py-2 text-sm font-medium text-sky-600 bg-white border border-sky-200 rounded-lg hover:bg-sky-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Sebelumnya
                </button>
                <button 
                  onClick={() => setPage(page + 1)} 
                  className="px-4 py-2 text-sm font-medium text-sky-600 bg-white border border-sky-200 rounded-lg hover:bg-sky-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200" 
                  disabled={pelatihan.length < limit}
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {openModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="bg-gradient-to-r from-sky-500/90 to-blue-600/90 backdrop-blur-sm text-white p-6 rounded-t-2xl border-b border-white/10">
              <h3 className="text-xl font-bold">
                {selected ? 'Edit Pelatihan' : 'Tambah Pelatihan Baru'}
              </h3>
              <p className="text-sky-100/80 text-sm mt-1">
                {selected ? 'Perbarui informasi pelatihan' : 'Isi formulir untuk menambah pelatihan baru'}
              </p>
            </div>
            
            <div className="p-6 bg-white/60 backdrop-blur-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">Judul Pelatihan</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan judul pelatihan" 
                    value={form.judul} 
                    onChange={(e) => setForm({ ...form, judul: e.target.value })} 
                    className="w-full p-3 border border-sky-200/50 bg-white/70 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-200" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">Deskripsi</label>
                  <textarea 
                    placeholder="Masukkan deskripsi pelatihan" 
                    value={form.deskripsi} 
                    onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} 
                    className="w-full p-3 border border-sky-200/50 bg-white/70 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-200 resize-none" 
                    rows="3"
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">Tanggal Pelatihan</label>
                  <input 
                    type="date" 
                    value={form.tanggal} 
                    onChange={(e) => setForm({ ...form, tanggal: e.target.value })} 
                    className="w-full p-3 border border-sky-200/50 bg-white/70 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-200" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">Kuota Peserta</label>
                  <input 
                    type="number" 
                    placeholder="Jumlah kuota peserta" 
                    value={form.kuota} 
                    onChange={(e) => setForm({ ...form, kuota: e.target.value })} 
                    className="w-full p-3 border border-sky-200/50 bg-white/70 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-200" 
                    min="1" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">Pilih Pengajar</label>
                  <select 
                    value={form.pengajar_id} 
                    onChange={(e) => setForm({ ...form, pengajar_id: e.target.value })} 
                    className="w-full p-3 border border-sky-200/50 bg-white/70 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-200" 
                    required
                  >
                    <option value="">-- Pilih Pengajar --</option>
                    {pengajar.map((p) => (
                      <option key={p.user_id} value={p.user_id}>
                        {p.full_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-sky-100/50 mt-6">
                <button 
                  onClick={() => setOpenModal(false)} 
                  className="px-6 py-3 text-sky-600 bg-sky-50/70 backdrop-blur-sm hover:bg-sky-100/70 border border-sky-200/50 rounded-xl font-medium transition-colors duration-200"
                >
                  Batal
                </button>
                <button 
                  onClick={handleSave} 
                  className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl font-medium shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  {selected ? 'Perbarui' : 'Simpan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}