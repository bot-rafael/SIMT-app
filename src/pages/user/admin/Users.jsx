// src/pages/admin/Users.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import {
  Button,
  Input,
  Typography,
  Card,
  CardBody,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Users() {
  const [activeTab, setActiveTab] = useState('Pengajar');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: '',
    username: '',
    phone: '',
    city: '',
    birth_place: '',
    birth_date: '',
    education: '',
    company: '',
    job: '',
  });

  const fetchUsers = async (role) => {
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*').eq('role', role);
    if (!error) setUsers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(activeTab);
  }, [activeTab]);

  const handleTabChange = (role) => setActiveTab(role);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddPengajar = async () => {
    setMessage('');

    // 1. Buat akun di Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (authError) {
      setMessage(`Gagal membuat akun auth: ${authError.message}`);
      return;
    }

    const userId = authData?.user?.id;
    if (!userId) {
      setMessage('Gagal mendapatkan ID user dari auth.');
      return;
    }

    // 2. Insert ke tabel profiles
    const { error: profileError } = await supabase.from('profiles').insert([{
      user_id: userId,
      full_name: form.full_name,
      username: form.username,
      phone: form.phone,
      city: form.city,
      birth_place: form.birth_place,
      birth_date: form.birth_date,
      education: form.education,
      company: form.company,
      job: form.job,
      role: 'Pengajar',
    }]);

    if (profileError) {
      setMessage(`Gagal menambahkan data profil: ${profileError.message}`);
      return;
    }

    // Berhasil, reset form & refresh data
    setForm({
      email: '',
      password: '',
      full_name: '',
      username: '',
      phone: '',
      city: '',
      birth_place: '',
      birth_date: '',
      education: '',
      company: '',
      job: '',
    });
    setOpenModal(false);
    fetchUsers('Pengajar');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Typography variant="h5" className="text-blue-600 font-bold">
              Manajemen Pengguna
            </Typography>
            <Typography className="text-sm text-gray-500">Kelola pengguna berdasarkan peran</Typography>
          </div>

          {activeTab === 'Pengajar' && (
            <Button className="flex items-center gap-2 bg-blue-500" onClick={() => setOpenModal(true)}>
              <PlusIcon className="h-5 w-5" /> Tambah Pengajar
            </Button>
          )}
        </div>

        <div className="mb-4 flex gap-4">
          {['Pengajar', 'Pelajar'].map((role) => (
            <Button
              key={role}
              onClick={() => handleTabChange(role)}
              variant={activeTab === role ? 'filled' : 'outlined'}
              className={activeTab === role ? 'bg-blue-500 text-white' : 'text-blue-500 border-blue-500'}
            >
              {role}
            </Button>
          ))}
        </div>

        <Card className="overflow-x-auto shadow border border-gray-200">
          <CardBody className="p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-600">
                  <th className="p-2">Nama</th>
                  <th className="p-2">Username</th>
                  <th className="p-2">Kota</th>
                  <th className="p-2">Pekerjaan</th>
                  {activeTab === 'Pengajar' && <th className="p-2">Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.user_id} className="text-sm border-t">
                    <td className="p-2">{user.full_name || '-'}</td>
                    <td className="p-2">{user.username || '-'}</td>
                    <td className="p-2">{user.city || '-'}</td>
                    <td className="p-2">{user.job || '-'}</td>
                    {activeTab === 'Pengajar' && (
                      <td className="p-2 flex gap-2">
                        <Button size="sm" variant="outlined" color="blue" className="flex items-center gap-1">
                          <PencilIcon className="h-4 w-4" /> Edit
                        </Button>
                        <Button size="sm" variant="outlined" color="red" className="flex items-center gap-1">
                          <TrashIcon className="h-4 w-4" /> Nonaktifkan
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {!loading && users.length === 0 && (
              <div className="text-center text-gray-500 mt-6">Tidak ada data pengguna</div>
            )}
          </CardBody>
        </Card>

        {/* Modal Tambah Pengajar */}
        <Dialog open={openModal} handler={setOpenModal} size="lg">
          <DialogHeader>Tambah Pengajar Baru</DialogHeader>
          <DialogBody className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Email" name="email" value={form.email} onChange={handleInputChange} />
            <Input label="Password" type="password" name="password" value={form.password} onChange={handleInputChange} />
            <Input label="Nama Lengkap" name="full_name" value={form.full_name} onChange={handleInputChange} />
            <Input label="Username" name="username" value={form.username} onChange={handleInputChange} />
            <Input label="No. Telepon" name="phone" value={form.phone} onChange={handleInputChange} />
            <Input label="Kota" name="city" value={form.city} onChange={handleInputChange} />
            <Input label="Tempat Lahir" name="birth_place" value={form.birth_place} onChange={handleInputChange} />
            <Input label="Tanggal Lahir" type="date" name="birth_date" value={form.birth_date} onChange={handleInputChange} />
            <Input label="Pendidikan Terakhir" name="education" value={form.education} onChange={handleInputChange} />
            <Input label="Perusahaan" name="company" value={form.company} onChange={handleInputChange} />
            <Input label="Pekerjaan" name="job" value={form.job} onChange={handleInputChange} />
            {message && <Typography className="col-span-2 text-sm text-red-500">{message}</Typography>}
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="gray" onClick={() => setOpenModal(false)} className="mr-2">
              Batal
            </Button>
            <Button onClick={handleAddPengajar} color="blue">
              Simpan
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}
