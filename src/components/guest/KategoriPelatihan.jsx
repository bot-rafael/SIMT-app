import CardKategoriPelatihan from '../common/CardKategoriPelatihan';
import gberbicara from '../assets/images/gberbicara.png';
import gdigital from '../assets/images/gdigital.png';
import gkeuangan from '../assets/images/gkeuangan.png';
import gmanajemen from '../assets/images/gmanajemen.png';
import gsoftskill from '../assets/images/gsoftskill.png';
import gteknis from '../assets/images/gteknis.png';

export default function KategoriPelatihan() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mt-5 text-center">
        Kategori <span className="text-blue-500">Pelatihan</span>
      </h1>
      <p className="text-sm text-gray-500 mt-2 mb-5 text-center">
        Jelajahi berbagai kategori pelatihan yang tersedia
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <CardKategoriPelatihan h2="Berbicara" p="12 Pelatihan" imgSrc={gberbicara} />
        <CardKategoriPelatihan h2="Soft Skill" p="18 Pelatihan" imgSrc={gsoftskill} />
        <CardKategoriPelatihan h2="Teknis" p="15 Pelatihan" imgSrc={gteknis} />
        <CardKategoriPelatihan h2="Manajemen" p="20 Pelatihan" imgSrc={gmanajemen} />
        <CardKategoriPelatihan h2="Keuangan" p="8 Pelatihan" imgSrc={gkeuangan} />
        <CardKategoriPelatihan h2="Digital" p="14 Pelatihan" imgSrc={gdigital} />
      </div>
    </div>
  );
}
