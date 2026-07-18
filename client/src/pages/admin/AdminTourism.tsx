import { useState, useEffect } from 'react';
import { useAdminData } from '../../data/AdminContext';
import { AdminTable } from '../../components/admin/AdminTable';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminInput, AdminTextarea, AdminImagePreview, AdminSelect } from '../../components/admin/AdminFormField';
import { AdminDeleteConfirm } from '../../components/admin/AdminDeleteConfirm';
import { Plus, Trash2, Info, LayoutList, Phone, Map, Image as ImageIcon, Clock, CheckCircle, XCircle } from 'lucide-react';
import type { TourTrip } from '../../data/tourismData';
import { auth } from '../../lib/firebase';

const emptyForm: Partial<TourTrip> = {
  id: '',
  title: '',
  provider: '',
  rating: 5,
  duration: '',
  departureCity: '',
  places: [],
  description: '',
  price: '',
  phone: '',
  whatsapp: '',
  email: '',
  emergencyContact: '',
  image: '',
  overviewText: '',
  difficulty: 'Easy',
  bestTime: '',
  groupSize: '',
  transportation: '',
  startPoint: '',
  endPoint: '',
  guide: { name: '', image: '', experience: '', languages: [], intro: '', phone: '', email: '', whatsapp: '' },
  placesCoveredDetails: [],
  timeline: [],
  galleryImages: [],
  videos: [],
  mapMarkers: [],
  reviews: []
};

type TabType = 'basic' | 'details' | 'contact' | 'itinerary' | 'media';

