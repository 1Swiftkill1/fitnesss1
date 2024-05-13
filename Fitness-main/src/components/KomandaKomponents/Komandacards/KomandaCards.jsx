import React from "react";
import "./style.css";
const KomandaCards = ({ data }) => {
  return (
    <section className="komandacard">
      <div className="container">
        <h2
          data-aos="fade-down"
          data-aos-duration="1200"
          className="komandacard__title"
        >
          Команда
        </h2>
        <ul className="komandacard__list">
          {data?.map((item, index) => (
            <li
              data-aos="fade-down"
              data-aos-duration="1200"
              key={index}
              className="komandacard__listitem"
            >
              <img
                className="komandacard__list__img"
                src={item?.image}
                alt=""
              />
              <div className="komandacard__listitem__box">
                <h4 className="komandacard__list__title">{item?.name}</h4>
                <p className="komandacard__list__doc">{item?.doc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default KomandaCards;
