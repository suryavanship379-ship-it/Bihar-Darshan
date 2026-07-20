import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Tag, FileText, Upload, Sparkles, Send, Edit2, ListChecks, Image as ImageIcon, ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useContributions } from "../data/ContributionContext";
import heroBg from "../assets/hero.png";
import "./ShareStory.css";

const CATEGORIES = [
  "Travel", "Culture", "Food", "Events", "Photography", "History", "Education", "Agriculture", "Others"
];

const CreateCommunity = () => {
  const { addCommunitySubmission } = useContributions();
  const navigate = useNavigate();

  // Form Fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Travel");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");

  // Media upload state
  const [bannerFile, setBannerFile] = useState<string | null>(null);
  const [bannerFileName, setBannerFileName] = useState("");
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState("");

  const [activeDropZone, setActiveDropZone] = useState<"banner" | "logo" | null>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Form Submission/Status state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent, zone: "banner" | "logo") => {
    e.preventDefault();
    setActiveDropZone(zone);
  };

  const handleDragLeave = () => {
    setActiveDropZone(null);
  };

  const compressImage = (file: File, maxW: number, maxH: number, quality = 0.75): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > maxW || height > maxH) {
            const ratio = Math.min(maxW / width, maxH / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = e.target!.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processFile = async (file: File, type: "banner" | "logo") => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, [type]: "File size exceeds 10MB limit. Please choose a smaller file." }));
      return;
    }

    if (type === "banner") setBannerFileName(file.name);
    else setLogoFileName(file.name);

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[type];
      return copy;
    });

    try {
      const [maxW, maxH, quality] = type === "banner" ? [1600, 500, 0.8] : [512, 512, 0.85];
      const compressed = await compressImage(file, maxW, maxH, quality);
      if (type === "banner") setBannerFile(compressed);
      else setLogoFile(compressed);
    } catch {
      setErrors((prev) => ({ ...prev, [type]: "Failed to process image. Please try another file." }));
    }
  };

  const handleDrop = (e: React.DragEvent, type: "banner" | "logo") => {
    e.preventDefault();
    setActiveDropZone(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0], type);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "banner" | "logo") => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0], type);
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Community Name is required";
    if (!description.trim() || description.length < 10) newErrors.description = "Short Description is required (min 10 chars)";
    // Banner and logo are optional in the form; defaults will be provided on submit.

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    setTimeout(async () => {
      try {
        const rulesList = rules.split('\n').filter(r => r.trim() !== '');

        await addCommunitySubmission({
          name,
          category,
          shortDescription: description.length > 100 ? description.substring(0, 100) + '...' : description,
          description,
          bannerImageUrl: bannerFile || "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
          logoImageUrl: logoFile || "https://api.dicebear.com/7.x/initials/svg?seed=" + name,
          rules: rulesList,
          aboutText: description + "\n\n" + (rulesList.length > 0 ? "Guidelines:\n" + rulesList.join('\n') : ""),
        });

        setIsSubmitting(false);
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err: any) {
        console.error(err);
        setIsSubmitting(false);
        const msg = err?.message || '';
        if (msg.includes('url') || msg.includes('URL') || msg.includes('bannerImageUrl') || msg.includes('logoImageUrl')) {
          setErrors({ submit: "Image validation failed. Please re-upload your banner or logo." });
        } else {
          setErrors({ submit: `Failed to create community. ${msg}` });
        }
      }
    }, 1200);
  };

  return (
    <div className="share-story-page-wrapper" style={{ backgroundImage: `url(${heroBg})` }}>
      {/* Decorative Heritage Background Mandalas */}
      <div className="bg-decor bg-decor-left">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <circle cx="50" cy="50" r="45" strokeWidth="0.3" strokeDasharray="1,1" />
          <circle cx="50" cy="50" r="35" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="22" strokeWidth="0.6" />
          <path d="M 50 5 L 50 95 M 5 50 L 95 50 M 18 18 L 82 82 M 18 82 L 82 18" strokeWidth="0.2" />
        </svg>
      </div>

      <div className="bg-decor bg-decor-right">
        <svg viewBox="0 0 100 120" fill="none" stroke="currentColor">
          <path d="M 10 110 L 90 110 L 80 80 L 20 80 Z" strokeWidth="0.4" />
          <path d="M 25 80 L 75 80 L 65 50 L 35 50 Z" strokeWidth="0.4" />
          <path d="M 38 50 L 62 50 L 50 15 Z" strokeWidth="0.4" />
        </svg>
      </div>

      <Navbar forceWhiteText={true} />

      <main className="share-story-content-container">
        <div className="share-story-card-panel">
          {isSuccess ? (
            <div className="text-center py-12 px-6 flex flex-col items-center justify-center animate-slide-down">
              <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 text-[#EAB308] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/5">
                <CheckCircle size={40} className="text-[#EAB308]" />
              </div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Submission <span className="text-[#EAB308]">Successful!</span>
              </h2>
              <div className="heritage-divider mb-6">
                <span className="divider-line text-white/20"></span>
                <span className="divider-motif text-[#EAB308]">✦</span>
                <span className="divider-line text-white/20"></span>
              </div>
              <p className="text-white/70 max-w-md mb-8 leading-relaxed text-sm md:text-base">
                Your community has been submitted and is currently <strong>Pending Admin Approval</strong>. It will be visible to everyone once approved by the moderation team.
              </p>
              <button
                type="button"
                onClick={() => navigate("/community")}
                className="px-8 py-3.5 bg-[#EAB308] hover:bg-[#EAB308]/90 text-black font-extrabold rounded-xl transition-all shadow-lg hover:scale-105 duration-300 uppercase tracking-wider text-xs cursor-pointer"
              >
                Go to Community
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                className="btn-secondary mr-auto flex items-center gap-2 mb-8"
                onClick={() => navigate('/community')}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <div className="share-story-form-section animate-slide-down">
                <div className="form-header-center">
                  <div className="share-story-decor-badge">
                    <Users className="gold-icon" size={20} />
                  </div>
                  <h2 className="share-story-form-title-main">
                    Create a <span className="gold-text">Community</span>
                  </h2>
                  <div className="heritage-divider">
                    <span className="divider-line"></span>
                    <span className="divider-motif">✦</span>
                    <span className="divider-line"></span>
                  </div>
                  <p className="share-story-form-subtitle">
                    Build a space for people to share, discuss, and celebrate shared interests.<br />
                    <span style={{ fontSize: '0.85em', opacity: 0.7 }}>Your community will be reviewed by an admin before it goes live.</span>
                  </p>
                </div>

                {errors.submit && (
                  <div className="form-control form-control-error" style={{ marginBottom: "24px", background: "rgba(217, 56, 56, 0.1)", color: "#f78888", border: "1px solid #d93838" }}>
                    {errors.submit}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="share-story-form">

                  {/* Step 1: Community Name */}
                  <div className="form-group-step">
                    <div className="step-title-row">
                      <span className="step-number">1</span>
                      <h3 className="step-title">Community Name *</h3>
                      <Tag size={13} className="step-icon-indicator" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Mithila Art Enthusiasts"
                      className={`form-control-dark ${errors.name ? "form-control-error" : ""}`}
                    />
                    {errors.name && <p className="form-error-msg">{errors.name}</p>}
                  </div>

                  {/* Step 2: Category */}
                  <div className="form-group-step">
                    <div className="step-title-row">
                      <span className="step-number">2</span>
                      <h3 className="step-title">Category *</h3>
                    </div>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-control-dark font-semibold text-gold"
                      style={{ cursor: "pointer" }}
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Step 3: Description */}
                  <div className="form-group-step">
                    <div className="step-title-row">
                      <span className="step-number">3</span>
                      <h3 className="step-title">Short Description *</h3>
                      <Edit2 size={13} className="step-icon-indicator" />
                    </div>
                    <div className="textarea-wrapper">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value.slice(0, 200))}
                        placeholder="Briefly describe the purpose of this community (150-200 characters)..."
                        className={`form-control-dark ${errors.description ? "form-control-error" : ""}`}
                        rows={3}
                      />
                      <span className="char-count">{description.length}/200</span>
                    </div>
                    {errors.description && <p className="form-error-msg">{errors.description}</p>}
                  </div>

                  {/* Step 4: Cover Banner */}
                  <div className="form-group-step">
                    <div className="step-title-row">
                      <span className="step-number">4</span>
                      <h3 className="step-title">Cover Banner *</h3>
                      <span className="step-subtitle-icon">
                        <ImageIcon size={14} className="gold-icon" /> 1600 × 500 px recommended
                      </span>
                    </div>

                    <div className="upload-split-layout">
                      <div
                        onDragOver={(e) => handleDragOver(e, "banner")}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, "banner")}
                        onClick={() => bannerInputRef.current?.click()}
                        className={`drag-drop-zone-split ${activeDropZone === "banner" ? "drag-drop-active" : ""}`}
                      >
                        <input
                          type="file"
                          ref={bannerInputRef}
                          onChange={(e) => handleFileChange(e, "banner")}
                          accept="image/jpeg,image/png"
                          style={{ display: "none" }}
                        />
                        {bannerFile ? (
                          <div className="preview-media-box-split">
                            <div className="media-thumbnail-preview-split">
                              <img src={bannerFile} alt="Cover Banner Preview" className="object-cover" />
                            </div>
                          </div>
                        ) : (
                          <div className="upload-icon-circle-split">
                            <Upload size={24} className="gold-icon" />
                          </div>
                        )}
                      </div>
                      <div className="upload-details-split">
                        {bannerFile ? (
                          <div className="uploaded-details-content">
                            <p className="media-filename">{bannerFileName}</p>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setBannerFile(null); setBannerFileName(""); }}
                              className="btn-remove-media"
                            >Remove file</button>
                          </div>
                        ) : (
                          <>
                            <p className="upload-primary-text">Drag & drop your cover banner</p>
                            <p className="upload-browse-text">or <span className="browse-link" onClick={() => bannerInputRef.current?.click()}>browse files</span></p>
                            <p className="upload-secondary-text">JPG / PNG</p>
                          </>
                        )}
                      </div>
                    </div>
                    {errors.banner && <p className="form-error-msg">{errors.banner}</p>}
                  </div>

                  {/* Step 5: Community Logo */}
                  <div className="form-group-step">
                    <div className="step-title-row">
                      <span className="step-number">5</span>
                      <h3 className="step-title">Community Logo *</h3>
                      <span className="step-subtitle-icon">
                        <ImageIcon size={14} className="gold-icon" /> 512 × 512 px recommended
                      </span>
                    </div>

                    <div className="upload-split-layout">
                      <div
                        onDragOver={(e) => handleDragOver(e, "logo")}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, "logo")}
                        onClick={() => logoInputRef.current?.click()}
                        className={`drag-drop-zone-split ${activeDropZone === "logo" ? "drag-drop-active" : ""}`}
                        style={{ borderRadius: '50%', width: '120px', height: '120px', margin: '0 auto' }}
                      >
                        <input
                          type="file"
                          ref={logoInputRef}
                          onChange={(e) => handleFileChange(e, "logo")}
                          accept="image/jpeg,image/png"
                          style={{ display: "none" }}
                        />
                        {logoFile ? (
                          <div className="preview-media-box-split" style={{ borderRadius: '50%' }}>
                            <div className="media-thumbnail-preview-split" style={{ borderRadius: '50%' }}>
                              <img src={logoFile} alt="Logo Preview" style={{ borderRadius: '50%', objectFit: 'cover' }} />
                            </div>
                          </div>
                        ) : (
                          <div className="upload-icon-circle-split">
                            <Upload size={24} className="gold-icon" />
                          </div>
                        )}
                      </div>
                      <div className="upload-details-split flex flex-col justify-center items-center text-center mt-4">
                        {logoFile ? (
                          <div className="uploaded-details-content">
                            <p className="media-filename">{logoFileName}</p>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setLogoFile(null); setLogoFileName(""); }}
                              className="btn-remove-media"
                            >Remove file</button>
                          </div>
                        ) : (
                          <>
                            <p className="upload-primary-text">Drag & drop your logo</p>
                            <p className="upload-browse-text">or <span className="browse-link" onClick={() => logoInputRef.current?.click()}>browse files</span></p>
                            <p className="upload-secondary-text">JPG / PNG</p>
                          </>
                        )}
                      </div>
                    </div>
                    {errors.logo && <p className="form-error-msg">{errors.logo}</p>}
                  </div>

                  {/* Step 6: Community Rules */}
                  <div className="form-group-step">
                    <div className="step-title-row">
                      <span className="step-number">6</span>
                      <h3 className="step-title">Community Rules (Guidelines)</h3>
                      <ListChecks size={13} className="step-icon-indicator" />
                    </div>
                    <textarea
                      rows={4}
                      value={rules}
                      onChange={(e) => setRules(e.target.value)}
                      placeholder="Enter rules separated by new lines... e.g. Be respectful\nNo self-promotion"
                      className="form-control-dark"
                      style={{ resize: "none" }}
                    />
                  </div>

                  {/* Action buttons */}
                  <div className="form-actions-bar mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-publish-gradient"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner" />
                          <span>Creating...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Create Community</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateCommunity;
