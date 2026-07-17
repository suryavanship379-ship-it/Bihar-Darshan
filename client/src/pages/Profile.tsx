import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Award, FileText, CheckCircle2, Clock, Edit3, X, LogOut, Users, Shield, Bell, Trophy, Megaphone, Eye, Trash2, XCircle } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import { signOut, onAuthStateChanged, updateProfile, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useEffect } from 'react';

// Mock Posts Data
const mockPosts = [
  { id: 1, title: "Exploring the Ruins of Nalanda", date: "Oct 15, 2023", views: "1.2K Views", category: "Heritage", status: "published", image: "/images/culture/rajgir-mahotsav.png" },
  { id: 2, title: "My Experience at Sonepur Mela", date: "Oct 10, 2023", views: "956 Views", category: "Culture", status: "published", image: "/images/culture/sonepur-mela.png" },
  { id: 3, title: "Ancient Temples of Bodh Gaya", date: "Oct 5, 2023", views: "1.8K Views", category: "Spirituality", status: "published", image: "/images/culture/hero-artwork.png" },
];

const mockNotifications = [
  { id: 1, group: 'Today', type: 'approved', title: 'Post Approved', message: 'Your article "Exploring the Ruins of Nalanda" has been approved and published.', time: '2 hours ago', unread: true },
  { id: 2, group: 'Yesterday', type: 'reward', title: 'Reward Points Earned', message: 'You earned 100 reward points for your contribution.', time: 'Yesterday, 10:30 AM', unread: true },
  { id: 3, group: 'Yesterday', type: 'badge', title: 'Badge Earned', message: 'Congratulations! You earned the "Heritage Explorer" badge.', time: 'Yesterday, 09:15 AM', unread: true },
  { id: 4, group: 'Older', type: 'announcement', title: 'Admin Announcement', message: 'New guidelines for content submission are now updated.', time: '2 days ago', unread: false },
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
  
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthChecking(false);
      if (user) {
        setProfile(prev => ({
          ...prev,
          name: user.displayName || "User",
          avatar: localStorage.getItem('userAvatar') || user.photoURL || prev.avatar
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  const [activeTab, setActiveTab] = useState<'published' | 'pending' | 'rejected'>('published');

  // Profile State
  const [profile, setProfile] = useState(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    return {
      name: "Paras Sawal",
      title: "Cultural Ambassador",
      bio: "Passionate about preserving and promoting the rich cultural heritage of Bihar.",
      avatar: savedAvatar || "/images/culture/avatar-man1.png",
      background: "/images/culture/hero-artwork.png",
      rewardPoints: 1250,
      totalPosts: 8,
      communitiesJoined: 12,
      pendingPosts: 2,
      badgesEarned: 5,
    };
  });

  // Edit Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);
  const [customAvatarInput, setCustomAvatarInput] = useState("");
  const [isCustomAvatar, setIsCustomAvatar] = useState(false);

  // If not authenticated and check is done, instantly redirect them to the login page without rendering the profile page
  if (!authChecking && !currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (authChecking) {
    return <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">Loading...</div>;
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

  const handleLogout = async () => {
    localStorage.removeItem('isAuthenticated');
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout Error", error);
    }
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
    localStorage.setItem('userAvatar', finalAvatar);
    window.dispatchEvent(new Event('userAvatarChanged'));
    setProfile({
      ...profile,
      name: editForm.name,
      title: editForm.title,
      bio: editForm.bio,
      avatar: finalAvatar,
      background: editForm.background
    });
    setIsEditing(false);

    if (currentUser) {
      updateProfile(currentUser, { displayName: editForm.name, photoURL: finalAvatar }).catch(console.error);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[#FDFBF7]">
      <Navbar forceDarkText={true} />
      
      <div className="pt-24 pb-12">
        <Container>
          {/* Top Banner */}
          <div className="bg-[#FFF6E9] rounded-2xl p-8 border border-[#F4A261]/30 relative overflow-hidden mb-6">
             {/* Background pattern overlay */}
             <div 
               className="absolute inset-0 opacity-15 pointer-events-none" 
               style={{ 
                 backgroundImage: `url("${profile.background}")`, 
                 backgroundSize: 'cover', 
                 backgroundPosition: 'center',
                 filter: 'sepia(80%) hue-rotate(5deg) saturate(150%)'
               }}
             ></div>
             
             <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8">
                {/* Avatar */}
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0 ring-2 ring-[#F4A261]/30 bg-white">
                   <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                </div>
                
                {/* User Info */}
                <div className="flex-1 text-center lg:text-left pt-2">
                   <h1 className="font-display font-bold text-4xl lg:text-5xl text-[#8B3E2F] flex items-center justify-center lg:justify-start gap-3 mb-2">
                     <span className="text-[#F4A261] text-3xl">★</span> {profile.name} <span className="text-[#F4A261] text-3xl">★</span>
                   </h1>
                   <p className="text-[#F4A261] uppercase tracking-[0.15em] font-bold text-sm mb-4">{profile.title}</p>
                   <p className="text-gray-700 text-sm mb-6 max-w-xl">{profile.bio}</p>
                   
                   <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                      <div className="flex items-center gap-2 bg-white/70 border border-[#F4A261]/30 px-4 py-2 rounded-lg text-sm text-[#8B3E2F] font-bold shadow-sm">
                        <FileText className="w-4 h-4 text-[#8B3E2F]" /> {profile.totalPosts} Posts
                      </div>
                   </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mt-4 lg:mt-0">
                  <button onClick={openEditModal} className="px-5 py-2.5 bg-white border border-[#8B3E2F]/20 text-[#8B3E2F] rounded-xl flex items-center gap-2 font-bold text-sm hover:bg-gray-50 transition shadow-sm">
                    <Edit3 className="w-4 h-4" /> Edit Profile
                  </button>
                  <button onClick={handleShare} className="px-5 py-2.5 bg-[#8B3E2F] text-white rounded-xl flex items-center gap-2 font-bold text-sm hover:bg-[#7a3528] transition shadow-sm">
                    <Share2 className="w-4 h-4" /> Share Profile
                  </button>
                  <button onClick={handleLogout} className="px-5 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl flex items-center gap-2 font-bold text-sm hover:bg-red-50 transition shadow-sm">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
             </div>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: <Users className="w-6 h-6 text-[#8B3E2F]" />, label: 'Communities Joined', value: profile.communitiesJoined, bg: 'bg-[#FFF3E5]' },
              { icon: <FileText className="w-6 h-6 text-[#D97706]" />, label: 'Published Posts', value: profile.totalPosts, bg: 'bg-[#FEF3C7]' },
              { icon: <Clock className="w-6 h-6 text-[#B45309]" />, label: 'Pending Posts', value: profile.pendingPosts, bg: 'bg-[#FFEDD5]' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
                <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center shrink-0`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="font-bold text-2xl text-gray-800">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-semibold leading-tight mt-0.5">{stat.label.split(' ').map((w,i)=><span key={i} className="block">{w}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Main Content Area */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="space-y-6">
              
              {/* Tabs */}
              <div className="flex flex-wrap border-b border-gray-200">
                <button 
                  onClick={() => setActiveTab('published')}
                  className={`flex-1 min-w-[150px] py-4 flex justify-center items-center gap-2 font-bold text-sm transition ${activeTab === 'published' ? 'border-b-2 border-[#8B3E2F] text-[#8B3E2F]' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <FileText className="w-4 h-4" /> Published Posts
                </button>
                <button 
                  onClick={() => setActiveTab('pending')}
                  className={`flex-1 min-w-[150px] py-4 flex justify-center items-center gap-2 font-bold text-sm transition ${activeTab === 'pending' ? 'border-b-2 border-[#8B3E2F] text-[#8B3E2F]' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <Clock className="w-4 h-4" /> Pending Review
                </button>
                <button 
                  onClick={() => setActiveTab('rejected')}
                  className={`flex-1 min-w-[150px] py-4 flex justify-center items-center gap-2 font-bold text-sm transition ${activeTab === 'rejected' ? 'border-b-2 border-[#8B3E2F] text-[#8B3E2F]' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <XCircle className="w-4 h-4" /> Rejected Posts
                </button>
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 pt-2">
                {activeTab === 'published' && 'Published Posts'}
                {activeTab === 'pending' && 'Pending Posts'}
                {activeTab === 'rejected' && 'Rejected Posts'}
              </h2>
              
              {activeTab === 'published' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {mockPosts.map((post) => (
                      <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-md transition">
                        <div className="h-44 relative overflow-hidden">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                          <div className="absolute bottom-3 left-3 bg-[#FFF6E9] text-[#8B3E2F] text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                            {post.category}
                          </div>
                          <div className="absolute top-3 right-3 bg-green-50 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-200 shadow-sm">
                            Published
                          </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="font-bold text-gray-900 text-[15px] mb-3 leading-snug">{post.title}</h3>
                          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-4 mt-auto font-medium">
                            <span>{post.date}</span>
                            <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {post.views}</span>
                          </div>
                          <div className="flex justify-between border-t border-gray-100 pt-4">
                            <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-xs font-bold transition"><Eye className="w-4 h-4" /> View</button>
                            <button className="flex items-center gap-1.5 text-red-400 hover:text-red-600 text-xs font-bold transition"><Trash2 className="w-4 h-4" /> Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <button className="px-6 py-2.5 border-2 border-[#8B3E2F]/20 text-[#8B3E2F] rounded-full font-bold text-sm hover:bg-[#8B3E2F] hover:text-white transition shadow-sm">
                      View All Published Posts
                    </button>
                  </div>
                </>
              )}
              
              {activeTab === 'pending' && (
                <div className="py-12 text-center">
                  <p className="text-gray-500 font-medium">No pending posts found.</p>
                </div>
              )}
              
              {activeTab === 'rejected' && (
                <div className="py-12 text-center">
                  <p className="text-gray-500 font-medium">No rejected posts found.</p>
                </div>
              )}

            </div>
            
          </div>
        </Container>
      </div>
      
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
              className="bg-[#FCEBD3] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative border-4 border-[#FCEBD3] p-8 md:p-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsEditing(false)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/80 hover:bg-white text-[#8B3E2F] rounded-full flex items-center justify-center shadow-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-8">
                <Edit3 className="w-8 h-8 text-[#F4A261]" />
                <h2 className="text-3xl font-bold text-[#8B3E2F] font-serif">Edit Profile</h2>
              </div>

              <div className="space-y-8">
                {/* Name Input */}
                <div>
                  <label className="block text-[#8B3E2F] font-bold uppercase tracking-wider text-sm mb-2">Display Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-white border-2 border-[#FCEBD3] rounded-xl px-4 py-3 text-[#8B3E2F] font-bold focus:outline-none focus:border-[#F4A261] transition-colors shadow-sm"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title Input */}
                  <div>
                    <label className="block text-[#8B3E2F] font-bold uppercase tracking-wider text-sm mb-2">Title</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full bg-white border-2 border-[#FCEBD3] rounded-xl px-4 py-3 text-[#8B3E2F] focus:outline-none focus:border-[#F4A261] transition-colors shadow-sm"
                      placeholder="e.g. Cultural Ambassador"
                    />
                  </div>

                  {/* Bio Input */}
                  <div>
                    <label className="block text-[#8B3E2F] font-bold uppercase tracking-wider text-sm mb-2">Short Bio</label>
                    <input
                      type="text"
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      className="w-full bg-white border-2 border-[#FCEBD3] rounded-xl px-4 py-3 text-[#8B3E2F] focus:outline-none focus:border-[#F4A261] transition-colors shadow-sm"
                      placeholder="Write a short bio..."
                    />
                  </div>
                </div>

                {/* Avatar Selection */}
                <div>
                  <label className="block text-[#8B3E2F] font-bold uppercase tracking-wider text-sm mb-3">Choose Avatar</label>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {PREDEFINED_AVATARS.map((avatar, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setIsCustomAvatar(false);
                          setEditForm({ ...editForm, avatar });
                        }}
                        className={`w-16 h-16 rounded-full overflow-hidden border-4 transition-all duration-300 ${!isCustomAvatar && editForm.avatar === avatar ? 'border-[#F4A261] scale-110 shadow-lg ring-2 ring-[#8B3E2F]' : 'border-white shadow-sm opacity-70 hover:opacity-100'}`}
                      >
                        <img src={avatar} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background Selection */}
                <div>
                  <label className="block text-[#8B3E2F] font-bold uppercase tracking-wider text-sm mb-3">Cultural Background Overlay</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {PREDEFINED_BACKGROUNDS.map((bg, idx) => (
                      <button
                        key={idx}
                        onClick={() => setEditForm({ ...editForm, background: bg })}
                        className={`h-20 rounded-xl overflow-hidden border-4 transition-all duration-300 relative ${editForm.background === bg ? 'border-[#F4A261] shadow-lg ring-2 ring-[#8B3E2F]' : 'border-white shadow-sm opacity-70 hover:opacity-100'}`}
                      >
                        <img src={bg} alt={`Background ${idx}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#8B3E2F] mix-blend-color opacity-30"></div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#FCEBD3] flex justify-end gap-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="border-2 border-[#8B3E2F] text-[#8B3E2F] hover:bg-[#8B3E2F] hover:text-white font-bold py-3 px-8 rounded-full tracking-widest uppercase transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-[#F4A261] hover:bg-[#F4A261] text-[#8B3E2F] font-bold py-3 px-8 rounded-full tracking-widest uppercase transition-colors shadow-lg"
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
