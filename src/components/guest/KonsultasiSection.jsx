import React from 'react';
import { motion } from 'framer-motion';
import GadminImg from '../../assets/images/gadmin.png';

const KonsultasiSection = () => {
  return (
    <motion.section
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-blue-600">
        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-bounce delay-1000"></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Text Content */}
          <motion.div
            className="lg:w-2/3 w-full text-center lg:text-left space-y-6"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Admin Online Sekarang
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl text-white/90 font-medium">
                Masih Bingung Memilih Pelatihan?
              </h2>
              <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight">
                Konsultasi{' '}
                <span className="relative">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                    Gratis
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-300/30 rounded-full"></div>
                </span>{' '}
                Sekarang!
              </h1>
            </div>

            {/* Description */}
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
              Dapatkan panduan personal dari admin ahli kami untuk memilih pelatihan yang tepat sesuai kebutuhan dan tujuan karir Anda.
            </p>

            {/* Features List */}
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              {['Respons Cepat', '100% Gratis', 'Panduan Personal'].map((text, index) => (
                <div key={index} className="flex items-center gap-3 text-white">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <span className="mr-2">💬</span>
                Chat WhatsApp Sekarang
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <span className="mr-2">📞</span>
                Telepon Langsung
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-8 text-white/70">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1000+</div>
                <div className="text-sm">Konsultasi Berhasil</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm">Layanan Tersedia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-sm">Rating Kepuasan</div>
              </div>
            </div>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            className="lg:w-1/3 w-full flex justify-center"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>

              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-full p-8 shadow-2xl">
                <div className="w-72 h-72 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={GadminImg}
                    alt="Admin Konsultasi"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-green-400 text-white p-3 rounded-full shadow-lg animate-bounce">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>

                <div className="absolute -bottom-2 -left-2 bg-yellow-400 text-white p-3 rounded-full shadow-lg animate-pulse">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
