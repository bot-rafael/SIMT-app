import { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, UserGroupIcon, CalendarIcon, ClockIcon, AcademicCapIcon, SparklesIcon } from '@heroicons/react/24/outline';

// Mock Supabase client - replace with actual supabase import
const supabase = {
  from: (table) => ({
    select: (fields) => ({
      eq: (field, value) => ({
        order: (field, options) => ({
          range: (from, to) => Promise.resolve({
            data: [
              {
                id_pelatihan: 1,
                judul: 'React & Next.js Fundamentals',
                deskripsi: 'Pelajari dasar-dasar React dan Next.js untuk pengembangan web modern',
                tanggal: '2025-08-15T10:00:00Z',
                kuota: 25,
                pengajar_id: 'user1',
                created_at: '2025-07-20T10:00:00Z',
                profiles: { full_name: 'Dr. Sarah Johnson', role: 'Pengajar' }
              },
              {
                id_pelatihan: 2,
                judul: 'Database Design & SQL',
                deskripsi: 'Menguasai desain database dan query SQL untuk aplikasi modern',
                tanggal: '2025-08-20T14:00:00Z',
                kuota: 20,
                pengajar_id: 'user2',
                created_at: '2025-07-19T10:00:00Z',
                profiles: { full_name: 'Prof. Michael Chen', role: 'Pengajar' }
              }
            ],
            error: null
          })
        })
      })
    }),
    update: (data) => ({
      eq: (field, value) => Promise.resolve({ error: null })
    }),
    insert: (data) => Promise.resolve({ error: null }),
    delete: () => ({
      eq: (field, value) => Promise.resolve({ error: null })
    })
  })
};

