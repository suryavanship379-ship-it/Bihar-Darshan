import CommunityCarousel from "./CommunityCarousel";

import bodhGayaImg from "../../assets/bodh-gaya.png";
import nalandaImg from "../../assets/nalanda.png";
import rajgirImg from "../../assets/rajgir.png";
import vaishaliImg from "../../assets/vaishali.png";
import patnaSahibImg from "../../assets/patna-sahib.png";
import pawapuriImg from "../../assets/pawapuri.png";

const communities = [
  { name: "Bhumihar Community",  subtitle: "Traditions of the Land",   image: bodhGayaImg   },
  { name: "Yadav Community",     subtitle: "Strength in Heritage",      image: nalandaImg    },
  { name: "Kayastha Community",  subtitle: "Scholars & Writers",        image: rajgirImg     },
  { name: "Mishra Community",    subtitle: "Pillars of Knowledge",      image: vaishaliImg   },
  { name: "Rajput Community",    subtitle: "Legacy of Valor",           image: patnaSahibImg },
  { name: "Paswan Community",    subtitle: "Voices of Change",          image: pawapuriImg   },
];

const CommunitySection = () => {
  return (
    <section id="community" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <CommunityCarousel
          title="Discover Community"
          subtitle="Communities"
          actionLabel="View All Communities"
          actionHref="#community"
        >
          {communities.map((community) => (
            /* Card rendered inline — no motion.div / whileInView / scroll trigger */
            <div
              key={community.name}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-semibold text-lg leading-tight">
                    {community.name}
                  </h3>
                  <p className="text-white/60 text-sm mt-1">{community.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </CommunityCarousel>
      </div>
    </section>
  );
};

export default CommunitySection;
