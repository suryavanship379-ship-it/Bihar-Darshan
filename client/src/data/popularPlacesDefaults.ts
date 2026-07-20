import bodhGayaImg from "../assets/bodh-gaya.png";
import nalandaImg from "../assets/nalanda.png";
import rajgirImg from "../assets/rajgir.png";
import vaishaliImg from "../assets/vaishali.png";
import patnaSahibImg from "../assets/patna-sahib.png";
import pawapuriImg from "../assets/pawapuri.png";

export interface PopularPlaceItem {
  id: string;
  name: string;
  district: string;
  image: string;
  description: string;
}

export const defaultPopularPlaces: PopularPlaceItem[] = [
  {
    id: "bodh-gaya",
    name: "Bodh Gaya",
    district: "Gaya District",
    image: bodhGayaImg,
    description:
      "The sacred site where Siddhartha Gautama attained enlightenment under the Bodhi Tree. Home to the magnificent Mahabodhi Temple, a UNESCO World Heritage Site drawing pilgrims from across the globe.",
  },
  {
    id: "nalanda",
    name: "Nalanda",
    district: "Nalanda District",
    image: nalandaImg,
    description:
      "Once the world's greatest centre of learning, Nalanda University flourished from the 5th to 12th century AD. Its sprawling ruins and ancient manuscripts tell the story of a golden era of knowledge.",
  },
  {
    id: "rajgir",
    name: "Rajgir",
    district: "Nalanda District",
    image: rajgirImg,
    description:
      "Nestled among lush green hills, Rajgir was the first capital of the Magadha Empire. Famous for its hot springs, the Vishwa Shanti Stupa, and its deep Buddhist and Jain heritage.",
  },
  {
    id: "vaishali",
    name: "Vaishali",
    district: "Vaishali District",
    image: vaishaliImg,
    description:
      "One of the world's earliest republics and the birthplace of Lord Mahavira. Vaishali's ancient pillars, stupas, and serene excavated sites transport visitors back to a remarkable civilisation.",
  },
  {
    id: "patna-sahib",
    name: "Patna Sahib",
    district: "Patna District",
    image: patnaSahibImg,
    description:
      "The revered birthplace of Guru Gobind Singh Ji, the tenth Sikh Guru. Patna Sahib's golden Gurudwara stands as a beacon of devotion, attracting thousands of Sikh pilgrims every year.",
  },
  {
    id: "pawapuri",
    name: "Pawapuri",
    district: "Nalanda District",
    image: pawapuriImg,
    description:
      "The sacred Jain pilgrimage town where Lord Mahavira attained nirvana. The stunning Jal Mandir, a marble temple set in the middle of a lotus-filled pond, is its most iconic landmark.",
  },
];
