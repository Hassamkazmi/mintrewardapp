import React, { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { Previewslides } from "../../Data/Data";

export default function Previewslider({ imagePreview }) {
  return (
    <Fragment>
      <div className="container-fluid wordkorder preview">
        <Swiper
          // slidesPerView={5}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            // when window width is >= 480px
            575: {
              slidesPerView: 2,
            },
            // when window width is >= 640px
            820: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 5
            }
          }}
          spaceBetween={30}
          loop={true}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper swiperImage"
          autoplay={{
            delay: 3000, // set the delay between slides in milliseconds
            disableOnInteraction: false, // allows autoplay to continue when user interacts with the swiper
          }}        >
          {imagePreview?.map((data) => {
            return (
              <SwiperSlide>
                <img src={data?.Image}   
                  style={{
                    height: "150px",
                    width: "124px",
                  }} 
                  alt="Preview" 
                />
            </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Fragment>
  );
}
