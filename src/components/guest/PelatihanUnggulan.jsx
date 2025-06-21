import CardPelatihanUnggulan from '../common/CardPelatihanUnggulan';
import gkepemimpinan2 from '../../assets/images/gkepemimpinan2.png';
import gtim2 from '../../assets/images/gtim2.png';
import gdata from '../../assets/images/gdata.png';
import logope2 from '../../assets/images/logope2.png';

export default function PelatihanUnggulan() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl text-center text-black font-bold mt-10">
        Pelatihan <span className="text-blue-500">Unggulan</span>
      </h1>
      <p className="text-2xl text-center text-gray-600 my-5 max-w-2xl">
        Program pelatihan terbaik yang tersedia untuk meningkatkan keterampilan Anda
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        <CardPelatihanUnggulan
          h2="Kepemimpinan Efektif di Era Digital"
          p="Pelajari strategi kepemimpinan modern untuk mengelola tim"
          harga="2.500.000"
          imgSrc={gkepemimpinan2}
          label="Populer"
          badgeColor="bg-yellow-400 text-white"
          category="Manajemen"
          rating="4.8"
          durasi="3 hari (24 jam)"
        />
        <CardPelatihanUnggulan
          h2="Komunikasi Efektif dalam Tim"
          p="Tingkatkan keterampilan komunikasi Anda untuk kolaborasi"
          harga="1.800.000"
          imgSrc={gtim2}
          label="Soft Skill"
          badgeColor="bg-green-400 text-white"
          category="Soft Skill"
          rating="4.6"
          durasi="2 hari (16 jam)"
        />
        <CardPelatihanUnggulan
          h2="Analisis Data untuk Pengambilan Keputusan"
          p="Pelajari cara menganalisis data secara efektif untuk mendukung keputusan bisnis"
          harga="2.500.000"
          imgSrc={gdata}
          label="Terlaris"
          badgeColor="bg-red-400 text-white"
          category="Data"
          rating="4.9"
          durasi="4 hari (32 jam)"
        />
      </div>

      <a
        href="#"
        className="mt-10 px-6 py-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition"
      >
        Lihat Semua Pelatihan
      </a>

      {/* Bagian Logo Perusahaan */}
      <h2 className="text-xl text-blue-500 font-semibold mt-16 text-center">
        Dipercaya Oleh Perusahaan Terkemuka
      </h2>

      <div className="bg-white rounded-xl shadow-md px-6 py-6 mt-6 w-full max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          <img src={logope2} alt="Logo PE" className="h-20 object-contain" />
        </div>
      </div>
    </div>
  );
}
