export default function CardKategoriPelatihan({ h2, p, imgSrc }) {
  return (
    <div className="card bg-base-100 shadow-xl m-4">
      <figure><img src={imgSrc} alt={h2} className="w-fit h-48 object-cover" /></figure>
      <div className="card-body">
        <h2 className="card-title text-xl font-bold">{h2}</h2>
        <p>{p}</p>
      </div>
    </div>
  );
}