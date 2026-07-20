export type MediaType = "photo" | "video";

export type GalleryCategory =
  | "Food"
  | "Culture"
  | "Politicians"
  | "Places"
  | "Heritage"
  | "Festivals"
  | "Agriculture"
  | "Art & Craft"
  | "Wildlife"
  | "Community"
  | "Tourism"
  | "Architecture"
  | "Religion";

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
  mediaType: MediaType;
  category: GalleryCategory;
  photographer: string;
  likes: number;
  views: number;
  comments: number;
  uploadDate: string;
  location: string;
  description?: string;
  duration?: string;
  aspectRatio: "square" | "portrait" | "landscape";
  source?: string;
  link?: string;
}

export const galleryCategories: GalleryCategory[] = [
  "Food",
  "Culture",
  "Politicians",
  "Places",
  "Heritage",
  "Festivals",
  "Agriculture",
  "Art & Craft",
  "Wildlife",
  "Community",
  "Tourism",
  "Architecture",
  "Religion",
];

export const galleryData: GalleryItem[] = [];
