import CardBenefit from '../common/CardBenefit';

export default function BenefitSection() {
  const benefits = [
    {
      //   icon: kelasIcon,
      title: 'Kelas Up-To-date',
      description: 'Materi belajar selalu update, jadi kamu gak ketinggalan tren terbaru di dunia kerja.',
    },
    {
      //   icon: bimbinganIcon,
      title: 'Bimbingan Sampai Dapat Kerja',
      description: 'Gak cuman belajar, kamu juga bakal dibimbing sampai dapat kerja beneran!',
    },
    {
      //   icon: mentorIcon,
      title: 'Belajar Bareng Mentor Pro',
      description: 'Dapat ilmu langsung dari mentor keren yang udah berpengalaman di industri.',
    },
    {
      //   icon: fleksibelIcon,
      title: 'Belajar Fleksibel',
      description: 'Materi belajar fleksibel, jadi kamu bisa belajar kapan saja sesuai waktu yang kamu punya.',
    },
    {
      //   icon: kerjaIcon,
      title: 'Peluang Kerja Lebih Besar',
      description: 'Edu pro punya banyak mitra perusahaan, peluang kerja makin gede setelah lulus!',
    },
  ];

  return (
    <section className="px-6 md:px-16 py-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-2">
          Kenapa sih Harus <span className="text-blue-500">Edu pro ?</span>
        </h2>
        <p className="text-sm text-gray-500 mb-8">Ini 5 alasan kenapa Edu pro pilihan terbaik buat kariermu!</p>

        <div className="grid gap-6 md:grid-cols-1">
          {benefits.map((benefit, index) => (
            <CardBenefit key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}
