import { motion } from 'framer-motion';
import CardKategoriPelatihan from '../common/CardKategoriPelatihan';
import gberbicara from '../../assets/images/gberbicara.png';
import gdigital from '../../assets/images/gdigital.png';
import gkeuangan from '../../assets/images/gkeuangan.png';
import gmanajemen from '../../assets/images/gmanajemen.png';
import gsoftskill from '../../assets/images/gsoftskill.png';
import gteknis from '../../assets/images/gteknis.png';

export default function KategoriPelatihan() {
  const categories = [
    { h2: "Berbicara", p: "12 Pelatihan", imgSrc: gberbicara },
    { h2: "Soft Skill", p: "18 Pelatihan", imgSrc: gsoftskill },
    { h2: "Teknis", p: "15 Pelatihan", imgSrc: gteknis },
    { h2: "Manajemen", p: "20 Pelatihan", imgSrc: gmanajemen },
    { h2: "Keuangan", p: "8 Pelatihan", imgSrc: gkeuangan },
    { h2: "Digital", p: "14 Pelatihan", imgSrc: gdigital }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
    <section className="relative py-20 px-6 md:px-16 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full -translate-x-40 translate-y-40" />
      <div className="absolute top-20 left-1/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce" />
      <div className="absolute top-40 right-1/3 w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-1/3 w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Kategori{' '}
            <span className="relative inline-block">
              <span className="text-blue-500">Pelatihan</span>
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Jelajahi berbagai kategori pelatihan yang tersedia untuk mengembangkan{' '}
            <span className="font-semibold text-blue-600">skill</span> dan{' '}
            <span className="font-semibold text-blue-600">kariermu</span>
          </motion.p>

          <motion.div
            className="flex justify-center items-center gap-8 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">87+</div>
              <div className="text-sm text-gray-500">Total Pelatihan</div>
            </div>
            <div className="w-px h-8 bg-gray-300" />
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">6</div>
              <div className="text-sm text-gray-500">Kategori</div>
            </div>
            <div className="w-px h-8 bg-gray-300" />
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2K+</div>
              <div className="text-sm text-gray-500">Peserta Aktif</div>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center items-center gap-4 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-500" />
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-blue-500" />
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 50,
                  rotateX: -15
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: {
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 100,
                    delay: index * 0.1
                  }
                }
              }}
            >
              <CardKategoriPelatihan {...category} index={index} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-16"
        >
        </motion.div>
      </div>
    </section>
  );
}
