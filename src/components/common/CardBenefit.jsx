export default function CardBenefit({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4 bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
      <img src={icon} alt={title} className="w-12 h-12 object-contain bg-blue-500 rounded-tl-2xl rounded-br-2xl" />
      <div>
        <h3 className="text-lg font-bold text-blue-500">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
