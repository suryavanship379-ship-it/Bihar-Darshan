import { useState } from 'react';
import { useAdminData } from '../../data/AdminContext';
import { AdminTable } from '../../components/admin/AdminTable';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminInput, AdminTextarea, AdminSelect, AdminImagePreview } from '../../components/admin/AdminFormField';
import { AdminDeleteConfirm } from '../../components/admin/AdminDeleteConfirm';
import type { CultureItem } from '../../data/cultureData';
import { Plus, Trash2 } from 'lucide-react';

const emptyForm: Partial<CultureItem> = {
  title: '',
  type: 'Festival',
  district: '',
  image: '',
  description: '',
  galleryImages: [],
};

const AdminCulture = () => {
  const { culture, updateCulture, districts } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CultureItem | null>(null);
  const [formData, setFormData] = useState<Partial<CultureItem>>(emptyForm);
  const [itemToDelete, setItemToDelete] = useState<CultureItem | null>(null);

  const filteredData = culture.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const confirmDelete = () => {
    if (itemToDelete) {
      updateCulture(culture.filter(c => c.id !== itemToDelete.id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateCulture(culture.map(c => c.id === editingItem.id ? { ...c, ...formData as CultureItem } : c));
    } else {
      updateCulture([{ ...formData as CultureItem, id: Date.now() }, ...culture]);
    }
    setIsModalOpen(false);
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
      <AdminTable
        title="Culture & Discover"
        description="Manage festivals, foods, and arts of Bihar."
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
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
            )
          },
          { header: 'Title', accessor: 'title', className: 'font-semibold text-white' },
          { header: 'Type', accessor: 'type' },
          { header: 'District', accessor: 'district' },
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
              <option value="Personalities">Personalities</option>
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
            <AdminInput
              label="Thumbnail Image URL"
              value={formData.image || ''}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
              required
            />
          </div>

          {/* ROW 3 */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Thumbnail Preview</label>
            <AdminImagePreview url={formData.image || ''} />
          </div>

          {/* ROW 4 */}
          <AdminTextarea
            label="Description"
            value={formData.description || ''}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            required
            rows={6}
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <AdminInput
                        label={`Image URL ${index + 1}`}
                        value={url}
                        onChange={(e) => handleGalleryChange(index, e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Preview</label>
                      <AdminImagePreview url={url} />
                    </div>
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
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#F4A261] text-black font-bold hover:bg-[#F4A261] transition-colors">
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
