import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Camera, Utensils, PartyPopper, MapPin, Sparkles, User, Tag, FileText, Upload, Video, CheckCircle2, Heart, Send, Edit2 } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useContributions } from "../data/ContributionContext";
import galleryBg from "../assets/gallery-hero.png";
import foodBg from "../assets/bihar-food.png";
import festivalBg from "../assets/bihar-folk-dance.png";
import heroBg from "../assets/hero.png";
import heritageBg from "../assets/bihar-heritage.png";
import "./ShareStory.css";

const BIHAR_DISTRICTS = [
  "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Nalanda", "Vaishali",
  "Saran", "Bhojpur", "Purnia", "Munger", "Saharsa", "Rohtas", "Buxar", "Kaimur",
  "East Champaran", "West Champaran", "Sheohar", "Sitamarhi", "Madhubani", "Supaul",
  "Araria", "Kishanganj", "Madhepura", "Khagaria", "Begusarai", "Samastipur",
  "Lakhisarai", "Sheikhpura", "Nawada", "Aurangabad", "Jehanabad", "Arwal", "Jamui",
  "Banka", "Gopalganj", "Siwan", "Sonepur", "Mithila"
].sort();

const GALLERY_CATEGORIES = [
  "Food", "Culture", "Politicians", "Places", "Heritage", "Festivals",
  "Agriculture", "Art & Craft", "Wildlife", "Community", "Tourism",
  "Architecture", "Religion"
];

