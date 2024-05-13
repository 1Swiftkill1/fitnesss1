import React, { useEffect } from "react";
import "./style.css";
import Aos from "aos";
import "aos/dist/aos.css";
const ImgTrenajor = ({ img }) => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <section className="imgtrenor">
      <div className="container">
        <img
          data-aos="fade-down"
          data-aos-duration="1600"
          className="imgtrenor__img"
          src={img}
          alt=""
        />
      </div>
    </section>
  );
};

export default ImgTrenajor;
