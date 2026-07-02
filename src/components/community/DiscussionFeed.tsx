import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import DiscussionItem from './DiscussionItem';
import DiscussionFilters from './DiscussionFilters';
import type { DiscussionFilter } from './DiscussionFilters';
import type { Discussion } from '../../data/communityData';

interface DiscussionFeedProps {
  discussions: Discussion[];
  isJoined?: boolean;
}

const DiscussionFeed = ({ discussions, isJoined }: DiscussionFeedProps) => {
  const [filter, setFilter] = useState<DiscussionFilter>('All Posts');
  const [visibleCount, setVisibleCount] = useState(5);

  const filtered =
    filter === 'All Posts'
      ? discussions
      : discussions.filter((d) => {
          if (filter === 'Questions') return d.replies > 30;
          if (filter === 'Tips') return d.tag === 'Tips';
          if (filter === 'Itineraries') return d.tag === 'Itinerary';
          return true;
        });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      {/* Filter bar */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100">
        <DiscussionFilters active={filter} onChange={setFilter} />
      </div>

      {/* Discussion list */}
      <div>
        {visible.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-400">No discussions found.</p>
        ) : (
          <div className="flex flex-col">
            {visible.map((d) => (
              <DiscussionItem key={d.id} discussion={d} />
            ))}
          </div>
        )}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100">
          <button
            onClick={() => setVisibleCount((c) => c + 5)}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200"
          >
            Load More Discussions
            <ChevronDown size={15} />
          </button>
        </div>
      )}
    </div>
  );
};

export default DiscussionFeed;
