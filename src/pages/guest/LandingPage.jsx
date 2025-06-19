import HeroSection from '../../components/guest/HeroSection';
import KategoriPelatihan from '../../components/guest/KategoriPelatihan';
import PelatihanUnggulan from '../../components/guest/PelatihanUnggulan';

export default function landingPage() {
  return (
    <div className="flex w-full flex-col">
      <div className="card bg-base-300 rounded-box grid place-items-center">
        <HeroSection />
      </div>
      <div className="bg-white rounded-t-4xl grid place-items-center">
        <KategoriPelatihan />
      </div>
      <div className="bg-blue-200 rounded-b-4xl grid place-items-center">
        <PelatihanUnggulan />
      </div>
    </div>
  );
}
