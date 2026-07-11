import { useState } from 'react';
import { useAdminData } from '../../data/AdminContext';
import { AdminTable } from '../../components/admin/AdminTable';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminInput, AdminTextarea, AdminSelect, AdminImagePreview } from '../../components/admin/AdminFormField';
import { AdminDeleteConfirm } from '../../components/admin/AdminDeleteConfirm';
import type { CultureItem } from '../../data/cultureData';

const emptyForm: Partial<CultureItem> = {
  title: '',
  type: 'Festival',
  district: '',
  image: '',
  description: '',
  longDescription: '',
  videoUrl: '',
};

const AdminCulture = () => {
  const { culture, updateCulture } = useAdminData();
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
    setFormData({ ...item });
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
      >
        <form onSubmit={handleSubmit} className="space-y-4">
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
              <option value="Art">Art</option>
            </AdminSelect>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdminInput
              label="District"
              value={formData.district || ''}
              onChange={e => setFormData({ ...formData, district: e.target.value })}
              required
            />
            <AdminInput
              label="YouTube Video URL"
              value={formData.videoUrl || ''}
              onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
              placeholder="e.g. https://www.youtube.com/embed/..."
            />
          </div>

          <AdminInput
            label="Image URL"
            value={formData.image || ''}
            onChange={e => setFormData({ ...formData, image: e.target.value })}
            required
          />
          <AdminImagePreview url={formData.image || ''} />

          <AdminTextarea
            label="Short Description"
            value={formData.description || ''}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            required
            rows={3}
          />

          <AdminTextarea
            label="Long Description"
            value={formData.longDescription || ''}
            onChange={e => setFormData({ ...formData, longDescription: e.target.value })}
            rows={5}
          />

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-white font-medium hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#D4A017] text-black font-bold hover:bg-[#b8860b] transition-colors">
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
