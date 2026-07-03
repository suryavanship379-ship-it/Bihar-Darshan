import { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CommunityHero from '../components/community/CommunityHero';
import CategoryFilter from '../components/community/CategoryFilter';
import type { CategoryOption } from '../components/community/CategoryFilter';
import CommunityGrid from '../components/community/CommunityGrid';
import CommunityDetailHeader from '../components/community/CommunityDetailHeader';
import CommunityDetailTabs from '../components/community/CommunityDetailTabs';
import type { DetailTab } from '../components/community/CommunityDetailTabs';
import DiscussionComposer from '../components/community/DiscussionComposer';
import DiscussionFeed from '../components/community/DiscussionFeed';
import CommunitySidebar from '../components/community/CommunitySidebar';
// import { TabMedia, TabAbout } from '../components/community/CommunityTabContents';
import {
  TabMedia,
  TabAbout,
  TabMembers,
  TabGuides,
} from '../components/community/CommunityTabContents';
import {
  communities,
  discussions,
  contributors,
} from '../data/communityData';
import type { Community, Discussion } from '../data/communityData';

const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryOption>('All Categories');
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [activeTab, setActiveTab] = useState<DetailTab>('Discussions');
  const [customDiscussions, setCustomDiscussions] = useState<Discussion[]>([]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Scroll to top when entering / leaving detail view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCommunity]);

  // Filter communities
  const filteredCommunities = useMemo(() => {
    let result = [...communities];

    if (activeCategory !== 'All Categories') {
      result = result.filter((c) => c.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  // Discussions for the selected community
  const communityDiscussions = useMemo(() => {
    if (!selectedCommunity) return [];
    const allDiscussions = [...customDiscussions, ...discussions];
    return allDiscussions.filter((d) => d.communityId === selectedCommunity.id);
  }, [selectedCommunity, customDiscussions]);

  const handlePost = (newPost: Omit<Discussion, 'id' | 'author' | 'authorAvatar' | 'timeAgo' | 'views' | 'replies' | 'communityId'>) => {
    if (!selectedCommunity) return;
    const post: Discussion = {
      ...newPost,
      id: `custom_${Date.now()}`,
      communityId: selectedCommunity.id,
      author: 'You',
      authorAvatar: 'YOU',
      timeAgo: 'Just now',
      views: '0 views',
      replies: 0,
    };
    setCustomDiscussions([post, ...customDiscussions]);
  };

  // ── Detail View ────────────────────────────────────────────────────────────
  if (selectedCommunity) {
    return (
      <div className="min-h-screen bg-[#F8F5EF] selection:bg-brand-gold selection:text-brand-dark font-sans">
        <Navbar forceDarkText={true} />

        <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Header (Back link + Banner) */}
          <CommunityDetailHeader
            community={selectedCommunity}
            onBack={() => setSelectedCommunity(null)}
          />

          {/* Tab bar */}
          <div className="mt-4">
            <CommunityDetailTabs active={activeTab} onChange={setActiveTab} />
          </div>

          {/* Main body: feed + sidebar */}
          {activeTab === 'Discussions' && (
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-5">
              {/* Left: composer + feed */}
              <div className="flex flex-col gap-4 min-w-0">
                <DiscussionComposer 
                  onPost={handlePost} 
                />
                <DiscussionFeed 
                  discussions={communityDiscussions} 
                />
              </div>

              {/* Right: sidebar */}
              <CommunitySidebar
                community={selectedCommunity}
                contributors={contributors}
                onViewGuidelines={() => setActiveTab('About')}
              />
            </div>
          )}

          {/* {activeTab === 'Members' && (
            <div className="mt-4">
              <TabMembers contributors={contributors} />
            </div>
          )} */}

          {activeTab === 'Media' && (
            <div className="mt-4">
              <TabMedia />
            </div>
          )}

          {/* {activeTab === 'Guides' && (
            <div className="mt-4">
              <TabGuides />
            </div>
          )} */}


          {activeTab === 'About' && (
            <div className="mt-4 max-w-4xl mx-auto">
              <TabAbout community={selectedCommunity} />
            </div>
          )}
        </main>

        <Footer />

        {/* Global Aesthetics Overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] mix-blend-multiply">
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
        </div>
      </div>
    );
  }

  // ── Listing View ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8F5EF] selection:bg-brand-gold selection:text-brand-dark font-sans">
      <Navbar />

      {/* Hero + Search */}
      <CommunityHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Explore Communities section */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Section header */}
        <div className="flex items-end justify-between mb-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Explore Communities</h2>
            <p className="text-sm text-gray-500 mt-0.5">Join a community that matches your interest</p>
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-6 mt-4">
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>

        {/* Community grid */}
        {filteredCommunities.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-sm">
            No communities found matching your search.
          </div>
        ) : (
          <CommunityGrid
            communities={filteredCommunities}
            onSelect={(community) => {
              setSelectedCommunity(community);
              setActiveTab('Discussions');
            }}
          />
        )}
      </main>

      <Footer />

      {/* Global Aesthetics Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] mix-blend-multiply">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
      </div>
    </div>
  );
};

export default CommunityPage;
