import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import bedroom from "../../../assets/bedroom.png";
import living from "../../../assets/living.png";
import dining from "../../../assets/dining.png";
import lounge from "../../../assets/lounge.png";
import officeChair from "../../../assets/office-chair.png";

const Category = () => {
  return (
    <div className="container mx-auto select-none px-4 my-24">
      <Swiper
        loop={true}
        freeMode={true}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper-slide p-8 border-2 border-slate-800 hover:border-orange-600 text-center mb-12">
          <img className="mx-auto" src={bedroom} alt="bedroom" />
          <p className="mt-2 text-lg font-medium">Bedroom</p>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide p-8 border-2 border-slate-800 hover:border-orange-600 text-center mb-12">
          <img className="mx-auto" src={living} alt="living" />
          <p className="mt-2 text-lg font-medium">Living</p>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide p-8 border-2 border-slate-800 hover:border-orange-600 text-center mb-12">
          <img className="mx-auto" src={dining} alt="dining" />
          <p className="mt-2 text-lg font-medium">Dining</p>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide p-8 border-2 border-slate-800 hover:border-orange-600 text-center mb-12">
          <img className="mx-auto" src={lounge} alt="lounge" />
          <p className="mt-2 text-lg font-medium">Lounge</p>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide p-8 border-2 border-slate-800 hover:border-orange-600 text-center mb-12">
          <img className="mx-auto" src={officeChair} alt="office chair" />
          <p className="mt-2 text-lg font-medium">Office Chair</p>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Category;
