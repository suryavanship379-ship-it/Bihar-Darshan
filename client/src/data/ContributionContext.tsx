import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CultureItem } from './cultureData';
import type { GalleryItem } from './galleryData';
import type { TourTrip } from './tourismData';

export interface PersonalityItem {
  id: number;
  name: string;
  category: 'Politician' | 'Arts & Cinema' | 'Historical' | 'Literature' | 'Sports';
  district: string;
  description: string;
  imageUrl: string;
  author: string;
}

export interface JourneySubmissionItem extends TourTrip {
  desc: string;
}

import type { Community } from './communityData';
import { auth } from '../lib/firebase';

export interface ProductItem {
  id: number;
  businessName: string;
  productName: string;
  category: string;
  image: string;
  images: string[];
  description: string;
  address?: string;
  website?: string;
  mapLink?: string;
  contact?: string;
  email?: string;
}

interface ContributionContextValue {
  cultureSubmissions: CultureItem[];
  gallerySubmissions: GalleryItem[];
  personalitySubmissions: PersonalityItem[];
  journeySubmissions: JourneySubmissionItem[];
  communitySubmissions: Community[];
  productSubmissions: ProductItem[];
  addCultureSubmission: (submission: Omit<CultureItem, 'id' | 'featured'>) => void;
  addGallerySubmission: (submission: Omit<GalleryItem, 'id' | 'likes' | 'views' | 'comments' | 'uploadDate'>) => void;
  addPersonalitySubmission: (submission: Omit<PersonalityItem, 'id'>) => void;
  addJourneySubmission: (submission: Omit<JourneySubmissionItem, 'id'>) => void;
  addCommunitySubmission: (submission: Omit<Community, 'id' | 'members' | 'posts' | 'online' | 'verified' | 'createdOn'>) => void;
  addProductSubmission: (submission: Omit<ProductItem, 'id'>) => void;
}

const ContributionContext = createContext<ContributionContextValue>({
  cultureSubmissions: [],
  gallerySubmissions: [],
  personalitySubmissions: [],
  journeySubmissions: [],
  communitySubmissions: [],
  productSubmissions: [],
  addCultureSubmission: () => { },
  addGallerySubmission: () => { },
  addPersonalitySubmission: () => { },
  addJourneySubmission: () => { },
  addCommunitySubmission: () => { },
  addProductSubmission: () => { },
});

