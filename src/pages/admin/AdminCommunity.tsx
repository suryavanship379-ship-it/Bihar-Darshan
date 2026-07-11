import { useState } from 'react';
import { useAdminData } from '../../data/AdminContext';
import { AdminTable } from '../../components/admin/AdminTable';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminInput, AdminTextarea, AdminImagePreview } from '../../components/admin/AdminFormField';
import { AdminDeleteConfirm } from '../../components/admin/AdminDeleteConfirm';
import type { Community } from '../../data/communityData';

const emptyForm: Partial<Community> = {
  id: '',
  name: '',
  description: '',
  image: '',
  members: '0',
  category: '',
};

const AdminCommunity = () => {
  const { communities, updateCommunities } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Community | null>(null);
  const [formData, setFormData] = useState<Partial<Community>>(emptyForm);
  const [itemToDelete, setItemToDelete] = useState<Community | null>(null);

  const filteredData = communities.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingItem(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const handleEdit = (item: Community) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: Community) => {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      updateCommunities(communities.filter(c => c.id !== itemToDelete.id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateCommunities(communities.map(c => c.id === editingItem.id ? { ...c, ...formData as Community } : c));
    } else {
      updateCommunities([{ ...formData as Community, id: `comm-${Date.now()}` }, ...communities]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <AdminTable
        title="Communities"
        description="Manage active community groups."
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
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
            )
          },
          { header: 'Community Name', accessor: 'name', className: 'font-semibold text-white' },
          { header: 'Category', accessor: 'category' },
          { header: 'Members', accessor: 'members' },
        ]}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Community' : 'Add Community'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdminInput
              label="Community Name"
              value={formData.name || ''}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <AdminInput
              label="Category"
              value={formData.category || ''}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              required
            />
            <AdminInput
              label="Member Count"
              type="text"
              value={formData.members || ''}
              onChange={e => setFormData({ ...formData, members: e.target.value })}
              required
            />
          </div>

          <AdminInput
            label="Cover Image URL"
            value={formData.image || ''}
            onChange={e => setFormData({ ...formData, image: e.target.value })}
            required
          />
          <AdminImagePreview url={formData.image || ''} />

          <AdminTextarea
            label="Description"
            value={formData.description || ''}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            required
            rows={3}
          />

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-white font-medium hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#D4A017] text-black font-bold hover:bg-[#b8860b] transition-colors">
              {editingItem ? 'Save Changes' : 'Add Community'}
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

export default AdminCommunity;
