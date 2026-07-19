import { useState, useEffect } from 'react';
import { useAdminData, defaultSiteSettings } from '../../data/AdminContext';

const AdminSettings = () => {
  const { siteSettings, updateSiteSettings, resetSection } = useAdminData();
  const [formData, setFormData] = useState(siteSettings);

  useEffect(() => {
    setFormData(siteSettings);
  }, [siteSettings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
    // Show success feedback
    const btn = document.getElementById('save-settings-btn');
    if (btn) {
      const originalText = btn.innerText;
      btn.innerText = 'Saved!';
      btn.classList.add('bg-green-500', 'text-white');
      setTimeout(() => {
        btn.innerText = originalText;
        btn.classList.remove('bg-green-500', 'text-white');
      }, 2000);
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset site settings to default?")) {
      resetSection('siteSettings');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display font-bold text-2xl font-bold text-white tracking-tight">Site Settings</h1>
        <p className="text-white/40 mt-1">Manage global website copy and statistics.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hero Section Copy */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
            Hero Section Copy
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Hero Title</label>
                <input
                  type="text"
                  value={formData.heroTitle}
                  onChange={e => setFormData({ ...formData, heroTitle: e.target.value })}
                  className="bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EAB308]/50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Hero Subtitle (Gold Text)</label>
                <input
                  type="text"
                  value={formData.heroSubtitle}
                  onChange={e => setFormData({ ...formData, heroSubtitle: e.target.value })}
                  className="bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EAB308]/50"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Hero Description</label>
              <textarea
                value={formData.heroDescription}
                onChange={e => setFormData({ ...formData, heroDescription: e.target.value })}
                className="bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EAB308]/50 min-h-[100px]"
              />
            </div>
            <div className="flex flex-col gap-1.5 mt-4">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Hero Image URL</label>
              <input
                type="text"
                placeholder="Leave empty to use default image"
                value={formData.heroImage || ''}
                onChange={e => setFormData({ ...formData, heroImage: e.target.value })}
                className="bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EAB308]/50"
              />
              {formData.heroImage && (
                <div className="mt-2 w-full h-32 rounded-lg overflow-hidden border border-white/10 bg-black/50">
                  <img src={formData.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global Statistics */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
            Global Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['statPlaces', 'statDistricts', 'statCulturalSites', 'statFestivals', 'statTourists'].map((key) => {
              const label = key.replace('stat', '');
              return (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">{label}</label>
                  <input
                    type="text"
                    value={(formData as any)[key]}
                    onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                    className="bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EAB308]/50"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
            Footer Copy
          </h2>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">About Text</label>
            <textarea
              value={formData.footerAbout}
              onChange={e => setFormData({ ...formData, footerAbout: e.target.value })}
              className="bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EAB308]/50 min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4">
          <button 
            type="button" 
            onClick={handleReset}
            className="px-6 py-3 rounded-xl text-red-400 font-medium hover:bg-red-400/10 transition-colors"
          >
            Reset to Defaults
          </button>
          <button 
            id="save-settings-btn"
            type="submit" 
            className="px-6 py-3 rounded-xl bg-[#EAB308] hover:bg-[#EAB308] text-black font-bold transition-all shadow-lg shadow-[#EAB308]/20"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
