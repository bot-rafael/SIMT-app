import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo2.png';
import loginImage from '../../assets/images/glogin5.jpg';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { name: form.name },
      },
    });

    if (error) return setError(error.message);

    const user = data.user;
    if (user) {
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          user_id: user.id,
          full_name: form.name,
          username: form.email.split('@')[0],
          role: 'Pelajar',
        },
      ]);

      if (profileError) {
        console.error(profileError);
        return setError('Registrasi berhasil, tetapi gagal menyimpan data profil.');
      }
    }

    navigate('/login');
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-white p-6 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
      }}
    >
      <motion.div
        className="bg-white z-10 relative rounded-3xl p-6 max-w-6xl w-full text-gray-800 shadow-lg border border-gray-200 flex flex-col md:flex-row items-center gap-6 md:gap-12"
        variants={itemVariants}
        custom={0}
      >
        <motion.div className="w-full md:w-1/2" variants={itemVariants} custom={1}>
          <div className="text-left mb-6">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="logo" className="w-12 h-12" />
              <div>
                <h1 className="text-3xl font-extrabold text-blue-700">EduPro</h1>
                <p className="text-sm text-gray-500">Learning Platform</p>
              </div>
            </div>

            <motion.h2 className="text-xl font-semibold text-blue-600" variants={itemVariants} custom={2}>
              Bergabung Sekarang 🎓
            </motion.h2>
            <motion.p className="text-sm text-gray-500 mb-6" variants={itemVariants} custom={3}>
              Daftar untuk mulai belajar bersama EduPro
            </motion.p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <motion.div variants={itemVariants} custom={4}>
              <label className="text-xs font-medium flex items-center gap-1 mb-1">🧑 Nama Lengkap</label>
              <input
                type="text"
                placeholder="Masukkan nama"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} custom={5}>
              <label className="text-xs font-medium flex items-center gap-1 mb-1">📧 Email</label>
              <input
                type="email"
                placeholder="name@mail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} custom={6}>
              <label className="text-xs font-medium flex items-center gap-1 mb-1">🔒 Password</label>
              <input
                type="password"
                placeholder="********"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </motion.div>

            {error && (
              <motion.p className="text-sm text-red-500 mt-1" variants={itemVariants} custom={7}>
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-3 rounded-lg mt-3 flex justify-center items-center gap-2 text-sm"
              variants={itemVariants}
              custom={8}
            >
              ✨ Daftar Sekarang
            </motion.button>

            <motion.p className="text-center text-sm mt-4 text-gray-700" variants={itemVariants} custom={9}>
              Sudah punya akun?{' '}
              <a href="/login" className="font-bold text-blue-600 hover:underline">
                Masuk di sini
              </a>
            </motion.p>
          </form>
        </motion.div>

        <motion.div className="hidden md:block md:w-1/2" variants={itemVariants} custom={11}>
          <img
            src={loginImage}
            alt="Register Illustration"
            className="w-full h-full object-cover rounded-2xl"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
