import React, { useEffect } from "react";
import "./ownprogram.css";
import Aos from "aos";
import "aos/dist/aos.css";
const Ownprogram = ({ data }) => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <section className="ownprogram">
      <div className="container">
        <h2
          data-aos="fade-down"
          data-aos-duration="1600"
          className="ownprogram__title"
        >
          Основные программы
        </h2>
        <ul className="ownprogram__list">
          {data?.map((item, index) => (
            <li
              data-aos="fade-down"
              data-aos-duration="1600"
              key={index}
              className="ownprogram__listitem"
            >
              <img className="ownprogram__listimg" src={item?.image} alt="" />
              <h4 className="ownprogram__listitem__title">{item?.title}</h4>
              <p className="ownprogram__listitem__doc">{item?.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Ownprogram;
