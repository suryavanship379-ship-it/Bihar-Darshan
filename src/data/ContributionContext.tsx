import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CultureItem } from './cultureData';
import type { GalleryItem } from './galleryData';

export interface PersonalityItem {
  id: number;
  name: string;
  category: 'Politician' | 'Arts & Cinema' | 'Historical' | 'Literature' | 'Sports';
  district: string;
  description: string;
  imageUrl: string;
  author: string;
}

export interface JourneySubmissionItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  duration: string;
}

interface ContributionContextValue {
  cultureSubmissions: CultureItem[];
  gallerySubmissions: GalleryItem[];
  personalitySubmissions: PersonalityItem[];
  journeySubmissions: JourneySubmissionItem[];
  addCultureSubmission: (submission: Omit<CultureItem, 'id' | 'featured'>) => void;
  addGallerySubmission: (submission: Omit<GalleryItem, 'id' | 'likes' | 'views' | 'comments' | 'uploadDate'>) => void;
  addPersonalitySubmission: (submission: Omit<PersonalityItem, 'id'>) => void;
  addJourneySubmission: (submission: Omit<JourneySubmissionItem, 'id'>) => void;
}

const ContributionContext = createContext<ContributionContextValue>({
  cultureSubmissions: [],
  gallerySubmissions: [],
  personalitySubmissions: [],
  journeySubmissions: [],
  addCultureSubmission: () => {},
  addGallerySubmission: () => {},
  addPersonalitySubmission: () => {},
  addJourneySubmission: () => {},
});

export const ContributionProvider = ({ children }: { children: React.ReactNode }) => {
  const [cultureSubmissions, setCultureSubmissions] = useState<CultureItem[]>([]);
  const [gallerySubmissions, setGallerySubmissions] = useState<GalleryItem[]>([]);
  const [personalitySubmissions, setPersonalitySubmissions] = useState<PersonalityItem[]>([]);
  const [journeySubmissions, setJourneySubmissions] = useState<JourneySubmissionItem[]>([]);

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
    } catch (error) {
      console.error('Failed to load contributions from localStorage:', error);
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

  return (
    <ContributionContext.Provider
      value={{
        cultureSubmissions,
        gallerySubmissions,
        personalitySubmissions,
        journeySubmissions,
        addCultureSubmission,
        addGallerySubmission,
        addPersonalitySubmission,
        addJourneySubmission,
      }}
    >
      {children}
    </ContributionContext.Provider>
  );
};

export const useContributions = () => useContext(ContributionContext);
