import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

export default function Pelatihan() {
  const [pelatihan, setPelatihan] = useState([]);
  const [daftarPelatihan, setDaftarPelatihan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedPelatihan, setSelectedPelatihan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const perPage = 10;

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (userProfile) {
      fetchPelatihan();
      fetchDaftar();
    }
  }, [page, userProfile]);

  const getProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();

      if (error) console.error(error);
      else setUserProfile(data);
    }
  };

  const fetchPelatihan = async () => {
    setLoading(true);
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    const { data, error } = await supabase
      .from('pelatihan')
      .select(
        `
        id_pelatihan,
        judul,
        deskripsi,
        tanggal,
        kuota,
        created_at,
        profiles:pengajar_id (
          full_name
        )
      `
      )
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setPelatihan(data);

    setLoading(false);
  };

  const fetchDaftar = async () => {
    const { data, error } = await supabase
      .from('daftar')
      .select(
        `
      id_daftar,
      pelatihan (
        id_pelatihan,
        judul,
        tanggal,
        kuota,
        profiles:pengajar_id (
          full_name
        )
      ),
      profiles (
        full_name
      )
    `
      )
      .eq('user_id', userProfile.user_id)
      .order('id_daftar', { ascending: false });

    if (error) console.error(error);
    else setDaftarPelatihan(data);
  };

  const handleDaftar = async (item) => {
    setSelectedPelatihan(item);

    // Cek apakah sudah pernah daftar
    const { data, error } = await supabase.from('daftar').select('id_daftar').eq('user_id', userProfile.user_id).eq('id_pelatihan', item.id_pelatihan).single();

    setAlreadyRegistered(!!data);
    setShowModal(true);
    setIsClosingModal(false);
  };

  const closeModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosingModal(false);
    }, 300);
  };

  const submitPendaftaran = async () => {
    if (!userProfile || !selectedPelatihan) return;

    const { error } = await supabase.from('daftar').insert({
      user_id: userProfile.user_id,
      id_pelatihan: selectedPelatihan.id_pelatihan,
    });

    if (error) {
      alert('Gagal daftar: ' + error.message);
    } else {
      alert('Berhasil mendaftar!');
      closeModal();
      fetchDaftar(); // refresh daftar user
      fetchPelatihan(); // refresh pelatihan yang tersedia
    }
  };

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => (p > 1 ? p - 1 : 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes modalSlideIn {
          from { 
            opacity: 0;
            transform: scale(0.7) translateY(-50px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes modalSlideOut {
          from { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to { 
            opacity: 0;
            transform: scale(0.7) translateY(-50px);
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-fadeOut {
          animation: fadeOut 0.3s ease-out;
        }
        
        .animate-modalSlideIn {
          animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .animate-modalSlideOut {
          animation: modalSlideOut 0.3s ease-in;
        }

        .animate-bounce-hover:hover {
          animation: bounce 0.6s ease-in-out;
        }

        .animate-pulse-hover:hover {
          animation: pulse 0.3s ease-in-out;
        }

        .button-glow:hover {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          transition: all 0.3s ease;
        }
      `}</style>
      <div className="container mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-l-8 border-blue-500 card-hover">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-4 rounded-xl animate-bounce-hover">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Daftar Pelatihan</h1>
              <p className="text-gray-600 mt-2">Temukan dan daftarkan diri Anda pada pelatihan yang tersedia</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Memuat pelatihan...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Available Training Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 card-hover">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Pelatihan Tersedia
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Judul</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Deskripsi</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tanggal</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Pengajar</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kuota</th>
                      {userProfile?.role === 'Pelajar' && (
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Aksi</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pelatihan
                      .filter((item) => {
                        return !daftarPelatihan.some((d) => d.pelatihan?.id_pelatihan === item.id_pelatihan);
                      })
                      .map((item, index) => (
                        <tr key={item.id_pelatihan} className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">{item.judul}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-gray-600 max-w-xs truncate">{item.deskripsi}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center text-gray-600">
                              <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {new Date(item.tanggal).toLocaleDateString('id-ID', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                <span className="text-blue-600 font-semibold text-sm">
                                  {item.profiles?.full_name?.charAt(0) || '?'}
                                </span>
                              </div>
                              <span className="text-gray-700">{item.profiles?.full_name || '—'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              {item.kuota} peserta
                            </span>
                          </td>
                          {userProfile?.role === 'Pelajar' && (
                            <td className="px-6 py-4 text-center">
                              <button 
                                onClick={() => handleDaftar(item)} 
                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-md button-glow animate-pulse-hover"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Daftar
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Halaman {page}
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    onClick={prevPage} 
                    disabled={page === 1}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Sebelumnya
                  </button>
                  <button 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    onClick={nextPage} 
                    disabled={pelatihan.length < perPage}
                  >
                    Selanjutnya
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Registered Training Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden card-hover">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pelatihan yang Anda Daftar
            </h2>
          </div>

          {daftarPelatihan.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">Anda belum mendaftar pelatihan apa pun.</p>
              <p className="text-gray-400 text-sm mt-2">Pilih pelatihan di atas untuk memulai pembelajaran Anda.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-indigo-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Judul</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tanggal</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kuota</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Pengajar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {daftarPelatihan.map((item, index) => (
                    <tr key={item.id_daftar} className={`hover:bg-indigo-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="bg-green-100 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="font-semibold text-gray-900">{item.pelatihan?.judul || '-'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {item.pelatihan?.tanggal ? new Date(item.pelatihan.tanggal).toLocaleDateString('id-ID', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {item.pelatihan?.kuota ?? '-'} peserta
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                            <span className="text-indigo-600 font-semibold text-sm">
                              {item.pelatihan?.profiles?.full_name?.charAt(0) || '?'}
                            </span>
                          </div>
                          <span className="text-gray-700">{item.pelatihan?.profiles?.full_name || '-'}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Registration Modal */}
        {showModal && selectedPelatihan && (
          <div className={`fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50 p-4${isClosingModal ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all ${isClosingModal ? 'animate-modalSlideOut' : 'animate-modalSlideIn'}`}>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Konfirmasi Pendaftaran
                </h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Pelatihan</p>
                    <p className="font-semibold text-gray-900">{selectedPelatihan.judul}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Nama Peserta</p>
                    <p className="font-semibold text-gray-900">{userProfile?.full_name}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Nomor Telepon</p>
                    <p className="font-semibold text-gray-900">{userProfile?.phone}</p>
                  </div>
                </div>

                {alreadyRegistered ? (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <p className="text-red-700 font-medium">Anda sudah terdaftar pada pelatihan ini.</p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 flex space-x-3">
                    <button 
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-300 animate-pulse-hover"
                      onClick={closeModal}
                    >
                      Batal
                    </button>
                    <button 
                      className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center button-glow animate-pulse-hover"
                      onClick={submitPendaftaran}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Daftar Sekarang
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}