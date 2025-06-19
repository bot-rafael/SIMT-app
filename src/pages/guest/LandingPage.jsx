import BenefitSection from '../../components/guest/BenefitSection';
import HeroSection from '../../components/guest/HeroSection';
import KategoriPelatihan from '../../components/guest/KategoriPelatihan';
import PelatihanUnggulan from '../../components/guest/PelatihanUnggulan';
import TestimoniSection from '../../components/guest/TestimoniSection';

export default function landingPage() {
  return (
    <div className="flex w-full flex-col">
      <div className="card bg-base-300 rounded-box grid place-items-center">
        <HeroSection />
      </div>
      <div className="bg-white rounded-t-4xl grid place-items-center">
        <KategoriPelatihan />
      </div>
      <div className="bg-blue-100 rounded-b-4xl grid place-items-center">
        <PelatihanUnggulan />
      </div>
      <div className="bg-white grid place-items-center">
        <BenefitSection />
      </div>
      <div className="bg-blue-100 flex flex-row p-10">
        <div className="w-3/4 m-5">
          <h1 className="text-4xl text-blue-400 mb-10">Masih Bingung ?</h1>
          <p className="text-6xl text-black font-bold">Konsultasi Gratis Langsung dengan Admin Edu Pro</p>
          <button className="btn btn-xl rounded-2xl text-blue-400 border-white bg-white mt-20">Konsultasi Gratis</button>
        </div>
        <div className="w-1/4 m-5">
          <img src="" alt="" className="w-80 h-80 object-contain bg-white rounded-full " />
        </div>
      </div>
      <div className="bg-white grid place-items-center p-15">
        <TestimoniSection />
      </div>
    </div>
  );
}
