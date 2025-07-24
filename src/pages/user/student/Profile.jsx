import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { Input, Button, Typography, CardBody, Alert, Spinner } from '@material-tailwind/react';
import { UserCircleIcon, PhoneIcon, MapPinIcon, AcademicCapIcon, BriefcaseIcon, CalendarIcon, CheckCircleIcon, ExclamationTriangleIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/outline';

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
  const [isEditing, setIsEditing] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data) {
          setForm(data);
          setHasData(true);
          setIsEditing(false); 
        }
        if (error && error.code !== 'PGRST116') {
          setError('Gagal mengambil data profil: ' + error.message);
        }
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil profil');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from('profiles').upsert({
        user_id: user.id,
        ...form,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess('Profil berhasil disimpan! 🎉');
        setHasData(true);
        setIsEditing(false); 
        setTimeout(() => setSuccess(''), 5000);
      }
    } catch (err) {
      setError('Terjadi kesalahan saat menyimpan profil');
    }
    setLoading(false);
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchProfile(); 
    setError('');
    setSuccess('');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const ProfileField = ({ icon: Icon, label, value, iconColor = "text-gray-600" }) => (
    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
      <div className={`mt-1 ${iconColor}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <Typography className="text-sm font-medium text-gray-600 mb-1">
          {label}
        </Typography>
        <Typography className="text-gray-900 font-medium">
          {value || '-'}
        </Typography>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl border-0 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <UserCircleIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <Typography variant="h4" className="text-white font-bold">
                    Profil Saya
                  </Typography>
                  <Typography className="text-blue-100 mt-1">
                    {isEditing ? 'Lengkapi profil Anda untuk pengalaman EduPro yang lebih personal' : 'Informasi profil Anda'}
                  </Typography>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                {isEditing ? (
                  <>
                    <PencilIcon className="h-5 w-5 text-white" />
                    <Typography className="text-white font-medium">Mode Edit</Typography>
                  </>
                ) : (
                  <>
                    <EyeIcon className="h-5 w-5 text-white" />
                    <Typography className="text-white font-medium">Mode Lihat</Typography>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <Alert
            icon={<ExclamationTriangleIcon className="h-6 w-6" />}
            className="mb-6 border-l-4 border-red-500 bg-red-50"
            color="red"
          >
            <Typography className="font-medium">Error!</Typography>
            <Typography className="mt-1 text-sm">{error}</Typography>
          </Alert>
        )}

        {success && (
          <Alert
            icon={<CheckCircleIcon className="h-6 w-6" />}
            className="mb-6 border-l-4 border-green-500 bg-green-50"
            color="green"
          >
            <Typography className="font-medium">Berhasil!</Typography>
            <Typography className="mt-1 text-sm">{success}</Typography>
          </Alert>
        )}

        <div className="bg-white rounded-2xl shadow-xl border-0">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <CardBody className="p-8">
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <UserCircleIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <Typography variant="h6" className="text-gray-800 font-semibold">
                      Informasi Personal
                    </Typography>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center">
                        Nama Lengkap <span className="text-red-500 ml-1">*</span>
                      </label>
                      <Input
                        size="lg"
                        value={form.full_name}
                        onChange={(e) => handleInputChange('full_name', e.target.value)}
                        className="!border-gray-300 focus:!border-blue-500"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center">
                        Username <span className="text-red-500 ml-1">*</span>
                      </label>
                      <Input
                        size="lg"
                        value={form.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="!border-gray-300 focus:!border-blue-500"
                        placeholder="Masukkan username"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center">
                        <PhoneIcon className="h-4 w-4 mr-2" />
                        No. Telepon
                      </label>
                      <Input
                        size="lg"
                        value={form.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="!border-gray-300 focus:!border-blue-500"
                        placeholder="Contoh: +62 812 3456 7890"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <MapPinIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <Typography variant="h6" className="text-gray-800 font-semibold">
                      Lokasi & Kelahiran
                    </Typography>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold text-gray-700">
                        Kota / Kabupaten Saat Ini
                      </label>
                      <Input
                        size="lg"
                        value={form.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="!border-gray-300 focus:!border-blue-500"
                        placeholder="Contoh: Jakarta Selatan"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">
                        Tempat Lahir
                      </label>
                      <Input
                        size="lg"
                        value={form.birth_place}
                        onChange={(e) => handleInputChange('birth_place', e.target.value)}
                        className="!border-gray-300 focus:!border-blue-500"
                        placeholder="Contoh: Bandung"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Tanggal Lahir
                      </label>
                      <Input
                        type="date"
                        size="lg"
                        value={form.birth_date}
                        onChange={(e) => handleInputChange('birth_date', e.target.value)}
                        className="!border-gray-300 focus:!border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <AcademicCapIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <Typography variant="h6" className="text-gray-800 font-semibold">
                      Pendidikan & Karir
                    </Typography>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">
                        Pendidikan Terakhir
                      </label>
                      <Input
                        size="lg"
                        value={form.education}
                        onChange={(e) => handleInputChange('education', e.target.value)}
                        className="!border-gray-300 focus:!border-blue-500"
                        placeholder="Contoh: S1 Teknik Informatika"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center">
                        <BriefcaseIcon className="h-4 w-4 mr-2" />
                        Perusahaan / Institusi Saat Ini
                      </label>
                      <Input
                        size="lg"
                        value={form.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="!border-gray-300 focus:!border-blue-500"
                        placeholder="Contoh: PT. Technology Indonesia"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">
                        Pekerjaan / Profesi Saat Ini
                      </label>
                      <Input
                        size="lg"
                        value={form.job}
                        onChange={(e) => handleInputChange('job', e.target.value)}
                        className="!border-gray-300 focus:!border-blue-500"
                        placeholder="Contoh: Software Developer"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-gray-200">
                  <div>
                    {hasData && (
                      <Button
                        type="button"
                        variant="outlined"
                        size="lg"
                        onClick={handleCancel}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Batal
                      </Button>
                    )}
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <Spinner className="h-4 w-4" />
                        <span>Menyimpan...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5" />
                        <span>Simpan Profil</span>
                      </div>
                    )}
                  </Button>
                </div>
              </CardBody>
            </form>
          ) : (

            <CardBody className="p-8">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <UserCircleIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <Typography variant="h6" className="text-gray-800 font-semibold">
                      Informasi Personal
                    </Typography>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ProfileField
                    icon={UserCircleIcon}
                    label="Nama Lengkap"
                    value={form.full_name}
                    iconColor="text-blue-600"
                  />
                  <ProfileField
                    icon={UserCircleIcon}
                    label="Username"
                    value={form.username}
                    iconColor="text-blue-600"
                  />
                  <div className="md:col-span-2">
                    <ProfileField
                      icon={PhoneIcon}
                      label="No. Telepon"
                      value={form.phone}
                      iconColor="text-green-600"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <MapPinIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <Typography variant="h6" className="text-gray-800 font-semibold">
                    Lokasi & Kelahiran
                  </Typography>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <ProfileField
                      icon={MapPinIcon}
                      label="Kota / Kabupaten Saat Ini"
                      value={form.city}
                      iconColor="text-green-600"
                    />
                  </div>
                  <ProfileField
                    icon={MapPinIcon}
                    label="Tempat Lahir"
                    value={form.birth_place}
                    iconColor="text-green-600"
                  />
                  <ProfileField
                    icon={CalendarIcon}
                    label="Tanggal Lahir"
                    value={formatDate(form.birth_date)}
                    iconColor="text-blue-600"
                  />
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <AcademicCapIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <Typography variant="h6" className="text-gray-800 font-semibold">
                    Pendidikan & Karir
                  </Typography>
                </div>
                
                <div className="space-y-4">
                  <ProfileField
                    icon={AcademicCapIcon}
                    label="Pendidikan Terakhir"
                    value={form.education}
                    iconColor="text-blue-600"
                  />
                  <ProfileField
                    icon={BriefcaseIcon}
                    label="Perusahaan / Institusi Saat Ini"
                    value={form.company}
                    iconColor="text-indigo-600"
                  />
                  <ProfileField
                    icon={BriefcaseIcon}
                    label="Pekerjaan / Profesi Saat Ini"
                    value={form.job}
                    iconColor="text-indigo-600"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <Button
                  onClick={handleEdit}
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8"
                >
                  <div className="flex items-center space-x-2">
                    <PencilIcon className="h-5 w-5" />
                    <span>Edit Profil</span>
                  </div>
                </Button>
              </div>
            </CardBody>
          )}
        </div>

        <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <Typography variant="h6" className="text-blue-800 font-semibold mb-2">
                {isEditing ? 'Tips Melengkapi Profil' : 'Informasi Profil'}
              </Typography>
              <ul className="text-sm text-blue-700 space-y-1">
                {isEditing ? (
                  <>
                    <li>• Nama lengkap dan username wajib diisi</li>
                    <li>• Informasi yang lengkap membantu personalisasi layanan</li>
                    <li>• Data Anda aman dan terlindungi</li>
                    <li>• Anda dapat mengubah informasi kapan saja</li>
                  </>
                ) : (
                  <>
                    <li>• Profil Anda telah tersimpan dengan aman</li>
                    <li>• Klik "Edit Profil" untuk mengubah informasi</li>
                    <li>• Data ini digunakan untuk personalisasi layanan EduPro</li>
                    <li>• Pastikan informasi selalu up-to-date</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}