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
    <div className="group w-80 rounded-3xl shadow-lg bg-white overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border border-gray-100">
      {/* Gambar dengan overlay gradient */}
      <div className="relative overflow-hidden">
        <img 
          src={imgSrc} 
          alt={h2} 
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {label && (
          <span className={`absolute top-4 right-4 px-3 py-1.5 text-xs font-bold rounded-full shadow-lg ${badgeColor} backdrop-blur-sm`}>
            {label}
          </span>
        )}
        {/* Floating category badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md">
            {category}
          </span>
        </div>
      </div>

      {/* Konten dengan spacing yang lebih baik */}
      <div className="p-6 text-black">
        {/* Rating dan durasi */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700 ml-1">{rating}</span>
          </div>
          {durasi && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              📅 {durasi}
            </span>
          )}
        </div>

        {/* Judul dengan typography yang lebih baik */}
        <h2 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {h2}
        </h2>
        
        {/* Deskripsi */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
          {p}
        </p>

        {/* Footer dengan harga dan button */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">Mulai dari</span>
            <p className="text-blue-600 font-bold text-xl">
              Rp {parseInt(harga).toLocaleString('id-ID')}
            </p>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95">
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
}