import React, { useEffect } from "react";
import Herohome from "../../components/HomeComponents/Herohome/Herohome";
import Snamihome from "../../components/HomeComponents/Snamihome/Snamihome";
import Senihome from "../../components/HomeComponents/Senihome/Senihome";
import Zonihom from "../../components/HomeComponents/Zonihom/Zonihom";
import Aos from "aos";
import "aos/dist/aos.css";
const Home = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div>
      <Herohome />
      <Snamihome />
      <Senihome />
      <Zonihom />
    </div>
  );
};

export default Home;
