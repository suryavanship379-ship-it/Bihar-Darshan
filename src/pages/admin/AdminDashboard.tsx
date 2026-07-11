import { useAdminData } from '../../data/AdminContext';
import { 
  MapPin, Palette, Plane, Image as ImageIcon, 
  Users, Store, Mountain, UserCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const data = useAdminData();

  const stats = [
    { label: 'Districts', count: data.districts.length, icon: MapPin, path: '/admin/districts', color: 'from-blue-500/20 to-blue-500/5', textColor: 'text-blue-400' },
    { label: 'Culture Items', count: data.culture.length, icon: Palette, path: '/admin/culture', color: 'from-purple-500/20 to-purple-500/5', textColor: 'text-purple-400' },
    { label: 'Tourism Packages', count: data.tourism.length, icon: Plane, path: '/admin/tourism', color: 'from-green-500/20 to-green-500/5', textColor: 'text-green-400' },
    { label: 'Gallery Media', count: data.gallery.length, icon: ImageIcon, path: '/admin/gallery', color: 'from-pink-500/20 to-pink-500/5', textColor: 'text-pink-400' },
    { label: 'Communities', count: data.communities.length, icon: Users, path: '/admin/community', color: 'from-orange-500/20 to-orange-500/5', textColor: 'text-orange-400' },
    { label: 'Market Products', count: data.products.length, icon: Store, path: '/admin/marketplace', color: 'from-teal-500/20 to-teal-500/5', textColor: 'text-teal-400' },
    { label: 'Tribal Groups', count: data.tribes.length, icon: Mountain, path: '/admin/tribes', color: 'from-rose-500/20 to-rose-500/5', textColor: 'text-rose-400' },
    { label: 'Personalities', count: data.personalities.length, icon: UserCircle, path: '/admin/personalities', color: 'from-yellow-500/20 to-yellow-500/5', textColor: 'text-yellow-400' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-white/40 mt-1">Manage content across Bihar Darshan.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link 
              key={i} 
              to={stat.path}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.04] transition-all group relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} blur-[50px] -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50`} />
              
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-white/50 text-sm font-medium mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-white tracking-tight">{stat.count}</h3>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center ${stat.textColor}`}>
                  <Icon size={20} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-[#D4A017]/10 to-transparent border border-[#D4A017]/20 rounded-2xl p-6 mt-8">
        <h3 className="text-lg font-bold text-white mb-2">Welcome to your Admin Panel</h3>
        <p className="text-white/60 text-sm max-w-2xl leading-relaxed">
          Here you can fully manage the content shown on the public site. Changes made here are saved directly to your local storage, ensuring immediate updates on the frontend. Use the sidebar to navigate to different sections.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
