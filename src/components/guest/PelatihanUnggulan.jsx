import CardPelatihanUnggulan from '../common/CardPelatihanUnggulan';
import gkepemimpinan from '../assets/images/gkepemimpinan.png';
import gtim from '../assets/images/gtim.png';
import gdata from '../assets/images/gdata.png';

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
          imgSrc={gkepemimpinan}
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
          imgSrc={gtim}
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

      <a className="mt-10 px-6 py-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition">
        Lihat Semua Pelatihan
      </a>

      <h2 className="text-xl text-blue-500 font-semibold mt-16">
        Dipercaya Oleh Perusahaan Terkemuka
      </h2>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <img src="" alt="logo1" />
        <img src="" alt="logo2" />
        <img src="" alt="logo3" />
        <img src="" alt="logo4" />
      </div>
    </div>
  );
}
