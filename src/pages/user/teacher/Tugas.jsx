import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

export default function Tugas() {
  const [tugasList, setTugasList] = useState([]);
  const [deskripsi, setDeskripsi] = useState('');
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);
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
    if (!role || !userId) return;

    let query = supabase
      .from('tugas')
      .select('id_tugas, deskripsi, file, created_at, user_id')
      .order('created_at', { ascending: false });

    // Pengajar hanya lihat tugas miliknya
    if (role === 'Pengajar') {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
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
    if (userId && role) {
      fetchTugas();
    }
  }, [userId, role]);

  const uploadFile = async () => {
    if (!file) return null;

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('Ukuran maksimal file 5MB');
      return null;
    }

    const allowed = ['application/pdf', 'image/png', 'image/jpeg'];
    if (!allowed.includes(file.type)) {
      alert('File tidak didukung!');
      return null;
    }

    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}.${ext}`;

    const { error } = await supabase.storage.from('tugas').upload(fileName, file);
    if (error) {
      console.error('Upload gagal:', error.message);
      return null;
    }

    return fileName;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role !== 'Pengajar') {
      alert('Hanya Pengajar yang bisa menambahkan tugas!');
      return;
    }

    let filePath = null;
    if (file) filePath = await uploadFile();

    const payload = {
      deskripsi,
      file: filePath,
      user_id: userId,
    };

    const { error } = editId
      ? await supabase.from('tugas').update(payload).eq('id_tugas', editId)
      : await supabase.from('tugas').insert(payload);

    if (error) {
      console.error('Gagal simpan tugas:', error.message);
      return;
    }

    setDeskripsi('');
    setFile(null);
    setEditId(null);
    fetchTugas();
  };

  const handleEdit = (tugas) => {
    setDeskripsi(tugas.deskripsi);
    setEditId(tugas.id_tugas);
  };

  const handleDelete = async (id) => {
    if (role !== 'Pengajar') {
      alert('Hanya Pengajar yang bisa hapus!');
      return;
    }

    if (!window.confirm('Yakin ingin hapus tugas ini?')) return;

    const { error } = await supabase.from('tugas').delete().eq('id_tugas', id);
    if (error) {
      console.error('Gagal hapus:', error.message);
      return;
    }

    fetchTugas();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manajemen Tugas</h2>

      {role === 'Pengajar' && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <div>
            <label>Deskripsi:</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
            />
          </div>
          <div>
            <label>File (opsional):</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <button type="submit">{editId ? 'Update' : 'Tambah'} Tugas</button>
        </form>
      )}

      <h3>Daftar Tugas</h3>
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
            <br />
            {role === 'Pengajar' && t.user_id === userId && (
              <>
                <button onClick={() => handleEdit(t)}>Edit</button>
                <button
                  onClick={() => handleDelete(t.id_tugas)}
                  style={{ marginLeft: '10px' }}
                >
                  Hapus
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
