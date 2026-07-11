import { useState } from 'react';
import { useAdminData } from '../../data/AdminContext';
import { AdminTable } from '../../components/admin/AdminTable';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminInput, AdminTextarea, AdminImagePreview } from '../../components/admin/AdminFormField';
import { AdminDeleteConfirm } from '../../components/admin/AdminDeleteConfirm';
import type { District } from '../../data/districtsData';

const emptyForm: Partial<District> = {
  name: '',
  image: '',
};

const AdminDistricts = () => {
  const { districts, updateDistricts } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<District | null>(null);
  const [formData, setFormData] = useState<Partial<District>>(emptyForm);
  const [itemToDelete, setItemToDelete] = useState<District | null>(null);

  const filteredData = districts.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingItem(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const handleEdit = (item: District) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: District) => {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      updateDistricts(districts.filter(d => d.name !== itemToDelete.name));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateDistricts(districts.map(d => d.name === editingItem.name ? { ...d, ...formData as District } : d));
    } else {
      updateDistricts([...districts, { ...formData as District }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <AdminTable
        title="Districts"
        description="Manage the 38 districts of Bihar and their overview data."
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
          { header: 'District Name', accessor: 'name', className: 'font-semibold text-white' },
        ]}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit District' : 'Add District'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <AdminInput
            label="District Name"
            value={formData.name || ''}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <AdminInput
            label="Image URL"
            value={formData.image || ''}
            onChange={e => setFormData({ ...formData, image: e.target.value })}
            required
          />
          <AdminImagePreview url={formData.image || ''} />

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-white font-medium hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#D4A017] text-black font-bold hover:bg-[#b8860b] transition-colors">
              {editingItem ? 'Save Changes' : 'Add District'}
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

export default AdminDistricts;
