import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Image as ImageIcon, Upload, X, MapPin, Quote, Camera, Plus, Trash2, GripVertical, CheckCircle, Phone, MessageSquare, Globe, Star, Clock, Maximize2 } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import PremiumFooter from "../components/tourism/PremiumFooter";
import { useContributions } from "../data/ContributionContext";
import heroBg from "../assets/hero.png";
import "./CreateJourney.css";

// Interface Definitions
interface GalleryItem {
  id: string;
  url: string;
  title: string;
}

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
}

interface TimelineDay {
  id: string;
  day: number;
  title: string;
  activities: Activity[];
}

const CreateJourney = () => {
  const navigate = useNavigate();
  const { addJourneySubmission } = useContributions();
  
  // Section states (collapsible)
  const [openSections, setOpenSections] = useState({
    hero: true,
    intro: false,
    guide: false,
    gallery: false,
    timeline: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // --- Form States ---
  
  // 1. Hero Banner
  const [title, setTitle] = useState("Mahabodhi Trail");
  const [shortDesc, setShortDesc] = useState("Walk the path of Buddha in Bodh Gaya.");
  const [heroImage, setHeroImage] = useState<string | null>(null);

  // 2. Introduction
  const [quote, setQuote] = useState("Not just a holiday, but a journey aligned with the rich soil, spiritual structures, and legends.");
  const [description, setDescription] = useState("Bodh Gaya is the holiest site in the Buddhist world, where Prince Siddhartha attained enlightenment and became the Buddha. This journey takes you through the serene temples, ancient monasteries, and the spiritual aura of this sacred town. Experience the tranquility of the Mahabodhi Temple and the Bodhi Tree.");

  // 3. Guide Information
  const [guidePhoto, setGuidePhoto] = useState<string | null>(null);
  const [guideName, setGuideName] = useState("Ramesh Kumar");
  const [experience, setExperience] = useState("10+ Years");
  const [languages, setLanguages] = useState("English, Hindi, Magahi");
  const [rating, setRating] = useState("4.9");
  const [callNumber, setCallNumber] = useState("+919876543210");
  const [whatsapp, setWhatsapp] = useState("+919876543210");

  // 4. Gallery
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  
  // 5. Timeline (Itinerary)
  const [timeline, setTimeline] = useState<TimelineDay[]>([
    {
      id: "day1",
      day: 1,
      title: "Arrival & Mahabodhi Temple",
      activities: [
        { id: "act1", time: "10:00 AM", title: "Arrival at Bodh Gaya", description: "Check-in to your premium accommodation and relax." },
        { id: "act2", time: "04:00 PM", title: "Mahabodhi Temple Visit", description: "Experience the evening chanting and meditation under the Bodhi tree." }
      ]
    }
  ]);

  // Refs for file inputs
  const heroInputRef = useRef<HTMLInputElement>(null);
  const guideInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Handlers for File Uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGallery(prev => [...prev, { id: Date.now().toString() + index, url: reader.result as string, title: "Gallery Memory" }]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(item => item.id !== id));
  };

  const updateGalleryTitle = (id: string, title: string) => {
    setGallery(prev => prev.map(item => item.id === id ? { ...item, title } : item));
  };

  // Timeline Handlers
  const addDay = () => {
    const newDayNum = timeline.length + 1;
    setTimeline(prev => [...prev, {
      id: Date.now().toString(),
      day: newDayNum,
      title: "New Day",
      activities: []
    }]);
  };

  const removeDay = (dayId: string) => {
    setTimeline(prev => prev.filter(d => d.id !== dayId).map((d, i) => ({ ...d, day: i + 1 })));
  };

  const addActivity = (dayId: string) => {
    setTimeline(prev => prev.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: [...day.activities, { id: Date.now().toString(), time: "", title: "", description: "" }]
        };
      }
      return day;
    }));
  };

  const removeActivity = (dayId: string, actId: string) => {
    setTimeline(prev => prev.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: day.activities.filter(a => a.id !== actId)
        };
      }
      return day;
    }));
  };

  const updateActivity = (dayId: string, actId: string, field: keyof Activity, value: string) => {
    setTimeline(prev => prev.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: day.activities.map(a => a.id === actId ? { ...a, [field]: value } : a)
        };
      }
      return day;
    }));
  };

  const updateDayTitle = (dayId: string, title: string) => {
    setTimeline(prev => prev.map(day => day.id === dayId ? { ...day, title } : day));
  };

  const handleSaveDraft = () => {
    alert("Draft saved successfully!");
  };

  const handleSubmit = () => {
    if (!title || !shortDesc) {
      alert("Please fill out the Hero Section details.");
      return;
    }
    
    const durationDays = timeline.length;
    addJourneySubmission({
      title: title,
      desc: shortDesc,
      image: heroImage || "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=2000&auto=format&fit=crop",
      duration: `${durationDays > 1 ? durationDays - 1 : 1} Nights / ${durationDays} Days`
    });

    alert("Featured Journey created successfully!");
    navigate('/tourism');
  };

  return (
    <div className="create-journey-wrapper" style={{ backgroundImage: `url(${heroBg})` }}>
      {/* Decorative Heritage Background Mandalas */}
      <div className="bg-decor bg-decor-left">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <circle cx="50" cy="50" r="45" strokeWidth="0.3" strokeDasharray="1,1" />
          <circle cx="50" cy="50" r="35" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="22" strokeWidth="0.6" />
          <path d="M 50 5 L 50 95 M 5 50 L 95 50 M 18 18 L 82 82 M 18 82 L 82 18" strokeWidth="0.2" />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 40 * Math.cos((angle * Math.PI) / 180)}
                y2={50 + 40 * Math.sin((angle * Math.PI) / 180)}
                strokeWidth="0.3"
              />
            );
          })}
        </svg>
      </div>

      <div className="bg-decor bg-decor-right">
        <svg viewBox="0 0 100 120" fill="none" stroke="currentColor">
          <path d="M 10 110 L 90 110 L 80 80 L 20 80 Z" strokeWidth="0.4" />
          <path d="M 25 80 L 75 80 L 65 50 L 35 50 Z" strokeWidth="0.4" />
          <path d="M 38 50 L 62 50 L 50 15 Z" strokeWidth="0.4" />
          <line x1="50" y1="15" x2="50" y2="5" strokeWidth="0.8" />
          <circle cx="50" cy="5" r="2.5" fill="currentColor" />
          <path d="M 42 110 A 8 8 0 0 1 58 110 Z" strokeWidth="0.4" />
        </svg>
      </div>

      <Navbar forceWhiteText={true} />

      <main className="create-journey-content">
        <div className="create-journey-panel">
          
          <h1 className="create-journey-title">Create Featured Journey</h1>
          <p className="create-journey-subtitle">Design a premium experience to showcase on the Bihar Darshan tourism page.</p>
          
          <div className="form-container">
            
            {/* SECTION 1: Hero Banner */}
            <div className="form-section">
              <div className="form-section-header" onClick={() => toggleSection('hero')}>
                <h3><ImageIcon className="section-icon" size={24} /> 1. Hero Banner</h3>
                {openSections.hero ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              <AnimatePresence>
                {openSections.hero && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="form-section-content"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <div className="form-group">
                          <label className="form-label">Journey Title</label>
                          <input 
                            type="text" 
                            className="form-control-dark" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="e.g. Mahabodhi Trail" 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Short Description</label>
                          <textarea 
                            className="form-control-dark" 
                            value={shortDesc} 
                            onChange={(e) => setShortDesc(e.target.value)} 
                            placeholder="A brief compelling overview..."
                            rows={3}
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Hero Banner Image</label>
                        <div className="upload-zone" onClick={() => !heroImage && heroInputRef.current?.click()}>
                          <input type="file" ref={heroInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setHeroImage)} />
                          {heroImage ? (
                            <>
                              <img src={heroImage} alt="Hero Preview" className="preview-image rounded-xl" />
                              <button className="remove-image-btn" onClick={(e) => { e.stopPropagation(); setHeroImage(null); }}><X size={16} /></button>
                            </>
                          ) : (
                            <>
                              <div className="upload-icon"><Upload size={24} /></div>
                              <p className="upload-text">Upload Hero Image</p>
                              <p className="upload-subtext">High quality landscape image</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Live Preview */}
                    <div className="mt-8 pt-8 border-t border-[#F4A261]/20">
                      <h4 className="text-white font-bold mb-4">Live Preview: Hero Section</h4>
                      <div className="relative h-[300px] w-full rounded-2xl overflow-hidden flex items-end">
                        <div className="absolute inset-0 z-0 bg-gray-200">
                          {heroImage ? (
                            <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image Selected</div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2E] via-[#0F3D2E]/40 to-transparent" />
                        </div>
                        <div className="relative z-10 p-8 w-full flex flex-col gap-2">
                          <span className="text-[#F4A261] text-[10px] font-bold uppercase tracking-[0.3em]">Luxury Experience</span>
                          <h2 className="font-display font-bold text-4xl text-white leading-tight">{title || "Journey Title"}</h2>
                          <p className="text-white/80 text-lg font-light max-w-2xl">{shortDesc || "Short description will appear here..."}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SECTION 2: Introduction */}
            <div className="form-section">
              <div className="form-section-header" onClick={() => toggleSection('intro')}>
                <h3><Quote className="section-icon" size={24} /> 2. Journey Introduction</h3>
                {openSections.intro ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              <AnimatePresence>
                {openSections.intro && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="form-section-content"
                  >
                    <div className="space-y-6">
                      <div className="form-group">
                        <label className="form-label">Journey Quote</label>
                        <input 
                          type="text" 
                          className="form-control-dark" 
                          value={quote} 
                          onChange={(e) => setQuote(e.target.value)} 
                          placeholder="An inspiring quote about this journey..." 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Journey Description</label>
                        <textarea 
                          className="form-control-dark" 
                          value={description} 
                          onChange={(e) => setDescription(e.target.value)} 
                          placeholder="Full detailed description of what makes this journey special..."
                          rows={6}
                        />
                      </div>
                    </div>

                    {/* Live Preview */}
                    <div className="mt-8 pt-8 border-t border-[#F4A261]/20">
                      <h4 className="text-white font-bold mb-4">Live Preview: The Journey</h4>
                      <div className="bg-[#1a1512] p-8 rounded-2xl border border-[#D4A017]/20 shadow-sm">
                        <h2 className="text-3xl font-serif text-white mb-6 font-light">The Journey</h2>
                        <blockquote className="relative p-6 bg-[#1a1512] rounded-xl border border-[#D4A017]/20 mb-6">
                          <Quote className="absolute top-4 left-4 w-8 h-8 text-[#F4A261] opacity-20" />
                          <p className="text-xl font-serif text-[#2A2A2A] italic relative z-10 pl-6">
                            "{quote || "Quote will appear here..."}"
                          </p>
                        </blockquote>
                        <p className="text-white/70 leading-relaxed font-light">
                          {description || "Description will appear here..."}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SECTION 3: Guide Information */}
            <div className="form-section">
              <div className="form-section-header" onClick={() => toggleSection('guide')}>
                <h3><CheckCircle className="section-icon" size={24} /> 3. Guide Information</h3>
                {openSections.guide ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              <AnimatePresence>
                {openSections.guide && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="form-section-content"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="form-group">
                        <label className="form-label">Guide Photo</label>
                        <div className="upload-zone" style={{ minHeight: '150px' }} onClick={() => !guidePhoto && guideInputRef.current?.click()}>
                          <input type="file" ref={guideInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setGuidePhoto)} />
                          {guidePhoto ? (
                            <>
                              <img src={guidePhoto} alt="Guide Preview" className="preview-image rounded-xl object-contain" />
                              <button className="remove-image-btn" onClick={(e) => { e.stopPropagation(); setGuidePhoto(null); }}><X size={16} /></button>
                            </>
                          ) : (
                            <>
                              <div className="upload-icon"><Camera size={24} /></div>
                              <p className="upload-text text-sm">Upload Photo</p>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="form-group">
                          <label className="form-label">Guide Name</label>
                          <input type="text" className="form-control-dark" value={guideName} onChange={(e) => setGuideName(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="form-group">
                            <label className="form-label">Experience</label>
                            <input type="text" className="form-control-dark" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g. 10+ Years" />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Rating</label>
                            <input type="text" className="form-control-dark" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="e.g. 4.9" />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Languages (comma separated)</label>
                          <input type="text" className="form-control-dark" value={languages} onChange={(e) => setLanguages(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="form-group">
                            <label className="form-label">Call Number</label>
                            <input type="text" className="form-control-dark" value={callNumber} onChange={(e) => setCallNumber(e.target.value)} />
                          </div>
                          <div className="form-group">
                            <label className="form-label">WhatsApp Number</label>
                            <input type="text" className="form-control-dark" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Preview */}
                    <div className="mt-8 pt-8 border-t border-[#F4A261]/20 flex justify-center">
                      <div className="w-full max-w-[350px]">
                        <h4 className="text-white font-bold mb-4 text-center">Live Preview: Guide Card</h4>
                        <div className="bg-[#1a1512] rounded-2xl p-8 border border-[#D4A017]/20 shadow-xl">
                          <div className="flex flex-col items-center text-center mb-6">
                            <div className="relative mb-4">
                              {guidePhoto ? (
                                <img src={guidePhoto} alt={guideName} className="w-24 h-24 rounded-full object-cover border-4 border-[#D4A017]/20" />
                              ) : (
                                <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-[#D4A017]/20 flex items-center justify-center text-gray-400">Photo</div>
                              )}
                              <div className="absolute bottom-0 right-0 bg-[#F4A261] text-white p-1.5 rounded-full border-2 border-white">
                                <CheckCircle className="w-3 h-3" />
                              </div>
                            </div>
                            <span className="text-[#F4A261] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Verified Expert</span>
                            <h3 className="text-xl font-serif text-white">{guideName || "Guide Name"}</h3>
                            <p className="text-white/70 text-xs">{experience || "Experience"} Experience</p>
                          </div>
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-xs text-white/70 pb-3 border-b border-[#D4A017]/20">
                              <Globe className="w-4 h-4 text-[#F4A261]" />
                              <span>Speaks: {languages || "..."}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-white/70 pb-3 border-b border-[#D4A017]/20">
                              <Star className="w-4 h-4 text-[#F4A261] fill-[#F4A261]" />
                              <span>{rating || "0"} / 5 Rating</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button className="w-full h-10 bg-[#0F3D2E] text-white rounded-full flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest pointer-events-none">
                              <Phone className="w-3 h-3" /> Call Guide
                            </button>
                            <button className="w-full h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest pointer-events-none">
                              <MessageSquare className="w-3 h-3" /> WhatsApp
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SECTION 4: Gallery */}
            <div className="form-section">
              <div className="form-section-header" onClick={() => toggleSection('gallery')}>
                <h3><Camera className="section-icon" size={24} /> 4. Immersive Gallery</h3>
                {openSections.gallery ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              <AnimatePresence>
                {openSections.gallery && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="form-section-content"
                  >
                    <div className="mb-4 flex justify-between items-center">
                      <p className="text-white/70 text-sm">Add images to build an immersive gallery grid.</p>
                      <button className="btn-secondary px-4 py-2 flex items-center gap-2 text-sm" onClick={() => galleryInputRef.current?.click()}>
                        <Plus size={16} /> Add Images
                      </button>
                      <input type="file" ref={galleryInputRef} className="hidden" accept="image/*" multiple onChange={handleGalleryUpload} />
                    </div>

                    <div className="space-y-4 mb-8">
                      {gallery.length === 0 ? (
                        <div className="text-center p-8 bg-[#1a1512]/50 rounded-xl border border-dashed border-[#F4A261]/50 text-white/70">
                          No images added yet. Click "Add Images" to upload.
                        </div>
                      ) : (
                        gallery.map((item, idx) => (
                          <div key={item.id} className="gallery-item-row flex items-center gap-4 p-3 rounded-xl shadow-sm">
                            <GripVertical className="text-gray-400 cursor-grab" />
                            <img src={item.url} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="flex-1">
                              <input 
                                type="text" 
                                className="form-control-light py-2" 
                                value={item.title} 
                                onChange={(e) => updateGalleryTitle(item.id, e.target.value)} 
                                placeholder="Image Title" 
                              />
                            </div>
                            <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" onClick={() => removeGalleryItem(item.id)}>
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Live Preview */}
                    {gallery.length > 0 && (
                      <div className="mt-8 pt-8 border-t border-[#F4A261]/20">
                        <h4 className="text-[#0F3D2E] font-bold mb-4">Live Preview: Gallery Grid</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
                          {gallery.map((mem, idx) => (
                            <div key={`prev-${mem.id}`} className={`relative rounded-xl overflow-hidden bg-black ${idx === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1"}`}>
                              <img src={mem.url} alt={mem.title} className="w-full h-full object-cover opacity-80" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                              <div className="absolute bottom-4 left-4 right-4">
                                <span className="text-[#F4A261] text-[8px] font-bold uppercase tracking-widest mb-1 block">Highlight</span>
                                <h3 className="text-white font-serif text-lg">{mem.title}</h3>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SECTION 5: Journey Details (Itinerary) */}
            <div className="form-section">
              <div className="form-section-header" onClick={() => toggleSection('timeline')}>
                <h3><Clock className="section-icon" size={24} /> 5. Journey Details (Itinerary)</h3>
                {openSections.timeline ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              <AnimatePresence>
                {openSections.timeline && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="form-section-content"
                  >
                    
                    <div className="space-y-8">
                      {timeline.map((day, dIdx) => (
                        <div key={day.id} className="day-container p-6 rounded-2xl shadow-sm relative">
                          <button className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition" onClick={() => removeDay(day.id)} title="Remove Day">
                            <X size={20} />
                          </button>
                          
                          <div className="flex items-center gap-4 mb-6">
                            <div className="bg-[#F4A261] text-white font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-widest">
                              Day {day.day}
                            </div>
                            <input 
                              type="text" 
                              className="form-control-light font-serif text-lg text-[#0F3D2E] py-2" 
                              value={day.title} 
                              onChange={(e) => updateDayTitle(day.id, e.target.value)} 
                              placeholder="Day Title (e.g. Departure & Spirit of Gaya)" 
                            />
                          </div>

                          <div className="space-y-4 pl-4 border-l-2 border-[#D4A017]/20 ml-4">
                            {day.activities.map((act, aIdx) => (
                              <div key={act.id} className="relative activity-row p-4 rounded-xl flex flex-col sm:flex-row gap-4">
                                <button className="absolute top-2 right-2 text-red-300 hover:text-red-600 p-1" onClick={() => removeActivity(day.id, act.id)}>
                                  <X size={14} />
                                </button>
                                <div className="sm:w-32">
                                  <input type="text" className="form-control-light py-2 text-xs font-bold text-center" value={act.time} onChange={(e) => updateActivity(day.id, act.id, 'time', e.target.value)} placeholder="Time (e.g. 10:00 AM)" />
                                </div>
                                <div className="flex-1 space-y-3">
                                  <input type="text" className="form-control-light py-2" value={act.title} onChange={(e) => updateActivity(day.id, act.id, 'title', e.target.value)} placeholder="Activity Title" />
                                  <textarea className="form-control-light py-2 text-sm" style={{ minHeight: '60px' }} value={act.description} onChange={(e) => updateActivity(day.id, act.id, 'description', e.target.value)} placeholder="Activity Description..." />
                                </div>
                              </div>
                            ))}
                            <button className="flex items-center gap-2 text-[#F4A261] hover:text-[#e09151] font-bold text-sm px-4 py-2 transition" onClick={() => addActivity(day.id)}>
                              <Plus size={16} /> Add Activity
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <button className="btn-secondary w-full flex justify-center items-center gap-2" onClick={addDay}>
                        <Plus size={18} /> Add Another Day
                      </button>
                    </div>

                    {/* Live Preview */}
                    <div className="mt-10 pt-8 border-t border-[#F4A261]/20">
                      <h4 className="text-white font-bold mb-6 text-center">Live Preview: Itinerary Layout</h4>
                      <div className="bg-[#1a1512] rounded-3xl p-6 border border-[#D4A017]/20">
                        {timeline.map((day, dayIdx) => (
                          <div key={`prev-${day.id}`} className="bg-[#1a1512] rounded-2xl p-6 md:p-8 mb-6 last:mb-0">
                            <h3 className="text-xl font-serif text-white mb-6 flex flex-col sm:flex-row sm:items-center gap-3 border-b border-white/50 pb-4">
                              <span className="text-[#F4A261] font-bold text-xs tracking-widest uppercase bg-[#1a1512] px-3 py-1.5 rounded-full shadow-sm">
                                Day {day.day}
                              </span>
                              <span>{day.title || "Day Title"}</span>
                            </h3>
                            <div className="space-y-6">
                              {day.activities.length === 0 && <p className="text-sm text-white/70 italic">No activities added.</p>}
                              {day.activities.map((act) => (
                                <div key={`prev-act-${act.id}`} className="flex flex-col sm:flex-row gap-4">
                                  {act.time && (
                                    <div className="sm:w-28 shrink-0 pt-1">
                                      <span className="text-[#6A6A6A] text-[10px] font-bold uppercase tracking-widest bg-white px-2.5 py-1 rounded shadow-sm inline-block">
                                        {act.time}
                                      </span>
                                    </div>
                                  )}
                                  <div>
                                    <h4 className="text-base font-serif text-white mb-1">{act.title || "Activity Title"}</h4>
                                    <p className="text-white/70 leading-relaxed text-xs">
                                      {act.description || "Activity description..."}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
          
          <div className="form-actions border-t border-[#F4A261]/20 pt-8 mt-12">
            <button className="btn-secondary" onClick={handleSaveDraft}>Save Draft</button>
            <button className="btn-secondary text-[#F4A261] border-[#F4A261] hover:bg-[#F4A261]/5">Preview Page</button>
            <button className="btn-primary" onClick={handleSubmit}>Submit Journey</button>
          </div>

        </div>
      </main>

      <div className="relative z-10">
        <PremiumFooter />
      </div>
    </div>
  );
};

export default CreateJourney;
