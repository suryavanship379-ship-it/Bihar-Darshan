import { useState } from 'react';
import { useAdminData } from '../../data/AdminContext';
import { AdminTable } from '../../components/admin/AdminTable';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminInput, AdminTextarea, AdminSelect, AdminImagePreview, AdminImageUpload } from '../../components/admin/AdminFormField';
import { AdminDeleteConfirm } from '../../components/admin/AdminDeleteConfirm';
import type { CultureItem } from '../../data/cultureData';
import { Plus, Trash2, CheckCircle, XCircle, LayoutList, ListChecks } from 'lucide-react';
import { auth } from '../../lib/firebase';

const emptyForm: Partial<CultureItem> = {
  title: '',
  type: 'Festival',
  district: '',
  image: '',
  description: '',
  longDescription: '',
  videoUrl: '',
  galleryImages: [],
  extendedDetails: [],
};

const AdminCulture = () => {
  const { culture, refreshCulture, districts } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CultureItem | null>(null);
  const [formData, setFormData] = useState<Partial<CultureItem>>(emptyForm);
  const [itemToDelete, setItemToDelete] = useState<CultureItem | null>(null);

  // Sub-view Tab Control
  const [subView, setSubView] = useState<'approved' | 'pending'>('approved');

  // Filter items by status
  const approvedItems = culture.filter(item => (item as any).status === 'APPROVED' || !(item as any).status);
  const pendingItems = culture.filter(item => (item as any).status === 'PENDING');

  const activeDataList = subView === 'approved' ? approvedItems : pendingItems;

  const filteredData = activeDataList.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = async (id: string | number) => {
    try {
      const user = auth.currentUser;
      const token = user ? await user.getIdToken() : '';
      const res = await fetch(`http://localhost:5000/api/v1/discover/${id}/approve`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        refreshCulture();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleReject = async (id: string | number) => {
    try {
      const user = auth.currentUser;
      const token = user ? await user.getIdToken() : '';
      const res = await fetch(`http://localhost:5000/api/v1/discover/${id}/reject`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        refreshCulture();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const handleEdit = (item: CultureItem) => {
    setEditingItem(item);
    setFormData(JSON.parse(JSON.stringify(item)));
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: CultureItem) => {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        const user = auth.currentUser;
        const token = user ? await user.getIdToken() : '';
        const res = await fetch(`http://localhost:5000/api/v1/discover/${itemToDelete.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          refreshCulture();
          setIsDeleteOpen(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      const token = user ? await user.getIdToken() : '';

      const payload = {
        title: formData.title,
        category: formData.type === 'Food' ? 'FOOD' : 'FESTIVAL',
        image: formData.image,
        description: formData.description,
        longDescription: formData.longDescription || '',
        videoUrl: formData.videoUrl || '',
        galleryImages: formData.galleryImages || [],
        extendedDetails: formData.extendedDetails || [],
        district: formData.district || 'Bihar',
        author: formData.submittedBy || 'Admin',
        status: 'APPROVED', // items created/edited by Admin are immediately approved
      };

      let response;
      if (editingItem) {
        response = await fetch(`http://localhost:5000/api/v1/discover/${editingItem.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch('http://localhost:5000/api/v1/discover', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      }

      if (response.ok) {
        refreshCulture();
        setIsModalOpen(false);
      } else {
        console.error('Failed to save to database:', await response.text());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGalleryChange = (index: number, value: string) => {
    const newGallery = [...(formData.galleryImages || [])];
    newGallery[index] = value;
    setFormData({ ...formData, galleryImages: newGallery });
  };

  const addGalleryImage = () => {
    setFormData({ ...formData, galleryImages: [...(formData.galleryImages || []), ''] });
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = [...(formData.galleryImages || [])];
    newGallery.splice(index, 1);
    setFormData({ ...formData, galleryImages: newGallery });
  };

  return (
    <div className="space-y-6">
      {/* Sub-view switcher */}
      <div className="flex gap-4 border-b border-white/10 pb-4">
        <button
          onClick={() => setSubView('approved')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition ${subView === 'approved' ? 'bg-[#EAB308] text-black' : 'text-white/60 hover:text-white'
            }`}
        >
          <LayoutList size={18} /> Discover Database ({approvedItems.length})
        </button>
        <button
          onClick={() => setSubView('pending')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition relative ${subView === 'pending' ? 'bg-[#EAB308] text-black' : 'text-white/60 hover:text-white'
            }`}
        >
          <ListChecks size={18} /> Pending Submissions
          {pendingItems.length > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {pendingItems.length}
            </span>
          )}
        </button>
      </div>

      <AdminTable
        title={subView === 'approved' ? "Culture & Discover Items" : "Pending Discover Submissions"}
        description={subView === 'approved' ? "Manage approved festivals, foods, and arts of Bihar." : "Review user-submitted festivals and foods of Bihar."}
        data={filteredData}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAdd={subView === 'approved' ? handleAdd : undefined}
        onEdit={subView === 'approved' ? handleEdit : undefined}
        onDelete={subView === 'approved' ? handleDeleteClick : undefined}
        columns={[
          {
            header: 'Image',
            accessor: (item) => (
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
            )
          },
          { header: 'Title', accessor: 'title', className: 'font-semibold text-white' },
          { header: 'Type', accessor: 'type' },
          { header: 'District', accessor: 'district' },
          {
            header: 'Actions',
            accessor: (item) => {
              if (subView === 'pending') {
                return (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="flex items-center gap-1.5 bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-green-500/20"
                    >
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="flex items-center gap-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-red-500/20"
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                );
              }
              return null;
            }
          }
        ]}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Culture Item' : 'Add Culture Item'}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ROW 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdminInput
              label="Title"
              value={formData.title || ''}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <AdminSelect
              label="Type"
              value={formData.type || 'Festival'}
              onChange={e => setFormData({ ...formData, type: e.target.value as any })}
            >
              <option value="Festival">Festival</option>
              <option value="Food">Food</option>
            </AdminSelect>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdminSelect
              label="District"
              value={formData.district || ''}
              onChange={e => setFormData({ ...formData, district: e.target.value })}
              required
            >
              <option value="">Select a District</option>
              {districts.map(d => (
                <option key={d.name} value={d.name}>{d.name}</option>
              ))}
            </AdminSelect>
            <AdminImageUpload
              label="Thumbnail Image"
              value={formData.image || ''}
              onChange={val => setFormData({ ...formData, image: val })}
              required
            />
          </div>

          {/* ROW 4 */}
          <AdminTextarea
            label="Short Description"
            value={formData.description || ''}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            required
            rows={3}
          />

          <AdminTextarea
            label="Long Description / Details"
            value={formData.longDescription || ''}
            onChange={e => setFormData({ ...formData, longDescription: e.target.value })}
            rows={5}
            placeholder="Add rich historical context or details to show on details page"
          />

          <AdminInput
            label="Video Embed URL (Optional)"
            value={formData.videoUrl || ''}
            onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
            placeholder="e.g. https://www.youtube.com/embed/XXXXXX"
          />

          {/* ROW 5: Gallery */}
          <div className="pt-2 border-t border-white/10">
            <div className="flex justify-between items-center mb-4 mt-2">
              <label className="block text-sm font-medium text-white/70">Gallery Image URLs</label>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {(formData.galleryImages || []).map((url, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10 relative group">
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-3 right-3 text-white/40 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="w-full">
                    <AdminImageUpload
                      label={`Gallery Image ${index + 1}`}
                      value={url}
                      onChange={(val) => handleGalleryChange(index, val)}
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addGalleryImage}
                className="mt-2 text-sm flex items-center gap-1 bg-white/10 px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                <Plus size={16} /> Add Gallery Image
              </button>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-white font-medium hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#EAB308] text-black font-bold hover:bg-[#EAB308] transition-colors">
              {editingItem ? 'Save Changes' : 'Add Item'}
            </button>
          </div>
        </form>
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

export default AdminCulture;
