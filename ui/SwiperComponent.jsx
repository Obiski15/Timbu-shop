import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function SwiperComponent() {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={5}
      slidesPerView={1}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      loop={true}
      navigation
      pagination={{ clickable: false }}
      style={{
        flex: 1,
        borderRadius: "1.6rem",
        "--swiper-theme-color": "#DB4444",
        "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
        "--swiper-pagination-bullet-height": "1.2rem",
        "--swiper-pagination-bullet-width": "1.2rem",
        "--swiper-pagination-bullet-inactive-opacity": "50%",
      }}
      className="hide-slide-button"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <SwiperSlide key={i + 1}>
          <img
            src={`../src/assets/images/large-img-${i + 1}.png`}
            alt={`large-img-${i + 1}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperComponent;
