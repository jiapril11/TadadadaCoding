"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

type Props = {
  children: React.ReactNode;
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div
      className="carousel-button-group absolute top-11 right-3 gap-4 flex justify-end 
      items-center w-full"
    >
      <button className="block text-xl" onClick={() => previous()}>
        {" "}
        <FiChevronLeft />
      </button>
      <button onClick={() => next()}>
        <span className="block text-xl">
          <FiChevronRight />
        </span>
      </button>
    </div>
  );
};

export default function MultiCarousel({ children }: Props) {
  return (
    <Carousel
      infinite
      autoPlay
      responsive={responsive}
      partialVisible={false}
      itemClass="p-2"
      arrows={false}
      renderButtonGroupOutside={true}
      customButtonGroup={<ButtonGroup />}
    >
      {children}
    </Carousel>
  );
}
