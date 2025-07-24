import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

export default function Tugas() {
  const [tugasList, setTugasList] = useState([]);
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Gagal ambil role:', error.message);
        return;
      }

      setRole(profile.role);
    };

    fetchUser();
  }, []);

  const fetchTugas = async () => {
    const { data, error } = await supabase
      .from('tugas')
      .select('id_tugas, deskripsi, file, created_at, user_id')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Gagal ambil tugas:', error.message);
      return;
    }

    const tugasWithUrl = data.map((t) => ({
      ...t,
      signedUrl: t.file
        ? `https://ujxcjxfnizqdwelxlwes.supabase.co/storage/v1/object/public/tugas/${t.file}`
        : null,
    }));

    setTugasList(tugasWithUrl);
  };

  useEffect(() => {
    if (userId && role === 'Pelajar') {
      fetchTugas();
    }
  }, [userId, role]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Daftar Tugas</h2>
      <ul>
        {tugasList.map((t) => (
          <li key={t.id_tugas} style={{ marginBottom: '15px' }}>
            <strong>Deskripsi:</strong> {t.deskripsi}
            <br />
            {t.signedUrl && (
              <a href={t.signedUrl} target="_blank" rel="noreferrer">
                Lihat File
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
