import React, { useEffect } from "react";
import { Klubniycarti } from "../../components/Klubniyikarti/Klubniycarti";
import Aos from "aos";
import "aos/dist/aos.css";
const Klubniyikarti = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div>
      <Klubniycarti />
    </div>
  );
};

export default Klubniyikarti;
