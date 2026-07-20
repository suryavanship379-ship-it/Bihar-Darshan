import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, ImagePlus, CheckCircle } from 'lucide-react';
import { useArticles } from '../../data/ArticlesContext';

interface ShareStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTribe?: string;
}

const tribeOptions = [
  "Santhal Tribe", "Oraon Tribe", "Munda Tribe", "Kharwar Tribe",
  "Tharu Tribe", "Gond Tribe", "Asur Tribe", "Baiga Tribe",
  "Banjara Tribe", "Bathudi Tribe", "Beriya Tribe", "Bhejiya Tribe",
  "Bhumij Tribe", "Binjhia Tribe", "Birhor Tribe", "Birjia Tribe",
  "Chero Tribe", "Chick Baraik Tribe", "Gorait Tribe", "Ho Tribe",
  "Karmali Tribe", "Kharia Tribe", "Khond Tribe", "Kisan Tribe",
  "Kora Tribe", "Korba Tribe", "Lohara/Lohra Tribe", "Mahli Tribe",
  "Mal Pahariya Tribe", "Parhaiya Tribe", "Sauria Paharia Tribe", "Savar Tribe"
];

interface FormData {
  headline: string;
  images: File[];
  description: string;
  authorName: string;
  tribe: string;
  location: string;
  tags: string;
}

interface FormErrors {
  headline?: string;
  images?: string;
  description?: string;
  authorName?: string;
}

