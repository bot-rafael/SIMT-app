export default function CardPelatihanUnggulan({
  h2,
  p,
  harga,
  imgSrc,
  label,
  badgeColor,
  category,
  rating,
  durasi
}) {
  return (
    <div className="w-80 rounded-2xl shadow-md bg-white overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105">
      {/* Gambar full */}
      <div className="relative">
        <img src={imgSrc} alt={h2} className="w-full h-48 object-cover" />
        {label && (
          <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${badgeColor}`}>
            {label}
          </span>
        )}
      </div>

      {/* Konten */}
      <div className="p-5 text-black">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">{category}</span>
          <span className="flex items-center text-yellow-400 gap-1 font-medium">
            ⭐ {rating}
          </span>
        </div>

        <h2 className="text-base font-bold text-gray-800">{h2}</h2>
        <p className="text-sm text-gray-600 mt-1">{p}</p>

        {durasi && (
          <p className="text-xs text-gray-400 mt-1">{durasi}</p>
        )}

        <div className="flex justify-between items-center mt-4">
          <p className="text-blue-600 font-bold text-lg">Rp {harga}</p>
          <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-xl hover:bg-blue-600 transition">
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}
