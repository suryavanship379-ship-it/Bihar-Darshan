import type { ReactNode } from 'react';
import { Search, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  className?: string;
}

interface AdminTableProps<T> {
  title: string;
  description?: string;
  data: T[];
  columns: Column<T>[];
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  searchPlaceholder?: string;
}

export function AdminTable<T>({
  title,
  description,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search..."
}: AdminTableProps<T>) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white tracking-tight">{title}</h3>
          {description && <p className="text-white/40 text-sm mt-1">{description}</p>}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="bg-black/20 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#EAB308]/50 focus:ring-1 focus:ring-[#EAB308]/20 w-full sm:w-64 transition-all"
            />
          </div>
          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 bg-[#EAB308] hover:bg-[#EAB308] text-black px-4 py-2 rounded-xl text-sm font-bold transition-colors shrink-0"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add New</span>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/[0.06]">
              {columns.map((col, i) => (
                <th key={i} className={`px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {data.length > 0 ? (
              data.map((item, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-white/[0.02] transition-colors group">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={`px-6 py-4 text-sm text-white/80 whitespace-nowrap ${col.className || ''}`}>
                      {typeof col.accessor === 'function' ? col.accessor(item) : String(item[col.accessor] as ReactNode)}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="px-3 py-1.5 text-xs font-medium text-[#EAB308] hover:bg-[#EAB308]/10 rounded-lg transition-colors border border-transparent hover:border-[#EAB308]/20"
                          >
                            Edit
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-400/10 rounded-lg transition-colors border border-transparent hover:border-red-400/20"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="px-6 py-12 text-center text-white/30 text-sm">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer (Dummy for now) */}
      <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between text-sm text-white/40">
        <span>Showing {data.length} results</span>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-white/5 rounded-md transition-colors disabled:opacity-50" disabled>
            <ChevronLeft size={16} />
          </button>
          <button className="p-1 hover:bg-white/5 rounded-md transition-colors disabled:opacity-50" disabled>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