export default function Pelatihan() {
  const [pelatihan, setPelatihan] = useState([]);
  const [pengajar, setPengajar] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const fetchPengajar = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('user_id, full_name').eq('role', 'Pengajar');

      if (error) throw error;

      setPengajar(data || [
        { user_id: 'user1', full_name: 'Dr. Sarah Johnson' },
        { user_id: 'user2', full_name: 'Prof. Michael Chen' },
        { user_id: 'user3', full_name: 'Dr. Amanda Wilson' }
      ]);
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

    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus pelatihan ini?')) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('pelatihan').delete().eq('id_pelatihan', id);

      if (error) throw error;

      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Terjadi kesalahan saat menghapus data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPengajar();
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header dengan glassmorphism effect */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-lg">
                <AcademicCapIcon className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
                  Kelola Pelatihan
                </h1>
                <p className="text-blue-200/80 text-lg">Manajemen program pelatihan dan pengajar profesional</p>
              </div>
            </div>
            <button 
              onClick={() => handleOpen()} 
              disabled={loading}
              className="group flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusIcon className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" /> 
              <span className="font-semibold text-lg">Tambah Pelatihan</span>
              <SparklesIcon className="h-5 w-5 animate-pulse" />
            </button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <UserGroupIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-blue-200/70 font-medium">Total Pelatihan</p>
                  <p className="text-3xl font-bold text-white">{pelatihan.length}</p>
                </div>
              </div>
              <div className="h-16 w-16 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                <div className="h-8 w-8 bg-blue-400 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <CalendarIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-blue-200/70 font-medium">Total Pengajar</p>
                  <p className="text-3xl font-bold text-white">{pengajar.length}</p>
                </div>
              </div>
              <div className="h-16 w-16 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full flex items-center justify-center">
                <div className="h-8 w-8 bg-indigo-400 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <ClockIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-blue-200/70 font-medium">Halaman Aktif</p>
                  <p className="text-3xl font-bold text-white">{page}</p>
                </div>
              </div>
              <div className="h-16 w-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center">
                <div className="h-8 w-8 bg-cyan-400 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {loading && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="bg-white/90 rounded-2xl p-6 flex items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-blue-800 font-medium">Memuat data...</span>
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-blue-600/80 to-indigo-700/80 backdrop-blur-sm">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-bold text-white tracking-wider">#</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-white tracking-wider">Judul Pelatihan</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-white tracking-wider">Deskripsi</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-white tracking-wider">Tanggal</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-white tracking-wider">Pengajar</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-white tracking-wider">Kuota</th>
                  <th className="px-6 py-5 text-center text-sm font-bold text-white tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {pelatihan.map((item, index) => (
                  <tr key={item.id_pelatihan} className="hover:bg-white/5 transition-all duration-200 group">
                    <td className="px-6 py-5 text-sm text-blue-200 font-semibold">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors">
                        {item.judul}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm text-blue-200/80 max-w-xs truncate" title={item.deskripsi}>
                        {item.deskripsi}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center text-sm text-blue-200">
                        <CalendarIcon className="h-4 w-4 mr-2 text-blue-400" />
                        {item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center text-sm text-blue-200">
                        <UserGroupIcon className="h-4 w-4 mr-2 text-blue-400" />
                        {item.pengajar_nama || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-200 border border-blue-400/30">
                        {item.kuota || '-'} orang
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => handleOpen(item)} 
                          disabled={loading}
                          className="p-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl disabled:opacity-50"
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id_pelatihan)} 
                          disabled={loading}
                          className="p-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl disabled:opacity-50"
                          title="Hapus"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pelatihan.length === 0 && !loading && (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <div className="text-blue-300/60">
                        <AcademicCapIcon className="h-16 w-16 mx-auto mb-6 opacity-40" />
                        <p className="text-xl font-semibold mb-2">Belum ada data pelatihan</p>
                        <p className="text-sm">Klik tombol "Tambah Pelatihan" untuk memulai</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Enhanced Pagination */}
          <div className="bg-white/5 backdrop-blur-sm px-6 py-6 border-t border-white/10">
            <div className="flex justify-between items-center">
              <div className="text-sm text-blue-200 font-medium">
                Halaman {page} dari data pelatihan
              </div>
              <div className="flex gap-3">
                <button 
                  disabled={page === 1 || loading} 
                  onClick={() => setPage(page - 1)} 
                  className="px-6 py-3 text-sm font-semibold text-blue-200 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg"
                >
                  ← Sebelumnya
                </button>
                <button 
                  onClick={() => setPage(page + 1)} 
                  disabled={pelatihan.length < limit || loading}
                  className="px-6 py-3 text-sm font-semibold text-blue-200 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg"
                >
                  Selanjutnya →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal Form */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/30">
            <div className="bg-gradient-to-r from-blue-600/90 to-indigo-700/90 backdrop-blur-sm text-white p-8 rounded-t-3xl border-b border-white/20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <AcademicCapIcon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    {selected ? 'Edit Pelatihan' : 'Tambah Pelatihan Baru'}
                  </h3>
                  <p className="text-blue-100/80 mt-1">
                    {selected ? 'Perbarui informasi pelatihan yang sudah ada' : 'Isi formulir untuk menambah pelatihan baru'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-white/90 to-blue-50/50 backdrop-blur-sm">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Judul Pelatihan</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan judul pelatihan yang menarik" 
                    value={form.judul} 
                    onChange={(e) => setForm({ ...form, judul: e.target.value })} 
                    className="w-full p-4 border-2 border-blue-200/50 bg-white/80 backdrop-blur-sm rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Deskripsi Pelatihan</label>
                  <textarea 
                    placeholder="Jelaskan detail pelatihan, materi yang akan dipelajari, dan manfaatnya" 
                    value={form.deskripsi} 
                    onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} 
                    className="w-full p-4 border-2 border-blue-200/50 bg-white/80 backdrop-blur-sm rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none text-gray-800" 
                    rows="4"
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Tanggal Pelatihan</label>
                    <input 
                      type="date" 
                      value={form.tanggal} 
                      onChange={(e) => setForm({ ...form, tanggal: e.target.value })} 
                      className="w-full p-4 border-2 border-blue-200/50 bg-white/80 backdrop-blur-sm rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Kuota Peserta</label>
                    <input 
                      type="number" 
                      placeholder="Jumlah maksimal peserta" 
                      value={form.kuota} 
                      onChange={(e) => setForm({ ...form, kuota: e.target.value })} 
                      className="w-full p-4 border-2 border-blue-200/50 bg-white/80 backdrop-blur-sm rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium" 
                      min="1" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Pilih Pengajar</label>
                  <select 
                    value={form.pengajar_id} 
                    onChange={(e) => setForm({ ...form, pengajar_id: e.target.value })} 
                    className="w-full p-4 border-2 border-blue-200/50 bg-white/80 backdrop-blur-sm rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium" 
                    required
                  >
                    <option value="">-- Pilih Pengajar Terbaik --</option>
                    {pengajar.map((p) => (
                      <option key={p.user_id} value={p.user_id}>
                        {p.full_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-8 border-t border-blue-200/30 mt-8">
                <button 
                  onClick={() => setOpenModal(false)} 
                  disabled={loading}
                  className="px-8 py-4 text-gray-600 bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/80 border-2 border-gray-200/50 rounded-2xl font-bold transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                >
                  Batal
                </button>
                <button 
                  onClick={handleSave} 
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-2xl font-bold shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-5 w-5" />
                      <span>{selected ? 'Perbarui Data' : 'Simpan Pelatihan'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}