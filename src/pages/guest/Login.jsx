import { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/images/logo2.png';
import loginImage from '../../assets/images/glogin4.jpg';
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

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.className = 'absolute inset-0 pointer-events-none z-0';
    document.querySelector('.particle-container')?.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 2,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0,0,0,0.04)';
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }

    animate();
    return () => canvas.remove();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (loginError) throw new Error('Email atau password salah.');

      const user = data.user;
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileError || !profile || !profile.role)
        throw new Error('Gagal mengambil role user.');

      toast.success(`Selamat datang, ${profile.role}!`);
      setTimeout(() => {
        switch (profile.role) {
          case 'Admin': navigate('/admin'); break;
          case 'Pelajar': navigate('/pelajar'); break;
          case 'Pengajar': navigate('/pengajar'); break;
          default: throw new Error('Role tidak dikenali.');
        }
      }, 1500);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
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
      <div className="particle-container absolute inset-0 z-0"></div>
      <motion.div
        className="bg-white z-10 relative rounded-3xl p-6 max-w-6xl w-full text-gray-800 shadow-lg border border-gray-200 flex flex-col md:flex-row items-center gap-6 md:gap-12"
        variants={itemVariants}
        custom={0}
      >
        <motion.div className="w-full md:w-1/2" variants={itemVariants} custom={1}>
          <div className="text-left mb-6">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="logo"
                className="w-14 h-14"
              />
              <div>
                <h1 className="text-3xl font-extrabold text-blue-700">EduPro</h1>
                <p className="text-sm text-gray-500">Learning Platform</p>
              </div>
            </div>

            <motion.h2 className="text-xl font-semibold text-blue-600" variants={itemVariants} custom={2}>
              Selamat datang kembali 👋
            </motion.h2>
            <motion.p className="text-sm text-gray-500 mb-6" variants={itemVariants} custom={3}>
              Masuk untuk melanjutkan pembelajaran
            </motion.p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <motion.div variants={itemVariants} custom={4}>
              <label className="text-xs font-medium flex items-center gap-1 mb-1">
                📧 Email atau Username
              </label>
              <input
                type="text"
                placeholder="Masukkan email atau username"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} custom={5}>
              <label className="text-xs font-medium flex items-center gap-1 mb-1">
                🔒 Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div className="flex items-center justify-between text-xs mt-1" variants={itemVariants} custom={6}>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-600" /> Ingat saya
              </label>
              <a href="#" className="hover:underline text-blue-500">
                Lupa password? 🤯
              </a>
            </motion.div>

            <motion.button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-3 rounded-lg mt-3 flex justify-center items-center gap-2 text-sm"
              disabled={loading}
              variants={itemVariants}
              custom={7}
            >
              🚀 {loading ? 'Memproses...' : 'Masuk Sekarang'}
            </motion.button>

            <motion.p className="text-center text-sm mt-4 text-gray-700" variants={itemVariants} custom={8}>
              Belum punya akun?{' '}
              <a href="/register" className="font-bold text-blue-600 hover:underline">
                Daftar sekarang! 🎉
              </a>
            </motion.p>
          </form>
        </motion.div>

        <motion.div className="hidden md:block md:w-1/2" variants={itemVariants} custom={10}>
          <img
            src={loginImage}
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-2xl"
          />
        </motion.div>
      </motion.div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </motion.div>
  );
}
