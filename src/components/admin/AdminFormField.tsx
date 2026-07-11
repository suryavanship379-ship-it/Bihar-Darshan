import type { SelectHTMLAttributes, TextareaHTMLAttributes, InputHTMLAttributes } from 'react';

interface AdminFormFieldProps {
  label: string;
  error?: string;
  className?: string;
}

export const AdminInput = ({ label, error, className = '', ...props }: AdminFormFieldProps & InputHTMLAttributes<HTMLInputElement>) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">{label}</label>
    <input
      {...props}
      className={`bg-white/[0.02] border ${error ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/10 focus:border-[#D4A017]/50'} rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 ${error ? 'focus:ring-red-500/20' : 'focus:ring-[#D4A017]/20'} transition-all w-full`}
    />
    {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
  </div>
);

export const AdminTextarea = ({ label, error, className = '', ...props }: AdminFormFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">{label}</label>
    <textarea
      {...props}
      className={`bg-white/[0.02] border ${error ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/10 focus:border-[#D4A017]/50'} rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 ${error ? 'focus:ring-red-500/20' : 'focus:ring-[#D4A017]/20'} transition-all w-full min-h-[100px] resize-y`}
    />
    {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
  </div>
);

export const AdminSelect = ({ label, error, className = '', children, ...props }: AdminFormFieldProps & SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">{label}</label>
    <select
      {...props}
      className={`bg-[#0f0f18] border ${error ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/10 focus:border-[#D4A017]/50'} rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 ${error ? 'focus:ring-red-500/20' : 'focus:ring-[#D4A017]/20'} transition-all w-full appearance-none`}
    >
      {children}
    </select>
    {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
  </div>
);

export const AdminImagePreview = ({ url, alt = "Preview" }: { url: string, alt?: string }) => {
  if (!url) return null;
  return (
    <div className="mt-2 rounded-xl border border-white/10 overflow-hidden bg-white/5 relative aspect-video w-full max-w-sm">
      <img src={url} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};
