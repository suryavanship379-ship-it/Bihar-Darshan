import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Award, FileText, CheckCircle2, Clock, Edit3, X, Image as ImageIcon, LogOut } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';

// Mock Posts Data
const mockPosts = [
  // ... (keeping mock data as is up to the component)
  { id: 1, title: "Exploring the Ruins of Nalanda", date: "2023-10-15", status: "posted", image: "/images/culture/rajgir-mahotsav.png", excerpt: "A mesmerizing journey through the ancient university and its profound historical significance." },
  { id: 2, title: "My experience at Sonepur Mela", date: "2023-11-20", status: "posted", image: "/images/culture/sonepur-mela.png", excerpt: "Witnessing the grandeur of Asia's largest cattle fair was an unforgettable cultural immersion." },
  { id: 3, title: "The Art of Madhubani Painting", date: "2024-01-05", status: "under verification", image: "/images/culture/hero-artwork.png", excerpt: "Learning the intricate details and rich storytelling from local artisans in the Mithila region." },
  { id: 4, title: "Tasting Authentic Litti Chokha", date: "2024-02-12", status: "under verification", image: "/images/culture/litti-chokha.png", excerpt: "A culinary adventure in the bustling streets of Patna, savoring the true taste of Bihar." }
];

const PREDEFINED_AVATARS = [
  "/images/culture/avatar-man1.png",
  "/images/culture/avatar-woman1.png",
  "/images/culture/avatar-man2.png",
  "/images/culture/avatar-girl1.png",
  "/images/culture/avatar-boy1.png",
];

const PREDEFINED_BACKGROUNDS = [
  "/images/culture/hero-artwork.png",
  "/images/culture/sonepur-mela.png",
  "/images/culture/sama-chakeva.png",
  "/images/culture/rajgir-mahotsav.png"
];

