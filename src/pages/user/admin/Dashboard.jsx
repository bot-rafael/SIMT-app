// Dashboard.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import {
  UserGroupIcon,
  AcademicCapIcon,
  PresentationChartLineIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

const COLORS = ['#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#10B981', '#F97316'];

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [pelatihanCount, setPelatihanCount] = useState(0);
  const [aktivitasHarian, setAktivitasHarian] = useState(0);
  const [chartPelatihan, setChartPelatihan] = useState([]);
  const [chartRole, setChartRole] = useState([]);
  const [weeklyPelatihan, setWeeklyPelatihan] = useState([]);
  const [latestUsers, setLatestUsers] = useState([]);
  const [latestPelatihan, setLatestPelatihan] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCounts = async () => {
    const today = new Date().toISOString().split('T')[0];

    const { count: userTotal } = await supabase
      .from('profiles_with_email')
      .select('*', { count: 'exact', head: true });

    const { count: pelatihanTotal } = await supabase
      .from('pelatihan')
      .select('*', { count: 'exact', head: true });

    const { count: todayTotal } = await supabase
      .from('pelatihan')
      .select('*', { count: 'exact', head: true })
      .eq('tanggal', today);

    setUserCount(userTotal || 0);
    setPelatihanCount(pelatihanTotal || 0);
    setAktivitasHarian(todayTotal || 0);
  };

  const fetchRoleDistribusi = async () => {
    const { data } = await supabase
      .from('profiles_with_email')
      .select('role');

    const grouped = data?.reduce((acc, cur) => {
      const role = cur.role || 'Lainnya';
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {}) || {};

    const chartData = Object.entries(grouped).map(([role, value]) => ({
      name: role,
      value,
    }));

    setChartRole(chartData);
  };

  const fetchPelatihanBulanan = async () => {
    const { data } = await supabase.from('pelatihan').select('tanggal');
    const grouped = {};
    data?.forEach(({ tanggal }) => {
      const date = new Date(tanggal);
      const key = date.toLocaleString('id-ID', { month: 'short', year: 'numeric' });
      grouped[key] = (grouped[key] || 0) + 1;
    });
    const result = Object.entries(grouped).map(([bulan, total]) => ({ bulan, total }));
    setChartPelatihan(result.sort((a, b) => new Date('1 ' + a.bulan) - new Date('1 ' + b.bulan)));
  };

  const fetchPelatihanMingguan = async () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);
    const { data } = await supabase
      .from('pelatihan')
      .select('tanggal')
      .gte('tanggal', sevenDaysAgo.toISOString().split('T')[0]);
    const counts = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().split('T')[0];
      counts[key] = 0;
    }
    data?.forEach(({ tanggal }) => {
      const key = tanggal.split('T')[0];
      if (counts[key] !== undefined) counts[key]++;
    });
    const formatted = Object.entries(counts).map(([tgl, jumlah]) => ({
      tanggal: new Date(tgl).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' }),
      jumlah,
    }));
    setWeeklyPelatihan(formatted);
  };

  const fetchLatestUsers = async () => {
    const { data } = await supabase
      .from('profiles_with_email')
      .select('full_name, email, role')
      .order('created_at', { ascending: false })
      .limit(5);
    setLatestUsers(data || []);
  };

  const fetchLatestPelatihan = async () => {
    const { data } = await supabase
      .from('pelatihan')
      .select('judul, tanggal, kuota')
      .order('created_at', { ascending: false })
      .limit(5);
    setLatestPelatihan(data || []);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchCounts(),
        fetchRoleDistribusi(),
        fetchPelatihanBulanan(),
        fetchPelatihanMingguan(),
        fetchLatestUsers(),
        fetchLatestPelatihan(),
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-slate-600 font-medium">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
              <PresentationChartLineIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Dashboard Admin
              </h1>
              <p className="text-slate-600 mt-1">Pantau statistik pengguna dan pelatihan secara real-time</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard 
            label="Total Pengguna" 
            value={userCount.toLocaleString('id-ID')} 
            color="blue" 
            icon={<UserGroupIcon className="h-7 w-7" />}
          />
          <StatCard 
            label="Total Pelatihan" 
            value={pelatihanCount.toLocaleString('id-ID')} 
            color="purple" 
            icon={<AcademicCapIcon className="h-7 w-7" />}
          />
          <StatCard 
            label="Aktivitas Hari Ini" 
            value={aktivitasHarian.toLocaleString('id-ID')} 
            color="emerald" 
            icon={<ChartBarIcon className="h-7 w-7" />}
          />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                  <CalendarDaysIcon className="h-5 w-5 text-white" />
                </div>
                <Typography variant="h6" className="text-slate-800 font-bold">
                  Pelatihan per Bulan
                </Typography>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={chartPelatihan}>
                  <XAxis 
                    dataKey="bulan" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <YAxis 
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="url(#blueGradient)" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#1D4ED8' }}
                  />
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                  <UsersIcon className="h-5 w-5 text-white" />
                </div>
                <Typography variant="h6" className="text-slate-800 font-bold">
                  Distribusi Role Pengguna
                </Typography>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie 
                    data={chartRole} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={110}
                    innerRadius={40}
                    paddingAngle={5}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {chartRole.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>
        <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 mb-8">
          <CardBody className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
                <ChartBarIcon className="h-5 w-5 text-white" />
              </div>
              <Typography variant="h6" className="text-slate-800 font-bold">
                Aktivitas 7 Hari Terakhir
              </Typography>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={weeklyPelatihan}>
                <XAxis 
                  dataKey="tanggal"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis 
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="jumlah" 
                  fill="url(#emeraldGradient)"
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
                  <UserGroupIcon className="h-5 w-5 text-white" />
                </div>
                <Typography variant="h6" className="text-slate-800 font-bold">
                  Pengguna Terbaru
                </Typography>
              </div>
              <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Nama</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Role</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {latestUsers.map((user, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition-colors duration-200">
                        <td className="px-4 py-3 text-sm font-medium text-slate-900">{user.full_name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{user.email}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-2 rounded-lg">
                  <AcademicCapIcon className="h-5 w-5 text-white" />
                </div>
                <Typography variant="h6" className="text-slate-800 font-bold">
                  Pelatihan Terbaru
                </Typography>
              </div>
              <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Judul</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tanggal</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Kuota</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {latestPelatihan.map((pelatihan, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition-colors duration-200">
                        <td className="px-4 py-3 text-sm font-medium text-slate-900">{pelatihan.judul}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {new Date(pelatihan.tanggal).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                            {pelatihan.kuota} orang
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, trend }) {
  const colorConfigs = {
    blue: {
      bg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      border: 'border-l-blue-500'
    },
    purple: {
      bg: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      border: 'border-l-purple-500'
    },
    emerald: {
      bg: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      border: 'border-l-emerald-500'
    }
  };

  const config = colorConfigs[color];

  return (
    <Card className={`bg-white/70 backdrop-blur-sm shadow-lg border-l-4 ${config.border} hover:shadow-xl hover:scale-105 transform transition-all duration-300`}>
      <CardBody className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 ${config.iconBg} rounded-xl`}>
              <div className={config.iconColor}>
                {icon}
              </div>
            </div>
            <div>
              <Typography className="text-sm font-semibold text-slate-600 mb-1">
                {label}
              </Typography>
              <Typography className="text-2xl font-bold text-slate-800">
                {value}
              </Typography>
            </div>
          </div>
          {trend && (
            <div className="flex items-center space-x-1">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                trend.startsWith('+') 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : trend === '0%'
                  ? 'bg-slate-100 text-slate-600'
                  : 'bg-red-100 text-red-700'
              }`}>
                {trend}
              </span>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}