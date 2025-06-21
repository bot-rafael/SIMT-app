import { motion } from 'framer-motion';

export default function CardBenefit({ icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.03, 
        boxShadow: '0px 20px 40px rgba(59, 130, 246, 0.15)',
        y: -5
      }}
      className="group relative overflow-hidden bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-6 border border-gray-100/50 backdrop-blur-sm hover:border-blue-200/50 transition-all duration-300"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:from-blue-500/10 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-500/3 to-transparent rounded-full translate-y-10 -translate-x-10" />
      
      <div className="relative flex items-center gap-5">
        {/* Icon container with enhanced styling */}
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className="relative"
        >
          <div className="w-18 h-18 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
            <img src={icon} alt={title} className="w-9 h-9 object-contain" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Floating dots decoration */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full opacity-70 animate-pulse" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <motion.h3 
            className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300"
            whileHover={{ x: 2 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
            whileHover={{ x: 2 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Arrow indicator */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="text-blue-500"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
}