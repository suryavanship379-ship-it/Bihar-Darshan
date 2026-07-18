import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ShareStorySection from '../components/cta/ShareStorySection';
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
import { useContributions } from '../data/ContributionContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { X, Sparkles } from 'lucide-react';


const CommunityPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { communitySubmissions } = useContributions();

  const [pendingApprovalBanner, setPendingApprovalBanner] = useState(() => !!(location.state as any)?.pendingApproval);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryOption>('All Categories');
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const all = [...communities];
    // We cannot access communitySubmissions safely before initialization, 
    // but the next useEffect will handle syncing it.
    return id ? all.find((c) => c.id === id) || null : null;
  });
  const [activeTab, setActiveTab] = useState<DetailTab>('Discussions');
  const [customDiscussions, setCustomDiscussions] = useState<Discussion[]>([]);
  const [dbPosts, setDbPosts] = useState<Discussion[]>([]);
  const [joinedCommunityIds, setJoinedCommunityIds] = useState<string[]>([]);
  const [memberCountAdjustments, setMemberCountAdjustments] = useState<Record<string, number>>({});
  const [dbUserId, setDbUserId] = useState<string | null>(null);

  // Sync user joined community IDs and get DB user ID from backend
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();

          // Get user profile first to get DB user ID
          const profResponse = await fetch('http://localhost:5000/api/v1/users/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const profResult = await profResponse.json();
          if (profResult && profResult.success && profResult.data?.user) {
            setDbUserId(profResult.data.user.id);
          }

          const response = await fetch('http://localhost:5000/api/v1/community/joined/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data && result.data.communityIds) {
              setJoinedCommunityIds(result.data.communityIds);
            }
          }
        } catch (err) {
          console.error("Failed to fetch user joined communities or profile:", err);
        }
      } else {
        setJoinedCommunityIds([]);
        setDbUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleJoinCommunity = async (id: string) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login to join this community.");
      navigate('/login');
      return;
    }

    const isCurrentlyJoined = joinedCommunityIds.includes(id);
    const action = isCurrentlyJoined ? 'leave' : 'join';

    try {
      const token = await user.getIdToken();
      const response = await fetch(`http://localhost:5000/api/v1/community/${id}/${action}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} community`);
      }

      setJoinedCommunityIds(prev =>
        isCurrentlyJoined ? prev.filter(cId => cId !== id) : [...prev, id]
      );
      setMemberCountAdjustments(prev => ({
        ...prev,
        [id]: (prev[id] || 0) + (isCurrentlyJoined ? -1 : 1),
      }));
    } catch (err: any) {
      console.error(err);
      alert(err.message || `Failed to ${action} community`);
    }
  };

  // Parse a member count string like '12.5K', '9.8K', '1.2M' or plain number → integer
  const parseMemberCount = (val: string | number): number => {
    if (typeof val === 'number') return val;
    const str = String(val).trim().toUpperCase();
    const num = parseFloat(str);
    if (str.endsWith('K')) return Math.round(num * 1000);
    if (str.endsWith('M')) return Math.round(num * 1_000_000);
    return parseInt(str.replace(/[^0-9]/g, ''), 10) || 1;
  };

  // Format integer back to a readable string
  const formatMemberCount = (n: number): string | number => {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 10_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return n;
  };

  // Returns a community object with its member count adjusted for join/leave
  const withAdjustedMembers = (community: Community): Community => {
    const adj = memberCountAdjustments[community.id] || 0;
    const initialCount = community.membersCount !== undefined
      ? community.membersCount
      : parseMemberCount(community.members || '0');
    const adjusted = initialCount + adj;
    return { ...community, members: formatMemberCount(Math.max(0, adjusted)) };
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Scroll to top when entering / leaving detail view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCommunity]);

  // Fetch posts from DB when a community is selected (public — no auth needed)
  useEffect(() => {
    if (!selectedCommunity) {
      setDbPosts([]);
      setCustomDiscussions([]);
      return;
    }
    fetch(`http://localhost:5000/api/v1/community/${selectedCommunity.id}/posts`)
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data?.posts) {
          const mapped: Discussion[] = result.data.posts.map((p: any) => ({
            id: p.id,
            communityId: p.communityId,
            title: p.title,
            content: p.content || '',
            author: p.author?.name || 'Anonymous',
            authorAvatar: (p.author?.name || 'A').slice(0, 2).toUpperCase(),
            timeAgo: new Date(p.createdAt).toLocaleDateString(),
            views: String(p.views ?? 0),
            replies: p.replies ?? 0,
            tag: 'Destinations' as const,
            tagColor: 'bg-blue-100 text-blue-700',
            mediaUrl: p.mediaUrl,
            mediaType: p.mediaType ? p.mediaType.toLowerCase() : undefined,
            likes: p.likes ?? 0,
            poll: p.pollData || undefined,
          }));
          setDbPosts(mapped);
          setCustomDiscussions([]);
        }
      })
      .catch(err => console.error('Failed to fetch posts:', err));
  }, [selectedCommunity]);

  // Synchronize state with URL search param "?id="
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      const allCommunities = [...communitySubmissions, ...communities];
      const found = allCommunities.find((c) => c.id === id);
      setSelectedCommunity(found || null);
    } else {
      setSelectedCommunity(null);
    }
  }, [location.search, communitySubmissions]);

  // Filter communities
  const filteredCommunities = useMemo(() => {
    let result = [...communitySubmissions, ...communities];

    // Filter by approval status: only show APPROVED or those pending approval created by current user
    result = result.filter((c) => {
      if (!c.status || c.status === 'APPROVED') return true;
      if (c.status === 'PENDING' && dbUserId && c.createdBy === dbUserId) return true;
      return false;
    });

    if (activeCategory !== 'All Categories') {
      result = result.filter((c) => c.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          (c.name || '').toLowerCase().includes(q) ||
          (c.description || c.shortDescription || '').toLowerCase().includes(q) ||
          (c.category || '').toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery, communitySubmissions, dbUserId]);

  // Discussions for the selected community — DB posts take priority, mock data only as fallback
  const communityDiscussions = useMemo(() => {
    if (!selectedCommunity) return [];
    if (dbPosts.length > 0) {
      // If we have DB posts, show them plus any local optimistic posts not yet in DB
      const dbIds = new Set(dbPosts.map(p => p.id));
      const optimistic = customDiscussions.filter(d => !dbIds.has(d.id));
      return [...optimistic, ...dbPosts];
    }
    // Fallback to mock data if no DB posts yet
    const mockFiltered = discussions.filter(d => d.communityId === selectedCommunity.id);
    return [...customDiscussions, ...mockFiltered];
  }, [selectedCommunity, customDiscussions, dbPosts]);

  // Fetch (or re-fetch) posts for the current community from the DB
  const refreshPosts = async (communityId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/community/${communityId}/posts`);
      const result = await res.json();
      if (result.success && result.data?.posts) {
        const mapped: Discussion[] = result.data.posts.map((p: any) => ({
          id: p.id,
          communityId: p.communityId,
          title: p.title,
          content: p.content || '',
          author: p.author?.name || 'Anonymous',
          authorAvatar: (p.author?.name || 'A').slice(0, 2).toUpperCase(),
          timeAgo: new Date(p.createdAt).toLocaleDateString(),
          views: String(p.views ?? 0),
          replies: p.replies ?? 0,
          tag: 'Destinations' as const,
          tagColor: 'bg-blue-100 text-blue-700',
          mediaUrl: p.mediaUrl,
          mediaType: p.mediaType ? p.mediaType.toLowerCase() : undefined,
          likes: p.likes ?? 0,
          poll: p.pollData || undefined,
        }));
        setDbPosts(mapped);
        setCustomDiscussions([]); // clear optimistic state once DB is synced
      }
    } catch (err) {
      console.error('Failed to refresh posts:', err);
    }
  };

  const handlePost = async (newPost: Omit<Discussion, 'id' | 'author' | 'authorAvatar' | 'timeAgo' | 'views' | 'replies' | 'communityId'>) => {
    if (!selectedCommunity) return;
    const user = auth.currentUser;

    if (user) {
      try {
        const token = await user.getIdToken();
        const bodyData = {
          title: newPost.title,
          content: newPost.content,
          communityId: selectedCommunity.id,
          mediaUrl: newPost.mediaUrl,
          mediaType: newPost.mediaType,
          pollData: newPost.poll,
        };
        const response = await fetch('http://localhost:5000/api/v1/community/posts', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyData)
        });
        if (response.ok) {
          // Re-fetch all posts from DB so every user (including this one) sees the latest
          await refreshPosts(selectedCommunity.id);
          return;
        } else {
          const err = await response.json();
          console.error('Post API error:', err);
          alert(err.message || 'Failed to publish post. Please check details and try again.');
          return;
        }
      } catch (err: any) {
        console.error('Failed to save post to DB:', err);
        alert(err.message || 'Network error: could not connect to server.');
        return;
      }
    }

    // Fallback: add locally only if not logged in or API completely failed
    const post: Discussion = {
      ...newPost,
      id: `local_${Date.now()}`,
      communityId: selectedCommunity.id,
      author: 'You',
      authorAvatar: 'YO',
      timeAgo: 'Just now',
      views: '0 views',
      replies: 0,
    };
    setCustomDiscussions(prev => [post, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] selection:bg-brand-gold selection:text-brand-dark font-sans relative overflow-hidden">
      <AnimatePresence mode="wait">
        {selectedCommunity ? (
          <motion.div
            key="detail-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full min-h-screen flex flex-col justify-between"
          >
            <div>
              <Navbar forceDarkText={true} />
              <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                <CommunityDetailHeader
                  community={selectedCommunity}
                  onBack={() => {
                    setSelectedCommunity(null);
                    navigate('/community');
                  }}
                  isJoined={joinedCommunityIds.includes(selectedCommunity.id)}
                  onJoinClick={() => toggleJoinCommunity(selectedCommunity.id)}
                />

                <div className="mt-4">
                  <CommunityDetailTabs active={activeTab} onChange={setActiveTab} />
                </div>

                {activeTab === 'Discussions' && (
                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-5">
                    <div className="flex flex-col gap-4 min-w-0">
                      {joinedCommunityIds.includes(selectedCommunity.id) && (
                        <DiscussionComposer onPost={handlePost} />
                      )}
                      <DiscussionFeed discussions={communityDiscussions} />
                    </div>

                    <CommunitySidebar
                      community={withAdjustedMembers(selectedCommunity)}
                      contributors={contributors}
                      onViewGuidelines={() => setActiveTab('About')}
                      isJoined={joinedCommunityIds.includes(selectedCommunity.id)}
                      onJoinClick={() => toggleJoinCommunity(selectedCommunity.id)}
                    />
                  </div>
                )}

                {activeTab === 'Media' && (
                  <div className="mt-4">
                    <TabMedia community={selectedCommunity} discussions={communityDiscussions} />
                  </div>
                )}

                {activeTab === 'About' && (
                  <div className="mt-4 max-w-4xl mx-auto">
                    <TabAbout community={selectedCommunity} />
                  </div>
                )}
              </main>
            </div>
            <ShareStorySection />
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="listing-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full min-h-screen flex flex-col justify-between"
          >
            <div>
              <Navbar />
              <CommunityHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
              <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {pendingApprovalBanner && (
                  <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-brand-gold/30 text-amber-900 shadow-sm relative overflow-hidden animate-slide-in">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-brand-gold/15 rounded-xl text-brand-gold shrink-0">
                        <Sparkles size={20} className="stroke-[2.5]" />
                      </div>
                      <div className="flex-1 pr-6">
                        <h4 className="font-bold text-sm text-gray-900 leading-snug">Community Submission Received!</h4>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          Your community has been created and sent to our administrators for verification. Once approved, it will be published and visible to the public. Thank you for contributing to Bihar Darshan!
                        </p>
                      </div>
                      <button
                        onClick={() => setPendingApprovalBanner(false)}
                        className="absolute top-4 right-4 p-1.5 hover:bg-black/5 rounded-lg text-gray-400 hover:text-gray-600 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Explore Communities</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Join a community that matches your interest</p>
                  </div>
                  <button
                    onClick={() => navigate('/community/create')}
                    className="px-5 py-2.5 bg-brand-gold text-brand-dark font-semibold rounded-full shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  >
                    + Create Community
                  </button>
                </div>

                <div className="mb-6 mt-4">
                  <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
                </div>

                {filteredCommunities.length === 0 ? (
                  <div className="py-20 text-center text-gray-400 text-sm">
                    No communities found matching your search.
                  </div>
                ) : (
                  <CommunityGrid
                    communities={filteredCommunities}
                    onSelect={(community) => {
                      navigate(`/community?id=${community.id}`);
                    }}
                  />
                )}
              </main>
            </div>
            <ShareStorySection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] mix-blend-multiply">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
      </div>
    </div>
  );
};

export default CommunityPage;