export const ContributionProvider = ({ children }: { children: React.ReactNode }) => {
  const [cultureSubmissions, setCultureSubmissions] = useState<CultureItem[]>([]);
  const [gallerySubmissions, setGallerySubmissions] = useState<GalleryItem[]>([]);
  const [personalitySubmissions, setPersonalitySubmissions] = useState<PersonalityItem[]>([]);
  const [journeySubmissions, setJourneySubmissions] = useState<JourneySubmissionItem[]>([]);
  const [communitySubmissions, setCommunitySubmissions] = useState<Community[]>([]);
  const [productSubmissions, setProductSubmissions] = useState<ProductItem[]>([]);

  // Load submissions from localStorage on mount
  useEffect(() => {
    try {
      const storedCulture = localStorage.getItem('bihar_culture_submissions');
      if (storedCulture) setCultureSubmissions(JSON.parse(storedCulture));

      const storedGallery = localStorage.getItem('bihar_gallery_submissions');
      if (storedGallery) setGallerySubmissions(JSON.parse(storedGallery));

      const storedPersonality = localStorage.getItem('bihar_personality_submissions');
      if (storedPersonality) setPersonalitySubmissions(JSON.parse(storedPersonality));

      const storedJourneys = localStorage.getItem('bihar_journey_submissions');
      if (storedJourneys) setJourneySubmissions(JSON.parse(storedJourneys));

      const storedCommunities = localStorage.getItem('bihar_community_submissions');
      if (storedCommunities) setCommunitySubmissions(JSON.parse(storedCommunities));

      const storedProducts = localStorage.getItem('bihar_product_submissions');
      if (storedProducts) setProductSubmissions(JSON.parse(storedProducts));

      // Clear old local storage to prevent conflicts with the new API
      localStorage.removeItem('bihar_community_submissions');

      // Fetch communities from backend
      fetch('http://localhost:5000/api/v1/community')
        .then(res => res.json())
        .then(result => {
          if (result.success && result.data && result.data.communities) {
            setCommunitySubmissions(result.data.communities);
          }
        })
        .catch(err => console.error('Failed to fetch communities:', err));
    } catch (error) {
      console.error('Failed to load contributions:', error);
    }
  }, []);

  // Save to localStorage when submissions change
  const addCultureSubmission = useCallback((submission: Omit<CultureItem, 'id' | 'featured'>) => {
    setCultureSubmissions((prev) => {
      const newItem: CultureItem = {
        ...submission,
        id: Date.now(),
        featured: false,
      };
      const updated = [newItem, ...prev];
      try {
        localStorage.setItem('bihar_culture_submissions', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save:', error);
      }
      return updated;
    });
  }, []);

  const addGallerySubmission = useCallback((submission: Omit<GalleryItem, 'id' | 'likes' | 'views' | 'comments' | 'uploadDate'>) => {
    setGallerySubmissions((prev) => {
      const newItem: GalleryItem = {
        ...submission,
        id: Date.now(),
        likes: Math.floor(Math.random() * 50) + 10,
        views: Math.floor(Math.random() * 200) + 100,
        comments: Math.floor(Math.random() * 10),
        uploadDate: new Date().toISOString().split('T')[0],
      };
      const updated = [newItem, ...prev];
      try {
        localStorage.setItem('bihar_gallery_submissions', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save:', error);
      }
      return updated;
    });
  }, []);

  const addPersonalitySubmission = useCallback((submission: Omit<PersonalityItem, 'id'>) => {
    setPersonalitySubmissions((prev) => {
      const newItem: PersonalityItem = {
        ...submission,
        id: Date.now(),
      };
      const updated = [newItem, ...prev];
      try {
        localStorage.setItem('bihar_personality_submissions', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save:', error);
      }
      return updated;
    });
  }, []);

  const addJourneySubmission = useCallback((submission: Omit<JourneySubmissionItem, 'id'>) => {
    setJourneySubmissions((prev) => {
      const newItem: JourneySubmissionItem = {
        ...submission,
        id: Date.now().toString(),
      };
      const updated = [newItem, ...prev];
      try {
        localStorage.setItem('bihar_journey_submissions', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save:', error);
      }
      return updated;
    });
  }, []);

  const addCommunitySubmission = useCallback(async (submission: Omit<Community, 'id' | 'members' | 'posts' | 'online' | 'verified' | 'createdOn'>) => {
    try {
      const user = auth.currentUser;
      const token = user ? await user.getIdToken() : '';
      const response = await fetch('http://localhost:5000/api/v1/community', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: submission.name,
          category: submission.category,
          shortDescription: submission.shortDescription,
          description: submission.description,
          bannerImageUrl: submission.bannerImageUrl,
          logoImageUrl: submission.logoImageUrl,
          rules: submission.rules
        })
      });
      if (!response.ok) {
        throw new Error(`Failed to create community: ${await response.text()}`);
      }
      const result = await response.json();
      setCommunitySubmissions((prev) => [result.data.community, ...prev]);
    } catch (error) {
      console.error('Failed to save to backend:', error);
      throw error;
    }
  }, []);

  const addProductSubmission = useCallback((submission: Omit<ProductItem, 'id'>) => {
    setProductSubmissions((prev) => {
      const newItem: ProductItem = {
        ...submission,
        id: Date.now(),
      };
      const updated = [newItem, ...prev];
      try {
        localStorage.setItem('bihar_product_submissions', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save:', error);
      }
      return updated;
    });
  }, []);

  return (
    <ContributionContext.Provider
      value={{
        cultureSubmissions,
        gallerySubmissions,
        personalitySubmissions,
        journeySubmissions,
        communitySubmissions,
        productSubmissions,
        addCultureSubmission,
        addGallerySubmission,
        addPersonalitySubmission,
        addJourneySubmission,
        addCommunitySubmission,
        addProductSubmission,
      }}
    >
      {children}
    </ContributionContext.Provider>
  );
};

export const useContributions = () => useContext(ContributionContext);
