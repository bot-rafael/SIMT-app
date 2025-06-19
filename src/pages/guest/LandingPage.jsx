import React from 'react';
import HeroSection from '../../components/guest/HeroSection';
import KategoriPelatihan from '../../components/guest/KategoriPelatihan';
import PelatihanUnggulan from '../../components/guest/PelatihanUnggulan';
import TestimoniSection from '../../components/guest/TestimoniSection';
import BenefitSection from '../../components/guest/BenefitSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full">

      {/* Hero Section */}
      <section className="relative">
        <HeroSection />
      </section>

      {/* Kategori Pelatihan Section */}
      <section className="relative bg-white">
        {/* Curved top border to connect with hero */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg 
            className="relative block w-full h-16 md:h-24" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 320"
          >
            <path 
              fill="white" 
              d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </svg>
        </div>

        <div className="relative z-10 py-16 md:py-24">
          <KategoriPelatihan />
        </div>
      </section>

      {/* Pelatihan Unggulan Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="relative z-10 py-16 md:py-24">
          <PelatihanUnggulan />
        </div> 
      </section>

      {/* Benefit Section */}
      <section className="bg-white grid place-items-center">
        <BenefitSection />
      </section>

      {/* Konsultasi Section */}
      <section className="bg-blue-100 flex flex-col lg:flex-row p-10 gap-6 items-center">
        <div className="lg:w-3/4 w-full text-center lg:text-left">
          <h1 className="text-4xl text-blue-400 mb-4">Masih Bingung?</h1>
          <p className="text-4xl md:text-6xl text-black font-bold">Konsultasi Gratis Langsung dengan Admin Edu Pro</p>
          <button className="btn btn-xl rounded-2xl text-blue-400 border-white bg-white mt-10">
            Konsultasi Gratis
          </button>
        </div>
        <div className="lg:w-1/4 w-full flex justify-center">
          <img src="" alt="Admin" className="w-80 h-80 object-contain bg-white rounded-full" />
        </div>
      </section>

      {/* Testimoni Section */}
      <section className="bg-white grid place-items-center p-16">
        <TestimoniSection />
      </section>
    </div>
  );
}
