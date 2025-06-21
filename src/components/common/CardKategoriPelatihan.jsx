import { motion } from 'framer-motion';

export default function CardKategoriPelatihan({ h2, p, imgSrc, index }) {
  const interestPercent = Math.floor(Math.random() * 30) + 70;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      whileHover={{
        y: -10,
        scale: 1.05,
        boxShadow: '0px 25px 50px rgba(59, 130, 246, 0.15)',
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-72 bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Image container */}
      <div className="relative overflow-hidden">
        <motion.img 
          src={imgSrc} 
          alt={h2} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
        />
        
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: (index * 0.1) + 0.3, duration: 0.4 }}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-blue-600 shadow-lg"
        >
          Popular
        </motion.div>
      </div>

      {/* Content section */}
      <div className="relative p-6">
        {/* Title */}
        <motion.h2 
          className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300"
          whileHover={{ x: 2 }}
        >
          {h2}
        </motion.h2>
        
        {/* Description */}
        <div className="flex items-center justify-between">
          <motion.p 
            className="text-gray-600 font-medium"
            whileHover={{ x: 2 }}
          >
            {p}
          </motion.p>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">Tingkat Minat</span>
            <span className="text-xs font-semibold text-blue-600">
              {interestPercent}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${interestPercent}%` }}
              transition={{ delay: (index * 0.1) + 0.5, duration: 1 }}
            />
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      
      {/* Floating particles effect */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-pulse transition-opacity duration-300" />
      <div className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-0 group-hover:opacity-50 group-hover:animate-pulse transition-opacity duration-300" style={{ animationDelay: '0.5s' }} />
    </motion.div>
  );
}
