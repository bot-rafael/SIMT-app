import g1 from '../assets/g1.png';

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 min-h-screen">
        <div className="absolute top-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-60 h-60 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-400/15 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen">
          
          {/* Left Content */}
          <div className="lg:w-1/2 text-white space-y-8 lg:pr-12">
            
            {/* Badge */}
            <div className="inline-flex items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                <span className="text-white font-medium text-sm">
                  🏆 Platform Manajemen Pelatihan #1 di Indonesia
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Tingkatkan
                <span className="block text-yellow-300">keterampilan</span>
                <span className="text-white">& karir Anda</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-2xl">
              Akses ratusan program pelatihan berkualitas tinggi dari para ahli industri. 
              Kembangkan potensi Anda dan raih kesuksesan karir.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="group px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-yellow-300 hover:text-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                <span className="flex items-center justify-center">
                  Mulai Belajar
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              
              <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105">
                Kontak
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-yellow-300 group-hover:scale-110 transition-transform duration-300">
                  200+
                </div>
                <div className="text-blue-100 font-medium mt-1">Pelatihan</div>
              </div>
              
              <div className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-yellow-300 group-hover:scale-110 transition-transform duration-300">
                  50+
                </div>
                <div className="text-blue-100 font-medium mt-1">Instruktur</div>
              </div>
              
              <div className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-yellow-300 group-hover:scale-110 transition-transform duration-300">
                  10K+
                </div>
                <div className="text-blue-100 font-medium mt-1">Alumni</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
            <div className="relative">
              {/* Floating elements around image */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
              <div className="absolute -top-4 -right-8 w-8 h-8 bg-pink-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-green-400 rounded-full animate-bounce delay-300"></div>
              <div className="absolute -bottom-6 -right-6 w-6 h-6 bg-purple-400 rounded-full animate-ping"></div>
              
              {/* Main Image with only 1 glass effect */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
                <img 
                  src={g1} 
                  alt="EduPro Learning Platform" 
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