const AdminTourism = () => {
  const { tourism, updateTourism } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TourTrip | null>(null);
  const [formData, setFormData] = useState<Partial<TourTrip>>(emptyForm);
  const [itemToDelete, setItemToDelete] = useState<TourTrip | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('basic');

  // Journey States
  const [subView, setSubView] = useState<'packages' | 'journeys'>('packages');
  const [journeys, setJourneys] = useState<any[]>([]);
  const [journeysSearch, setJourneysSearch] = useState('');
  const [journeysTab, setJourneysTab] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');

  const fetchJourneys = async () => {
    try {
      const user = auth.currentUser;
      const token = user ? await user.getIdToken() : '';
      const res = await fetch('http://localhost:5000/api/v1/journeys/admin/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.data?.journeys) {
        setJourneys(data.data.journeys);
      }
    } catch (e) {
      console.error('Failed to fetch journeys for admin:', e);
    }
  };

  useEffect(() => {
    fetchJourneys();
  }, []);

  const handleApproveJourney = async (id: string) => {
    try {
      const user = auth.currentUser;
      const token = user ? await user.getIdToken() : '';
      const res = await fetch(`http://localhost:5000/api/v1/journeys/${id}/approve`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setJourneys(prev => prev.map(j => j.id === id ? { ...j, status: 'APPROVED' } : j));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRejectJourney = async (id: string) => {
    try {
      const user = auth.currentUser;
      const token = user ? await user.getIdToken() : '';
      const res = await fetch(`http://localhost:5000/api/v1/journeys/${id}/reject`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setJourneys(prev => prev.map(j => j.id === id ? { ...j, status: 'REJECTED' } : j));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredData = tourism.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingItem(null);
    setFormData(emptyForm);
    setActiveTab('basic');
    setIsModalOpen(true);
  };

  const handleEdit = (item: TourTrip) => {
    setEditingItem(item);
    setFormData(JSON.parse(JSON.stringify(item))); // Deep copy to avoid mutating state directly
    setActiveTab('basic');
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: TourTrip) => {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      updateTourism(tourism.filter(t => t.id !== itemToDelete.id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateTourism(tourism.map(t => t.id === editingItem.id ? { ...t, ...formData as TourTrip } : t));
    } else {
      updateTourism([{ ...formData as TourTrip, id: Date.now().toString() }, ...tourism]);
    }
    setIsModalOpen(false);
  };

  // Helper arrays
  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Info },
    { id: 'details', label: 'Overview', icon: LayoutList },
    { id: 'contact', label: 'Contact & Guide', icon: Phone },
    { id: 'itinerary', label: 'Itinerary', icon: Map },
    { id: 'media', label: 'Media & Map', icon: ImageIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-view Switcher */}
      <div className="flex gap-4 border-b border-white/10 pb-4">
        <button
          onClick={() => setSubView('packages')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${subView === 'packages' ? 'bg-[#F4A261] text-black font-sans' : 'text-white/60 hover:text-white bg-white/5 font-sans'
            }`}
        >
          Tour Packages
        </button>
        <button
          onClick={() => setSubView('journeys')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${subView === 'journeys' ? 'bg-[#F4A261] text-black font-sans' : 'text-white/60 hover:text-white bg-white/5 font-sans'
            }`}
        >
          Community Journeys
          {journeys.filter(j => j.status === 'PENDING').length > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold ml-1">
              {journeys.filter(j => j.status === 'PENDING').length}
            </span>
          )}
        </button>
      </div>

      {subView === 'packages' ? (
        <>
          <AdminTable
            title="Tourism Packages"
            description="Manage tour packages, providers, and itineraries."
            data={filteredData}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            columns={[
              {
                header: 'Image',
                accessor: (item) => (
                  <div className="w-16 h-10 rounded-lg overflow-hidden bg-white/5 shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )
              },
              { header: 'Title', accessor: 'title', className: 'font-semibold text-white' },
              { header: 'Provider', accessor: 'provider' },
            ]}
          />

          <AdminModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingItem ? 'Edit Tour Package' : 'Add Tour Package'}
            maxWidth="max-w-5xl"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Tabs Sidebar */}
              <div className="w-full md:w-48 shrink-0 flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                        ? 'bg-[#F4A261] text-black'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  )
                })}
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="flex-1 space-y-6 min-w-0">
                <div className="bg-black/20 p-6 rounded-2xl border border-white/10 min-h-[500px]">

                  {/* TAB 1: BASIC */}
                  {activeTab === 'basic' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AdminInput
                          label="Package Title"
                          value={formData.title || ''}
                          onChange={e => setFormData({ ...formData, title: e.target.value })}
                          required
                        />

                      </div>

                      <AdminInput
                        label="Main Image URL"
                        value={formData.image || ''}
                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                        required
                      />
                      <AdminImagePreview url={formData.image || ''} />
                    </div>
                  )}

                  {/* TAB 2: OVERVIEW */}
                  {activeTab === 'details' && (
                    <div className="space-y-4 animate-fade-in">
                      <AdminTextarea
                        label="Journey Motto (Short Hook)"
                        value={formData.description || ''}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        required
                        rows={2}
                      />
                      <AdminTextarea
                        label="Overview Text (Detailed Description)"
                        value={formData.overviewText || ''}
                        onChange={e => setFormData({ ...formData, overviewText: e.target.value })}
                        rows={4}
                      />

                    </div>
                  )}

                  {/* TAB 3: CONTACT & GUIDE */}
                  {activeTab === 'contact' && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-4">
                        <h4 className="text-white font-medium">Agency Contact Info</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <AdminInput
                            label="Agency Phone Number"
                            value={formData.phone || ''}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          />
                          <AdminInput
                            label="Agency WhatsApp Number"
                            value={formData.whatsapp || ''}
                            onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                          />
                          <AdminInput
                            label="Agency Email Address"
                            value={formData.email || ''}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                          />
                          <AdminInput
                            label="Emergency Contact"
                            value={formData.emergencyContact || ''}
                            onChange={e => setFormData({ ...formData, emergencyContact: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-4">
                        <h4 className="text-white font-medium">Tour Guide Profile</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <AdminInput
                            label="Guide Name"
                            value={formData.guide?.name || ''}
                            onChange={e => setFormData({ ...formData, guide: { ...(formData.guide as any), name: e.target.value } })}
                          />
                          <AdminInput
                            label="Guide Image URL"
                            value={formData.guide?.image || ''}
                            onChange={e => setFormData({ ...formData, guide: { ...(formData.guide as any), image: e.target.value } })}
                          />
                          <AdminInput
                            label="Experience (e.g. 10+ Years)"
                            value={formData.guide?.experience || ''}
                            onChange={e => setFormData({ ...formData, guide: { ...(formData.guide as any), experience: e.target.value } })}
                          />
                          <AdminInput
                            label="Languages (comma separated)"
                            value={formData.guide?.languages?.join(', ') || ''}
                            onChange={e => setFormData({ ...formData, guide: { ...(formData.guide as any), languages: e.target.value.split(',').map(s => s.trim()) } })}
                          />
                          <AdminInput
                            label="Guide Cell Number"
                            value={formData.guide?.phone || ''}
                            onChange={e => setFormData({ ...formData, guide: { ...(formData.guide as any), phone: e.target.value } })}
                          />
                          <AdminInput
                            label="Guide WhatsApp Number"
                            value={formData.guide?.whatsapp || ''}
                            onChange={e => setFormData({ ...formData, guide: { ...(formData.guide as any), whatsapp: e.target.value } })}
                          />
                        </div>

                      </div>
                    </div>
                  )}

                  {/* TAB 4: ITINERARY */}
                  {activeTab === 'itinerary' && (
                    <div className="space-y-6 animate-fade-in">

                      {/* Places Covered */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-white font-medium">Places Covered</h4>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, placesCoveredDetails: [...(formData.placesCoveredDetails || []), { name: '', description: '', image: '', duration: '', importance: '' }] })}
                            className="text-xs flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg text-white hover:bg-white/20"
                          >
                            <Plus size={14} /> Add Place
                          </button>
                        </div>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                          {(formData.placesCoveredDetails || []).map((place, index) => (
                            <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10 relative group">
                              <button type="button" onClick={() => {
                                const newArr = [...(formData.placesCoveredDetails || [])];
                                newArr.splice(index, 1);
                                setFormData({ ...formData, placesCoveredDetails: newArr });
                              }} className="absolute top-3 right-3 text-white/40 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <Trash2 size={16} />
                              </button>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                                <AdminInput label="Place Name" value={place.name} onChange={e => { const arr = [...formData.placesCoveredDetails!]; arr[index].name = e.target.value; setFormData({ ...formData, placesCoveredDetails: arr }) }} />
                                <AdminInput label="Image URL" value={place.image} onChange={e => { const arr = [...formData.placesCoveredDetails!]; arr[index].image = e.target.value; setFormData({ ...formData, placesCoveredDetails: arr }) }} />
                              </div>
                              <AdminTextarea label="Description" value={place.description} rows={2} onChange={e => { const arr = [...formData.placesCoveredDetails!]; arr[index].description = e.target.value; setFormData({ ...formData, placesCoveredDetails: arr }) }} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-white font-medium">Timeline (Days)</h4>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, timeline: [...(formData.timeline || []), { day: (formData.timeline?.length || 0) + 1, title: '', activities: [] }] })}
                            className="text-xs flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg text-white hover:bg-white/20"
                          >
                            <Plus size={14} /> Add Day
                          </button>
                        </div>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                          {(formData.timeline || []).map((day, index) => (
                            <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10 relative">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex-1 mr-4 grid grid-cols-2 gap-3">
                                  <AdminInput label={`Day ${day.day} Title`} value={day.title} onChange={e => { const arr = [...formData.timeline!]; arr[index].title = e.target.value; setFormData({ ...formData, timeline: arr }) }} />
                                </div>
                                <button type="button" onClick={() => {
                                  const newArr = [...(formData.timeline || [])];
                                  newArr.splice(index, 1);
                                  setFormData({ ...formData, timeline: newArr });
                                }} className="text-white/40 hover:text-red-400 mt-6">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                              <div className="pl-4 border-l-2 border-white/10 mt-2 space-y-3">
                                {day.activities.map((act, actIdx) => (
                                  <div key={actIdx} className="relative group p-3 bg-black/20 rounded-lg">
                                    <button type="button" onClick={() => {
                                      const arr = [...formData.timeline!]; arr[index].activities.splice(actIdx, 1); setFormData({ ...formData, timeline: arr });
                                    }} className="absolute top-2 right-2 text-white/40 hover:text-red-400 opacity-0 group-hover:opacity-100 z-10"><Trash2 size={14} /></button>
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                      <AdminInput label="Time" value={act.time} onChange={e => { const arr = [...formData.timeline!]; arr[index].activities[actIdx].time = e.target.value; setFormData({ ...formData, timeline: arr }) }} />
                                      <AdminInput label="Activity Name" value={act.activity} onChange={e => { const arr = [...formData.timeline!]; arr[index].activities[actIdx].activity = e.target.value; setFormData({ ...formData, timeline: arr }) }} />
                                    </div>
                                    <AdminTextarea label="Activity Desc" value={act.description} rows={1} onChange={e => { const arr = [...formData.timeline!]; arr[index].activities[actIdx].description = e.target.value; setFormData({ ...formData, timeline: arr }) }} />
                                  </div>
                                ))}
                                <button type="button" onClick={() => {
                                  const arr = [...formData.timeline!];
                                  arr[index].activities.push({ time: '', activity: '', description: '' });
                                  setFormData({ ...formData, timeline: arr });
                                }} className="text-xs text-[#F4A261] hover:text-[#D4A017]">+ Add Activity</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 5: MEDIA & REVIEWS */}
                  {activeTab === 'media' && (
                    <div className="space-y-6 animate-fade-in">

                      {/* Gallery */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-white font-medium">Gallery Images</h4>
                          <button type="button" onClick={() => setFormData({ ...formData, galleryImages: [...(formData.galleryImages || []), ''] })} className="text-xs flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg text-white hover:bg-white/20">
                            <Plus size={14} /> Add Image
                          </button>
                        </div>
                        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                          {(formData.galleryImages || []).map((url, index) => (
                            <div key={index} className="flex gap-2 relative">
                              <input type="text" value={url} onChange={e => { const arr = [...formData.galleryImages!]; arr[index] = e.target.value; setFormData({ ...formData, galleryImages: arr }) }} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#F4A261]/50 focus:ring-1 focus:ring-[#F4A261]/50" placeholder="Image URL" />
                              <button type="button" onClick={() => { const arr = [...formData.galleryImages!]; arr.splice(index, 1); setFormData({ ...formData, galleryImages: arr }) }} className="p-2 text-white/40 hover:text-red-400 bg-white/5 rounded-lg border border-white/10"><Trash2 size={16} /></button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-white font-medium hover:bg-white/5 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#F4A261] text-black font-bold hover:bg-[#D4A017] transition-colors">
                    {editingItem ? 'Save Changes' : 'Add Package'}
                  </button>
                </div>
              </form>
            </div>
          </AdminModal>

          <AdminDeleteConfirm
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={confirmDelete}
            itemName={itemToDelete?.title || ''}
          />
        </>
      ) : (
        <div className="space-y-6 animate-fade-in font-sans">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white font-display tracking-tight">Community Journeys</h2>
              <p className="text-white/40 text-sm mt-1">Review and approve customer-created itineraries and custom trips.</p>
            </div>
            <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-2.5">
              <Clock size={16} className="text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-sm">{journeys.filter(j => j.status === 'PENDING').length} awaiting review</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-1.5 font-sans">
            {(['PENDING', 'APPROVED', 'REJECTED'] as const).map((key) => {
              const count = journeys.filter(j => j.status === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setJourneysTab(key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${journeysTab === key
                    ? 'bg-[#F4A261] text-black shadow-lg shadow-[#F4A261]/20'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {key === 'PENDING' && <Clock size={15} />}
                  {key === 'APPROVED' && <CheckCircle size={15} />}
                  {key === 'REJECTED' && <XCircle size={15} />}
                  <span className="hidden sm:inline">{key === 'PENDING' ? 'Pending Approval' : key === 'APPROVED' ? 'Approved' : 'Rejected'}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${journeysTab === key ? 'bg-black/20 text-black' : 'bg-white/10 text-white/60'
                    }`}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={journeysSearch}
              onChange={e => setJourneysSearch(e.target.value)}
              placeholder="Search journeys..."
              className="w-full bg-[#1E1E1E]/40 border border-white/10 rounded-xl pl-4 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F4A261]/40 transition-colors"
            />
          </div>

          {/* List of Journeys */}
          <div className="space-y-4">
            {journeys
              .filter(j => j.status === journeysTab && j.title.toLowerCase().includes(journeysSearch.toLowerCase()))
              .map((journey) => (
                <div key={journey.id} className="bg-[#1E1E1E]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-white font-serif">{journey.title}</h3>
                        <span className="text-xs bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded border border-brand-gold/20 font-bold uppercase tracking-wider">{journey.duration || 'Flexible'}</span>
                      </div>
                      {(() => {
                        let desc = journey.description || '';
                        if (desc.startsWith('{"__isImmersivePackage"')) {
                          try {
                            const parsed = JSON.parse(desc);
                            if (parsed.__isImmersivePackage) {
                              desc = parsed.realDescription || '';
                            }
                          } catch (e) { }
                        }
                        return <p className="text-white/75 text-sm max-w-3xl leading-relaxed">{desc}</p>;
                      })()}

                      {journey.stops && journey.stops.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          <span className="text-xs text-white/40 font-semibold uppercase tracking-wider font-sans">Stops:</span>
                          {journey.stops.map((stop: string, idx: number) => (
                            <span key={idx} className="bg-white/5 text-white/70 text-xs px-2.5 py-1 rounded-full border border-white/10 font-sans">{stop}</span>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/50 pt-2 font-mono">
                        {journey.author && (
                          <span>Submitted by: <strong className="text-white/80">{journey.author.name}</strong></span>
                        )}
                        {journey.budget && (
                          <span>Budget: <strong className="text-white/80">{journey.budget}</strong></span>
                        )}
                        {journey.district && (
                          <span>District: <strong className="text-white/80">{journey.district}</strong></span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 self-stretch md:self-auto justify-end md:justify-start items-center">
                      {journeysTab === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleRejectJourney(journey.id)}
                            className="bg-red-500/10 border border-red-500/20 text-red-400 p-2.5 rounded-xl hover:bg-red-500/20 transition-all flex items-center gap-2 text-sm font-semibold"
                          >
                            <XCircle size={16} /> Reject
                          </button>
                          <button
                            onClick={() => handleApproveJourney(journey.id)}
                            className="bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 px-4 py-2.5 rounded-xl hover:bg-emerald-500/25 shadow-lg shadow-emerald-500/10 transition-all flex items-center gap-2 text-sm font-semibold"
                          >
                            <CheckCircle size={16} /> Approve
                          </button>
                        </>
                      )}

                      {journeysTab === 'APPROVED' && (
                        <button
                          onClick={() => handleRejectJourney(journey.id)}
                          className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2.5 rounded-xl hover:bg-red-500/20 transition-all flex items-center gap-2 text-sm font-semibold"
                        >
                          <XCircle size={16} /> Revoke / Reject
                        </button>
                      )}

                      {journeysTab === 'REJECTED' && (
                        <button
                          onClick={() => handleApproveJourney(journey.id)}
                          className="bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 px-4 py-2.5 rounded-xl hover:bg-emerald-500/25 transition-all flex items-center gap-2 text-sm font-semibold"
                        >
                          <CheckCircle size={16} /> Re-Approve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

            {journeys.filter(j => j.status === journeysTab && j.title.toLowerCase().includes(journeysSearch.toLowerCase())).length === 0 && (
              <div className="text-center py-12 bg-white/[0.02] border border-white/[0.05] rounded-3xl backdrop-blur-md">
                <Clock className="mx-auto text-white/20 mb-3" size={40} />
                <p className="text-white/40 font-medium font-sans">No journeys found in this tab.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTourism;
