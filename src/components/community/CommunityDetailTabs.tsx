import { MessageSquare, Users, Image, BookOpen, Info } from 'lucide-react';

export type DetailTab = 'Discussions' | 'Media' | 'About';

const tabs: { label: DetailTab; icon: React.ReactNode }[] = [
  { label: 'Discussions', icon: <MessageSquare size={14} /> },
  { label: 'Media',       icon: <Image size={14} />          },
  { label: 'About',       icon: <Info size={14} />           },
];

interface CommunityDetailTabsProps {
  active: DetailTab;
  onChange: (tab: DetailTab) => void;
}

const CommunityDetailTabs = ({ active, onChange }: CommunityDetailTabsProps) => {
  return (
    <div className="border-b border-gray-100 bg-white rounded-t-xl shadow-sm">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map(({ label, icon }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => onChange(label)}
              className={`flex items-center gap-1.5 px-4 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200 ${
                isActive
                  ? 'border-amber-400 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200'
              }`}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityDetailTabs;
