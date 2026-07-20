export type CategoryOption =
  | 'All Categories'
  | 'Travel'
  | 'Culture'
  | 'Food'
  | 'Photography'
  | 'History'
  | 'Others';

const primaryCategories: { label: CategoryOption }[] = [
  { label: 'All Categories' },
  { label: 'Travel' },
  { label: 'Culture' },
  { label: 'Food' },
  { label: 'Photography' },
  { label: 'History' },
  { label: 'Others' },
];

interface CategoryFilterProps {
  active: CategoryOption;
  onChange: (cat: CategoryOption) => void;
}

const CategoryFilter = ({ active, onChange }: CategoryFilterProps) => {
  return (
    <div className="flex items-center gap-2 flex-wrap relative">
      {primaryCategories.map(({ label }) => {
        const isActive = active === label;
        return (
          <button
            key={label}
            onClick={() => onChange(label)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${isActive
              ? 'bg-brand-gold text-black shadow-md shadow-brand-gold/30'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-gold hover:text-accent-brown'
              }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
