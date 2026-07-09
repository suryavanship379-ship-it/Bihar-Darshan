import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Tag, User, ArrowLeft } from 'lucide-react';
import type { TribalArticle } from '../../data/tribalArticlesData';

interface ArticleDetailModalProps {
  article: TribalArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

const formatDateFull = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const ArticleDetailModal = ({ article, isOpen, onClose }: ArticleDetailModalProps) => {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!article) return null;

  // Generate extended article body from the description
  const articleBody = [
    article.description,
    "",
    `The ${article.tribe.replace(' Tribe', '')} community has long been recognized for their profound connection to land, culture, and tradition. This story is a testament to the resilience and creativity that defines their way of life across the villages and towns of Bihar.`,
    "",
    "Across generations, these practices have been passed down through oral traditions, community gatherings, and sacred rituals. Elders in the village recall a time when every household participated in these activities, making them an inseparable part of daily life.",
    "",
    `"We want the world to see what our ancestors built," says a community elder. "This is not just art or tradition — this is our identity, our soul, our way of speaking to the earth."`,
    "",
    "Local organizations and cultural bodies have taken notice, offering support through workshops, exhibitions, and documentation projects. The goal is to ensure that these rich traditions are not only preserved but celebrated, finding new relevance in modern India while staying true to their roots.",
    "",
    "The initiative has already attracted attention from researchers, journalists, and cultural enthusiasts from across the country. Many believe that such grassroots movements are essential for maintaining India's incredibly diverse cultural landscape.",
    "",
    `As the ${article.tribe.replace(' Tribe', '')} community continues to navigate the challenges of modernization, stories like these serve as powerful reminders of the irreplaceable value of indigenous heritage. They inspire hope that tradition and progress can coexist, enriching each other in the process.`,
  ].join('\n');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[300] flex items-start justify-center pt-24 pb-8"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-[#3e2723]/70 backdrop-blur-sm" />

          {/* Article Container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[820px] max-h-[calc(100vh-8rem)] overflow-y-auto mx-4 bg-[#f4ebd0] rounded-3xl shadow-2xl border border-[#3e2723]/10 z-10 flex-shrink-0"
          >
            {/* Close Button - Fixed top right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-[#3e2723]/80 hover:bg-[#b71c1c] flex items-center justify-center transition-colors shadow-lg"
              aria-label="Close article"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Hero Images Container */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
              {/* Scrollable Images */}
              <div className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                {(article.images && article.images.length > 0 ? article.images : [article.image]).map((imgSrc, idx) => (
                  <div key={idx} className="relative min-w-full h-full flex-shrink-0 snap-center">
                    <img
                      src={imgSrc}
                      alt={`${article.headline} - Image ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/tribals/generic.png';
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3e2723]/90 via-[#3e2723]/30 to-transparent pointer-events-none" />

              {/* Source Badge */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="px-3 py-1.5 bg-[#b71c1c] text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-md shadow-md">
                  {article.author}
                </span>
              </div>
              
              {/* Image Indicators */}
              {(article.images && article.images.length > 1) && (
                <div className="absolute top-4 right-16 z-20 flex gap-1.5 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none">
                   <span className="text-white text-xs font-bold tracking-wider">{article.images.length} Images • Scroll ➔</span>
                </div>
              )}

              {/* Title on Image */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 pointer-events-none">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight drop-shadow-lg">
                  {article.headline}
                </h1>
              </div>
            </div>

            {/* Meta Bar */}
            <div className="px-6 sm:px-10 py-4 border-b border-[#3e2723]/10 bg-[#e8dec0]/50 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#5d4037]">
              <span className="flex items-center gap-1.5 font-semibold">
                <User className="w-3.5 h-3.5 text-[#D4A017]" />
                {article.author}
              </span>
              <span className="text-[#3e2723]/15">|</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4A017]" />
                {formatDateFull(article.publishedDate)}
              </span>
              <span className="text-[#3e2723]/15">|</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4A017]" />
                {article.readTime} min read
              </span>
              {article.location && (
                <>
                  <span className="text-[#3e2723]/15">|</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4A017]" />
                    {article.location}
                  </span>
                </>
              )}
            </div>

            {/* Article Body */}
            <div className="px-6 sm:px-10 py-8 sm:py-10">
              {/* Tribe Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4A017]/10 border border-[#D4A017]/30 rounded-full text-xs font-bold text-[#5d4037] uppercase tracking-wider">
                  {article.tribe}
                </span>
              </div>

              {/* Body Text */}
              <div className="prose-tribal">
                {articleBody.split('\n').map((paragraph, idx) => {
                  if (paragraph.trim() === '') return <div key={idx} className="h-4" />;

                  // Detect quoted text
                  if (paragraph.trim().startsWith('"') && paragraph.trim().endsWith('"')) {
                    return (
                      <blockquote
                        key={idx}
                        className="my-6 pl-5 border-l-4 border-[#D4A017] italic text-[#5d4037] text-lg sm:text-xl font-serif leading-relaxed"
                      >
                        {paragraph}
                      </blockquote>
                    );
                  }

                  // First paragraph is the lead
                  if (idx === 0) {
                    return (
                      <p
                        key={idx}
                        className="text-lg sm:text-xl text-[#3e2723] font-serif leading-relaxed font-medium first-letter:text-5xl first-letter:font-bold first-letter:text-[#b71c1c] first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-[0.8]"
                      >
                        {paragraph}
                      </p>
                    );
                  }

                  return (
                    <p
                      key={idx}
                      className="text-base sm:text-[17px] text-[#4e342e] leading-[1.85] font-sans"
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>


              {/* Back Button */}
              <div className="mt-8 pt-6 border-t border-[#3e2723]/10">
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-[#5d4037] hover:text-[#3e2723] font-bold text-sm tracking-wider uppercase transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Articles
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleDetailModal;
