import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardPelatihanUnggulan from '../common/CardPelatihanUnggulan';
import gkepemimpinan2 from '../../assets/images/gkepemimpinan2.png';
import gtim2 from '../../assets/images/gtim2.png';
import gdata from '../../assets/images/gdata.png';
import logope2 from '../../assets/images/logope2.png';

export default function PelatihanUnggulan() {
  const navigate = useNavigate();

  const coursesData = [
    {
      id: 'kepemimpinan',
      title: "Kepemimpinan Efektif di Era Digital",
      subtitle: "Pelajari strategi kepemimpinan modern untuk mengelola tim",
      price: "2.500.000",
      image: gkepemimpinan2,
      label: "Populer",
      badgeColor: "bg-yellow-400 text-white",
      category: "Manajemen",
      rating: "4.8",
      duration: "3 hari (24 jam)"
    },
    {
      id: 'komunikasi',
      title: "Komunikasi Efektif dalam Tim",
      subtitle: "Tingkatkan keterampilan komunikasi Anda untuk kolaborasi",
      price: "1.800.000",
      image: gtim2,
      label: "Soft Skill",
      badgeColor: "bg-green-400 text-white",
      category: "Soft Skill",
      rating: "4.6",
      duration: "2 hari (16 jam)"
    },
    {
      id: 'analisis-data',
      title: "Analisis Data untuk Pengambilan Keputusan",
      subtitle: "Pelajari cara menganalisis data secara efektif untuk mendukung keputusan bisnis",
      price: "2.500.000",
      image: gdata,
      label: "Terlaris",
      badgeColor: "bg-red-400 text-white",
      category: "Data",
      rating: "4.9",
      duration: "4 hari (32 jam)"
    }
  ];

  const handleCourseClick = (courseId) => {
    navigate(`/detail/${courseId}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl text-center text-black font-bold mt-10">
        Pelatihan <span className="text-blue-500">Unggulan</span>
      </h1>
      <p className="text-2xl text-center text-gray-600 my-5 max-w-2xl">
        Program pelatihan terbaik yang tersedia untuk meningkatkan keterampilan Anda
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {coursesData.map((course) => (
          <div key={course.id} onClick={() => handleCourseClick(course.id)} className="cursor-pointer">
            <CardPelatihanUnggulan
              h2={course.title}
              p={course.subtitle}
              harga={course.price}
              imgSrc={course.image}
              label={course.label}
              badgeColor={course.badgeColor}
              category={course.category}
              rating={course.rating}
              durasi={course.duration}
            />
          </div>
        ))}
      </div>

      <h2 className="text-xl text-blue-500 font-semibold mt-16 text-center">
        Dipercaya Oleh Perusahaan Terkemuka
      </h2>

      <div className="bg-white rounded-xl shadow-md px-6 py-6 mt-6 w-full max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          <img src={logope2} alt="Logo PE" className="h-20 object-contain" />
        </div>
      </div>
    </div>
  );
}
