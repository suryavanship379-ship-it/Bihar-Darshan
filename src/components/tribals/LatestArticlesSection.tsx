import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Newspaper, PenLine } from 'lucide-react';
import type { TribalArticle } from '../../data/tribalArticlesData';
import { useArticles } from '../../data/ArticlesContext';
import ShareStoryModal from './ShareStoryModal';
import ArticleDetailModal from './ArticleDetailModal';

interface LatestArticlesSectionProps {
  tribeName?: string;
}

/* ── Helpers ─────────────────────────────────────────────────────── */

const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
};

const formatDateShort = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
};

/* ── Shimmer Skeleton Card ───────────────────────────────────────── */

const SkeletonCard = () => (
  <div className="bg-[#e8dec0]/60 rounded-2xl overflow-hidden border border-[#3e2723]/10 animate-pulse">
    <div className="flex justify-between items-center px-4 py-2 border-b border-[#3e2723]/10">
      <div className="h-3 w-24 bg-[#3e2723]/10 rounded" />
      <div className="h-3 w-16 bg-[#3e2723]/10 rounded" />
    </div>
    <div className="h-44 bg-[#3e2723]/8" />
    <div className="p-4 space-y-3">
      <div className="h-4 w-full bg-[#3e2723]/10 rounded" />
      <div className="h-4 w-3/4 bg-[#3e2723]/10 rounded" />
      <div className="h-3 w-full bg-[#3e2723]/8 rounded" />
      <div className="h-3 w-5/6 bg-[#3e2723]/8 rounded" />
      <div className="flex justify-between pt-2">
        <div className="h-3 w-20 bg-[#3e2723]/8 rounded" />
        <div className="h-3 w-16 bg-[#3e2723]/8 rounded" />
      </div>
    </div>
  </div>
);

/* ── Article Card ────────────────────────────────────────────────── */

const ArticleCard = ({
  article,
  index,
  onReadMore,
}: {
  article: TribalArticle;
  index: number;
  onReadMore: (article: TribalArticle) => void;
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.article
      onClick={() => onReadMore(article)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "50px" }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.5 }}
      className="group bg-[#e8dec0]/80 rounded-2xl overflow-hidden border border-[#3e2723]/10 hover:border-[#D4A017]/50 transition-all duration-500 flex flex-col hover:-translate-y-1.5 hover:shadow-[0_8px_30px_-8px_rgba(62,39,35,0.18)] cursor-pointer"
    >
      {/* Top Source Bar */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-[#3e2723]/10 bg-[#e8dec0]/40">
        <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#b71c1c]">
          {article.author}
        </span>
        <span className="text-[10px] font-semibold tracking-wider text-[#5d4037]/70 uppercase">
          {formatDate(article.publishedDate)}
        </span>
      </div>

      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-[#d4c9a8]">
        {!imgLoaded && (
          <div className="absolute inset-0 tribal-articles-shimmer" />
        )}
        <img
          src={article.image}
          alt={article.headline}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = '/images/tribals/generic.png';
            setImgLoaded(true);
          }}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-[15px] leading-snug font-serif font-bold text-[#3e2723] group-hover:text-[#5d4037] transition-colors mb-2 line-clamp-3">
          {article.headline}
        </h3>

        <p className="text-[13px] text-[#4e342e]/80 leading-relaxed line-clamp-3 mb-4 flex-grow">
          {article.description}
        </p>

        {/* Meta Row */}
        <div className="flex items-center gap-3 text-[11px] text-[#5d4037]/70 mb-3 font-medium border-t border-[#3e2723]/8 pt-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDateShort(article.publishedDate)}
          </span>
          <span className="text-[#3e2723]/20">|</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime} min read
          </span>
        </div>

        {/* Read More */}
        <span
          className="inline-flex items-center text-[#b71c1c] group-hover:text-[#D4A017] text-sm font-bold tracking-wide transition-all group/link"
        >
          Read More
          <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
        </span>
      </div>
    </motion.article>
  );
};

/* ── Empty State ─────────────────────────────────────────────────── */

const EmptyState = ({ tribeName }: { tribeName?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16 px-6 bg-[#e8dec0]/50 rounded-3xl border border-[#3e2723]/10"
  >
    <div className="w-16 h-16 rounded-full bg-[#D4A017]/10 flex items-center justify-center mx-auto mb-4">
      <Newspaper className="w-7 h-7 text-[#D4A017]" />
    </div>
    <h3 className="text-xl font-serif font-bold text-[#3e2723] mb-2">No Articles Yet</h3>
    <p className="text-[#5d4037] text-sm max-w-md mx-auto">
      {tribeName
        ? `Stories and articles about the ${tribeName} will appear here. Be the first to share!`
        : "Stories and articles about Bihar's tribal communities will appear here soon."}
    </p>
  </motion.div>
);

/* ── Main Section ────────────────────────────────────────────────── */

const LatestArticlesSection = ({ tribeName }: LatestArticlesSectionProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<TribalArticle | null>(null);
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const { articles: globalArticles } = useArticles();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const articles: TribalArticle[] = useMemo(() => {
    if (tribeName) {
      // Filter the global state rather than the static file
      const filtered = globalArticles.filter(
        (article) => article.tribe.toLowerCase() === tribeName.toLowerCase()
      );
      return filtered;
    }
    return globalArticles;
  }, [tribeName, globalArticles]);

  const displayArticles = articles.slice(0, 4);
  const subtitle = tribeName
    ? `Stories, news & insights about the ${tribeName.replace(' Tribe', '')} tribe and their way of life.`
    : "Stories, news & insights about Bihar's indigenous tribes and their way of life.";

  const handleReadMore = (article: TribalArticle) => {
    setSelectedArticle(article);
    setIsArticleOpen(true);
  };

  return (
    <>
      <section className="px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto py-16 sm:py-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Decorative Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#b71c1c]/10 border border-[#b71c1c]/20 flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-[#b71c1c]" />
            </div>
          </div>

          {/* Title with decorative lines */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#D4A017]" />
              <div className="w-12 sm:w-20 h-px bg-[#3e2723]/30" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3e2723] tracking-[0.12em] uppercase font-bold">
              Latest Articles
            </h2>
            <div className="flex items-center gap-1.5">
              <div className="w-12 sm:w-20 h-px bg-[#3e2723]/30" />
              <div className="w-2 h-2 rounded-full bg-[#D4A017]" />
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#5d4037] max-w-2xl mx-auto italic">
            {subtitle}
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : displayArticles.length === 0 ? (
          <EmptyState tribeName={tribeName} />
        ) : (
          <>
            {/* Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {displayArticles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={index}
                  onReadMore={handleReadMore}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
            >
              {/* View All Articles */}
              <button className="group inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-[#3e2723] text-[#3e2723] font-bold text-sm tracking-wider uppercase hover:bg-[#3e2723] hover:text-[#f4ebd0] transition-all duration-300 shadow-sm hover:shadow-md">
                View All Articles
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Contribute an Article */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#D4A017] hover:bg-[#B8860B] text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#D4A017]/20"
              >
                <PenLine className="w-4 h-4" />
                Contribute an Article
              </button>
            </motion.div>
          </>
        )}
      </section>

      {/* Write Article Modal */}
      <ShareStoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultTribe={tribeName}
      />

      {/* Article Detail Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        isOpen={isArticleOpen}
        onClose={() => {
          setIsArticleOpen(false);
          setSelectedArticle(null);
        }}
      />
    </>
  );
};

export default LatestArticlesSection;
