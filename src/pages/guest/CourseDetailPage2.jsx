import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Clock, Users, Award, Shield, Network, CheckCircle, BookOpen, User, Share2, Heart, ChevronRight, Globe, Medal, Target, TrendingUp, MessageSquare, Zap, Brain, Eye, BarChart3, Settings, Users as TeamIcon, MessageCircle, ThumbsUp, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gdataImage from '../../assets/images/gtim2.png';

export default function CommunicationCourseDetail() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [animatedCount, setAnimatedCount] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedCount(prev => {
        if (prev < 1845) {
          return prev + 37;
        }
        return 1845;
      });
    }, 50);

    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (scrollY > 100) {
        controls.start("visible");
      }
    };

    window.addEventListener('scroll', handleScroll);
    controls.start("visible"); 

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY, controls]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: "backOut" }
    }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

const courseData = {
    title: "Komunikasi Efektif dalam Tim",
    description: "Tingkatkan keterampilan komunikasi Anda untuk kolaborasi",
    subtitle: "Master Team Communication & Collaboration Strategies",
    originalPrice: "Rp 1.800.000",
    price: "Rp 1.500.000",
    discount: "17%",
    rating: 4.6,
    totalRatings: 892,
    duration: "2 hari (16 jam)",
    category: "Soft Skill",
    instructor: "Dr. Sarah Wijaya, M.Psi",
    instructorTitle: "Communication Expert & Leadership Coach",
    students: 1845,
    level: "Beginner - Intermediate",
    language: "Bahasa Indonesia",
    certificate: true,
    lastUpdated: "Maret 2025",
    completionRate: 94,
    satisfaction: 4.7,
    careerImpact: 82,
    modules: [
      {
        title: "Dasar-dasar Komunikasi Tim",
        duration: "2 jam",
        lessons: 6,
        description: "Memahami prinsip dasar komunikasi efektif dalam tim",
        icon: MessageCircle
      },
      {
        title: "Teknik Mendengarkan Aktif",
        duration: "3 jam",
        lessons: 8,
        description: "Mengembangkan keterampilan mendengarkan untuk pemahaman yang lebih baik",
        icon: Mic
      },
      {
        title: "Komunikasi Non-Verbal",
        duration: "2 jam",
        lessons: 5,
        description: "Memanfaatkan bahasa tubuh dan ekspresi wajah",
        icon: Users
      },
      {
        title: "Menangani Konflik dalam Tim",
        duration: "3 jam",
        lessons: 7,
        description: "Strategi menyelesaikan konflik secara konstruktif",
        icon: Shield
      },
      {
        title: "Komunikasi Virtual yang Efektif",
        duration: "2 jam",
        lessons: 5,
        description: "Teknik berkomunikasi melalui platform digital",
        icon: Network
      },
      {
        title: "Memberikan Feedback yang Membangun",
        duration: "2 jam",
        lessons: 6,
        description: "Cara memberikan kritik yang produktif",
        icon: ThumbsUp
      }
    ],
    learningOutcomes: [
      "🗣️ Menguasai teknik komunikasi verbal dan non-verbal",
      "👂 Meningkatkan kemampuan mendengarkan aktif",
      "🔄 Membangun alur komunikasi yang efektif dalam tim",
      "⚡ Mengatasi hambatan komunikasi dengan percaya diri",
      "💻 Berkomunikasi efektif dalam lingkungan virtual",
      "🤝 Menyelesaikan konflik melalui komunikasi konstruktif",
      "📈 Meningkatkan produktivitas tim melalui komunikasi",
      "🌟 Memberikan feedback yang membangun dan motivasional"
    ],
    requirements: [
      "💡 Keterbukaan untuk belajar dan berkembang",
      "📱 Akses ke perangkat untuk komunikasi virtual",
      "🤝 Pengalaman bekerja dalam tim (minimal 6 bulan)",
      "📝 Kemampuan dasar berbahasa Indonesia",
      "🎯 Komitmen untuk menerapkan ilmu dalam pekerjaan"
    ],
    bonuses: [
      "🎁 Template Agenda Rapat Efektif",
      "📖 E-book 'Seni Mendengarkan Aktif'",
      "🎬 Video Tutorial Komunikasi Virtual",
      "👥 Akses ke Komunitas Alumni",
      "📜 Sertifikat Penyelesaian",
      "🔄 Konsultasi Gratis 1x dengan Instruktur"
    ],
    companies: ["Gojek", "Tokopedia", "Bank Mandiri", "Telkom Indonesia", "Shopee", "Grab", "Traveloka"],
    testimonials: [
      {
        name: "Andi Pratama",
        role: "Team Lead at Gojek",
        avatar: "AP",
        rating: 5,
        text: "Setelah mengikuti kursus ini, konflik dalam tim saya berkurang 70% dan produktivitas meningkat signifikan. Teknik komunikasi yang diajarkan sangat praktis!",
        highlight: "Konflik berkurang 70%",
        company: "Gojek"
      },
      {
        name: "Dewi Kartika",
        role: "Project Manager at Tokopedia",
        avatar: "DK",
        rating: 4.5,
        text: "Materi tentang komunikasi virtual sangat membantu tim saya yang bekerja hybrid. Sekarang meeting kami lebih efektif dan to-the-point.",
        highlight: "Meeting lebih efektif",
        company: "Tokopedia"
      },
      {
        name: "Rizky Fadilah",
        role: "HR Manager at Bank Mandiri",
        avatar: "RF",
        rating: 5,
        text: "Teknik memberikan feedback yang diajarkan di kursus ini telah mengubah cara kami melakukan performance review. Karyawan sekarang lebih terbuka menerima masukan.",
        highlight: "Perubahan sistem review",
        company: "Bank Mandiri"
      }
    ],
    keyFeatures: [
      {
        icon: TeamIcon,
        title: "Fokus Tim",
        description: "Khusus dirancang untuk meningkatkan komunikasi dalam kelompok"
      },
      {
        icon: MessageCircle,
        title: "Praktik Langsung",
        description: "Simulasi dan role play untuk pengalaman nyata"
      },
      {
        icon: Shield,
        title: "Konflik ke Kolaborasi",
        description: "Transformasi konflik menjadi peluang kolaborasi"
      },
      {
        icon: Network,
        title: "Era Digital",
        description: "Teknik komunikasi efektif untuk tim virtual/hybrid"
      }
    ]
  };
  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <motion.button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-6 py-3 font-medium rounded-xl transition-all transform hover:scale-105 ${
        active 
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30' 
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon size={18} />
      {label}
    </motion.button>
  );

  const StatCard = ({ icon: Icon, value, label, color }) => (
    <motion.div 
      className={`bg-gradient-to-br ${color} rounded-xl p-4 text-white transform hover:scale-105 transition-all`}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="flex items-center gap-3">
        <Icon size={24} />
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm opacity-90">{label}</div>
        </div>
      </div>
    </motion.div>
  );

  const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
    <motion.div 
      className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all group"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ delay: delay * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-center gap-4 mb-3">
        <motion.div 
          className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          <Icon size={24} className="text-white" />
        </motion.div>
        <h3 className="font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-40 right-20 w-32 h-32 bg-indigo-400/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.7, 0.9, 0.7]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-400/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-1/2 right-10 w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-lg opacity-20"
          style={{ y: scrollY * 0.1 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
      </div>

      <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 group"
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke halaman utama</span>
          </motion.button>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.div 
              className="lg:w-1/2"
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <motion.img 
                  src={gdataImage}
                  alt="Analisis Data" 
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute top-6 left-6 flex gap-2 z-10">
                    <motion.span 
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                      animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: ["0 4px 6px -1px rgba(0, 0, 0, 0.1)", "0 10px 15px -3px rgba(0, 0, 0, 0.2)", "0 4px 6px -1px rgba(0, 0, 0, 0.1)"]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      Populer
                    </motion.span>
                    <motion.span 
                      className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      {courseData.category}
                    </motion.span>
                    <motion.span 
                      className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      -{courseData.discount}
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="lg:w-1/2"
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
            >
              <div className="mb-4">
                <motion.h1 
                  className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-2 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {courseData.title}
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-600 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {courseData.description}
                </motion.p>
                <motion.p 
                  className="text-lg text-blue-600 font-medium mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {courseData.subtitle}
                </motion.p>
                <motion.p 
                  className="text-sm text-gray-500 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Terakhir diperbarui: {courseData.lastUpdated}
                </motion.p>
              </div>
              
              <motion.div 
                className="flex items-center gap-6 mb-6 flex-wrap"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg"
                  variants={staggerItem}
                >
                  <Star className="fill-current" size={18} />
                  <span className="font-bold">{courseData.rating}</span>
                  <span className="text-sm opacity-90">({courseData.totalRatings} reviews)</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 text-gray-600"
                  variants={staggerItem}
                >
                  <Users size={18} />
                  <span className="font-medium">{animatedCount.toLocaleString()} peserta</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 text-gray-600"
                  variants={staggerItem}
                >
                  <Clock size={18} />
                  <span>{courseData.duration}</span>
                </motion.div>
              </motion.div>

              <motion.div 
                className="grid grid-cols-3 gap-3 mb-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {[
                  { icon: TrendingUp, value: `${courseData.completionRate}%`, label: "Completion", color: "from-green-500 to-emerald-600" },
                  { icon: Heart, value: courseData.satisfaction, label: "Satisfaction", color: "from-pink-500 to-rose-600" },
                  { icon: TrendingUp, value: `${courseData.careerImpact}%`, label: "Career Impact", color: "from-blue-500 to-indigo-600" }
                ].map((stat, index) => (
                  <motion.div key={index} variants={staggerItem}>
                    <StatCard {...stat} />
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50 shadow-lg mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {courseData.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through ml-3">
                      {courseData.originalPrice}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Hemat</div>
                    <div className="text-lg font-bold text-green-600">Rp 300.000</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <motion.button 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🗣️ Daftar Sekarang - Kuasai Komunikasi Tim!
                  </motion.button>
                  <div className="flex gap-3">
                    <motion.button 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`flex-1 border-2 border-blue-600 py-3 px-6 rounded-xl font-medium transition-all ${
                        isWishlisted 
                          ? 'bg-blue-600 text-white' 
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart size={18} className={`inline mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                      {isWishlisted ? 'Disimpan' : 'Simpan'}
                    </motion.button>
                    <motion.button 
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-all"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 size={18} className="inline mr-2" />
                      Bagikan
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="grid grid-cols-2 gap-4 text-sm bg-white/50 rounded-xl p-4 border border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {[
                  { icon: User, text1: courseData.instructor, text2: courseData.instructorTitle, color: "text-blue-500" },
                  { icon: Target, text1: courseData.level, color: "text-indigo-500" },
                  { icon: Globe, text1: courseData.language, color: "text-green-500" },
                  { icon: Medal, text1: "Sertifikat Penyelesaian", color: "text-yellow-500" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <item.icon size={16} className={item.color} />
                    <div>
                      {item.text1 && <div className="font-medium text-gray-700">{item.text1}</div>}
                      {item.text2 && <div className="text-xs text-gray-500">{item.text2}</div>}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div 
        className="bg-white/60 backdrop-blur-sm py-12 border-b border-gray-200/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            Keunggulan Kursus Ini
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {courseData.keyFeatures.map((feature, index) => (
              <motion.div key={index} variants={staggerItem}>
                <FeatureCard {...feature} delay={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-white/60 backdrop-blur-sm py-8 border-b border-gray-200/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.p 
            className="text-center text-gray-600 mb-6 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            Dipercaya oleh perusahaan-perusahaan terkemuka
          </motion.p>
          <motion.div 
            className="flex justify-center items-center gap-8 flex-wrap opacity-60"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {courseData.companies.map((company, index) => (
              <motion.div 
                key={index} 
                className="bg-white px-6 py-3 rounded-lg shadow-sm font-bold text-gray-700 hover:opacity-100 transition-opacity"
                variants={staggerItem}
                whileHover={{ scale: 1.05, opacity: 1 }}
              >
                {company}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        <motion.div 
          className="flex gap-3 mb-8 overflow-x-auto pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {[
            { id: "overview", label: "Overview", icon: Eye },
            { id: "curriculum", label: "Kurikulum", icon: BookOpen },
            { id: "instructor", label: "Instruktur", icon: User },
            { id: "reviews", label: "Testimoni", icon: MessageSquare }
          ].map((tab) => (
            <TabButton 
              key={tab.id}
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              active={activeTab === tab.id}
              onClick={setActiveTab}
            />
          ))}
        </motion.div>

        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                className="space-y-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <motion.h2 
                    className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Kuasai Seni Komunikasi Tim yang Efektif
                  </motion.h2>
                  <motion.p 
                    className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Dalam lingkungan kerja modern, komunikasi yang efektif adalah kunci kesuksesan tim. 
                    Kursus ini dirancang untuk membantu Anda mengatasi tantangan komunikasi, 
                    meningkatkan kolaborasi, dan menciptakan lingkungan kerja yang harmonis.
                  </motion.p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <motion.div 
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Brain className="text-blue-600" size={24} />
                      Yang Akan Anda Pelajari
                    </h3>
                    <motion.div 
                      className="space-y-3"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {courseData.learningOutcomes.map((outcome, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-start gap-3 bg-white/50 rounded-lg p-3"
                          variants={staggerItem}
                        >
                          <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                          <span className="text-gray-700 font-medium">{outcome}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                  
                  <div className="space-y-6">
                    <motion.div 
                      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Zap className="text-green-600" size={24} />
                        Bonus Eksklusif
                      </h3>
                      <motion.div 
                        className="space-y-3"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        {courseData.bonuses.map((bonus, index) => (
                          <motion.div 
                            key={index} 
                            className="flex items-center gap-3 text-gray-700"
                            variants={staggerItem}
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                            <span className="font-medium">{bonus}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200/50"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Persyaratan
                      </h3>
                      <motion.div 
                        className="space-y-2"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        {courseData.requirements.map((req, index) => (
                          <motion.div 
                            key={index} 
                            className="flex items-center gap-3 text-gray-700"
                            variants={staggerItem}
                          >
                            <span className="font-medium">{req}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'curriculum' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h2 
                  className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Kurikulum Komprehensif
                </motion.h2>
                <motion.div 
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {courseData.modules.map((module, index) => (
                    <motion.div 
                      key={index} 
                      className="group bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all"
                      variants={staggerItem}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <motion.div 
                            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg"
                            whileHover={{ rotate: 10 }}
                          >
                            {index + 1}
                          </motion.div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                              {module.title}
                            </h3>
                            <p className="text-gray-600">{module.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <ChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors" size={20} />
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600 ml-16">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{module.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen size={14} />
                          <span>{module.lessons} pembelajaran</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'instructor' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h2 
                  className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Belajar dari Ahli Komunikasi
                </motion.h2>
                <motion.div 
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200/50"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                        SW
                      </div>
                      <motion.div 
                        className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-2 rounded-full shadow-lg"
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1.1, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      >
                        <Award size={16} />
                      </motion.div>
                    </motion.div>
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {courseData.instructor}
                      </h3>
                      <p className="text-lg text-blue-600 font-medium mb-4">
                        {courseData.instructorTitle}
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        Dengan pengalaman 12+ tahun sebagai konsultan komunikasi untuk perusahaan Fortune 500 dan startup unicorn, 
                        Dr. Sarah telah membantu ribuan profesional meningkatkan keterampilan komunikasi mereka. 
                        Pendekatannya yang praktis dan berbasis penelitian membuat materi mudah diaplikasikan.
                      </p>
                      <motion.div 
                        className="flex flex-wrap gap-4 justify-center lg:justify-start"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        {[
                          { icon: Star, text: "4.8 Rating", color: "text-yellow-400 fill-current" },
                          { icon: Users, text: "10,000+ Peserta" },
                          { icon: Medal, text: "8 Penghargaan" }
                        ].map((item, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-center gap-2 bg-white/50 rounded-full px-4 py-2"
                            variants={staggerItem}
                            whileHover={{ scale: 1.05 }}
                          >
                            <item.icon className={item.color} size={16} />
                            <span className="font-medium">{item.text}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h2 
                  className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Testimoni Peserta
                </motion.h2>
                <motion.div 
                  className="space-y-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {courseData.testimonials.map((testimonial, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all"
                      variants={staggerItem}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                          whileHover={{ rotate: 10 }}
                        >
                          {testimonial.avatar}
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                            <span className="text-sm text-gray-600">{testimonial.role}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`${star <= testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                size={16} 
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            "{testimonial.text}"
                          </p>
                          <motion.div 
                            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium inline-block"
                            whileHover={{ scale: 1.05 }}
                          >
                            💡 {testimonial.highlight}
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Sticky Bottom Bar for Mobile */}
      <motion.div 
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-blue-600">{courseData.price}</div>
            <div className="text-sm text-gray-500 line-through">{courseData.originalPrice}</div>
          </div>
          <motion.button 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Daftar Sekarang
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}