const ShareStoryModal = ({ isOpen, onClose, defaultTribe }: ShareStoryModalProps) => {
  const { addArticle } = useArticles();
  const [formData, setFormData] = useState<FormData>({
    headline: '',
    images: [],
    description: '',
    authorName: '',
    tribe: defaultTribe || '',
    location: '',
    tags: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const resetForm = () => {
    setFormData({
      headline: '', images: [], description: '',
      authorName: '', tribe: defaultTribe || '', location: '', tags: '',
    });
    setErrors({});
    setImagePreviews([]);
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleImagesChange = (files: FileList | File[]) => {
    const newFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    
    if (imagePreviews.length + newFiles.length > 5) {
      setErrors(prev => ({ ...prev, images: 'You can upload a maximum of 5 images' }));
      return;
    }

    const allowedFiles = newFiles.slice(0, 5 - imagePreviews.length);
    if (allowedFiles.length > 0) {
      setFormData(prev => ({ ...prev, images: [...prev.images, ...allowedFiles] }));

      allowedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
      setErrors(prev => ({ ...prev, images: undefined }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleImagesChange(e.dataTransfer.files);
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.headline.trim()) newErrors.headline = 'Headline is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.authorName.trim()) newErrors.authorName = 'Author name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Build the new article object and add it to the shared store
    const today = new Date().toISOString().split('T')[0];
    const wordCount = formData.description.trim().split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    const newArticle = {
      id: `user-${Date.now()}`,
      headline: formData.headline.trim(),
      description: formData.description.trim(),
      // Use the local preview URL so the image shows immediately in the session
      image: imagePreviews[0] ?? '/images/articles/article_1.png',
      images: imagePreviews.length > 0 ? imagePreviews : ['/images/articles/article_1.png'],
      author: formData.authorName.trim(),
      tribe: formData.tribe || (defaultTribe ?? 'Bihar Tribal Community'),
      publishedDate: today,
      readTime,
      tags: formData.tags
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
      location: formData.location.trim(),
    };
    addArticle(newArticle);

    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const inputBaseClass = "w-full bg-[#FCEBD3]/80 border border-[#8B3E2F]/20 text-[#8B3E2F] rounded-xl py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#F4A261] focus:border-transparent transition-all placeholder:text-[#8B3E2F]/50 font-sans text-sm";
  const labelClass = "block text-sm font-bold text-[#8B3E2F] mb-1.5 tracking-wide uppercase font-sans";
  const errorClass = "text-[#b71c1c] text-xs mt-1 font-medium";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[300] flex items-start justify-center p-4 pt-24 pb-8"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#8B3E2F]/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[580px] max-h-[calc(100vh-8rem)] overflow-y-auto bg-[#FCEBD3] border border-[#8B3E2F]/15 rounded-3xl shadow-2xl z-10 flex-shrink-0"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#F4A261 transparent',
            }}
          >
            {/* Success State */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 z-20 bg-[#FCEBD3] rounded-3xl flex flex-col items-center justify-center p-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-20 h-20 text-[#2e7d32] mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold text-[#8B3E2F] mb-2">Story Submitted!</h3>
                  <p className="text-[#8B3E2F] text-center">Thank you for sharing your story. It will be reviewed and published shortly.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#FCEBD3] border-b border-[#8B3E2F]/10 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#8B3E2F]">Write an Article</h2>
                <p className="text-xs text-[#8B3E2F] mt-0.5">Contribute to our tribal heritage chronicle</p>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-[#8B3E2F]/10 hover:bg-[#b71c1c]/20 flex items-center justify-center transition-colors group"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-[#8B3E2F] group-hover:text-[#b71c1c] transition-colors" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Headline */}
              <div>
                <label className={labelClass}>
                  Headline <span className="text-[#b71c1c]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, headline: e.target.value }));
                    if (errors.headline) setErrors(prev => ({ ...prev, headline: undefined }));
                  }}
                  placeholder="Enter your article headline..."
                  className={`${inputBaseClass} ${errors.headline ? 'ring-2 ring-[#b71c1c]/50 border-[#b71c1c]/30' : ''}`}
                  maxLength={150}
                />
                {errors.headline && <p className={errorClass}>{errors.headline}</p>}
              </div>

              {/* Featured Images */}
              <div>
                <label className={labelClass}>
                  Featured Images (Max 5) <span className="text-[#b71c1c]">*</span>
                </label>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {imagePreviews.map((src, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square border border-[#8B3E2F]/20">
                        <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 bg-[#b71c1c]/80 hover:bg-[#b71c1c] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        {idx === 0 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-[#8B3E2F]/70 text-white text-[10px] py-1 text-center font-semibold">
                            Thumbnail
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {imagePreviews.length < 5 && (
                  <div
                    className={`relative border-2 border-dashed rounded-xl transition-all cursor-pointer overflow-hidden ${isDragging
                        ? 'border-[#F4A261] bg-[#F4A261]/10'
                        : errors.images
                          ? 'border-[#b71c1c]/40 bg-[#b71c1c]/5'
                          : 'border-[#8B3E2F]/20 bg-[#FCEBD3]/40 hover:border-[#F4A261]/60'
                      }`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) handleImagesChange(e.target.files);
                      }}
                    />
                    <div className="py-6 flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#F4A261]/15 flex items-center justify-center">
                        <ImagePlus className="w-5 h-5 text-[#F4A261]" />
                      </div>
                      <p className="text-sm text-[#8B3E2F] font-medium">
                        Drag & drop or <span className="text-[#F4A261] underline">browse</span>
                      </p>
                      <p className="text-xs text-[#8B3E2F]/60">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                )}
                {errors.images && <p className={errorClass}>{errors.images}</p>}
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>
                  Description <span className="text-[#b71c1c]">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, description: e.target.value }));
                    if (errors.description) setErrors(prev => ({ ...prev, description: undefined }));
                  }}
                  placeholder="Tell us about your story..."
                  rows={4}
                  className={`${inputBaseClass} resize-none ${errors.description ? 'ring-2 ring-[#b71c1c]/50 border-[#b71c1c]/30' : ''}`}
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.description && <p className={errorClass}>{errors.description}</p>}
                  <p className="text-xs text-[#8B3E2F]/50 ml-auto">{formData.description.length}/500</p>
                </div>
              </div>

              {/* Author Name */}
              <div>
                <label className={labelClass}>
                  Author Name <span className="text-[#b71c1c]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.authorName}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, authorName: e.target.value }));
                    if (errors.authorName) setErrors(prev => ({ ...prev, authorName: undefined }));
                  }}
                  placeholder="Your name"
                  className={`${inputBaseClass} ${errors.authorName ? 'ring-2 ring-[#b71c1c]/50 border-[#b71c1c]/30' : ''}`}
                />
                {errors.authorName && <p className={errorClass}>{errors.authorName}</p>}
              </div>

              {/* Tribe/Community */}
              <div>
                <label className={labelClass}>Tribe / Community</label>
                <select
                  value={formData.tribe}
                  onChange={(e) => setFormData(prev => ({ ...prev, tribe: e.target.value }))}
                  className={`${inputBaseClass} cursor-pointer appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235d4037' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")] bg-[length:18px] bg-[right_12px_center] bg-no-repeat pr-10`}
                >
                  <option value="">Select a tribe...</option>
                  {tribeOptions.map(tribe => (
                    <option key={tribe} value={tribe}>{tribe}</option>
                  ))}
                </select>
              </div>

              {/* Location & Tags row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Location <span className="text-[#8B3E2F]/40 text-xs normal-case font-normal">(optional)</span></label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Ranchi, Bihar"
                    className={inputBaseClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Tags <span className="text-[#8B3E2F]/40 text-xs normal-case font-normal">(optional)</span></label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="Art, Culture, Festival"
                    className={inputBaseClass}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#8B3E2F]/10">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 text-[#8B3E2F] text-sm font-semibold hover:text-[#8B3E2F] transition-colors rounded-xl hover:bg-[#8B3E2F]/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#F4A261] hover:bg-[#F4A261] text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Submit Story
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareStoryModal;
