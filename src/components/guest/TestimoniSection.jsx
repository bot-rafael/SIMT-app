import CardTestimoni from '../common/CardTestimoni';

export default function TestimoniSection() {
  return (
    <section className="flex flex-col items-center px-8 py-12 gap-6">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-black">
          Testimoni <span className="text-blue-500">Siswa</span>
        </h2>
        <div className="flex gap-2">
          <button className="btn btn-circle bg-yellow-400 text-white">
          {/* icons */}
          </button>
          <button className="btn btn-circle bg-yellow-400 text-white">
          {/* icons */}
          </button>
        </div>
      </div>

      {/* Card */}
      <CardTestimoni
        nama="Ricky Harukan"
        jabatan="Engineer On Site – PT Integrasi Data Nusantara"
        latarBelakang="Lulusan Front-End Web & Back-End Path"
        testimoni="Edu Pro menyediakan biaya pelatihan yang ramah kantong untuk pengalaman pembelajaran pemrograman yang mendalam. Ilmu yang diperoleh dari program ini memperkuat dasar pengetahuan saya dan mendukung perkembangan portofolio profesional yang sedang saya kembangkan."
        image="" // ganti dengan lokasi file gambarmu
      />
    </section>
  );
}
