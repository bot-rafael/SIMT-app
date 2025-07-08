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
  Select,
  Option,
} from '@material-tailwind/react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
    role: 'Pelajar',
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('Semua');
  const USERS_PER_PAGE = 10;

  const fetchUsers = async () => {
    setLoading(true);
    let query = supabase.from('profiles_with_email').select('*', { count: 'exact' });

    if (search) {
      query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`);
    }

    if (filterRole !== 'Semua') {
      query = query.eq('role', filterRole);
    }

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range((page - 1) * USERS_PER_PAGE, page * USERS_PER_PAGE - 1);

    if (!error) {
      setUsers(data || []);
      setTotalPages(Math.ceil(count / USERS_PER_PAGE));
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, filterRole]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    setMessage('');

    const requiredFields = [
      'email', 'password', 'full_name', 'username',
      'phone', 'city', 'birth_place', 'birth_date',
      'education', 'company', 'job', 'role'
    ];

    const emptyFields = requiredFields.filter((key) => !form[key]);

    if (emptyFields.length > 0) {
      const readable = emptyFields.map(f => f.replaceAll('_', ' ')).join(', ');
      setMessage(`❌ Kolom wajib belum diisi: ${readable}`);
      return;
    }

    if (form.password.length < 6) {
      setMessage('❌ Password minimal 6 karakter.');
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (authError) {
      setMessage(`❌ Gagal membuat akun: ${authError.message}`);
      return;
    }

    const userId = authData?.user?.id;
    if (!userId) {
      setMessage('❌ Tidak mendapatkan ID user.');
      return;
    }

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
      role: form.role,
    }]);

    if (profileError) {
      setMessage(`❌ Gagal tambah profil: ${profileError.message}`);
      return;
    }

    resetForm();
    fetchUsers();
  };

  const handleUpdateUser = async () => {
    setMessage('');
    if (!selectedUser?.user_id) {
      setMessage('❌ ID pengguna tidak ditemukan.');
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: form.full_name,
        username: form.username,
        phone: form.phone,
        city: form.city,
        birth_place: form.birth_place,
        birth_date: form.birth_date,
        education: form.education,
        company: form.company,
        job: form.job,
        role: form.role,
      })
      .eq('user_id', selectedUser.user_id);

    if (error) {
      setMessage(`❌ Gagal memperbarui data: ${error.message}`);
      return;
    }

    resetForm();
    fetchUsers();
  };

  const handleDeleteProfile = async (userId) => {
    const confirm = window.confirm('Yakin ingin menghapus akun ini secara permanen?');
    if (!confirm) return;

    const { error } = await supabase.rpc('delete_user_completely', { uid: userId });

    if (error) {
      alert(`❌ Gagal menghapus akun: ${error.message}`);
    } else {
      fetchUsers();
    }
  };

  const openEditModal = (user) => {
    setEditMode(true);
    setSelectedUser(user);
    setForm({
      email: user.email,
      password: '',
      full_name: user.full_name,
      username: user.username,
      phone: user.phone,
      city: user.city,
      birth_place: user.birth_place,
      birth_date: user.birth_date,
      education: user.education,
      company: user.company,
      job: user.job,
      role: user.role || 'Pelajar',
    });
    setOpenModal(true);
  };

  const resetForm = () => {
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
      role: 'Pelajar',
    });
    setOpenModal(false);
    setEditMode(false);
    setSelectedUser(null);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Typography variant="h5" className="text-blue-600 font-bold">
              Manajemen Pengguna
            </Typography>
            <Typography className="text-sm text-gray-500">
              Admin dapat melihat semua pengguna dari seluruh role
            </Typography>
          </div>
          <Button className="flex items-center gap-2 bg-blue-500" onClick={() => {
            setEditMode(false);
            setOpenModal(true);
          }}>
            <PlusIcon className="h-5 w-5" /> Tambah Pengguna
          </Button>
        </div>

        <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Input
            label="Cari Nama atau Email"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-full md:w-1/2"
          />
          <Select
            label="Filter Role"
            value={filterRole}
            onChange={(value) => {
              setPage(1);
              setFilterRole(value);
            }}
            className="w-full md:w-1/3"
          >
            <Option value="Semua">Semua</Option>
            <Option value="Pelajar">Pelajar</Option>
            <Option value="Pengajar">Pengajar</Option>
          </Select>
        </div>

        <Card className="overflow-x-auto shadow border border-gray-200">
          <CardBody className="p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-600">
                  <th className="p-2">Email</th>
                  <th className="p-2">Nama</th>
                  <th className="p-2">Username</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Kota</th>
                  <th className="p-2">Pekerjaan</th>
                  <th className="p-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.user_id} className="text-sm border-t">
                    <td className="p-2">{user.email || '-'}</td>
                    <td className="p-2">{user.full_name || '-'}</td>
                    <td className="p-2">{user.username || '-'}</td>
                    <td className="p-2">{user.role || '-'}</td>
                    <td className="p-2">{user.city || '-'}</td>
                    <td className="p-2">{user.job || '-'}</td>
                    <td className="p-2 flex gap-2">
                      <Button
                        size="sm"
                        variant="outlined"
                        color="blue"
                        className="flex items-center gap-1"
                        onClick={() => openEditModal(user)}
                      >
                        <PencilIcon className="h-4 w-4" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outlined"
                        color="red"
                        className="flex items-center gap-1"
                        onClick={() => handleDeleteProfile(user.user_id)}
                      >
                        <TrashIcon className="h-4 w-4" /> Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!loading && users.length === 0 && (
              <div className="text-center text-gray-500 mt-6">Tidak ada data pengguna</div>
            )}
          </CardBody>
        </Card>

        <div className="flex justify-between items-center mt-4">
          <Typography className="text-sm text-gray-600">
            Halaman {page} dari {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Sebelumnya
            </Button>
            <Button size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
              Berikutnya
            </Button>
          </div>
        </div>

        <Dialog open={openModal} handler={setOpenModal} size="lg">
          <DialogHeader>{editMode ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</DialogHeader>
          <DialogBody className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Email" name="email" value={form.email} onChange={handleInputChange} disabled={editMode} />
            {!editMode && (
              <Input label="Password" type="password" name="password" value={form.password} onChange={handleInputChange} />
            )}
            <Input label="Nama Lengkap" name="full_name" value={form.full_name} onChange={handleInputChange} />
            <Input label="Username" name="username" value={form.username} onChange={handleInputChange} />
            <Input label="No. Telepon" name="phone" value={form.phone} onChange={handleInputChange} />
            <Input label="Kota" name="city" value={form.city} onChange={handleInputChange} />
            <Input label="Tempat Lahir" name="birth_place" value={form.birth_place} onChange={handleInputChange} />
            <Input label="Tanggal Lahir" type="date" name="birth_date" value={form.birth_date} onChange={handleInputChange} />
            <Input label="Pendidikan Terakhir" name="education" value={form.education} onChange={handleInputChange} />
            <Input label="Perusahaan" name="company" value={form.company} onChange={handleInputChange} />
            <Input label="Pekerjaan" name="job" value={form.job} onChange={handleInputChange} />
            <Select
              label="Role"
              value={form.role}
              onChange={(value) => setForm({ ...form, role: value })}
            >
              <Option value="Pelajar">Pelajar</Option>
              <Option value="Pengajar">Pengajar</Option>
            </Select>
            {message && <Typography className="col-span-2 text-sm text-red-500">{message}</Typography>}
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="gray" onClick={resetForm} className="mr-2">
              Batal
            </Button>
            <Button onClick={editMode ? handleUpdateUser : handleAddUser} color="blue">
              {editMode ? 'Perbarui' : 'Simpan'}
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}
