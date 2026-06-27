import Carousel from "../common/Carousel";
import PlaceCard from "./PlaceCard";

import bodhGayaImg from "../../assets/bodh-gaya.png";
import nalandaImg from "../../assets/nalanda.png";
import rajgirImg from "../../assets/rajgir.png";
import vaishaliImg from "../../assets/vaishali.png";
import patnaSahibImg from "../../assets/patna-sahib.png";
import pawapuriImg from "../../assets/pawapuri.png";

const places = [
  { name: "Bodh Gaya", district: "Gaya District", image: bodhGayaImg },
  { name: "Nalanda", district: "Nalanda District", image: nalandaImg },
  { name: "Rajgir", district: "Nalanda District", image: rajgirImg },
  { name: "Vaishali", district: "Vaishali District", image: vaishaliImg },
  { name: "Patna Sahib", district: "Patna District", image: patnaSahibImg },
  { name: "Pawapuri", district: "Nalanda District", image: pawapuriImg },
];

const PopularPlaces = () => {
  return (
    <section id="places" className="pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24 overflow-hidden">
      <Carousel title="Popular Places You Must Visit" subtitle="Explore">
        {places.map((place, index) => (
          <PlaceCard
            key={place.name}
            image={place.image}
            name={place.name}
            district={place.district}
            index={index}
          />
        ))}
      </Carousel>
    </section>
  );
};

export default PopularPlaces;
