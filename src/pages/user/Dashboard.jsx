import { CheckCircleIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Belajar from '../../assets/images/gada.png';
export default function Dashboard() {
  return (
    <div className="p-2 space-y-6">
      {/* Header */}
      <div className="bg-primary text-blue-400 rounded-2xl p-6 shadow-md">
        <h1 className="text-2xl font-bold">Selamat datang Rafael Hadi Rianda!</h1>
        <p className="text-sm">Semoga aktivitas belajarmu menyenangkan.</p>
      </div>

      {/* Status Langganan */}
      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <CheckCircleIcon className="w-6 h-6 text-gray-500" />
          <p className="text-sm text-gray-600">
            Anda belum berlangganan Edu Pro. Pilih paket langganan dan mulai lah perjalanan Anda menjadi developer profesional.
          </p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          Pilih paket langganan
        </button>
      </div>

      {/* Profil dan Aktivitas Belajar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kelengkapan Profil */}
        <div className="bg-gray-900 text-white rounded-xl p-6 shadow-sm">
          <div className="text-center">
            <div className="text-lg font-semibold">33%</div>
            <p className="font-bold mt-2">Kelengkapan Profil Anda</p>
            <p className="text-sm mt-1">
              Dengan melengkapi profil, Anda dapat menikmati layanan Edu Pro dengan maksimal. Contoh: Melihat sertifikat kompetensi Anda di Academy.
            </p>
            <button className="mt-4 px-4 py-2 border border-white rounded-lg flex items-center justify-center space-x-1">
              <span>Lengkapi</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Aktivitas Belajar */}
        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
          <img
            src={Belajar}
            alt="Aktivitas Belajar"
            className="mx-auto h-24"
          />
          <p className="mt-4 text-sm text-gray-600">
            Anda belum memiliki aktivitas belajar di EduPro Learning Platform.
          </p>
          <button className="btn bg-black mt-4 px-4 py-2 text-white rounded-lg">Belajar sekarang</button>
        </div>
      </div>

      {/* Aktivitas Lain */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-semibold text-lg mb-4">Aktivitas Lain</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-xl">
            <p className="text-sm font-medium text-gray-700">Telusuri event dari EduPro</p>
          </div>
          <div className="p-4 border rounded-xl">
            <p className="text-sm font-medium text-gray-700">Telusuri challenge dari EduPro</p>
          </div>
          <div className="p-4 border rounded-xl md:col-span-2">
            <p className="text-sm font-medium text-gray-700">Telusuri daftar pekerjaan dari perusahaan ternama</p>
          </div>
        </div>
      </div>
    </div>
  );
}
