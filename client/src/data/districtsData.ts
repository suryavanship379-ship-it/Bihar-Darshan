/**
 * All 38 Bihar districts — names match the GeoJSON property "district".
 * Images use Unsplash-sourced URLs for Indian architecture / temples.
 */

import nalandaImg from "../assets/nalanda.png";
import patnaImg from "../assets/patna-district.png";
import gayaImg from "../assets/gaya-district.png";
import bhagalpurImg from "../assets/bhagalpur-district.png";
import muzaffarpurImg from "../assets/muzaffarpur-district.png";
import darbhangaImg from "../assets/darbhanga-district.png";
import bodhGayaImg from "../assets/bodh-gaya.png";
import vaishaliImg from "../assets/vaishali.png";
import rajgirImg from "../assets/rajgir.png";
import pawapuriImg from "../assets/pawapuri.png";
import patnaMonumentImg from "../assets/bihar-monument.png";
import biharHeritageImg from "../assets/bihar-heritage.png";
import biharTempleImg from "../assets/bihar-temple.png";

import { getDistrictDetail } from './districtDetailsData';
import type { DistrictDetail } from './districtDetailsData';

import patnaSahibImg from "../assets/patna-sahib.png";
import biharMountainsImg from "../assets/bihar-mountains.png";
import biharFolkDanceImg from "../assets/bihar-folk-dance.png";

export interface District extends DistrictDetail {
  id?: string;
  image: string;
}

const localAssets: Record<string, string> = {
  "/src/assets/nalanda.png": nalandaImg,
  "/src/assets/patna-district.png": patnaImg,
  "/src/assets/gaya-district.png": gayaImg,
  "/src/assets/bhagalpur-district.png": bhagalpurImg,
  "/src/assets/muzaffarpur-district.png": muzaffarpurImg,
  "/src/assets/darbhanga-district.png": darbhangaImg,
  "/src/assets/bodh-gaya.png": bodhGayaImg,
  "/src/assets/vaishali.png": vaishaliImg,
  "/src/assets/rajgir.png": rajgirImg,
  "/src/assets/pawapuri.png": pawapuriImg,
  "/src/assets/bihar-monument.png": patnaMonumentImg,
  "/src/assets/bihar-heritage.png": biharHeritageImg,
  "/src/assets/bihar-temple.png": biharTempleImg,
  "/src/assets/patna-sahib.png": patnaSahibImg,
  "/src/assets/bihar-mountains.png": biharMountainsImg,
  "/src/assets/bihar-folk-dance.png": biharFolkDanceImg,
};

export const resolveDistrictImage = (img: string): string => {
  if (!img) return getFallback(0);
  if (localAssets[img]) return localAssets[img];
  const foundKey = Object.keys(localAssets).find(k => k.includes(img) || img.includes(k));
  if (foundKey) return localAssets[foundKey];
  return img;
};

// Cycle through available assets for districts that don't have dedicated images
const fallbackImages = [
  bodhGayaImg,
  vaishaliImg,
  rajgirImg,
  pawapuriImg,
  patnaMonumentImg,
  biharHeritageImg,
  biharTempleImg,
  nalandaImg,
  patnaImg,
  gayaImg,
  bhagalpurImg,
  muzaffarpurImg,
  darbhangaImg,
];

function getFallback(index: number): string {
  return fallbackImages[index % fallbackImages.length];
}

// Map district names to dedicated images (if available)
const dedicatedImages: Record<string, string> = {
  Nalanda: nalandaImg,
  Patna: patnaImg,
  Gaya: gayaImg,
  Bhagalpur: bhagalpurImg,
  Muzaffarpur: muzaffarpurImg,
  Darbhanga: darbhangaImg,
};

const districtNames: string[] = [
  "Araria",
  "Arwal",
  "Aurangabad",
  "Banka",
  "Begusarai",
  "Bhagalpur",
  "Bhojpur",
  "Buxar",
  "Darbhanga",
  "East Champaran",
  "Gaya",
  "Gopalganj",
  "Jamui",
  "Jehanabad",
  "Kaimur (Bhabua)",
  "Katihar",
  "Khagaria",
  "Kishanganj",
  "Lakhisarai",
  "Madhepura",
  "Madhubani",
  "Munger",
  "Muzaffarpur",
  "Nalanda",
  "Nawada",
  "Patna",
  "Purnia",
  "Rohtas",
  "Saharsa",
  "Samastipur",
  "Saran",
  "Sheikhpura",
  "Sheohar",
  "Sitamarhi",
  "Siwan",
  "Supaul",
  "Vaishali",
  "West Champaran",
];

// GeoJSON name → display name mapping for lookup on the map
// Kaimur in GeoJSON = "Kaimur", display name = "Kaimur (Bhabua)"
export const geoNameToDisplayName: Record<string, string> = {
  Kaimur: "Kaimur (Bhabua)",
};

export const displayNameToGeoName: Record<string, string> = {
  "Kaimur (Bhabua)": "Kaimur",
};

let fallbackIdx = 0;
export const allDistricts: District[] = districtNames.map((name) => {
  const baseName = name.includes("(") ? name.split(" (")[0] : name;
  const image = dedicatedImages[baseName] ?? getFallback(fallbackIdx++);
  const details = getDistrictDetail(baseName);
  return {
    ...details,
    name,
    image
  };
});
