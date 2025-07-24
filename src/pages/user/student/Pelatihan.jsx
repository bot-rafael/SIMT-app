import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

export default function Pelatihan() {
  const [pelatihan, setPelatihan] = useState([]);
  const [daftarPelatihan, setDaftarPelatihan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedPelatihan, setSelectedPelatihan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const perPage = 10;

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (userProfile) {
      fetchPelatihan();
      fetchDaftar();
    }
  }, [page, userProfile]);

  const getProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();

      if (error) console.error(error);
      else setUserProfile(data);
    }
  };

  const fetchPelatihan = async () => {
    setLoading(true);
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    const { data, error } = await supabase
      .from('pelatihan')
      .select(
        `
        id_pelatihan,
        judul,
        deskripsi,
        tanggal,
        kuota,
        created_at,
        profiles:pengajar_id (
          full_name
        )
      `
      )
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setPelatihan(data);

    setLoading(false);
  };

  const fetchDaftar = async () => {
    const { data, error } = await supabase
      .from('daftar')
      .select(
        `
      id_daftar,
      pelatihan (
        id_pelatihan,
        judul,
        tanggal,
        kuota,
        profiles:pengajar_id (
          full_name
        )
      ),
      profiles (
        full_name
      )
    `
      )
      .eq('user_id', userProfile.user_id)
      .order('id_daftar', { ascending: false });

    if (error) console.error(error);
    else setDaftarPelatihan(data);
  };

  const handleDaftar = async (item) => {
    setSelectedPelatihan(item);

    // Cek apakah sudah pernah daftar
    const { data, error } = await supabase.from('daftar').select('id_daftar').eq('user_id', userProfile.user_id).eq('id_pelatihan', item.id_pelatihan).single();

    setAlreadyRegistered(!!data);
    setShowModal(true);
  };

  const submitPendaftaran = async () => {
    if (!userProfile || !selectedPelatihan) return;

    const { error } = await supabase.from('daftar').insert({
      user_id: userProfile.user_id,
      id_pelatihan: selectedPelatihan.id_pelatihan,
    });

    if (error) {
      alert('Gagal daftar: ' + error.message);
    } else {
      alert('Berhasil mendaftar!');
      setShowModal(false);
      fetchDaftar(); // refresh daftar user
      fetchPelatihan(); // refresh pelatihan yang tersedia
    }
  };

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => (p > 1 ? p - 1 : 1));

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Daftar Pelatihan</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Deskripsi</th>
                <th>Tanggal</th>
                <th>Pengajar</th>
                <th>Kuota</th>
                {userProfile?.role === 'Pelajar' && <th>Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {pelatihan
                .filter((item) => {
                  return !daftarPelatihan.some((d) => d.pelatihan?.id_pelatihan === item.id_pelatihan);
                })
                .map((item) => (
                  <tr key={item.id_pelatihan}>
                    <td>{item.judul}</td>
                    <td>{item.deskripsi}</td>
                    <td>{new Date(item.tanggal).toLocaleDateString()}</td>
                    <td>{item.profiles?.full_name || '—'}</td>
                    <td>{item.kuota}</td>
                    {userProfile?.role === 'Pelajar' && (
                      <td>
                        <button onClick={() => handleDaftar(item)} className="btn btn-sm btn-primary">
                          Daftar
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <button className="btn btn-sm btn-outline" onClick={prevPage} disabled={page === 1}>
              Sebelumnya
            </button>
            <button className="btn btn-sm btn-outline" onClick={nextPage} disabled={pelatihan.length < perPage}>
              Selanjutnya
            </button>
          </div>
        </>
      )}

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Pelatihan yang Kamu Daftar</h2>

        {daftarPelatihan.length === 0 ? (
          <p className="text-gray-500">Kamu belum mendaftar pelatihan apa pun.</p>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Tanggal</th>
                <th>Kuota</th>
                <th>Pengajar</th>
              </tr>
            </thead>
            <tbody>
              {daftarPelatihan.map((item) => (
                <tr key={item.id_daftar}>
                  <td>{item.pelatihan?.judul || '-'}</td>
                  <td>{item.pelatihan?.tanggal ? new Date(item.pelatihan.tanggal).toLocaleDateString() : '-'}</td>
                  <td>{item.pelatihan?.kuota ?? '-'}</td>
                  <p>{item.pelatihan.profiles?.full_name}</p>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Daftar */}
      {showModal && selectedPelatihan && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Daftar</h3>
            <p>
              <strong>Pelatihan:</strong> {selectedPelatihan.judul}
            </p>
            <p>
              <strong>Nama:</strong> {userProfile?.full_name}
            </p>
            <p>
              <strong>Phone:</strong> {userProfile?.phone}
            </p>

            {alreadyRegistered ? (
              <p className="mt-4 text-red-500">⚠️ Kamu sudah terdaftar pada pelatihan ini.</p>
            ) : (
              <div className="mt-4 flex justify-end gap-2">
                <button className="btn btn-sm btn-outline" onClick={() => setShowModal(false)}>
                  Batal
                </button>
                <button className="btn btn-sm btn-success" onClick={submitPendaftaran}>
                  Daftar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
