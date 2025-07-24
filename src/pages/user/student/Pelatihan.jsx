import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

export default function Pelatihan() {
  const [pelatihan, setPelatihan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetchPelatihan();
  }, [page]);

  const fetchPelatihan = async () => {
    setLoading(true);
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    const { data, error } = await supabase
      .from('pelatihan')
      .select(`
        id_pelatihan,
        judul,
        deskripsi,
        tanggal,
        kuota,
        created_at,
        profiles:pengajar_id (
          full_name,
          role
        )
      `)
      .eq('profiles.role', 'Pengajar') // filter hanya yang role-nya 'Pengajar'
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setPelatihan(data);

    setLoading(false);
  };

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page > 1 ? page - 1 : 1);

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
              </tr>
            </thead>
            <tbody>
              {pelatihan.map((item) => (
                <tr key={item.id_pelatihan}>
                  <td>{item.judul}</td>
                  <td>{item.deskripsi}</td>
                  <td>{new Date(item.tanggal).toLocaleDateString()}</td>
                  <td>{item.profiles?.full_name ?? '—'}</td>
                  <td>{item.kuota}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <button
              className="btn btn-sm btn-outline"
              onClick={prevPage}
              disabled={page === 1}
            >
              Sebelumnya
            </button>
            <button
              className="btn btn-sm btn-outline"
              onClick={nextPage}
              disabled={pelatihan.length < perPage}
            >
              Selanjutnya
            </button>
          </div>
        </>
      )}
    </div>
  );
}
