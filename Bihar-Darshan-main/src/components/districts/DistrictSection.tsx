import Carousel from "../common/Carousel";
import DistrictCard from "./DistrictCard";

import nalandaImg from "../../assets/nalanda.png";
import patnaImg from "../../assets/patna-district.png";
import gayaImg from "../../assets/gaya-district.png";
import bhagalpurImg from "../../assets/bhagalpur-district.png";
import muzaffarpurImg from "../../assets/muzaffarpur-district.png";
import darbhangaImg from "../../assets/darbhanga-district.png";

const districts = [
  { name: "Nalanda", image: nalandaImg },
  { name: "Patna", image: patnaImg },
  { name: "Gaya", image: gayaImg },
  { name: "Bhagalpur", image: bhagalpurImg },
  { name: "Muzaffarpur", image: muzaffarpurImg },
  { name: "Darbhanga", image: darbhangaImg },
];

const DistrictSection = () => {
  return (
    <section id="districts" className="pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24 overflow-hidden">
      <Carousel
        title="Districts of Bihar"
        subtitle="Discover"
        actionLabel="View All Districts"
        actionHref="#districts"
      >
        {districts.map((district, index) => (
          <DistrictCard
            key={district.name}
            image={district.image}
            name={district.name}
            index={index}
          />
        ))}
      </Carousel>
    </section>
  );
};

export default DistrictSection;
