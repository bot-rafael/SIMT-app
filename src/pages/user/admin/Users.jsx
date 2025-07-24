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
      email: user.email || '',
      password: '',
      full_name: user.full_name || '',
      username: user.username || '',
      phone: user.phone || '',
      city: user.city || '',
      birth_place: user.birth_place || '',
      birth_date: user.birth_date || '',
      education: user.education || '',
      company: user.company || '',
      job: user.job || '',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <Typography variant="h4" className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent font-bold">
                  Manajemen Pengguna
                </Typography>
                <Typography className="text-sm text-slate-600 font-medium">
                  Admin dapat melihat semua pengguna dari seluruh role
                </Typography>
              </div>
            </div>
          </div>
          
          <Button 
            className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1" 
            onClick={() => {
              setEditMode(false);
              setOpenModal(true);
            }}
          >
            <div className="p-1 bg-white/20 rounded-lg">
              <PlusIcon className="h-5 w-5" />
            </div>
            Tambah Pengguna
          </Button>
        </div>

        {/* Enhanced Search & Filter Section */}
        <div className="mb-8">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardBody className="p-6">
              <div className="flex flex-col lg:flex-row gap-6 items-end">
                <div className="flex-1">
                  <Input
                    label="🔍 Cari Nama atau Email"
                    value={search}
                    onChange={(e) => {
                      setPage(1);
                      setSearch(e.target.value);
                    }}
                    className="!border-2 !border-blue-200 focus:!border-blue-500"
                    labelProps={{
                      className: "!text-blue-600 font-semibold"
                    }}
                  />
                </div>
                <div className="w-full lg:w-80">
                  <Select
                    label="🎯 Filter Role"
                    value={filterRole}
                    onChange={(value) => {
                      setPage(1);
                      setFilterRole(value);
                    }}
                    className="!border-2 !border-blue-200 focus:!border-blue-500"
                    labelProps={{
                      className: "!text-blue-600 font-semibold"
                    }}
                  >
                    <Option value="Semua">Semua Role</Option>
                    <Option value="Pelajar">👨‍🎓 Pelajar</Option>
                    <Option value="Pengajar">👨‍🏫 Pengajar</Option>
                  </Select>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Enhanced Main Table Card */}
        <Card className="overflow-hidden shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardBody className="p-0">
            {/* Stunning Header */}
          <div className="bg-blue-500 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10"></div>
              
              {/* Animated Background Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full animate-bounce delay-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-2xl font-bold tracking-wide">Data Pengguna Sistem</h3>
                      <p className="text-white/90 text-sm mt-1 font-medium">Kelola informasi pengguna sistem pembelajaran online</p>
                    </div>
                  </div>
                  
                  <div className="hidden lg:flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{users.length}</div>
                      <div className="text-xs text-white/80">Total Users</div>
                    </div>
                    <div className="w-px h-12 bg-white/30"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{page}</div>
                      <div className="text-xs text-white/80">Current Page</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Table Container */}
            <div className="overflow-x-auto table-container" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#6366f1 #f1f5f9'
            }}>
              <style>
                {`
                  .table-container::-webkit-scrollbar {
                    height: 10px;
                  }
                  .table-container::-webkit-scrollbar-track {
                    background: linear-gradient(90deg, #f8fafc, #f1f5f9);
                    border-radius: 15px;
                  }
                  .table-container::-webkit-scrollbar-thumb {
                    background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
                    border-radius: 15px;
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
                  }
                  .table-container::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(90deg, #4f46e5, #7c3aed, #db2777);
                  }
                `}
              </style>
              
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b-2 border-indigo-200">
                  <tr>
                    <th className="px-8 py-6 text-left">
                      <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email</div>
                          <div className="text-xs text-slate-500">Alamat email pengguna</div>
                        </div>
                      </div>
                    </th>
                    <th className="px-8 py-6 text-left">
                      <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="p-2 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-all duration-300 group-hover:scale-110">
                          <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-700 uppercase tracking-wider">Nama</div>
                          <div className="text-xs text-slate-500">Nama lengkap</div>
                        </div>
                      </div>
                    </th>
                    <th className="px-8 py-6 text-left">
                      <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-700 uppercase tracking-wider">Username</div>
                          <div className="text-xs text-slate-500">Nama pengguna</div>
                        </div>
                      </div>
                    </th>
                    <th className="px-8 py-6 text-left">
                      <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="p-2 bg-amber-100 rounded-xl group-hover:bg-amber-200 transition-all duration-300 group-hover:scale-110">
                          <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-700 uppercase tracking-wider">Role</div>
                          <div className="text-xs text-slate-500">Peran sistem</div>
                        </div>
                      </div>
                    </th>
                    <th className="px-8 py-6 text-left">
                      <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="p-2 bg-rose-100 rounded-xl group-hover:bg-rose-200 transition-all duration-300 group-hover:scale-110">
                          <svg className="w-5 h-5 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zM4 8v8h12V8H4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-700 uppercase tracking-wider">Pekerjaan</div>
                          <div className="text-xs text-slate-500">Profesi</div>
                        </div>
                      </div>
                    </th>
                    <th className="px-8 py-6 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <div className="p-2 bg-red-100 rounded-xl">
                          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-700 uppercase tracking-wider">Aksi</div>
                          <div className="text-xs text-slate-500">Tindakan</div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="px-8 py-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                          <div className="text-slate-600 font-medium">Memuat data pengguna...</div>
                        </div>
                      </td>
                    </tr>
                  ) : users.map((user, index) => (
                    <tr 
                      key={user.user_id} 
                      className={`
                        transition-all duration-500 hover:bg-gradient-to-r hover:from-blue-50 hover:via-blue-50 hover:to-pink-50
                        ${index % 2 === 0 ? 'bg-white' : 'bg-gradient-to-r from-slate-50/50 to-blue-50/30'}
                        group cursor-pointer hover:shadow-xl hover:scale-[1.02] transform-gpu border-l-4 hover:border-l-indigo-500
                      `}
                    >
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                              <span className="text-white text-lg font-bold">
                                {user.email ? user.email.charAt(0).toUpperCase() : '?'}
                              </span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                              {user.email || '-'}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              📧 Email pengguna
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                          {user.full_name || '-'}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">👤 {user.city || 'Kota tidak diisi'}</div>
                      </td>
                      
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="inline-flex items-center">
                          <span className="text-sm text-slate-700 bg-gradient-to-r from-blue-100 to-blue-100 px-4 py-2 rounded-xl font-mono font-bold group-hover:from-blue-200 group-hover:to-blue-200 transition-all duration-300 shadow-md group-hover:shadow-lg">
                            @{user.username || 'unknown'}
                          </span>
                        </div>
                      </td>
                      
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className={`
                          inline-flex items-center px-4 py-2 text-sm font-bold rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 border-2
                          ${user.role === 'Pengajar' 
                            ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200 hover:from-red-200 hover:to-pink-200' 
                            : user.role === 'admin'
                            ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200 hover:from-amber-200 hover:to-orange-200'
                            : 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200 hover:from-emerald-200 hover:to-green-200'
                          }
                        `}>
                          <span className="mr-2">
                            {user.role === 'Pengajar' ? '👨‍🏫' : '👨‍🎓'}
                          </span>
                          {user.role || 'Pelajar'}
                        </span>
                      </td>
                      
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-rose-100 rounded-xl">
                            <svg className="w-4 h-4 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zM4 8v8h12V8H4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-bold text-slate-700">{user.job || '-'}</div>
                            <div className="text-xs text-slate-500">💼 Profesi</div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-8 py-6 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-3 opacity-70 group-hover:opacity-100 transition-all duration-300">
                          <Button
                            size="sm"
                            variant="outlined"
                            color="blue"
                            className="
                              flex items-center gap-2 px-4 py-2 text-xs font-bold
                              bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-blue-700 
                              hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 hover:text-blue-800
                              transition-all duration-300 transform hover:scale-110 hover:rotate-2
                              shadow-lg hover:shadow-xl rounded-xl
                            "
                            onClick={() => openEditModal(user)}
                          >
                            <PencilIcon className="h-4 w-4" />
                            Edit
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outlined"
                            color="red"
                            className="
                              flex items-center gap-2 px-4 py-2 text-xs font-bold
                              bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 
                              hover:from-red-100 hover:to-pink-100 hover:border-red-300 hover:text-red-800
                              transition-all duration-300 transform hover:scale-110 hover:-rotate-2
                              shadow-lg hover:shadow-xl rounded-xl
                            "
                            onClick={() => handleDeleteProfile(user.user_id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Enhanced Empty state */}
              {!loading && users.length === 0 && (
                <div className="text-center py-20 bg-gradient-to-br from-slate-50 to-blue-50">
                  <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mb-8 shadow-2xl animate-bounce">
                    <svg className="w-16 h-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-4.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Belum ada pengguna terdaftar</h3>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
                    Sistem belum memiliki data pengguna. Mulai dengan menambahkan pengguna pertama untuk memulai manajemen data pembelajaran.
                  </p>
                  <Button 
                    className="bg-blue-500 p-8 relative overflow-hidden"

                    onClick={() => {
                      setEditMode(false);
                      setOpenModal(true);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-white/20 rounded-lg">
                        <PlusIcon className="h-6 w-6" />
                      </div>
                      Tambah Pengguna Pertama
                    </div>
                  </Button>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Enhanced Pagination */}
        <div className="mt-8">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardBody className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <Typography className="text-sm font-bold text-slate-700">
                        Halaman <span className="text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">{page}</span> dari <span className="text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">{totalPages}</span>
                      </Typography>
                      <Typography className="text-xs text-slate-500">
                        📊 Total {users.length} pengguna ditampilkan
                      </Typography>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button 
                    size="sm" 
                    disabled={page === 1} 
                    onClick={() => setPage((p) => p - 1)}
                    className="flex items-center gap-2 disabled:opacity-50 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-slate-200 hover:to-slate-300 border-2 border-slate-200 font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Sebelumnya
                  </Button>
                  
                  <div className="hidden sm:flex items-center gap-2">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const pageNum = i + 1;
                      const isActive = pageNum === page;
                      return (
                        <Button
                          key={pageNum}
                          size="sm"
                          className={`
                            w-10 h-10 rounded-xl font-bold transition-all duration-300
                            ${isActive 
                              ? 'bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-lg' 
                              : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                            }
                          `}
                          onClick={() => setPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button 
                    size="sm" 
                    disabled={page === totalPages || totalPages === 0} 
                    onClick={() => setPage((p) => p + 1)}
                    className="flex items-center gap-2 disabled:opacity-50 bg-gradient-to-r from-blue-500 to-blue-500 text-white hover:from-blue-600 hover:to-blue-600 font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Berikutnya
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Enhanced Modal */}
        <Dialog open={openModal} handler={setOpenModal} size="xl" className="bg-transparent shadow-2xl">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border-0">
            <DialogHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8 rounded-t-2xl">
              <div className="flex items-center gap-4 w-full">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
                    {editMode ? '✏️ Edit Pengguna' : '➕ Tambah Pengguna Baru'}
                  </h2>
                  <p className="text-white/90 text-sm mt-1">
                    {editMode ? 'Perbarui informasi pengguna' : 'Lengkapi form untuk menambah pengguna baru'}
                  </p>
                </div>
              </div>
            </DialogHeader>
            
            <DialogBody className="p-8 bg-gradient-to-br from-white to-slate-50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <Input 
                      label="📧 Email" 
                      name="email" 
                      value={form.email} 
                      onChange={handleInputChange} 
                      disabled={editMode}
                      className="!border-2 !border-blue-200 focus:!border-blue-500"
                      labelProps={{ className: "!text-blue-600 font-semibold" }}
                    />
                  </div>
                  
                  {!editMode && (
                    <div>
                      <Input 
                        label="🔒 Password" 
                        type="password" 
                        name="password" 
                        value={form.password} 
                        onChange={handleInputChange}
                        className="!border-2 !border-blue-200 focus:!border-blue-500"
                        labelProps={{ className: "!text-blue-600 font-semibold" }}
                      />
                    </div>
                  )}
                  
                  <div>
                    <Input 
                      label="👤 Nama Lengkap" 
                      name="full_name" 
                      value={form.full_name} 
                      onChange={handleInputChange}
                      className="!border-2 !border-emerald-200 focus:!border-emerald-500"
                      labelProps={{ className: "!text-emerald-600 font-semibold" }}
                    />
                  </div>
                  
                  <div>
                    <Input 
                      label="🏷️ Username" 
                      name="username" 
                      value={form.username} 
                      onChange={handleInputChange}
                      className="!border-2 !border-indigo-200 focus:!border-indigo-500"
                      labelProps={{ className: "!text-indigo-600 font-semibold" }}
                    />
                  </div>
                  
                  <div>
                    <Input 
                      label="📱 No. Telepon" 
                      name="phone" 
                      value={form.phone} 
                      onChange={handleInputChange}
                      className="!border-2 !border-rose-200 focus:!border-rose-500"
                      labelProps={{ className: "!text-rose-600 font-semibold" }}
                    />
                  </div>
                  
                  <div>
                    <Input 
                      label="🏙️ Kota" 
                      name="city" 
                      value={form.city} 
                      onChange={handleInputChange}
                      className="!border-2 !border-cyan-200 focus:!border-cyan-500"
                      labelProps={{ className: "!text-cyan-600 font-semibold" }}
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <Input 
                      label="📍 Tempat Lahir" 
                      name="birth_place" 
                      value={form.birth_place} 
                      onChange={handleInputChange}
                      className="!border-2 !border-teal-200 focus:!border-teal-500"
                      labelProps={{ className: "!text-teal-600 font-semibold" }}
                    />
                  </div>
                  
                  <div>
                    <Input 
                      label="📅 Tanggal Lahir" 
                      type="date" 
                      name="birth_date" 
                      value={form.birth_date} 
                      onChange={handleInputChange}
                      className="!border-2 !border-orange-200 focus:!border-orange-500"
                      labelProps={{ className: "!text-orange-600 font-semibold" }}
                    />
                  </div>
                  
                  <div>
                    <Input 
                      label="🎓 Pendidikan Terakhir" 
                      name="education" 
                      value={form.education} 
                      onChange={handleInputChange}
                      className="!border-2 !border-lime-200 focus:!border-lime-500"
                      labelProps={{ className: "!text-lime-600 font-semibold" }}
                    />
                  </div>
                  
                  <div>
                    <Input 
                      label="🏢 Perusahaan" 
                      name="company" 
                      value={form.company} 
                      onChange={handleInputChange}
                      className="!border-2 !border-violet-200 focus:!border-violet-500"
                      labelProps={{ className: "!text-violet-600 font-semibold" }}
                    />
                  </div>
                  
                  <div>
                    <Input 
                      label="💼 Pekerjaan" 
                      name="job" 
                      value={form.job} 
                      onChange={handleInputChange}
                      className="!border-2 !border-pink-200 focus:!border-pink-500"
                      labelProps={{ className: "!text-pink-600 font-semibold" }}
                    />
                  </div>
                  
                  <div>
                    <Select
                      label="🎯 Role"
                      value={form.role}
                      onChange={(value) => setForm({ ...form, role: value })}
                      className="!border-2 !border-amber-200 focus:!border-amber-500"
                      labelProps={{ className: "!text-amber-600 font-semibold" }}
                    >
                      <Option value="Pelajar">👨‍🎓 Pelajar</Option>
                      <Option value="Pengajar">👨‍🏫 Pengajar</Option>
                    </Select>
                  </div>
                </div>
              </div>
              
              {message && (
                <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl">
                  <Typography className="text-sm text-red-700 font-semibold">
                    {message}
                  </Typography>
                </div>
              )}
            </DialogBody>
            
            <DialogFooter className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-b-2xl border-t border-slate-200">
              <div className="flex items-center justify-end gap-4 w-full">
                <Button 
                  variant="text" 
                  onClick={resetForm} 
                  className="px-6 py-3 bg-white text-slate-600 hover:bg-slate-100 transition-all duration-300 font-semibold rounded-xl border-2 border-slate-200 hover:border-slate-300"
                >
                  ❌ Batal
                </Button>
                <Button 
                  onClick={editMode ? handleUpdateUser : handleAddUser} 
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  {editMode ? '💾 Perbarui Data' : '➕ Simpan Pengguna'}
                </Button>
              </div>
            </DialogFooter>
          </div>
        </Dialog>
      </div>
    </div>
  );
}