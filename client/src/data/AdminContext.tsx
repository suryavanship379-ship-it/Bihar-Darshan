import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CultureItem } from './cultureData';
import type { CultureSection } from '../components/tribals/CulturalHighlightsGrid';
import { cultureData } from './cultureData';
import type { GalleryItem } from './galleryData';
import { galleryData as defaultGalleryItems } from './galleryData';
import type { TourTrip } from './tourismData';
import { featuredTrips } from './tourismData';
import type { Community, Discussion } from './communityData';
import { communities as defaultCommunities, discussions as defaultDiscussions } from './communityData';
import { product as defaultProducts } from './product';
import { tribalArticles } from './tribalArticlesData';
import type { TribalArticle } from './tribalArticlesData';
import { allDistricts } from './districtsData';
import type { District } from './districtsData';
import { staticDistrictDetails } from './districtDetailsData';
import type { DistrictDetail } from './districtDetailsData';

import { personalities as defaultPersonalities } from '../pages/Personalities';
import { tribesList } from '../pages/Tribals';

// ── Tribe type (extracted from Tribals.tsx inline data) ──
export interface TribeItem {
  id: string;
  hindiName: string;
  englishName: string;
  shortDesc: string;
  image: string;
  leftTitle?: string;
  leftDesc?: string;
  rightTitle?: string;
  rightDesc?: string;
  bottomDesc?: string;
  cultureSections?: CultureSection[];
}

// ── Personality type ──
export interface PersonalityItem {
  id: number;
  name: string;
  category: 'Politician' | 'Arts & Cinema' | 'Historical' | 'Literature' | 'Sports';
  district: string;
  description: string;
  imageUrl: string;
  fullBio?: string;
}

// ── Product type ──
export interface ProductItem {
  id: number;
  businessName: string;
  productName: string;
  category: string;
  image: string;
  images: string[];
  description: string;
  address: string;
  website: string;
  mapLink: string;
  contact: string;
  email: string;
}

// ── Site Settings ──
export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  statPlaces: string;
  statDistricts: string;
  statCulturalSites: string;
  statFestivals: string;
  statTourists: string;
  footerAbout: string;
}

const defaultSiteSettings: SiteSettings = {
  heroTitle: "Discover the Soul of",
  heroSubtitle: "Bihar",
  heroDescription: "Ancient ruins, sacred temples, breathtaking landscapes, living festivals, authentic cuisines and stories waiting to be explored through immersive storytelling.",
  heroImage: "",
  statPlaces: "500+",
  statDistricts: "38",
  statCulturalSites: "100+",
  statFestivals: "50+",
  statTourists: "1000+",
  footerAbout: "Bihar Darshan is a digital platform to explore the rich cultural heritage, historical landmarks, and vibrant communities of Bihar.",
};

// ── Storage keys ──
const KEYS = {
  districts: 'admin_districts_v2', // Updated key to flush out old schema data
  districtDetails: 'admin_district_details',
  culture: 'admin_culture',
  tourism: 'admin_tourism',
  gallery: 'admin_gallery',
  communities: 'admin_communities',
  discussions: 'admin_discussions',
  products: 'admin_products',
  tribes: 'admin_tribes_v2',
  tribalArticles: 'admin_tribal_articles',
  personalities: 'admin_personalities_v2',
  siteSettings: 'admin_site_settings',
};

// ── Helper: load from localStorage or return default ──
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error(`Failed to load ${key}:`, e);
  }
  return fallback;
}

function saveToStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed to save ${key}:`, e);
  }
}

// ── Context value type ──
interface AdminContextValue {
  // Data
  districts: District[];
  districtDetails: Record<string, DistrictDetail>;
  culture: CultureItem[];
  tourism: TourTrip[];
  gallery: GalleryItem[];
  communities: Community[];
  discussions: Discussion[];
  products: ProductItem[];
  tribes: TribeItem[];
  tribalArticles: TribalArticle[];
  personalities: PersonalityItem[];
  siteSettings: SiteSettings;

  // CRUD operations (generic pattern)
  updateDistricts: (data: District[]) => void;
  updateDistrictDetails: (data: Record<string, DistrictDetail>) => void;
  updateCulture: (data: CultureItem[]) => void;
  updateTourism: (data: TourTrip[]) => void;
  updateGallery: (data: GalleryItem[]) => void;
  updateCommunities: (data: Community[]) => void;
  updateDiscussions: (data: Discussion[]) => void;
  updateProducts: (data: ProductItem[]) => void;
  updateTribes: (data: TribeItem[]) => void;
  updateTribalArticles: (data: TribalArticle[]) => void;
  updatePersonalities: (data: PersonalityItem[]) => void;
  updateSiteSettings: (data: SiteSettings) => void;

  // Reset
  resetSection: (section: keyof typeof KEYS) => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export const AdminDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [districts, setDistricts] = useState<District[]>(() => loadFromStorage(KEYS.districts, allDistricts));
  const [districtDetails, setDistrictDetails] = useState<Record<string, DistrictDetail>>(() => loadFromStorage(KEYS.districtDetails, staticDistrictDetails));
  const [culture, setCulture] = useState<CultureItem[]>(() => loadFromStorage(KEYS.culture, cultureData));
  const [tourism, setTourism] = useState<TourTrip[]>(() => loadFromStorage(KEYS.tourism, featuredTrips));
  const [gallery, setGallery] = useState<GalleryItem[]>(() => loadFromStorage(KEYS.gallery, defaultGalleryItems));
  const [communitiesState, setCommunitiesState] = useState<Community[]>(() => loadFromStorage(KEYS.communities, defaultCommunities));
  const [discussionsState, setDiscussionsState] = useState<Discussion[]>(() => loadFromStorage(KEYS.discussions, defaultDiscussions));
  const [products, setProducts] = useState<ProductItem[]>(() => loadFromStorage(KEYS.products, defaultProducts as ProductItem[]));
  const [tribes, setTribes] = useState<TribeItem[]>(() => loadFromStorage(KEYS.tribes, tribesList));
  const [tribalArticlesState, setTribalArticlesState] = useState<TribalArticle[]>(() => loadFromStorage(KEYS.tribalArticles, tribalArticles));
  const [personalities, setPersonalities] = useState<PersonalityItem[]>(() => loadFromStorage(KEYS.personalities, defaultPersonalities as unknown as PersonalityItem[]));
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => loadFromStorage(KEYS.siteSettings, defaultSiteSettings));

  // Auto-save on change
  const createUpdater = <T,>(key: string, setter: React.Dispatch<React.SetStateAction<T>>) =>
    useCallback((data: T) => {
      setter(data);
      saveToStorage(key, data);
    }, [key, setter]);

  const updateDistricts = createUpdater(KEYS.districts, setDistricts);
  const updateDistrictDetails = createUpdater(KEYS.districtDetails, setDistrictDetails);
  const updateCulture = createUpdater(KEYS.culture, setCulture);
  const updateTourism = createUpdater(KEYS.tourism, setTourism);
  const updateGallery = createUpdater(KEYS.gallery, setGallery);
  const updateCommunities = createUpdater(KEYS.communities, setCommunitiesState);
  const updateDiscussions = createUpdater(KEYS.discussions, setDiscussionsState);
  const updateProducts = createUpdater(KEYS.products, setProducts);
  const updateTribes = createUpdater(KEYS.tribes, setTribes);
  const updateTribalArticles = createUpdater(KEYS.tribalArticles, setTribalArticlesState);
  const updatePersonalities = createUpdater(KEYS.personalities, setPersonalities);
  const updateSiteSettings = createUpdater(KEYS.siteSettings, setSiteSettings);

  const resetSection = useCallback((section: keyof typeof KEYS) => {
    localStorage.removeItem(KEYS[section]);
    const defaults: Record<string, () => void> = {
      districts: () => setDistricts(allDistricts),
      districtDetails: () => setDistrictDetails(staticDistrictDetails),
      culture: () => setCulture(cultureData),
      tourism: () => setTourism(featuredTrips),
      gallery: () => setGallery(defaultGalleryItems),
      communities: () => setCommunitiesState(defaultCommunities),
      discussions: () => setDiscussionsState(defaultDiscussions),
      products: () => setProducts(defaultProducts as ProductItem[]),
      tribes: () => setTribes(tribesList),
      tribalArticles: () => setTribalArticlesState(tribalArticles),
      personalities: () => setPersonalities(defaultPersonalities as unknown as PersonalityItem[]),
      siteSettings: () => setSiteSettings(defaultSiteSettings),
    };
    defaults[section]?.();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        districts,
        districtDetails,
        culture,
        tourism,
        gallery,
        communities: communitiesState,
        discussions: discussionsState,
        products,
        tribes,
        tribalArticles: tribalArticlesState,
        personalities,
        siteSettings,
        updateDistricts,
        updateDistrictDetails,
        updateCulture,
        updateTourism,
        updateGallery,
        updateCommunities,
        updateDiscussions,
        updateProducts,
        updateTribes,
        updateTribalArticles,
        updatePersonalities,
        updateSiteSettings,
        resetSection,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminData = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdminData must be used within AdminDataProvider');
  return ctx;
};

export { defaultSiteSettings };
