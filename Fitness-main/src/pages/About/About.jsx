import React, { useEffect } from "react";
import Abouthero from "../../components/AboutComponents/Abouthero/Abouthero";
import Aboutlist from "../../components/AboutComponents/Aboutlist/Aboutlist";
import Aboutpodrobiy from "../../components/AboutComponents/Aboutpodrobiy/Aboutpodrobiy";
import Aos from "aos";
import "aos/dist/aos.css";
const About = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div>
      <Abouthero />
      <Aboutlist />
      <Aboutpodrobiy />
    </div>
  );
};

export default About;
