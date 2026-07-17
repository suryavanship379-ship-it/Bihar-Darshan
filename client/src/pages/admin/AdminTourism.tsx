import { useState } from 'react';
import { useAdminData } from '../../data/AdminContext';
import { AdminTable } from '../../components/admin/AdminTable';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminInput, AdminTextarea, AdminImagePreview, AdminSelect } from '../../components/admin/AdminFormField';
import { AdminDeleteConfirm } from '../../components/admin/AdminDeleteConfirm';
import { Plus, Trash2, Info, LayoutList, Phone, Map, Image as ImageIcon } from 'lucide-react';
import type { TourTrip } from '../../data/tourismData';

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
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id 
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
                        onChange={e => setFormData({ ...formData, guide: { ...(formData.guide as any), languages: e.target.value.split(',').map(s=>s.trim()) } })}
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
                            <AdminInput label="Place Name" value={place.name} onChange={e => { const arr = [...formData.placesCoveredDetails!]; arr[index].name = e.target.value; setFormData({...formData, placesCoveredDetails: arr}) }} />
                            <AdminInput label="Image URL" value={place.image} onChange={e => { const arr = [...formData.placesCoveredDetails!]; arr[index].image = e.target.value; setFormData({...formData, placesCoveredDetails: arr}) }} />
                          </div>
                          <AdminTextarea label="Description" value={place.description} rows={2} onChange={e => { const arr = [...formData.placesCoveredDetails!]; arr[index].description = e.target.value; setFormData({...formData, placesCoveredDetails: arr}) }} />
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
                              <AdminInput label={`Day ${day.day} Title`} value={day.title} onChange={e => { const arr = [...formData.timeline!]; arr[index].title = e.target.value; setFormData({...formData, timeline: arr}) }} />
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
                                  const arr = [...formData.timeline!]; arr[index].activities.splice(actIdx, 1); setFormData({...formData, timeline: arr});
                                }} className="absolute top-2 right-2 text-white/40 hover:text-red-400 opacity-0 group-hover:opacity-100 z-10"><Trash2 size={14} /></button>
                                <div className="grid grid-cols-2 gap-2 mb-2">
                                  <AdminInput label="Time" value={act.time} onChange={e => { const arr = [...formData.timeline!]; arr[index].activities[actIdx].time = e.target.value; setFormData({...formData, timeline: arr}) }} />
                                  <AdminInput label="Activity Name" value={act.activity} onChange={e => { const arr = [...formData.timeline!]; arr[index].activities[actIdx].activity = e.target.value; setFormData({...formData, timeline: arr}) }} />
                                </div>
                                <AdminTextarea label="Activity Desc" value={act.description} rows={1} onChange={e => { const arr = [...formData.timeline!]; arr[index].activities[actIdx].description = e.target.value; setFormData({...formData, timeline: arr}) }} />
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
                          <input type="text" value={url} onChange={e => { const arr = [...formData.galleryImages!]; arr[index] = e.target.value; setFormData({...formData, galleryImages: arr}) }} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#F4A261]/50 focus:ring-1 focus:ring-[#F4A261]/50" placeholder="Image URL" />
                          <button type="button" onClick={() => { const arr = [...formData.galleryImages!]; arr.splice(index, 1); setFormData({...formData, galleryImages: arr}) }} className="p-2 text-white/40 hover:text-red-400 bg-white/5 rounded-lg border border-white/10"><Trash2 size={16} /></button>
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
    </div>
  );
};

export default AdminTourism;
