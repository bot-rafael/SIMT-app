import { motion } from 'framer-motion';

export default function CardTestimoni({ nama, jabatan, latarBelakang, testimoni, image, rating, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0px 25px 50px rgba(59, 130, 246, 0.2)',
        transition: { duration: 0.3 }
      }}
      className="group relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white rounded-3xl shadow-xl p-8 flex flex-col lg:flex-row items-center gap-8 max-w-5xl w-full overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16" />
      <div className="absolute top-4 left-4 w-3 h-3 bg-white/30 rounded-full animate-pulse" />
      <div className="absolute bottom-8 right-8 w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-6 left-6 text-white/20 text-6xl font-serif">"</div>

      <motion.div 
        className="flex-1 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (index * 0.2) + 0.3, duration: 0.6 }}
      >
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <motion.svg
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (index * 0.2) + 0.5 + (i * 0.1), duration: 0.3 }}
              className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-white/30'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
          <span className="ml-2 text-white/80 text-sm font-medium">({rating}/5)</span>
        </div>
        <motion.p 
          className="mb-6 text-lg leading-relaxed italic relative"
          whileHover={{ x: 2 }}
        >
          "{testimoni}"
        </motion.p>
        <div className="space-y-2">
          <motion.p 
            className="font-bold text-xl"
            whileHover={{ x: 2 }}
          >
            {nama}
          </motion.p>
          <motion.p 
            className="text-white/90 font-medium"
            whileHover={{ x: 2 }}
          >
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm-1 4a1 1 0 112 0v1a1 1 0 11-2 0v-1zm8 0a1 1 0 112 0v1a1 1 0 11-2 0v-1z" clipRule="evenodd" />
              </svg>
              {jabatan}
            </span>
          </motion.p>
          <motion.p 
            className="text-white/80"
            whileHover={{ x: 2 }}
          >
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.75 2.524z" />
              </svg>
              {latarBelakang}
            </span>
          </motion.p>
        </div>
      </motion.div>
      <motion.div 
        className="flex-shrink-0 relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: (index * 0.2) + 0.6, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="relative">
          <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
            <img 
              src={image} 
              alt={nama} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index * 0.2) + 1, duration: 0.4 }}
            className="absolute -bottom-4 -right-4 bg-yellow-400 text-blue-900 font-bold px-4 py-2 rounded-full shadow-lg"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs">Verified</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}