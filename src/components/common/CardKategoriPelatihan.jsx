export default function CardKategoriPelatihan({h2,p}) {
  return (
    <div className="card bg-white w-36 shadow-lg m-8">
      <div className="card-body text-black text-center">
      <figure>
        <img src="" alt="Shoes" />
      </figure>
        <h2 className="text-lg font-bold">{h2}</h2>
        <p className="text-sm font-light">{p}</p>
      </div>
    </div>
  );
}
