import { useEffect, useState } from 'react';
import { Calendar, User, Users, Clock, BookOpen, ChevronLeft, ChevronRight, Loader2, Check, Star, Award, GraduationCap, Trophy, Search } from 'lucide-react';
import { supabase } from '../../../supabaseClient';

export default function Pelatihan() {
  const [pelatihan, setPelatihan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [registeredTrainings, setRegisteredTrainings] = useState(new Set());
  const [loadingRegistration, setLoadingRegistration] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const perPage = 10;

  useEffect(() => {
    fetchPelatihan();
  }, [page]);

  const fetchPelatihan = async () => {
    setLoading(true);
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    try {
      const { data, error } = await supabase
        .from('pelatihan')
        .select(`
          id_pelatihan,
          judul,
          deskripsi,
          tanggal,
          kuota,
          created_at,
          profiles:pengajar_id (
            full_name,
            role
          )
        `)
        .eq('profiles.role', 'Pengajar')
        .range(from, to)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching pelatihan:', error);
        setPelatihan([]);
      } else {
        setPelatihan(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setPelatihan([]);
    }

    setLoading(false);
  };

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page > 1 ? page - 1 : 1);

  const handleDaftar = async (id_pelatihan) => {
    setLoadingRegistration(prev => new Set(prev).add(id_pelatihan));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Pelajar mendaftar pelatihan ID:', id_pelatihan);
      setRegisteredTrainings(prev => new Set(prev).add(id_pelatihan));
    } catch (error) {
      console.error('Error registering for training:', error);
    } finally {
      setLoadingRegistration(prev => {
        const newSet = new Set(prev);
        newSet.delete(id_pelatihan);
        return newSet;
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isUpcoming = (dateString) => {
    return new Date(dateString) > new Date();
  };

  const isRegistered = (id_pelatihan) => {
    return registeredTrainings.has(id_pelatihan);
  };

  const isLoadingRegistration = (id_pelatihan) => {
    return loadingRegistration.has(id_pelatihan);
  };

  // Filter pelatihan berdasarkan search term
  const filteredPelatihan = pelatihan.filter(item =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.profiles?.full_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Pelatihan saat ini</h1>
                <p className="text-gray-600">Pilih pelatihan yang kamu ajar saat ini</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex space-x-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow-md border border-blue-100">
                <div className="text-lg font-bold text-blue-600">{registeredTrainings.size}</div>
                <div className="text-xs text-gray-500">Terdaftar</div>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-md border border-green-100">
                <div className="text-lg font-bold text-green-600">{filteredPelatihan.filter(p => isUpcoming(p.tanggal)).length}</div>
                <div className="text-xs text-gray-500">Tersedia</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pelatihan berdasarkan judul, deskripsi, atau instruktur..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Memuat daftar pelatihan...</p>
          </div>
        ) : (
          <>
            {/* List View */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <div className="grid grid-cols-12 gap-4 text-white font-semibold text-sm">
                  <div className="col-span-4">Pelatihan</div>
                  <div className="col-span-2">Instruktur</div>
                  <div className="col-span-2">Tanggal</div>
                  <div className="col-span-1">Kuota</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2">Aksi</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-100">
                {filteredPelatihan.map((item, index) => (
                  <div 
                    key={item.id_pelatihan}
                    className="px-6 py-4 hover:bg-blue-50 transition-colors duration-200"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: 'fadeInUp 0.4s ease-out forwards'
                    }}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Pelatihan Info */}
                      <div className="col-span-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-base font-semibold text-gray-800 truncate mb-1">
                              {item.judul}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                              {item.deskripsi}
                            </p>
                            {/* Badges */}
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <Award className="w-3 h-3 mr-1" />
                                Sertifikat
                              </span>
                              {isUpcoming(item.tanggal) && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Buka
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Instruktur */}
                      <div className="col-span-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700 font-medium truncate">
                            {item.profiles?.full_name ?? 'TBA'}
                          </span>
                        </div>
                      </div>

                      {/* Tanggal */}
                      <div className="col-span-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700 font-medium">
                            {formatDate(item.tanggal)}
                          </span>
                        </div>
                      </div>

                      {/* Kuota */}
                      <div className="col-span-1">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700 font-medium">
                            {item.kuota}
                          </span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="col-span-1">
                        {isRegistered(item.id_pelatihan) ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            <Check className="w-3 h-3 mr-1" />
                            Terdaftar
                          </span>
                        ) : isUpcoming(item.tanggal) ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Star className="w-3 h-3 mr-1" />
                            Tersedia
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Selesai
                          </span>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="col-span-2">
                        <button
                          onClick={() => !isRegistered(item.id_pelatihan) && !isLoadingRegistration(item.id_pelatihan) && handleDaftar(item.id_pelatihan)}
                          disabled={isRegistered(item.id_pelatihan) || isLoadingRegistration(item.id_pelatihan)}
                          className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                            isRegistered(item.id_pelatihan)
                              ? 'bg-emerald-500 text-white cursor-default'
                              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-md transform hover:scale-105'
                          }`}
                        >
                          {isLoadingRegistration(item.id_pelatihan) ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Loading...
                            </>
                          ) : isRegistered(item.id_pelatihan) ? (
                            <>
                              <Trophy className="w-4 h-4 mr-2" />
                              Terdaftar
                            </>
                          ) : (
                            <>
                              <GraduationCap className="w-4 h-4 mr-2" />
                              Daftar
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredPelatihan.length === 0 && !loading && (
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-500 mb-2">
                    {searchTerm ? 'Tidak ada pelatihan yang ditemukan' : 'Belum ada pelatihan tersedia'}
                  </h3>
                  <p className="text-gray-400">
                    {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Pelatihan baru akan segera ditambahkan'}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredPelatihan.length > 0 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-600">
                  Menampilkan {filteredPelatihan.length} dari {pelatihan.length} pelatihan
                </p>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevPage}
                    disabled={page === 1}
                    className="flex items-center px-4 py-2 bg-white text-gray-700 font-medium rounded-lg shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-gray-200 hover:border-blue-300"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Prev
                  </button>
                  
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-sm">
                    {page}
                  </span>
                  
                  <button
                    onClick={nextPage}
                    disabled={pelatihan.length < perPage}
                    className="flex items-center px-4 py-2 bg-white text-gray-700 font-medium rounded-lg shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-gray-200 hover:border-blue-300"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}