import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { db, storage } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  ArrowLeft,
  Users,
  Plus,
  X,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Image as ImageIcon,
  Loader2,
  Clock,
  MoreVertical,
} from "lucide-react";

interface CommunityData {
  id: string;
  name: string;
  description: string;
  bannerImage: string;
  iconImage: string;
  createdBy: string;
  creatorName: string;
  status: string;
  memberCount: number;
  members?: string[];
}

interface PostData {
  id: string;
  communityId: string;
  communityName: string;
  title: string;
  body: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  likes: number;
  dislikes: number;
  shares: number;
  likedBy: string[];
  dislikedBy: string[];
  createdAt: { seconds: number } | null;
}

const CommunityFeed = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [community, setCommunity] = useState<CommunityData | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Post form state
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postImage, setPostImage] = useState<File | null>(null);
  const [postImagePreview, setPostImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCommunity();
      fetchPosts();
    }
  }, [id]);

  const fetchCommunity = async () => {
    try {
      const docSnap = await getDoc(doc(db, "communityGroups", id!));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCommunity({ id: docSnap.id, members: [], ...data } as unknown as CommunityData);
      }
    } catch (err) {
      console.error("Error fetching community:", err);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "communityPosts"),
        where("communityId", "==", id)
      );
      const snap = await getDocs(q);
      const list: PostData[] = [];
      snap.forEach((d) => {
        const data = d.data();
        list.push({
          id: d.id,
          communityId: data.communityId || "",
          communityName: data.communityName || "",
          title: data.title || "",
          body: data.body || "",
          imageUrl: data.imageUrl || "",
          authorId: data.authorId || "",
          authorName: data.authorName || "Anonymous",
          authorPhoto: data.authorPhoto || "",
          likes: data.likes || 0,
          dislikes: data.dislikes || 0,
          shares: data.shares || 0,
          likedBy: data.likedBy || [],
          dislikedBy: data.dislikedBy || [],
          createdAt: data.createdAt || null,
        });
      });
      
      // Sort locally to avoid needing a Firestore composite index
      list.sort((a, b) => {
        const timeA = (a.createdAt as any)?.seconds || 0;
        const timeB = (b.createdAt as any)?.seconds || 0;
        return timeB - timeA;
      });
      
      setPosts(list);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleJoin = async () => {
    if (!currentUser || !community) {
      navigate("/login");
      return;
    }
    const communityRef = doc(db, "communityGroups", community.id);
    const isJoined = community.members?.includes(currentUser.uid);

    try {
      if (isJoined) {
        await updateDoc(communityRef, {
          members: arrayRemove(currentUser.uid),
          memberCount: community.memberCount - 1,
        });
        setCommunity({
          ...community,
          members: (community.members || []).filter(uid => uid !== currentUser.uid),
          memberCount: Math.max(0, community.memberCount - 1),
        });
      } else {
        await updateDoc(communityRef, {
          members: arrayUnion(currentUser.uid),
          memberCount: community.memberCount + 1,
        });
        setCommunity({
          ...community,
          members: [...(community.members || []), currentUser.uid],
          memberCount: community.memberCount + 1,
        });
      }
    } catch (err) {
      console.error("Error toggling join status:", err);
    }
  };

  const handlePostImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPostImage(file);
      setPostImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreatePost = async () => {
    if (!currentUser || !postTitle.trim() || !community) return;
    setSubmitting(true);
    try {
      let imageUrl = "";
      if (postImage) {
        const imgRef = ref(storage, `community-posts/${Date.now()}_${postImage.name}`);
        await uploadBytes(imgRef, postImage);
        imageUrl = await getDownloadURL(imgRef);
      }

      await addDoc(collection(db, "communityPosts"), {
        communityId: id,
        communityName: community.name,
        title: postTitle.trim(),
        body: postBody.trim(),
        imageUrl,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || "Anonymous",
        authorPhoto: currentUser.photoURL || "",
        likes: 0,
        dislikes: 0,
        shares: 0,
        likedBy: [],
        dislikedBy: [],
        createdAt: serverTimestamp(),
      });

      setShowCreatePost(false);
      setPostTitle("");
      setPostBody("");
      setPostImage(null);
      setPostImagePreview("");
      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (post: PostData) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const postRef = doc(db, "communityPosts", post.id);
    const alreadyLiked = post.likedBy.includes(currentUser.uid);
    const alreadyDisliked = post.dislikedBy.includes(currentUser.uid);

    try {
      if (alreadyLiked) {
        await updateDoc(postRef, {
          likes: post.likes - 1,
          likedBy: arrayRemove(currentUser.uid),
        });
      } else {
        const updates: Record<string, unknown> = {
          likes: post.likes + 1,
          likedBy: arrayUnion(currentUser.uid),
        };
        if (alreadyDisliked) {
          updates.dislikes = post.dislikes - 1;
          updates.dislikedBy = arrayRemove(currentUser.uid);
        }
        await updateDoc(postRef, updates);
      }
      fetchPosts();
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleDislike = async (post: PostData) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const postRef = doc(db, "communityPosts", post.id);
    const alreadyDisliked = post.dislikedBy.includes(currentUser.uid);
    const alreadyLiked = post.likedBy.includes(currentUser.uid);

    try {
      if (alreadyDisliked) {
        await updateDoc(postRef, {
          dislikes: post.dislikes - 1,
          dislikedBy: arrayRemove(currentUser.uid),
        });
      } else {
        const updates: Record<string, unknown> = {
          dislikes: post.dislikes + 1,
          dislikedBy: arrayUnion(currentUser.uid),
        };
        if (alreadyLiked) {
          updates.likes = post.likes - 1;
          updates.likedBy = arrayRemove(currentUser.uid);
        }
        await updateDoc(postRef, updates);
      }
      fetchPosts();
    } catch (err) {
      console.error("Error disliking post:", err);
    }
  };

  const handleShare = async (post: PostData) => {
    const url = `${window.location.origin}/community/${id}`;
    const text = `${post.title} — in ${community?.name || "a community"} on Bihar Darshan`;

    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, text, url });
      } else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        alert("Link copied to clipboard!");
      }
      // Increment share count
      const postRef = doc(db, "communityPosts", post.id);
      await updateDoc(postRef, { shares: post.shares + 1 });
      fetchPosts();
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const formatTime = (ts: { seconds: number } | null) => {
    if (!ts) return "just now";
    const diff = Math.floor(Date.now() / 1000 - ts.seconds);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return new Date(ts.seconds * 1000).toLocaleDateString();
  };

  if (!community && !loading) {
    return (
      <div className="min-h-screen bg-brand-gray text-brand-dark">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Community Not Found</h1>
          <button onClick={() => navigate("/community")} className="text-gold hover:underline">
            ← Back to Communities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray text-brand-dark">
      <Navbar />

      {/* Community Header / Banner */}
      <div className="relative pt-20 bg-brand-gray text-brand-dark pb-12">
        <div className="h-48 sm:h-64 bg-gray-100 overflow-hidden relative">
          {community?.bannerImage ? (
            <img src={community.bannerImage} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-gold/20 to-brand-gold/5" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 -mt-16 z-10">
          <div className="flex items-end gap-5 mb-5">
            {/* Community Icon */}
            <div className="w-24 h-24 rounded-[1.25rem] bg-white border-4 border-white overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] shrink-0">
              {community?.iconImage ? (
                <img src={community.iconImage} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-brand-gold/20 to-brand-gold/10 flex items-center justify-center">
                  <span className="text-4xl font-bold text-brand-gold">{community?.name?.[0] || "?"}</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight truncate text-brand-dark">
                {community?.name}
              </h1>
              <div className="flex items-center gap-3 text-gray-500 text-sm mt-1.5 font-medium">
                <span className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-0.5 rounded-full text-brand-dark">
                  <Users size={14} />
                  {community?.memberCount || 0} members
                </span>
                <span>•</span>
                <span>Created by {community?.creatorName}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-500 text-[15px] leading-relaxed mb-6 max-w-2xl">
            {community?.description}
          </p>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <button
              onClick={() => navigate("/community")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-[1rem] bg-white border border-gray-200 hover:bg-gray-50 text-sm font-semibold transition-all shadow-sm text-brand-dark"
            >
              <ArrowLeft size={16} />
              All Communities
            </button>
            <button
              onClick={handleToggleJoin}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-[1rem] text-sm font-bold uppercase tracking-wider transition-all shadow-sm ${
                community?.members?.includes(currentUser?.uid || "")
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-brand-dark text-white hover:bg-brand-dark/90 shadow-md"
              }`}
            >
              <Users size={16} />
              {community?.members?.includes(currentUser?.uid || "") ? "Leave" : "Join"}
            </button>
            <button
              onClick={() => {
                if (!currentUser) {
                  navigate("/login");
                  return;
                }
                setShowCreatePost(true);
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-[1rem] bg-brand-gold hover:bg-brand-gold/90 text-brand-dark text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-brand-gold/20"
            >
              <Plus size={16} />
              Create Post
            </button>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white border border-gray-100 shadow-sm rounded-2xl"
          >
            <MoreVertical size={48} className="mx-auto text-gray-200 mb-4 rotate-90" />
            <p className="text-gray-400 text-lg font-medium mb-2">No posts yet</p>
            <p className="text-gray-300 text-sm">Be the first to share something!</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 border border-gray-100"
              >
                {/* Post Header */}
                <div className="flex items-center gap-3 px-6 pt-6 pb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                    {post.authorPhoto ? (
                      <img src={post.authorPhoto} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 flex items-center justify-center">
                        <span className="text-sm font-bold text-brand-gold">{post.authorName[0]}</span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[15px] font-bold text-gray-900 truncate">{post.authorName}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 font-medium mt-0.5">
                      <Clock size={11} />
                      {formatTime(post.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-6 pb-4">
                  <h2 className="text-[19px] font-bold text-brand-dark mb-2.5 leading-snug">{post.title}</h2>
                  {post.body && (
                    <p className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-wrap">{post.body}</p>
                  )}
                </div>

                {/* Post Image */}
                {post.imageUrl && (
                  <div className="px-6 pb-4">
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="w-full max-h-[500px] object-cover rounded-2xl border border-gray-100"
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center gap-1 px-5 pb-4 pt-1">
                  {/* Like */}
                  <button
                    onClick={() => handleLike(post)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      currentUser && post.likedBy.includes(currentUser.uid)
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                        : "bg-gray-50 text-gray-500 hover:bg-white/10 hover:text-brand-dark/80 border border-transparent"
                    }`}
                  >
                    <ThumbsUp size={16} />
                    {post.likes > 0 && post.likes}
                  </button>

                  {/* Dislike */}
                  <button
                    onClick={() => handleDislike(post)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      currentUser && post.dislikedBy.includes(currentUser.uid)
                        ? "bg-red-500/15 text-red-400 border border-red-500/20"
                        : "bg-gray-50 text-gray-500 hover:bg-white/10 hover:text-brand-dark/80 border border-transparent"
                    }`}
                  >
                    <ThumbsDown size={16} />
                    {post.dislikes > 0 && post.dislikes}
                  </button>

                  {/* Share */}
                  <button
                    onClick={() => handleShare(post)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold bg-gray-50 text-gray-500 hover:bg-white/10 hover:text-brand-dark/80 transition-all ml-auto"
                  >
                    <Share2 size={16} />
                    {post.shares > 0 && post.shares}
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowCreatePost(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-bold text-brand-dark">Create a Post</h2>
                  <p className="text-gray-400 text-xs mt-0.5">in {community?.name}</p>
                </div>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="p-2 rounded-xl hover:bg-white/10 text-gray-500 hover:text-brand-dark transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-6 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
                {/* Post Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="An interesting title for your post"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  />
                </div>

                {/* Post Body */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Body
                  </label>
                  <textarea
                    rows={5}
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                    placeholder="Share your thoughts, stories, or information..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none transition-all"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Attach Image
                  </label>
                  <label className="block cursor-pointer">
                    {postImagePreview ? (
                      <div className="relative">
                        <img src={postImagePreview} alt="" className="w-full max-h-48 object-cover rounded-xl border border-white/10" />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setPostImage(null);
                            setPostImagePreview("");
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-gray-900/60 text-white hover:bg-red-500/80 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-28 bg-white border border-gray-200 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 hover:border-gold/30 transition-colors">
                        <ImageIcon size={22} className="text-gray-300" />
                        <span className="text-xs text-gray-400">Click to attach an image (optional)</span>
                      </div>
                    )}
                    {!postImagePreview && (
                      <input type="file" accept="image/*" onChange={handlePostImageChange} className="hidden" />
                    )}
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="px-5 py-2.5 rounded-xl text-gray-600 hover:text-brand-dark text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={submitting || !postTitle.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-dark text-black text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Post
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default CommunityFeed;
