import React from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "./HomeCarousel.module.css"; // Importing the module

const HomeCarousel = () => {
  return (
    <Carousel
      showThumbs={false} // Disables thumbnail previews
      autoPlay={true} // enable auto slide
      infiniteLoop={true} // enable infinte loop
      interval={3000} // set the time for each slide
      showStatus={false} // remove slide indicator
      showIndicators={false} // this hides the dots
    >
      <div>
        <img
          className={styles.carouselImage}
          src="/images/1.avif"
          alt="Slide 1"
        />
        <p className={styles.legend}>Upto 40% OFF</p>
      </div>
      <div>
        <img
          className={styles.carouselImage}
          src="/images/2.jpg"
          alt="Slide 2"
        />
        <p className={styles.legend}>Explore collection</p>
      </div>
      <div>
        <img
          className={styles.carouselImage}
          src="/images/3.jpg"
          alt="Slide 3"
        />
        <p className={styles.legend}>Asthetic look</p>
      </div>
    </Carousel>
  );
};

export default HomeCarousel;
