export default function HeroSection() {
  return (
    <div className="hero bg-blue-500 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" className="max-w-sm rounded-lg shadow-2xl" />
        <div className="ml-5">
          <p className="text-blue-500 text-center text-lg bg-white rounded-2xl  py-2  mr-150">Platform Manajemen Pelatihan #1 di Indonesia</p>
          <h1 className="text-8xl font-bold">
            Tingkatkan <span className="text-yellow-200">keterampilan</span> & <span className="text-yellow-200">karir</span> Anda
          </h1>
          <p className="text-2xl py-6">Akses ratusan program pelatihan berkualitas tinggi dari para ahli industri. Kembangkan potensi Anda dan raih kesuksesan karir.</p>
          <div className="mb-6">
            <button className="w-50 text-sm btn btn-xl text-blue-500 bg-white border-neutral-100 mx-2">Mulai Belajar</button>
            <button className="w-50 text-sm btn btn-xl bg-blue-500 border-neutral-100 mx-2">Kontak</button>
          </div>
          <div className="flex flex-row text-3xl">
            <p className="font-bold mx-5 pl-15">
              200+
              <p className="text-sm font-medium">Pelatihan</p>
            </p>
            <p className="font-bold mx-5">
              50+
              <p className="text-sm font-medium">Instruktur</p>
            </p>
            <p className="font-bold mx-5">
              10K+
              <p className="text-sm font-medium">Alumni</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
