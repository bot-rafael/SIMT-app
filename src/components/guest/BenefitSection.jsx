import { motion } from 'framer-motion';
import CardBenefit from '../common/CardBenefit';
import gupto from '../../assets/images/gdah.png'; // contoh pengganti
import gbimbingan from '../../assets/images/gada.png'; // contoh pengganti
import gbareng from '../../assets/images/gadaa.png'; // contoh pengganti
import gfleksibel from '../../assets/images/gadaaa.png'; // contoh pengganti
import gpeluang from '../../assets/images/gadaaaa.png'; // contoh pengganti


export default function BenefitSection() {
  const benefits = [
    {
      icon: gupto,
      title: 'Kelas Up-To-date',
      description: 'Materi belajar selalu update, jadi kamu gak ketinggalan tren terbaru di dunia kerja.',
    },
    {
      icon: gbimbingan,
      title: 'Bimbingan Sampai Dapat Kerja',
      description: 'Gak cuman belajar, kamu juga bakal dibimbing sampai dapat kerja beneran!',
    },
    {
      icon: gbareng,
      title: 'Belajar Bareng Mentor Pro',
      description: 'Dapat ilmu langsung dari mentor keren yang udah berpengalaman di industri.',
    },
    {
      icon: gfleksibel,
      title: 'Belajar Fleksibel',
      description: 'Materi belajar fleksibel, jadi kamu bisa belajar kapan saja sesuai waktu yang kamu punya.',
    },
    {
      icon: gpeluang,
      title: 'Peluang Kerja Lebih Besar',
      description: 'Edu pro punya banyak mitra perusahaan, peluang kerja makin gede setelah lulus!',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
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
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full translate-x-40 translate-y-40" />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Header Section */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:pr-8"
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight"
              whileHover={{ scale: 1.02 }}
            >
              <span className="block mb-2">Kenapa sih Harus</span>
              <span className="relative inline-block">
                <span className="text-blue-500">Edu pro</span>
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
              <span className="text-blue-500 ml-2">?</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Ini <span className="font-semibold text-blue-600">5 alasan</span> kenapa Edu pro pilihan terbaik buat kariermu!
            </motion.p>

            {/* Decorative elements */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
            </motion.div>

            {/* Call to action hint */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
            </motion.div>
          </motion.div>

          {/* Right Side - Benefits Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: {
                      duration: 0.6,
                      type: 'spring',
                      stiffness: 100
                    }
                  }
                }}
              >
                <CardBenefit {...benefit} index={index} />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}