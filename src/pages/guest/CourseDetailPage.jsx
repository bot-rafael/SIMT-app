import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Star, Clock, Users, Award, CheckCircle, BookOpen, User, Share2, Heart, ChevronRight, Globe, Medal, Target, TrendingUp, MessageSquare, Zap, Brain, Eye, Crown, Shield, Lightbulb, Rocket, BarChart3, Network, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import kepemimpinanImage from '../../assets/images/gkepemimpinan2.png';

export default function LeadershipCourseDetail() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [animatedCount, setAnimatedCount] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const curriculumRef = useRef(null);
  const instructorRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedCount(prev => {
        if (prev < 2847) {
          return prev + 45;
        }
        return 2847;
      });
    }, 50);

    const handleScroll = () => {
      setScrollY(window.scrollY);
      checkAnimationTriggers();
    };

    window.addEventListener('scroll', handleScroll);

    checkAnimationTriggers();

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const checkAnimationTriggers = () => {
    const triggerAnimation = (ref, animationClass) => {
      if (ref.current && !ref.current.classList.contains('animated')) {
        const elementTop = ref.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.75) {
          ref.current.classList.add('animated', animationClass);
        }
      }
    };

    triggerAnimation(titleRef, 'fadeInUp');
    triggerAnimation(imageRef, 'fadeInLeft');
    triggerAnimation(statsRef, 'fadeInRight');
    triggerAnimation(featuresRef, 'fadeInUp');
    triggerAnimation(curriculumRef, 'fadeInUp');
    triggerAnimation(instructorRef, 'fadeInUp');
    triggerAnimation(testimonialsRef, 'fadeInUp');
  };

  const animationStyles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeInLeft {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes fadeInRight {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    .fadeInUp {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .fadeInLeft {
      animation: fadeInLeft 0.8s ease-out forwards;
    }
    
    .fadeInRight {
      animation: fadeInRight 0.8s ease-out forwards;
    }
    
    .animated {
      opacity: 0;
    }
    
    .delay-100 {
      animation-delay: 0.1s;
    }
    
    .delay-200 {
      animation-delay: 0.2s;
    }
    
    .delay-300 {
      animation-delay: 0.3s;
    }
    
    .delay-400 {
      animation-delay: 0.4s;
    }
    
    .delay-500 {
      animation-delay: 0.5s;
    }
  `;

 const courseData = {
    title: "Kepemimpinan Digital yang Efektif",
    description: "Pelajari strategi kepemimpinan modern untuk mengelola tim di era digital",
    subtitle: "Kuasi seni Kepemimpinan Digital & Transformasikan Tim Anda",
    originalPrice: "Rp 3.200.000",
    price: "Rp 2.500.000",
    discount: "22%",
    rating: 4.8,
    totalRatings: 1247,
    duration: "3 hari (24 jam)",
    category: "Manajemen",
    instructor: "Prof. Michael Chen",
    instructorTitle: "Mantan Wakil Presiden Google & Pakar Kepemimpinan",
    students: 2847,
    level: "Menengah - Mahir",
    language: "Bahasa Indonesia",
    certificate: true,
    lastUpdated: "Januari 2025",
    completionRate: 96,
    satisfaction: 4.9,
    careerImpact: 89,
    modules: [
      {
        title: "Dasar-dasar Kepemimpinan Digital",
        duration: "3 jam",
        lessons: 8,
        description: "Memahami paradigma baru kepemimpinan di era digital",
        icon: Crown
      },
      {
        title: "Penguasaan Manajemen Tim Jarak Jauh",
        duration: "4 jam",
        lessons: 10,
        description: "Strategi mengelola tim virtual dengan efektif",
        icon: Network
      },
      {
        title: "Pengambilan Keputusan Berbasis Data",
        duration: "3 jam",
        lessons: 7,
        description: "Menggunakan analitik untuk pengambilan keputusan strategis",
        icon: BarChart3
      },
      {
        title: "Kepemimpinan Transformasi Digital",
        duration: "4 jam",
        lessons: 9,
        description: "Memimpin organisasi melalui perubahan digital",
        icon: Rocket
      },
      {
        title: "Inovasi & Manajemen Perubahan",
        duration: "3 jam",
        lessons: 6,
        description: "Membangun budaya inovasi dalam tim",
        icon: Lightbulb
      },
      {
        title: "Metodologi Kepemimpinan Agile",
        duration: "4 jam",
        lessons: 8,
        description: "Menerapkan metodologi agile dalam kepemimpinan",
        icon: Settings
      },
      {
        title: "Kepemimpinan Krisis & Ketangguhan",
        duration: "3 jam",
        lessons: 5,
        description: "Memimpin dengan tenang dalam situasi krisis",
        icon: Shield
      }
    ],
    learningOutcomes: [
      "👑 Kuasai strategi kepemimpinan digital yang terbukti efektif",
      "🎯 Rancang dan jalankan peta jalan transformasi digital",
      "📊 Manfaatkan analitik data untuk pengambilan keputusan strategis",
      "🚀 Bangun dan pimpin tim jarak jauh berkinerja tinggi",
      "💡 Kembangkan budaya inovasi dan pemecahan masalah kreatif",
      "🛡️ Asah keterampilan kepemimpinan krisis dan ketangguhan",
      "⚡ Terapkan metodologi agile dalam gaya kepemimpinan",
      "🌟 Ciptakan lingkungan tim yang inklusif dan aman secara psikologis"
    ],
    requirements: [
      "💼 Minimal 2 tahun pengalaman kepemimpinan/manajerial",
      "🎯 Motivasi kuat untuk transformasi digital",
      "💻 Laptop/tablet untuk studi kasus dan simulasi",
      "📚 Akses ke alat digital (akan dipandu dalam kursus)",
      "🤝 Pola pikir berkembang dan siap untuk tantangan"
    ],
    bonuses: [
      "🎁 Toolkit Kepemimpinan Digital (senilai Rp 500.000)",
      "📖 E-book 'Masa Depan Pekerjaan' eksklusif",
      "🎬 Akses seumur hidup ke perpustakaan video masterclass",
      "👥 Komunitas Eksklusif Pemimpin dan Jaringan Profesional",
      "📜 Sertifikat yang diakui secara internasional",
      "🔄 Pembaruan kursus gratis dan konten baru",
      "💬 Sesi mentoring satu lawan satu dengan instruktur"
    ],
    companies: ["Google", "Microsoft", "Amazon", "Tesla", "Netflix", "Spotify", "Uber", "Meta"],
    testimonials: [
      {
        name: "Sarah Pratiwi",
        role: "Wakil Presiden Teknik di Gojek",
        avatar: "SP",
        rating: 5,
        text: "Kursus ini benar-benar mengubah permainan! Setelah menerapkan strategi yang dipelajari, tim saya berhasil meningkatkan produktivitas sebesar 60% dan kepuasan karyawan meningkat drastis. Prof. Michael adalah pengajar yang luar biasa!",
        highlight: "Produktivitas +60%",
        company: "Gojek"
      },
      {
        name: "David Kurniawan",
        role: "Direktur Produk di Tokopedia",
        avatar: "DK",
        rating: 5,
        text: "Materi yang sangat aplikatif dan sesuai dengan tren industri. Teknik kepemimpinan jarak jauh yang diajarkan sangat membantu saya mengelola tim multinasional dengan lebih efektif.",
        highlight: "Ahli Kepemimpinan Jarak Jauh",
        company: "Tokopedia"
      },
      {
        name: "Lisa Maharani",
        role: "Kepala Inovasi Digital di BCA",
        avatar: "LM",
        rating: 5,
        text: "Investasi terbaik untuk pengembangan karir! Dalam 3 bulan setelah kursus, saya mendapat promosi dan berhasil memimpin proyek transformasi digital senilai $2 juta. Sangat direkomendasikan!",
        highlight: "Promosi dalam 3 bulan",
        company: "BCA"
      }
    ],
    keyFeatures: [
      {
        icon: Crown,
        title: "Konten Tingkat Eksekutif",
        description: "Materi setara dengan program MBA universitas ternama"
      },
      {
        icon: Network,
        title: "Praktik Terbaik Global",
        description: "Studi kasus dari perusahaan Fortune 500"
      },
      {
        icon: BarChart3,
        title: "Pendekatan Berbasis Data",
        description: "Alat dan kerangka kerja untuk pengambilan keputusan"
      },
      {
        icon: Rocket,
        title: "Fokus Inovasi",
        description: "Strategi membangun budaya inovasi"
      }
    ]
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

      <style>{animationStyles}</style>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-indigo-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div 
          className="absolute top-1/2 right-10 w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-lg opacity-20 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
      </div>

      <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 group animated fadeInLeft"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke halaman utama</span>
          </button>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <div 
                ref={imageRef}
                className="relative rounded-3xl overflow-hidden shadow-2xl group animated fadeInLeft"
              >
                <img 
                  src={kepemimpinanImage}
                  alt="Kepemimpinan Digital" 
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse">
                      Populer
                    </span>
                    <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      {courseData.category}
                    </span>
                    <span className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      -{courseData.discount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div 
                ref={titleRef}
                className="mb-4 animated fadeInUp"
              >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-2 leading-tight">
                  {courseData.title}
                </h1>
                <p className="text-xl text-gray-600 mb-2">
                  {courseData.description}
                </p>
                <p className="text-lg text-blue-600 font-medium mb-4">
                  {courseData.subtitle}
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Terakhir diperbarui: {courseData.lastUpdated}
                </p>
              </div>
              
              <div className="flex items-center gap-6 mb-6 flex-wrap animated fadeInUp delay-100">
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
                  <Star className="fill-current" size={18} />
                  <span className="font-bold">{courseData.rating}</span>
                  <span className="text-sm opacity-90">({courseData.totalRatings} ulasan)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={18} />
                  <span className="font-medium">{animatedCount.toLocaleString()} peserta</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={18} />
                  <span>{courseData.duration}</span>
                </div>
              </div>
              <div 
                ref={statsRef}
                className="grid grid-cols-3 gap-3 mb-6 animated fadeInRight"
              >
                <StatCard 
                  icon={TrendingUp} 
                  value={`${courseData.completionRate}%`} 
                  label="Tingkat Penyelesaian" 
                  color="from-green-500 to-emerald-600"
                />
                <StatCard 
                  icon={Heart} 
                  value={courseData.satisfaction} 
                  label="Kepuasan" 
                  color="from-pink-500 to-rose-600"
                />
                <StatCard 
                  icon={TrendingUp} 
                  value={`${courseData.careerImpact}%`} 
                  label="Dampak Karir" 
                  color="from-blue-500 to-indigo-600"
                />
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50 shadow-lg mb-6 animated fadeInUp delay-200">
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
                    <div className="text-lg font-bold text-green-600">Rp 700.000</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
                    👑 Daftar Sekarang - Jadilah Pemimpin Digital!
                  </button>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`flex-1 border-2 border-blue-600 py-3 px-6 rounded-xl font-medium transition-all ${
                        isWishlisted 
                          ? 'bg-blue-600 text-white' 
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Heart size={18} className={`inline mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                      {isWishlisted ? 'Tersimpan' : 'Simpan'}
                    </button>
                    <button className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-all">
                      <Share2 size={18} className="inline mr-2" />
                      Bagikan
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm bg-white/50 rounded-xl p-4 border border-gray-200 animated fadeInUp delay-300">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-blue-500" />
                  <div>
                    <div className="font-medium text-gray-700">{courseData.instructor}</div>
                    <div className="text-xs text-gray-500">{courseData.instructorTitle}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target size={16} className="text-indigo-500" />
                  <span className="text-gray-700">{courseData.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-green-500" />
                  <span className="text-gray-700">{courseData.language}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Medal size={16} className="text-yellow-500" />
                  <span className="text-gray-700">Sertifikat Internasional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        ref={featuresRef}
        className="bg-white/60 backdrop-blur-sm py-12 border-b border-gray-200/50 animated fadeInUp"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
            Keunggulan Kursus Ini
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseData.keyFeatures.map((feature, index) => (
              <FeatureCard 
                key={index} 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description} 
                className={`delay-${(index + 1) * 100}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white/60 backdrop-blur-sm py-8 border-b border-gray-200/50 animated fadeInUp delay-200">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-600 mb-6 font-medium">
            Dipercaya oleh pemimpin dari perusahaan-perusahaan ternama
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap opacity-60">
            {courseData.companies.map((company, index) => (
              <div 
                key={index} 
                className="bg-white px-6 py-3 rounded-lg shadow-sm font-bold text-gray-700 hover:opacity-100 transition-opacity"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 animated fadeInUp">
          <TabButton 
            id="overview" 
            label="Ikhtisar" 
            icon={Eye}
            active={activeTab === 'overview'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="curriculum" 
            label="Kurikulum" 
            icon={BookOpen}
            active={activeTab === 'curriculum'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="instructor" 
            label="Instruktur" 
            icon={User}
            active={activeTab === 'instructor'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="reviews" 
            label="Testimoni" 
            icon={MessageSquare}
            active={activeTab === 'reviews'} 
            onClick={setActiveTab} 
          />
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
          {activeTab === 'overview' && (
            <div className="space-y-10">
              <div className="text-center animated fadeInUp">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                  Transformasi Kepemimpinan untuk Era Digital
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Di dunia yang semakin digital, kepemimpinan tradisional tidak lagi cukup. 
                  Kursus ini dirancang untuk membekali Anda dengan keterampilan kepemimpinan 
                  abad 21 yang dibutuhkan untuk memimpin tim yang gesit, inovatif, dan berkinerja tinggi.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50 animated fadeInLeft">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Brain className="text-blue-600" size={24} />
                    Yang Akan Anda Pelajari
                  </h3>
                  <div className="space-y-3">
                    {courseData.learningOutcomes.map((outcome, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-3 bg-white/50 rounded-lg p-3 animated fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-gray-700 font-medium">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50 animated fadeInRight">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Zap className="text-green-600" size={24} />
                      Bonus Eksklusif
                    </h3>
                    <div className="space-y-3">
                      {courseData.bonuses.map((bonus, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-3 text-gray-700 animated fadeInUp"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                          <span className="font-medium">{bonus}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200/50 animated fadeInRight delay-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Persyaratan Kursus
                    </h3>
                    <div className="space-y-2">
                      {courseData.requirements.map((req, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-3 text-gray-700 animated fadeInUp"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <span className="font-medium">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div ref={curriculumRef} className="animated fadeInUp">
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
                Kurikulum Komprehensif
              </h2>
              <div className="space-y-4">
                {courseData.modules.map((module, index) => (
                  <div 
                    key={index} 
                    className="group bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all animated fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {index + 1}
                        </div>
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
                        <span>{module.lessons} pelajaran</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'instructor' && (
            <div ref={instructorRef} className="animated fadeInUp">
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
                Belajar dari Pakar Kelas Dunia
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200/50">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="relative animated fadeInLeft">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                      MC
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-2 rounded-full shadow-lg">
                      <Award size={16} />
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left animated fadeInRight">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {courseData.instructor}
                    </h3>
                    <p className="text-lg text-blue-600 font-medium mb-4">
                      {courseData.instructorTitle}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Dengan pengalaman lebih dari 15 tahun melatih eksekutif puncak di perusahaan Fortune 500, 
                      Prof. Chen adalah salah satu pakar kepemimpinan digital paling dicari di dunia. 
                      Pendekatannya yang berbasis penelitian dan praktik nyata telah membantu ribuan profesional 
                      mencapai terobosan dalam karir mereka.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                      <div className="flex items-center gap-2 bg-white/50 rounded-full px-4 py-2 animated fadeInUp delay-100">
                        <Star className="text-yellow-400 fill-current" size={16} />
                        <span className="font-medium">4.9 Rating</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/50 rounded-full px-4 py-2 animated fadeInUp delay-200">
                        <Users size={16} />
                        <span className="font-medium">25.000+ Peserta</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/50 rounded-full px-4 py-2 animated fadeInUp delay-300">
                        <Medal size={16} />
                        <span className="font-medium">15+ Penghargaan</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div ref={testimonialsRef} className="animated fadeInUp">
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
                Kata Mereka yang Sudah Mengikuti
              </h2>
              <div className="space-y-6">
                {courseData.testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all animated fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {testimonial.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                          <span className="text-sm text-gray-600">{testimonial.role}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`${star <= testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} size={16} />
                          ))}
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-3">
                          "{testimonial.text}"
                        </p>
                        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                          💡 {testimonial.highlight}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 animated fadeInUp">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-blue-600">{courseData.price}</div>
            <div className="text-sm text-gray-500 line-through">{courseData.originalPrice}</div>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all">
            Daftar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ icon: Icon, title, description, className }) => (
  <div className={`bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all group ${className || ''}`}>
    <div className="flex items-center gap-4 mb-3">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);


const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className={`bg-gradient-to-br ${color} rounded-xl p-4 text-white transform hover:scale-105 transition-all`}>
    <div className="flex items-center gap-3">
      <Icon size={24} />
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm opacity-90">{label}</div>
      </div>
    </div>
  </div>
);

const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-6 py-3 font-medium rounded-xl transition-all transform hover:scale-105 ${
      active 
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30' 
        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
    }`}
  >
    <Icon size={18} />
    {label}
  </button>
);