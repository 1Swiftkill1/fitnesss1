import React from "react";
import "./abouthero.css";
const Abouthero = () => {
  return (
    <section className="abouthero">
      <div className="container">
        <h2
          data-aos="fade-down"
          data-aos-duration="1200"
          className="abouthero__title"
        >
          О клубе
        </h2>
        <div
          data-aos="fade-down"
          data-aos-duration="1200"
          className="abouthero__textbox"
        >
          <p className="abouthero__texdoc">
            Flex force — это экспертный фитнес с индивидуальным подходом
            к каждому.
          </p>
          <p className="abouthero__texdoc">
            Погружаясь во Flex force, вы становитесь частью большой семьи,
            в которой безупречно всё: внимательные сотрудники, забота
            о здоровье, современные тренажёры, правильное питание, экологичный
            интерьер, увлекательные соревнования и светские мероприятия.{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Abouthero;
