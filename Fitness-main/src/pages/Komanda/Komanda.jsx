import React, { useEffect } from "react";
import KomandaCards from "../../components/KomandaKomponents/Komandacards/KomandaCards";
import img1 from "../../assets/Images/png/comandamaster.png";
import img2 from "../../assets/Images/png/comand2.png";
import img3 from "../../assets/Images/png/comand3.png";
import img4 from "../../assets/Images/png/comand4.png";
import img5 from "../../assets/Images/png/comand5.png";
import img6 from "../../assets/Images/png/comand6.png";
import img7 from "../../assets/Images/png/comand7.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
const Komanda = () => {
  const komanda = [
    {
      image: img1,
      name: "максим фролов",
      doc: "Мастер-тренер по плаванию",
    },
    {
      image: img2,
      name: "Ирина пестова",
      doc: "Инструктор групповых программ",
    },
    {
      image: img3,
      name: "Ирина Пташенская",
      doc: "Инструктор по йоге",
    },
    {
      image: img4,
      name: "Юлия Ерёмина",
      doc: "Матер-тренер по скайл-студии",
    },
    {
      image: img5,
      name: "денис стольников",
      doc: "Инструктор тренажерного зала",
    },
    {
      image: img6,
      name: "Елизавета иванова",
      doc: "Инструктор детского клуба",
    },
    {
      image: img7,
      name: "Владимир Патчин",
      doc: "Инструктор по боевым искусствам",
    },
  ];
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div>
      <KomandaCards data={komanda} />
    </div>
  );
};

export default Komanda;
