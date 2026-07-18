import { Link } from "react-router-dom";
import { useAdminData } from "../../data/AdminContext";
import CommunityCard from "./CommunityCard";
import Carousel from "../common/Carousel";

const CommunitySection = () => {
  const { communities } = useAdminData();
  const featuredCommunities = communities.slice(0, 5);

  return (
    <section id="community" className="py-16 sm:py-20 lg:py-24 overflow-hidden">
      <Carousel
        title="Discover Community"
        subtitle="Communities"
        actionLabel="View All Communities"
        actionHref="/community"
      >
        {featuredCommunities.map((community, index) => (
          <Link key={community.id} to={`/community?id=${community.id}`} className="block">
            <CommunityCard
              image={community.image || community.bannerImageUrl || ''}
              name={community.name}
              subtitle={community.subtitle || community.shortDescription || ''}
              index={index}
            />
          </Link>
        ))}
      </Carousel>
    </section>
  );
};

export default CommunitySection;
