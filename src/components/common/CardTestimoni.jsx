export default function CardTestimoni({ nama, jabatan, latarBelakang, testimoni, image }) {
  return (
    <div className="bg-blue-500 text-white rounded-xl shadow-md p-8 flex flex-row items-center gap-6 max-w-5xl w-full">
      {/* Text Section */}
      <div className="w-1/2">
        <p className="mb-4 italic">"{testimoni}"</p>
        <p className="font-semibold">{nama}</p>
        <p>
          <span className="font-bold">Jabatan: </span>
          {jabatan}
        </p>
        <p>
          <span className="font-bold">Latar Belakang: </span>
          {latarBelakang}
        </p>
      </div>

      {/* Image Section */}
      <div className="w-1/2">
        <img src={image} alt={nama} className="rounded-xl object-cover w-full h-auto" />
      </div>
    </div>
  );
}
