'use client';
import React, { useState, useRef, useEffect } from "react";
import TileThree from "@/components/TileThree";
import TileFour from "@/components/TileFour";
import FullImage from "@/components/FullImage";
import Infotext from "@/components/Infotext";
import FullVideo from "@/components/FullVideo";
import ThreeRow from "@/components/ThreeRow";
import data from "@/data/data.json";
import Image from "next/image";

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '@/assets/styles.css';

import { Navigation, Keyboard, Mousewheel, Pagination } from 'swiper/modules';

import { isMobile } from 'react-device-detect';

interface Props {
  children: any
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<any>(null);

  const SwiperButtonNext = ({ children }: Props) => {
    const swiper = useSwiper();
    return <button
      onClick={() => swiper.slideNext()}
      className={`fixed z-10 right-0 left-0 m-auto bottom-5 w-[7em] h-[7em] lg:w-[4em] lg:h-[4em] rotate-90 p-4 rounded-full`}
    >
      {children}
    </button>;
  };

  const handleVideoEndNext = () => {
    setCurrentSlide(currentSlide + 1);
    swiperRef.current.swiper.slideTo(currentSlide + 1, 500, false);
  };

  useEffect(() => {
    console.log('currentSlide', currentSlide)
    if (currentSlide == 10) {
      console.log('currentSlide 10', currentSlide)
    }
  }, [currentSlide]);

  return (
    <>
      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={false}
        keyboard={{
          enabled: true,
        }}
        freeMode={{
          sticky: false,
          enabled: isMobile,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Keyboard, Pagination, Navigation, Mousewheel]}
        ref={swiperRef}
        onSlideChange={() => {
          setCurrentSlide(swiperRef.current.swiper.activeIndex)
        }}
        className="mySwiper"
      >
        <SwiperButtonNext>
          <Image
            alt="reina eterna"
            width={3000}
            height={3000}
            priority
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            src="/icons/play.png"
          />
        </SwiperButtonNext>
        <SwiperSlide>
          <FullImage
            srcOne="/images/eric_cortes-19.jpg"
            title="Reina Eterna"
            text="La Historia de Yovani y Sheyla"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Infotext text={data.infoSlides.sectionOne.infoText} />
        </SwiperSlide>
        <SwiperSlide>
          <TileThree
            currentSlide={currentSlide}
            srcOne="/images/eric_cortes-1.jpg"
            srcTwo="/images/eric_cortes-2.jpg"
            srcThree="https://ericcortes.de/reina/assets/video/rebolo/01_REBOLO.mp4#t=2"
            video={true}
          />
        </SwiperSlide>
        <SwiperSlide>
          <FullVideo
            srcOne="https://ericcortes.de/reina/assets/video/rebolo/02_DECORACION.mp4#t=2"
            loop
          />
        </SwiperSlide>
        <SwiperSlide>
          <Infotext text={data.infoSlides.sectionTwo.infoText} />
        </SwiperSlide>
        <SwiperSlide>
          <TileThree
            srcOne="/images/eric_cortes-4.jpg"
            srcTwo="/images/eric_cortes-18.jpg"
            srcThree="/images/eric_cortes-7.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <TileFour
            srcOne="/images/eric_cortes-9.jpg"
            srcTwo="/images/eric_cortes-8.jpg"
            srcThree="https://ericcortes.de/reina/assets/video/rebolo/SALIDA_CAMINANDO.mp4#t=2"
            srcFour="/images/eric_cortes-10.jpg"
            video
          />
        </SwiperSlide>
        <SwiperSlide>
          <ThreeRow
            srcOne="/images/eric_cortes-12.jpg"
            srcTwo="/images/eric_cortes-15.jpg"
            srcThree="/images/eric_cortes-16.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Infotext text={data.infoSlides.sectionThree.infoText} />
        </SwiperSlide>
        <SwiperSlide>
          <FullVideo
            srcOne="https://ericcortes.de/reina/assets/video/rebolo/PRESENTACION.mp4#t=2"
            loop
          />
        </SwiperSlide>
        <SwiperSlide>
          <FullVideo
            srcOne="https://ericcortes.de/reina/assets/video/rebolo/POSFIESTA_GLOBOS.mp4#t=2"
            onVideoEnd={handleVideoEndNext}
          />
        </SwiperSlide>
        <SwiperSlide>
          <FullVideo
            srcOne="https://ericcortes.de/reina/assets/video/rebolo/FINAL.mp4#t=2"
            onVideoEnd={handleVideoEndNext}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Infotext text={data.infoSlides.sectionFour.infoText} />
        </SwiperSlide>
        <SwiperSlide>
          <FullVideo
            srcOne="https://ericcortes.de/reina/assets/video/rebolo/FINAL_CREDITOS.mp4#t=2"
            onVideoEnd={handleVideoEndNext}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt="reina eterna"
            width={3000}
            height={3000}
            style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute' }}
            src="/images/FINAL_TITULO.png"
          />
          <FullImage srcOne="/images/eric_cortes-3.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