const Profile = () => {
  const navigate = useNavigate();
  // Check auth status synchronously before rendering 
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const [activeTab, setActiveTab] = useState<'posted' | 'verification'>('posted');

  // Profile State
  const [profile, setProfile] = useState({
    name: "Paras Sawal",
    title: "Cultural Ambassador",
    bio: "Passionate about preserving and promoting the rich cultural heritage of Bihar.",
    avatar: "/images/culture/avatar-man1.png",
    background: "/images/culture/hero-artwork.png",
    rewardPoints: 1250,
    totalPosts: 8,
  });

  // Edit Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);
  const [customAvatarInput, setCustomAvatarInput] = useState("");
  const [isCustomAvatar, setIsCustomAvatar] = useState(false);

  // If not authenticated, instantly redirect them to the login page without rendering the profile page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name}'s Bihar Darshan Profile`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Profile URL copied to clipboard!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const openEditModal = () => {
    setEditForm(profile);
    setIsCustomAvatar(!PREDEFINED_AVATARS.includes(profile.avatar));
    if (!PREDEFINED_AVATARS.includes(profile.avatar)) {
      setCustomAvatarInput(profile.avatar);
    }
    setIsEditing(true);
  };

  const handleSave = () => {
    const finalAvatar = isCustomAvatar && customAvatarInput.trim() !== "" ? customAvatarInput : editForm.avatar;
    setProfile({
      ...profile,
      name: editForm.name,
      title: editForm.title,
      bio: editForm.bio,
      avatar: finalAvatar,
      background: editForm.background
    });
    setIsEditing(false);
  };

  const filteredPosts = mockPosts.filter(p => activeTab === 'posted' ? p.status === 'posted' : p.status === 'under verification');

  return (
    <div className="min-h-screen font-sans bg-[#f7f3e8]">
      <Navbar />

      <div className="pt-24 pb-12 bg-gradient-to-b from-white to-[#f7f3e8]">
        <Container>
          {/* Profile Header Card */}
          <div className="bg-[#fdf9ef] rounded-[2rem] shadow-xl p-8 md:p-12 border-2 border-[#d4a017] relative overflow-hidden">
            {/* Background Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none transition-all duration-500"
              style={{
                backgroundImage: `url("${profile.background}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'sepia(100%) hue-rotate(5deg) saturate(200%)'
              }}>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white ring-4 ring-[#d4a017] shadow-xl overflow-hidden bg-[#fdf9ef] relative z-20 shrink-0">
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left relative z-20">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <svg className="w-6 h-6 text-[#d4a017]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" /></svg>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-[#5c3a21] font-serif">{profile.name}</h1>
                  <svg className="w-6 h-6 text-[#d4a017]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" /></svg>
                </div>
                <p className="text-[#d4a017] uppercase tracking-[0.2em] font-bold text-sm mb-4">{profile.title}</p>
                <p className="text-[#5c3a21] text-sm mb-6 max-w-lg leading-relaxed font-medium">{profile.bio}</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 bg-[#fdf9ef] border border-[#e2d5b8] px-4 py-2 rounded-xl shadow-sm">
                    <FileText className="text-[#5c3a21] w-5 h-5" />
                    <span className="font-bold text-[#5c3a21]">{profile.totalPosts} Posts</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#fdf9ef] border border-[#e2d5b8] px-4 py-2 rounded-xl shadow-sm">
                    <Award className="text-[#d4a017] w-5 h-5" />
                    <span className="font-bold text-[#5c3a21]">{profile.rewardPoints} Reward Points</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={openEditModal}
                  className="bg-white border-2 border-[#5c3a21] text-[#5c3a21] hover:bg-[#fdf9ef] font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm group"
                >
                  <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleShare}
                  className="bg-[#5c3a21] hover:bg-[#4a2e1a] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md group"
                >
                  <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Share</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-700 border-2 border-red-500/30 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm group"
                >
                  <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        {/* Ornate Divider */}
        <div className="w-full pb-8 flex justify-center">
          <img src="/images/culture/ornate-divider.png" alt="" className="h-4 opacity-50" onError={(e) => e.currentTarget.style.display = 'none'} />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#fdf9ef] p-1.5 rounded-full shadow-md border-2 border-[#d4a017] inline-flex relative">
            <button
              onClick={() => setActiveTab('posted')}
              className={`relative z-10 px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-colors duration-300 ${activeTab === 'posted' ? 'text-white' : 'text-[#5c3a21] hover:bg-white/50'}`}
            >
              {activeTab === 'posted' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-[#5c3a21] rounded-full shadow-md z-[-1]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              Posted
            </button>
            <button
              onClick={() => setActiveTab('verification')}
              className={`relative z-10 px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-colors duration-300 ${activeTab === 'verification' ? 'text-white' : 'text-[#5c3a21] hover:bg-white/50'}`}
            >
              {activeTab === 'verification' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-[#5c3a21] rounded-full shadow-md z-[-1]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              Under Verification
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                layout
                key={post.id}
                initial={{ opacity: 0, scale: 0.95, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -50 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-[#e2d5b8] flex flex-col sm:flex-row group"
              >
                <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                    {post.status === 'posted'
                      ? <CheckCircle2 className="w-5 h-5 text-green-600" />
                      : <Clock className="w-5 h-5 text-amber-500" />
                    }
                  </div>
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${post.status === 'posted' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {post.status === 'posted' ? 'Published' : 'Pending'}
                    </span>
                    <span className="text-gray-400 text-xs">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#5c3a21] font-serif mb-3 leading-tight">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full py-12 text-center"
            >
              <p className="text-gray-500 text-lg">No posts found in this category.</p>
            </motion.div>
          )}
        </motion.div>
      </Container>

      <Footer />

      {/* Edit Profile Modal Overlay */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsEditing(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fdf9ef] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative border-4 border-[#e2d5b8] p-8 md:p-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsEditing(false)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/80 hover:bg-white text-[#5c3a21] rounded-full flex items-center justify-center shadow-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-8">
                <Edit3 className="w-8 h-8 text-[#d4a017]" />
                <h2 className="text-3xl font-bold text-[#5c3a21] font-serif">Edit Profile</h2>
              </div>

              <div className="space-y-8">
                {/* Name Input */}
                <div>
                  <label className="block text-[#5c3a21] font-bold uppercase tracking-wider text-sm mb-2">Display Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-white border-2 border-[#e2d5b8] rounded-xl px-4 py-3 text-[#5c3a21] font-bold focus:outline-none focus:border-[#d4a017] transition-colors shadow-sm"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title Input */}
                  <div>
                    <label className="block text-[#5c3a21] font-bold uppercase tracking-wider text-sm mb-2">Title</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full bg-white border-2 border-[#e2d5b8] rounded-xl px-4 py-3 text-[#5c3a21] focus:outline-none focus:border-[#d4a017] transition-colors shadow-sm"
                      placeholder="e.g. Cultural Ambassador"
                    />
                  </div>

                  {/* Bio Input */}
                  <div>
                    <label className="block text-[#5c3a21] font-bold uppercase tracking-wider text-sm mb-2">Short Bio</label>
                    <input
                      type="text"
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      className="w-full bg-white border-2 border-[#e2d5b8] rounded-xl px-4 py-3 text-[#5c3a21] focus:outline-none focus:border-[#d4a017] transition-colors shadow-sm"
                      placeholder="Write a short bio..."
                    />
                  </div>
                </div>

                {/* Avatar Selection */}
                <div>
                  <label className="block text-[#5c3a21] font-bold uppercase tracking-wider text-sm mb-3">Choose Avatar</label>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {PREDEFINED_AVATARS.map((avatar, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setIsCustomAvatar(false);
                          setEditForm({ ...editForm, avatar });
                        }}
                        className={`w-16 h-16 rounded-full overflow-hidden border-4 transition-all duration-300 ${!isCustomAvatar && editForm.avatar === avatar ? 'border-[#d4a017] scale-110 shadow-lg ring-2 ring-[#5c3a21]' : 'border-white shadow-sm opacity-70 hover:opacity-100'}`}
                      >
                        <img src={avatar} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background Selection */}
                <div>
                  <label className="block text-[#5c3a21] font-bold uppercase tracking-wider text-sm mb-3">Cultural Background Overlay</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {PREDEFINED_BACKGROUNDS.map((bg, idx) => (
                      <button
                        key={idx}
                        onClick={() => setEditForm({ ...editForm, background: bg })}
                        className={`h-20 rounded-xl overflow-hidden border-4 transition-all duration-300 relative ${editForm.background === bg ? 'border-[#d4a017] shadow-lg ring-2 ring-[#5c3a21]' : 'border-white shadow-sm opacity-70 hover:opacity-100'}`}
                      >
                        <img src={bg} alt={`Background ${idx}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#5c3a21] mix-blend-color opacity-30"></div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#e2d5b8] flex justify-end gap-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="border-2 border-[#5c3a21] text-[#5c3a21] hover:bg-[#5c3a21] hover:text-white font-bold py-3 px-8 rounded-full tracking-widest uppercase transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-[#d4a017] hover:bg-[#c29112] text-[#5c3a21] font-bold py-3 px-8 rounded-full tracking-widest uppercase transition-colors shadow-lg"
                  >
                    Save Changes
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
