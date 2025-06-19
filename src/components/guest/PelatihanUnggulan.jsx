import CardPelatihanUnggulan from '../common/CardPelatihanUnggulan';

export default function PelatihanUnggulan() {
  return (
    <div className="flex flex-col">
      <h1 className="text-5xl text-center text-black font-bold mt-10">Pelatihan Unggulan</h1>
      <p className="text-3xl text-center text-black my-5">Program pelatihan terbaik yang tersedia untuk meningkatkan keterampilan Anda</p>
      <div className="flex sm:flex-wrap items-center">
        <CardPelatihanUnggulan h2={'Kepemimpinan Efektif di Era Digital'} p={'Pelajari strategi kepemimpinan modern untuk mengelola tim'} harga={'2.500.000'} />
        <CardPelatihanUnggulan h2={'Komunikasi Efektif dalam Tim'} p={'Tingkatkan keterampilan komunikasi Anda untuk kolaborasi'} harga={'1.800.000'} />
        <CardPelatihanUnggulan h2={'Analisis Data untuk Pengambilan Keputusan'} p={'Pelajari cara menganalisis data secara efektif untuk mendukung'} harga={'2.500.000'} />
      </div>
      <div className="flex flex-col items-center">
        <a className="h-15 w-96 rounded-2xl border-blue-500 text-blue-500 bg-white btn btn-lg m-5">Lihat Semua Pelatihan</a>
        <h1 className="text-3xl text-blue-500 mt-20">Dipercaya Oleh Perusahaan Terkemuka</h1>
        <div className='flex flex-wrap bg-white'>
            {/* <img src="" alt="a" />
            <img src="" alt="a" />
            <img src="" alt="a" />
            <img src="" alt="a" /> */}
        </div>
      </div>
    </div>
  );
}
