import CardKategoriPelatihan from '../common/CardKategoriPelatihan';

export default function KategoriPelatihan() {
  return (
    <div className="flex flex-col">
      <h1 className="text-5xl text-center text-black font-bold mt-10">Kategori <span className="text-blue-500">Pelatihan</span></h1>
      <p className="text-3xl text-center text-black my-5">Jelajahi berbagai kategori pelatihan yang tersedia</p>
      <div className="flex flex-wrap sm:flex-wrap-reverse items-center">
        <CardKategoriPelatihan h2={'Berbicara'} p={'12 Pelatihan'} />
        <CardKategoriPelatihan h2={'Soft Skill'} p={'18 Pelatihan'} />
        <CardKategoriPelatihan h2={'Teknisi'} p={'15 Pelatihan'} />
        <CardKategoriPelatihan h2={'Manajemen'} p={'20 Pelatihan'} />
        <CardKategoriPelatihan h2={'Keuangan'} p={'8 Pelatihan'} />
        <CardKategoriPelatihan h2={'Digital'} p={'14 Pelatihan'} />
      </div>
    </div>
  );
}
