import React, { useEffect } from "react";
import Mapcard from "../../components/Mapcard/Mapcard";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import "./map.css";
import Aos from "aos";
import "aos/dist/aos.css";
const Mapcomponent = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <section className="map">
      <div
        data-aos="fade-down"
        data-aos-duration="1600"
        className="map__dectopcard"
      >
        <Mapcard />
      </div>
      <div
        data-aos="fade-down"
        data-aos-duration="1600"
        className="map__mobilecard"
      >
        <Mapcard />
      </div>
      <div className="map__wrapper">
        <YMaps query={{ apikey: "fc813c5f-31a7-4db3-b4bf-04fdcb72a234" }}>
          <Map
            width={"100%"}
            height={"100%"}
            defaultState={{ center: [56.127788, 40.386459], zoom: 15 }}
          >
            <Placemark geometry={[56.127788, 40.386459]} />
          </Map>
        </YMaps>
      </div>
    </section>
  );
};

export default Mapcomponent;
