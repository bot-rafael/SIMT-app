export default function Navbar() {
  return (
    <div className="navbar h-20 rounded-b-xl bg-white shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {' '}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />{' '}
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content text-black bg-white rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a>Beranda</a>
            </li>
            <li>
              <a>Pelatihan</a>
            </li>
            <li>
              <a>Jadwal</a>
            </li>
            <li>
              <a>Kontak</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-lx bg text-xl">EduPro</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-black">
          <li className="mx-5">
            <a>Beranda</a>
          </li>
          <li className="mx-5">
            <a>Pelatihan</a>
          </li>
          <li className="mx-5">
            <a>Jadwal</a>
          </li>
          <li className="mx-5">
            <a>Kontak</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="w-30 rounded-2xl border-blue-500 text-blue-500 bg-white btn btn-lg mx-2">Daftar</a>
        <a className="w-30 rounded-2xl border-blue-500 text-blue-500 bg-white btn btn-lg mx-2">Masuk</a>
      </div>
    </div>
  );
}