const ShareStory = () => {
  const { addCultureSubmission, addGallerySubmission, addPersonalitySubmission } = useContributions();
  const navigate = useNavigate();
  const [category, setCategory] = useState<"gallery" | "food" | "festival" | "personality">("gallery");

  // Form Fields
  const [title, setTitle] = useState(""); // Name of food/festival/personality
  const [caption, setCaption] = useState("");
  const [personName, setPersonName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [origin, setOrigin] = useState("");
  const [whatSpecial, setWhatSpecial] = useState("");
  const [district, setDistrict] = useState("Bihar");

  // Gallery specific
  const [mediaType, setMediaType] = useState<"photo" | "video">("photo");
  const [galleryCategory, setGalleryCategory] = useState("Community");
  const [videoUrl, setVideoUrl] = useState("");

  // Personality specific
  const [personalityCategory, setPersonalityCategory] = useState("Historical");

  // Media upload state
  const [mediaFile, setMediaFile] = useState<string | null>(null); // Base64 data URL
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Submission/Status state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset scroll position to top whenever category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category]);

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (!file) return;

    // Check file size (limit to 5MB for localStorage safety)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, media: "File size exceeds 5MB limit. Please choose a smaller file." }));
      return;
    }

    setFileName(file.name);

    // Programmatically detect media type
    const isVideo = file.type.startsWith("video/");
    setMediaType(isVideo ? "video" : "photo");

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.media;
      return copy;
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setMediaFile(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!personName.trim()) newErrors.personName = "Your name is required";
    if (!mediaFile) newErrors.media = "Please upload a photo/video file";

    if (category === "gallery") {
      if (!caption.trim()) newErrors.caption = "Caption is required";
    } else if (category === "food" || category === "festival" || category === "personality") {
      if (!title.trim()) {
        newErrors.title = category === "personality" ? "Personality name is required" : `Name of ${category === "food" ? "Food" : "Festival"} is required`;
      }
      if (!description.trim()) newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (category === "food" || category === "festival") {
        const extDetails: string[] = [];
        let finalDescription = description;

        if (category === "food") {
          if (ingredients.trim()) {
            extDetails.push(`Ingredients: ${ingredients}`);
            finalDescription += `\n\nIngredients:\n${ingredients}`;
          }
        } else {
          if (origin.trim()) {
            extDetails.push(`Origin: ${origin}`);
          }
          if (whatSpecial.trim()) {
            extDetails.push(`Specialty: ${whatSpecial}`);
          }
          const extra = [];
          if (origin.trim()) extra.push(`Origin: ${origin}`);
          if (whatSpecial.trim()) extra.push(`What makes it special: ${whatSpecial}`);
          if (extra.length > 0) {
            finalDescription += `\n\n${extra.join('\n')}`;
          }
        }

        await addCultureSubmission({
          type: category === "festival" ? "Festival" : "Food",
          district: "Bihar",
          image: mediaFile || "/images/placeholder.png",
          title,
          description: finalDescription,
          submittedBy: personName,
          caption: title,
          extendedDetails: extDetails,
        });

        setIsSubmitting(false);
        setIsSuccess(true);
      } else if (category === "gallery") {
        addGallerySubmission({
          title: caption,
          image: mediaFile || "/images/placeholder.png",
          mediaType,
          category: "Community",
          photographer: personName,
          location: "Bihar",
          aspectRatio: "portrait",
        });

        setIsSubmitting(false);
        setIsSuccess(true);
      } else if (category === "personality") {
        const finalCategory = personalityCategory === "Art & Cinema" ? "Arts & Cinema" : personalityCategory;
        await addPersonalitySubmission({
          name: title,
          category: finalCategory as any,
          district: "Patna",
          description: description,
          imageUrl: mediaFile || "https://via.placeholder.com/400x600?text=Profile+Coming+Soon",
          author: personName,
        });

        setIsSubmitting(false);
        setIsSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setErrors({ submit: "An error occurred while saving your submission. Please try again." });
    }
  };

  const resetForm = () => {
    setTitle("");
    setCaption("");
    setPersonName("");
    setDescription("");
    setIngredients("");
    setOrigin("");
    setWhatSpecial("");
    setDistrict("Bihar");
    setVideoUrl("");
    setPersonalityCategory("Historical");
    setMediaFile(null);
    setFileName("");
    setIsSuccess(false);
    setErrors({});
  };

  const changeCategory = (catId: "gallery" | "food" | "festival" | "personality") => {
    setCategory(catId);
    resetForm();
  };

  const categories = [
    {
      id: "gallery" as const,
      title: "Gallery",
      description: "Share photographs and videos of Bihar's beauty, heritage and everyday life.",
      icon: Camera,
      buttonText: "Explore Gallery →",
      bgImage: galleryBg,
    },
    {
      id: "food" as const,
      title: "Food",
      description: "Showcase authentic Bihari dishes, recipes and culinary traditions.",
      icon: Utensils,
      buttonText: "Share Food →",
      bgImage: foodBg,
    },
    {
      id: "festival" as const,
      title: "Festival",
      description: "Celebrate Bihar's vibrant festivals, rituals and traditions.",
      icon: PartyPopper,
      buttonText: "Share Festival →",
      bgImage: festivalBg,
    },
    {
      id: "personality" as const,
      title: "Personality",
      description: "Discover and share stories of legendary personalities and pride of Bihar.",
      icon: User,
      buttonText: "Share Personality →",
      bgImage: heritageBg,
    },
  ];

  return (
    <div className="share-story-page-wrapper" style={{ backgroundImage: `url(${heroBg})` }}>
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

      <main className="share-story-content-container">
        <div className="share-story-card-panel">

          <div className="share-story-form-section animate-slide-down">
            <div className="form-header-center">
              <div className="share-story-decor-badge">
                <Camera className="gold-icon" size={20} />
              </div>
              <h2 className="share-story-form-title-main">
                Share Your <span className="gold-text">Story</span>
              </h2>
              <div className="heritage-divider">
                <span className="divider-line"></span>
                <span className="divider-motif">✦</span>
                <span className="divider-line"></span>
              </div>
              <p className="share-story-form-subtitle">
                Showcase the beauty, flavours and traditions of Bihar through your lens. <Heart size={13} fill="#D4A017" className="gold-heart-inline" />
              </p>
            </div>

            {/* Category Dropdown Selection */}
            <div className="share-story-form" style={{ gap: '12px', marginBottom: '24px' }}>
              <div className="form-group-step">
                <div className="step-title-row">
                  <span className="step-number">★</span>
                  <h3 className="step-title">Category *</h3>
                </div>
                <select
                  value={category}
                  onChange={(e) => changeCategory(e.target.value as any)}
                  className="form-control-dark font-semibold text-gold"
                  style={{ cursor: "pointer" }}
                >
                  <option value="gallery">Gallery</option>
                  <option value="food">Food</option>
                  <option value="festival">Festival</option>
                  <option value="personality">Personality</option>
                </select>
              </div>
            </div>

            {errors.submit && (
              <div className="form-control form-control-error" style={{ marginBottom: "24px", background: "rgba(217, 56, 56, 0.1)", color: "#f78888", border: "1px solid #d93838" }}>
                {errors.submit}
              </div>
            )}

            {category === "gallery" && (
              <form onSubmit={handleSubmit} className="share-story-form">
                {/* Step 1: Upload Photo or Video */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">1</span>
                    <h3 className="step-title">Upload Photo or Video</h3>
                    <span className="step-subtitle-icon">
                      <Camera size={14} className="gold-icon" /> Share your best moment
                    </span>
                  </div>

                  <div className="upload-split-layout">
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`drag-drop-zone-split ${isDragging ? "drag-drop-active" : ""}`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*,video/*"
                        style={{ display: "none" }}
                      />

                      {mediaFile ? (
                        <div className="preview-media-box-split">
                          <div className="media-thumbnail-preview-split">
                            {mediaType === "video" ? (
                              <video src={mediaFile} muted />
                            ) : (
                              <img src={mediaFile} alt="Preview" />
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="upload-icon-circle-split">
                          <Upload size={24} className="gold-icon" />
                        </div>
                      )}
                    </div>

                    <div className="upload-details-split">
                      {mediaFile ? (
                        <div className="uploaded-details-content">
                          <p className="media-filename">{fileName}</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMediaFile(null);
                              setFileName("");
                            }}
                            className="btn-remove-media"
                          >
                            Remove file
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="upload-primary-text">
                            Drag & drop your photo or video here
                          </p>
                          <p className="upload-browse-text">
                            or <span className="browse-link" onClick={() => fileInputRef.current?.click()}>browse files</span>
                          </p>
                          <p className="upload-secondary-text">
                            Supports JPG, PNG, WEBP, MP4, WebM (Max 5MB)
                          </p>
                        </>
                      )}

                      <div className="upload-tip-box">
                        <Sparkles size={14} className="gold-icon" />
                        <span>Tip: High quality, good lighting photos get more love!</span>
                      </div>
                    </div>
                  </div>
                  {errors.media && <p className="form-error-msg">{errors.media}</p>}
                </div>

                {/* Step 2: Caption */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">2</span>
                    <h3 className="step-title">Caption</h3>
                    <Edit2 size={13} className="step-icon-indicator" />
                  </div>
                  <div className="textarea-wrapper">
                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value.slice(0, 300))}
                      placeholder="Write a beautiful caption about this moment..."
                      className={`form-control-dark ${errors.caption ? "form-control-error" : ""}`}
                      rows={3}
                    />
                    <span className="char-count">{caption.length}/300</span>
                  </div>
                  {errors.caption && <p className="form-error-msg">{errors.caption}</p>}
                </div>

                {/* Step 3: Your Name */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">3</span>
                    <h3 className="step-title">Your Name</h3>
                    <User size={13} className="step-icon-indicator" />
                  </div>
                  <input
                    type="text"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    placeholder="e.g. Priya Kumari"
                    className={`form-control-dark ${errors.personName ? "form-control-error" : ""}`}
                  />
                  {errors.personName && <p className="form-error-msg">{errors.personName}</p>}
                </div>

                {/* Action buttons */}
                <div className="form-actions-bar">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-publish-gradient"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Submit Story</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {category === "food" && (
              <form onSubmit={handleSubmit} className="share-story-form">
                {/* Step 1: Upload Food Photo */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">1</span>
                    <h3 className="step-title">Upload Food Photo</h3>
                    <span className="step-subtitle-icon">
                      <Utensils size={14} className="gold-icon" /> Showcase your dish
                    </span>
                  </div>

                  <div className="upload-split-layout">
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`drag-drop-zone-split ${isDragging ? "drag-drop-active" : ""}`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: "none" }}
                      />

                      {mediaFile ? (
                        <div className="preview-media-box-split">
                          <div className="media-thumbnail-preview-split">
                            <img src={mediaFile} alt="Preview" />
                          </div>
                        </div>
                      ) : (
                        <div className="upload-icon-circle-split">
                          <Upload size={24} className="gold-icon" />
                        </div>
                      )}
                    </div>

                    <div className="upload-details-split">
                      {mediaFile ? (
                        <div className="uploaded-details-content">
                          <p className="media-filename">{fileName}</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMediaFile(null);
                              setFileName("");
                            }}
                            className="btn-remove-media"
                          >
                            Remove file
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="upload-primary-text">
                            Drag & drop your food photo here
                          </p>
                          <p className="upload-browse-text">
                            or <span className="browse-link" onClick={() => fileInputRef.current?.click()}>browse files</span>
                          </p>
                          <p className="upload-secondary-text">
                            Supports JPG, PNG, WEBP (Max 5MB)
                          </p>
                        </>
                      )}

                      <div className="upload-tip-box">
                        <Sparkles size={14} className="gold-icon" />
                        <span>Tip: Clear, high-res food shots look most appetizing!</span>
                      </div>
                    </div>
                  </div>
                  {errors.media && <p className="form-error-msg">{errors.media}</p>}
                </div>

                {/* Step 2: Food Name */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">2</span>
                    <h3 className="step-title">Food Name</h3>
                    <Tag size={13} className="step-icon-indicator" />
                  </div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Litti Chokha"
                    className={`form-control-dark ${errors.title ? "form-control-error" : ""}`}
                  />
                  {errors.title && <p className="form-error-msg">{errors.title}</p>}
                </div>

                {/* Step 3: Description */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">3</span>
                    <h3 className="step-title">Description</h3>
                    <FileText size={13} className="step-icon-indicator" />
                  </div>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the heritage, taste, and preparation method..."
                    className={`form-control-dark ${errors.description ? "form-control-error" : ""}`}
                    style={{ resize: "none" }}
                  />
                  {errors.description && <p className="form-error-msg">{errors.description}</p>}
                </div>

                {/* Step 4: Ingredients Optional */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">4</span>
                    <h3 className="step-title">Ingredients (Optional)</h3>
                    <FileText size={13} className="step-icon-indicator" />
                  </div>
                  <textarea
                    rows={3}
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="List the key ingredients used..."
                    className="form-control-dark"
                    style={{ resize: "none" }}
                  />
                </div>

                {/* Step 5: Your Name */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">5</span>
                    <h3 className="step-title">Your Name</h3>
                    <User size={13} className="step-icon-indicator" />
                  </div>
                  <input
                    type="text"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    placeholder="e.g. Priya Kumari"
                    className={`form-control-dark ${errors.personName ? "form-control-error" : ""}`}
                  />
                  {errors.personName && <p className="form-error-msg">{errors.personName}</p>}
                </div>

                {/* Action buttons */}
                <div className="form-actions-bar">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-publish-gradient"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Submit Story</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {category === "festival" && (
              <form onSubmit={handleSubmit} className="share-story-form">
                {/* Step 1: Upload Festival Photo or Video */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">1</span>
                    <h3 className="step-title">Upload Festival Photo or Video</h3>
                    <span className="step-subtitle-icon">
                      <PartyPopper size={14} className="gold-icon" /> Share the celebration
                    </span>
                  </div>

                  <div className="upload-split-layout">
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`drag-drop-zone-split ${isDragging ? "drag-drop-active" : ""}`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*,video/*"
                        style={{ display: "none" }}
                      />

                      {mediaFile ? (
                        <div className="preview-media-box-split">
                          <div className="media-thumbnail-preview-split">
                            {mediaType === "video" ? (
                              <video src={mediaFile} muted />
                            ) : (
                              <img src={mediaFile} alt="Preview" />
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="upload-icon-circle-split">
                          <Upload size={24} className="gold-icon" />
                        </div>
                      )}
                    </div>

                    <div className="upload-details-split">
                      {mediaFile ? (
                        <div className="uploaded-details-content">
                          <p className="media-filename">{fileName}</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMediaFile(null);
                              setFileName("");
                            }}
                            className="btn-remove-media"
                          >
                            Remove file
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="upload-primary-text">
                            Drag & drop your photo or video here
                          </p>
                          <p className="upload-browse-text">
                            or <span className="browse-link" onClick={() => fileInputRef.current?.click()}>browse files</span>
                          </p>
                          <p className="upload-secondary-text">
                            Supports JPG, PNG, WEBP, MP4, WebM (Max 5MB)
                          </p>
                        </>
                      )}

                      <div className="upload-tip-box">
                        <Sparkles size={14} className="gold-icon" />
                        <span>Tip: Capture the vibrant colors and community spirit!</span>
                      </div>
                    </div>
                  </div>
                  {errors.media && <p className="form-error-msg">{errors.media}</p>}
                </div>

                {/* Step 2: Festival Name */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">2</span>
                    <h3 className="step-title">Festival Name</h3>
                    <Tag size={13} className="step-icon-indicator" />
                  </div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Chhath Puja"
                    className={`form-control-dark ${errors.title ? "form-control-error" : ""}`}
                  />
                  {errors.title && <p className="form-error-msg">{errors.title}</p>}
                </div>

                {/* Step 3: Origin */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">3</span>
                    <h3 className="step-title">Origin / Historic Reference</h3>
                    <MapPin size={13} className="step-icon-indicator" />
                  </div>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g. Vedic Period, Mithila region"
                    className="form-control-dark"
                  />
                </div>

                {/* Step 4: What is special about it */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">4</span>
                    <h3 className="step-title">What is special about it?</h3>
                    <Sparkles size={13} className="step-icon-indicator" />
                  </div>
                  <textarea
                    rows={2}
                    value={whatSpecial}
                    onChange={(e) => setWhatSpecial(e.target.value)}
                    placeholder="e.g. Setting and rising sun worship standing in water..."
                    className="form-control-dark"
                    style={{ resize: "none" }}
                  />
                </div>

                {/* Step 5: Description */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">5</span>
                    <h3 className="step-title">Description</h3>
                    <FileText size={13} className="step-icon-indicator" />
                  </div>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the rituals, community spirit, and celebrations..."
                    className={`form-control-dark ${errors.description ? "form-control-error" : ""}`}
                    style={{ resize: "none" }}
                  />
                  {errors.description && <p className="form-error-msg">{errors.description}</p>}
                </div>

                {/* Step 6: Your Name */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">6</span>
                    <h3 className="step-title">Your Name</h3>
                    <User size={13} className="step-icon-indicator" />
                  </div>
                  <input
                    type="text"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    placeholder="e.g. Priya Kumari"
                    className={`form-control-dark ${errors.personName ? "form-control-error" : ""}`}
                  />
                  {errors.personName && <p className="form-error-msg">{errors.personName}</p>}
                </div>

                {/* Action buttons */}
                <div className="form-actions-bar">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-publish-gradient"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Submit Story</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {category === "personality" && (
              <form onSubmit={handleSubmit} className="share-story-form">
                {/* Step 1: Upload Personality Photo */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">1</span>
                    <h3 className="step-title">Upload Personality Photo</h3>
                    <span className="step-subtitle-icon">
                      <Camera size={14} className="gold-icon" /> Share personality photo
                    </span>
                  </div>

                  <div className="upload-split-layout">
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`drag-drop-zone-split ${isDragging ? "drag-drop-active" : ""}`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: "none" }}
                      />

                      {mediaFile ? (
                        <div className="preview-media-box-split">
                          <div className="media-thumbnail-preview-split">
                            <img src={mediaFile} alt="Preview" />
                          </div>
                        </div>
                      ) : (
                        <div className="upload-icon-circle-split">
                          <Upload size={24} className="gold-icon" />
                        </div>
                      )}
                    </div>

                    <div className="upload-details-split">
                      {mediaFile ? (
                        <div className="uploaded-details-content">
                          <p className="media-filename">{fileName}</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMediaFile(null);
                              setFileName("");
                            }}
                            className="btn-remove-media"
                          >
                            Remove file
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="upload-primary-text">
                            Drag & drop your personality photo here
                          </p>
                          <p className="upload-browse-text">
                            or <span className="browse-link" onClick={() => fileInputRef.current?.click()}>browse files</span>
                          </p>
                          <p className="upload-secondary-text">
                            Supports JPG, PNG, WEBP (Max 5MB)
                          </p>
                        </>
                      )}

                      <div className="upload-tip-box">
                        <Sparkles size={14} className="gold-icon" />
                        <span>Tip: High-quality portraits look best for iconic legends!</span>
                      </div>
                    </div>
                  </div>
                  {errors.media && <p className="form-error-msg">{errors.media}</p>}
                </div>

                {/* Step 2: Personality Name */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">2</span>
                    <h3 className="step-title">Personality Name</h3>
                    <Tag size={13} className="step-icon-indicator" />
                  </div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Aryabhata"
                    className={`form-control-dark ${errors.title ? "form-control-error" : ""}`}
                  />
                  {errors.title && <p className="form-error-msg">{errors.title}</p>}
                </div>

                {/* Step 3: Category Dropdown */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">3</span>
                    <h3 className="step-title">Category</h3>
                    <Sparkles size={13} className="step-icon-indicator" />
                  </div>
                  <select
                    value={personalityCategory}
                    onChange={(e) => setPersonalityCategory(e.target.value)}
                    className="form-control-dark font-semibold text-white"
                    style={{ cursor: "pointer" }}
                  >
                    <option value="Historical">Historical</option>
                    <option value="Sports">Sports</option>
                    <option value="Politician">Politician</option>
                    <option value="Art & Cinema">Art & Cinema</option>
                    <option value="Literature">Literature</option>
                  </select>
                </div>

                {/* Step 4: Description */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">4</span>
                    <h3 className="step-title">Description</h3>
                    <FileText size={13} className="step-icon-indicator" />
                  </div>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe their achievements, contributions, and historical legacy..."
                    className={`form-control-dark ${errors.description ? "form-control-error" : ""}`}
                    style={{ resize: "none" }}
                  />
                  {errors.description && <p className="form-error-msg">{errors.description}</p>}
                </div>

                {/* Step 5: Name of Author / Contributor */}
                <div className="form-group-step">
                  <div className="step-title-row">
                    <span className="step-number">5</span>
                    <h3 className="step-title">Name of Author / Contributor</h3>
                    <User size={13} className="step-icon-indicator" />
                  </div>
                  <input
                    type="text"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    placeholder="e.g. Priya Kumari"
                    className={`form-control-dark ${errors.personName ? "form-control-error" : ""}`}
                  />
                  {errors.personName && <p className="form-error-msg">{errors.personName}</p>}
                </div>

                {/* Action buttons */}
                <div className="form-actions-bar">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-publish-gradient"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Submit Story</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="form-review-notice" style={{ marginTop: "24px", textAlign: "center", fontSize: "0.85rem", color: "#a58f7f" }}>
              <span>🔒</span> Your content will be reviewed before it appears on the site.
            </div>
          </div>

        </div>
      </main>

      {/* Success Modal Card overlay */}
      {isSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-[#1A3A2F] border border-[#EAB308]/25 max-w-sm w-full rounded-[2rem] p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 text-[#EAB308] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/5">
              <CheckCircle2 size={40} className="text-[#EAB308]" />
            </div>
            <h3 className="font-display text-3xl font-bold text-white mb-4">
              Submission <span className="text-[#EAB308]">Successful!</span>
            </h3>
            <div className="heritage-divider mb-6">
              <span className="divider-line text-white/20"></span>
              <span className="divider-motif text-[#EAB308]">✦</span>
              <span className="divider-line text-white/20"></span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              Thank you for sharing your story! Your submission has been successfully received and is currently in the moderation queue. It will be showcased on the website once approved by the admin.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                if (category === "food") {
                  navigate("/discover?category=food", { state: { activeCategory: "Food" } });
                } else if (category === "festival") {
                  navigate("/discover?category=festival", { state: { activeCategory: "Festivals" } });
                } else if (category === "personality") {
                  const finalCategory = personalityCategory === "Art & Cinema" ? "Arts & Cinema" : personalityCategory;
                  navigate(`/discover?category=personalities&subcategory=${finalCategory.toLowerCase()}`, {
                    state: { activeCategory: "Personalities", activeSubcategory: finalCategory }
                  });
                } else {
                  navigate("/gallery");
                }
              }}
              className="w-full py-3.5 bg-[#EAB308] hover:bg-[#EAB308]/90 text-black font-extrabold rounded-xl transition-all cursor-pointer uppercase tracking-wider text-xs shadow-lg hover:scale-105 duration-300"
            >
              Okay, Got it
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ShareStory;
