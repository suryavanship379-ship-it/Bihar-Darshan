import { useState } from 'react';
import { useAdminData } from '../../data/AdminContext';
import type { PersonalityItem } from '../../data/AdminContext';
import { AdminTable } from '../../components/admin/AdminTable';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminInput, AdminTextarea, AdminSelect, AdminImagePreview } from '../../components/admin/AdminFormField';
import { AdminDeleteConfirm } from '../../components/admin/AdminDeleteConfirm';

const emptyForm: Partial<PersonalityItem> = {
  id: 0,
  name: '',
  category: 'Historical',
  district: '',
  description: '',
  imageUrl: '',
};

const AdminPersonalities = () => {
  const { personalities, updatePersonalities } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PersonalityItem | null>(null);
  const [formData, setFormData] = useState<Partial<PersonalityItem>>(emptyForm);
  const [itemToDelete, setItemToDelete] = useState<PersonalityItem | null>(null);

  const filteredData = personalities.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingItem(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const handleEdit = (item: PersonalityItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: PersonalityItem) => {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      updatePersonalities(personalities.filter(p => p.id !== itemToDelete.id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updatePersonalities(personalities.map(p => p.id === editingItem.id ? { ...p, ...formData as PersonalityItem } : p));
    } else {
      updatePersonalities([{ ...formData as PersonalityItem, id: Date.now() }, ...personalities]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <AdminTable
        title="Personalities"
        description="Manage famous and historical figures of Bihar."
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
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 shrink-0 border border-white/10">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              </div>
            )
          },
          { header: 'Name', accessor: 'name', className: 'font-semibold text-white' },
          { header: 'Category', accessor: 'category' },
          { header: 'District', accessor: 'district' },
        ]}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Personality' : 'Add Personality'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdminInput
              label="Name"
              value={formData.name || ''}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <AdminSelect
              label="Category"
              value={formData.category || 'Historical'}
              onChange={e => setFormData({ ...formData, category: e.target.value as any })}
            >
              <option value="Historical">Historical</option>
              <option value="Literature">Literature</option>
              <option value="Arts & Cinema">Arts & Cinema</option>
              <option value="Politician">Politician</option>
              <option value="Sports">Sports</option>
            </AdminSelect>
          </div>

          <AdminInput
            label="Associated District"
            value={formData.district || ''}
            onChange={e => setFormData({ ...formData, district: e.target.value })}
            required
          />

          <AdminInput
            label="Portrait Image URL"
            value={formData.imageUrl || ''}
            onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
            required
          />
          <div className="w-32 h-32 rounded-full overflow-hidden mt-2 border-2 border-white/10">
             <img src={formData.imageUrl || ''} alt="Preview" className="w-full h-full object-cover bg-white/5" />
          </div>

          <AdminTextarea
            label="Biography / Description (Short Summary)"
            value={formData.description || ''}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            required
            rows={3}
          />

          <div className="pt-4 mt-2 border-t border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Detailed Content (Read Bio)</h3>
            <AdminTextarea
              label="Full Biography (Optional)"
              value={formData.fullBio || ''}
              onChange={e => setFormData({ ...formData, fullBio: e.target.value })}
              rows={8}
              placeholder="Leave empty to fall back to the short summary when the user clicks 'Read Bio'"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-white font-medium hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#EAB308] text-black font-bold hover:bg-[#EAB308] transition-colors">
              {editingItem ? 'Save Changes' : 'Add Personality'}
            </button>
          </div>
        </form>
      </AdminModal>

      <AdminDeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.name || ''}
      />
    </div>
  );
};

export default AdminPersonalities;
