import React, { useEffect, useState } from "react";
import BarnerTrenajor from "../../components/TrenajorComponents/BarnerTrenajor/BarnerTrenajor";
import ImgTrenajor from "../../components/TrenajorComponents/ImgTrenajor/ImgTrenajor";
import Ownprogram from "../../components/TrenajorComponents/OwnProgram/Ownprogram";
import Trenor from "../../components/TrenajorComponents/Trenor/Trenor";
import Detskiyback from "../../assets/Images/png/detskiybac.png";
import imgbassen from "../../assets/Images/png/imgdetskiyfitnes.png";
import Modal from "../../components/Modal/Modal";
import Typeorder from "../../components/OrdersComponent/Typeorder";
import TrenajorPreyti from "../../components/OrdersComponent/TrenajorPreyti";
import Trenerimg from "../../assets/Images/png/detsikiytrener.png";
import Controlimg from "../../assets/Images/svg/detskiyacontrol.svg";
import Trenajoraboutimg from "../../assets/Images/png/detskiyabout.png";
import ownimg1 from "../../assets/Images/png/detskiyx1.png";
import ownimg2 from "../../assets/Images/png/detskiyx2.png";
import http from "../../servers/axios";
const Detskiyfitnes = () => {
  const [modal, setModal] = useState(false);
  const [preyti, setPreyti] = useState(false);
  const openPreyti = () => {
    setPreyti(true);
  };
  const closePreyti = () => {
    setPreyti(false);
  };
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const pagechange = {
    prev__text: "Бассейн",
    next__text: "Боевые искусства",
    prev__url: "bassen",
    next__url: "boevi",
    title: "Детский фитнес",
    text: "Гармоничное воспитание юных резидентов клуба. Сочетаем занятия по физическому, интеллектуальному и творческому развитию.",
  };
  const trenor = {
    name: "Елизавета иванова",
    position: "Руководитель фитнес-зоны",
    about:
      "Тренер разработает индивидуальную программу и научит правильно выполнять упражнения",
    Image: Trenerimg,
    controlimg: Controlimg,
    aboutimg: Trenajoraboutimg,
  };
  const ownprogram = [
    {
      image: ownimg1,
      title: "Грудничковое плавание",
      text: "30 мин | 3-18 месяцев Дети ныряют и плавают на руках родителей под контролем опытного инструктора. Это безопасно и совсем не страшно. Занятие развивает дыхательную и сердечно-сосудистую системы. Благодаря закаливанию укрепляется иммунитет: снижается вероятность простудных заболеваний и проблем со здоровьем. Крепче становится сон, улучшается аппетит, снимается мышечный гипер- и гипотонус малыша.",
    },
    {
      image: ownimg2,
      title: "Йога в гамаках",
      text: "30 мин | 5-6 лет, 45 мин | 7-12 лет Раскачивание, чувство полёта, кувырки и лазанье в гамаке — это весело и полезно. Упражнения на растяжение дадут ребёнку красивую осанку и пластику. Перевёрнутые асаны способствуют улучшению памяти и работы головного мозга. Тренируется вестибулярный аппарат, укрепляются мышцы и развивается тело.",
    },
  ];
  const [types, setTypes] = useState([]);
  const getSelect = () => {
    http
      .get("/service-list/")
      .then((res) => {
        console.log(res.data);
        setTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSelect();
  }, []);
  return (
    <div>
      <Modal isOpen={modal} onClose={closeModal}>
        <Typeorder types={types} onClose={closeModal} openPreyti={openPreyti} />
      </Modal>
      <Modal isOpen={preyti} onClose={closePreyti}>
        <TrenajorPreyti onClose={closePreyti} />
      </Modal>
      <BarnerTrenajor
        openModal={openModal}
        title={pagechange.title}
        text={pagechange.text}
        pagechange={pagechange}
        barnerback={Detskiyback}
      />
      <ImgTrenajor img={imgbassen} />
      <Trenor trenor={trenor} handleModal={openModal} />
      <Ownprogram data={ownprogram} />
    </div>
  );
};

export default Detskiyfitnes;
