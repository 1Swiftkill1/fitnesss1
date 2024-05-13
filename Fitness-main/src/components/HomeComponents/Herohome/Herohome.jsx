import "./hero.css";
import heroarrow from "../../../assets/Images/svg/heroarrow.svg";
const Herohome = () => {
  return (
    <section className="herohome">
      <div className="container">
        <div className="herohome__wrapper">
          <h2
            data-aos="fade-right"
            data-aos-duration="1200"
            className="herohome__title"
          >
            Испытайте все, что может предложить flex force
          </h2>
          <p
            data-aos="fade-right"
            data-aos-duration="1200"
            className="herohome__desc"
          >
            Flex force — это экспертный фитнес с индивидуальным подходом к
            каждому, а также лучший клуб для новичков по мнению резидентов.
          </p>
          <p
            data-aos="fade-right"
            data-aos-duration="1200"
            className="herohome__desc"
          >
            Наслаждайтесь неограниченным количеством фирменных занятий в
            соответствии с вашими целями.
          </p>
          <img src={heroarrow} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Herohome;
