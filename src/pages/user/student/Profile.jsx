import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { Input, Button, Typography, CardBody } from '@material-tailwind/react';

export default function Profile() {
  const [form, setForm] = useState({
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();

    if (data) setForm(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from('profiles').upsert({
      user_id: user.id,
      ...form,
    });

    if (error) setError(error.message);
    else setSuccess('Profil berhasil disimpan.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
        <div className="border-b px-6 py-4">
          <Typography variant="h5" color="blue-gray" className="font-semibold">
            Lengkapi Profil Anda
          </Typography>
          <Typography className="text-sm text-gray-500 mt-1">Dengan melengkapi profil, Anda dapat menikmati layanan EduPro secara maksimal.</Typography>
        </div>

        <form onSubmit={handleSubmit}>
          <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-8">
            {/* Bagian Data Diri */}
            <div className="col-span-2">
              <Typography variant="h6" className="text-blue-600 uppercase text-xs font-bold mb-3">
                Data Diri
              </Typography>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Nama Lengkap *</label>
              <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Username *</label>
              <Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">No. Telepon</label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>

            {/* Kota & Tanggal Lahir */}
            <div className="col-span-2">
              <Typography variant="h6" className="text-blue-600 uppercase text-xs font-bold mb-3 mt-6">
                Kota & Kabupaten
              </Typography>
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">Kota / Kabupaten Saat Ini</label>
              <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Tempat Lahir</label>
              <Input value={form.birth_place} onChange={(e) => setForm({ ...form, birth_place: e.target.value })} />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Tanggal Lahir</label>
              <Input type="date" value={form.birth_date} onChange={(e) => setForm({ ...form, birth_date: e.target.value })} />
            </div>

            {/* Pendidikan & Pekerjaan */}
            <div className="col-span-2 mt-4">
              <label className="text-sm font-medium text-gray-700">Pendidikan Terakhir</label>
              <Input value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} />
            </div>

            <div className="col-span-2 mt-4">
              <label className="text-sm font-medium text-gray-700">Perusahaan / Institusi Saat Ini</label>
              <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>

            <div className="col-span-2 mt-4">
              <label className="text-sm font-medium text-gray-700">Pekerjaan / Profesi Saat Ini</label>
              <Input value={form.job} onChange={(e) => setForm({ ...form, job: e.target.value })} />
            </div>

            {/* Error & Success */}
            {error && <Typography className="col-span-2 text-sm text-red-500">{error}</Typography>}
            {success && <Typography className="col-span-2 text-sm text-green-500">{success}</Typography>}

            {/* Buttons */}
            <div className="col-span-2 flex justify-end gap-3 pt-4">
              <div className="col-span-2 flex justify-end gap-3 pt-4">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white shadow-md transition-all" disabled={loading}>
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </div>
            </div>
          </CardBody>
        </form>
      </div>
    </div>
  );
}
