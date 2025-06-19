export default function CardPelatihanUnggulan({h2,p,harga}) {
  return (
    <div className="card bg-white w-96 shadow-lg m-8">
      <figure>
        <img src="" alt="Shoes"/>
      </figure>
      <div className="card-body text-black">
        <h2 className="card-title">{h2}</h2>
        <p>{p}</p>
        <div className="card-actions">
            <p className="text-lg text-blue-500 font-bold">Rp {harga}</p>
          <button className="btn btn-lg rounded-2xl border-blue-500 bg-blue-500">Detail</button>
        </div>
      </div>
    </div>
  );
}
