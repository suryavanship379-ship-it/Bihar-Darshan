export type CategoryOption =
  | 'All Categories'
  | 'Travel'
  | 'Culture'
  | 'Food'
  | 'Photography'
  | 'History';

const primaryCategories: { label: CategoryOption }[] = [
  { label: 'All Categories' },
  { label: 'Travel' },
  { label: 'Culture' },
  { label: 'Food' },
  { label: 'Photography' },
  { label: 'History' },
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
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              isActive
                ? 'bg-amber-400 text-black shadow-md shadow-amber-400/30'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-amber-400 hover:text-amber-600'
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
