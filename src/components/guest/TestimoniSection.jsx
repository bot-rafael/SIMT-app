import { motion } from 'framer-motion';
import { useState } from 'react';
import CardTestimoni from '../common/CardTestimoni';

export default function TestimoniSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dummy data testimoni
  const testimonials = [
    {
      nama: "Ricky Harukan",
      jabatan: "Engineer On Site – PT Integrasi Data Nusantara",
      latarBelakang: "Lulusan Front-End Web & Back-End Path",
      testimoni: "Edu Pro menyediakan biaya pelatihan yang ramah kantong untuk pengalaman pembelajaran pemrograman yang mendalam. Ilmu yang diperoleh dari program ini memperkuat dasar pengetahuan saya dan mendukung perkembangan portofolio profesional yang sedang saya kembangkan.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      rating: 5
    },
    {
      nama: "Sarah Putri Amelia",
      jabatan: "UI/UX Designer – PT Digital Creative Studio",
      latarBelakang: "Lulusan UI/UX Design & Digital Marketing Path",
      testimoni: "Materi yang diajarkan sangat up-to-date dan sesuai dengan kebutuhan industri. Mentor-mentornya juga sangat berpengalaman dan sabar dalam membimbing. Sekarang saya sudah berhasil mendapat pekerjaan impian di perusahaan teknologi ternama.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      rating: 5
    },
    {
      nama: "Ahmad Rizky Pratama",
      jabatan: "Data Analyst – PT Solusi Data Indonesia",
      latarBelakang: "Lulusan Data Science & Analytics Path",
      testimoni: "Program Data Science di Edu Pro benar-benar comprehensive. Dari basic statistics sampai machine learning, semuanya dijelaskan dengan detail dan mudah dipahami. Plus ada hands-on project yang langsung bisa dipraktekkan di dunia kerja.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      rating: 5
    },
    {
      nama: "Diana Sari Wulandari",
      jabatan: "Digital Marketing Specialist – PT E-Commerce Terkemuka",
      latarBelakang: "Lulusan Digital Marketing & Social Media Path",
      testimoni: "Awalnya saya nol banget tentang digital marketing. Tapi setelah ikut program di Edu Pro, sekarang saya bisa handle campaign dengan ROI yang tinggi. Terima kasih Edu Pro sudah mengubah karir saya!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      rating: 5
    },
    {
      nama: "Budi Santoso",
      jabatan: "Mobile App Developer – PT Teknologi Maju",
      latarBelakang: "Lulusan Mobile Development Path",
      testimoni: "Kurikulum mobile development-nya sangat terstruktur. Mulai dari dasar-dasar programming sampai deploy app ke Play Store, semuanya ada. Mentor juga sangat responsif kalau ada pertanyaan. Recommended banget!",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      rating: 4
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <section className="relative px-6 md:px-16 py-16 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-yellow-500/5 to-transparent rounded-full translate-x-40 translate-y-40" />
      <div className="absolute top-32 right-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
      <div className="absolute top-48 left-1/5 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 right-1/5 w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        <motion.div 
          variants={headerVariants}
          className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-6"
        >
          <div className="text-center lg:text-left">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              Testimoni{' '}
              <span className="relative inline-block">
                <span className="text-blue-500">Siswa</span>
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Dengarkan cerita sukses dari para alumni yang telah mengembangkan kariernya bersama{' '}
              <span className="font-semibold text-blue-600">Edu Pro</span>
            </motion.p>

            <motion.div
              className="flex justify-center lg:justify-start items-center gap-6 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-500">Alumni Sukses</div>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">4.9</div>
                <div className="text-sm text-gray-500">Rating Testimoni</div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="flex gap-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button 
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1, boxShadow: '0px 10px 20px rgba(255, 193, 7, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
            <motion.button 
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1, boxShadow: '0px 10px 20px rgba(255, 193, 7, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          className="flex justify-center"
        >
          <CardTestimoni 
            {...testimonials[currentIndex]} 
            index={0}
          />
        </motion.div>

        <motion.div 
          className="flex justify-center gap-3 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-500 shadow-lg' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-16"
        >
        </motion.div>
      </motion.div>
    </section>
  );
}