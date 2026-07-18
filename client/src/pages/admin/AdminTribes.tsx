import { useState } from 'react';
import { useAdminData } from '../../data/AdminContext';
import type { TribeItem } from '../../data/AdminContext';
import { AdminTable } from '../../components/admin/AdminTable';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminInput, AdminTextarea, AdminImagePreview } from '../../components/admin/AdminFormField';
import { AdminDeleteConfirm } from '../../components/admin/AdminDeleteConfirm';
import { AdminCultureSectionsEditor } from '../../components/admin/AdminCultureSectionsEditor';
import type { CultureSection } from '../../components/tribals/CulturalHighlightsGrid';

const emptyForm: Partial<TribeItem> = {
  id: '',
  hindiName: 'आदिवासी',
  englishName: '',
  shortDesc: '',
  image: '',
  cultureSections: [],
};

const AdminTribes = () => {
  const { tribes, updateTribes } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TribeItem | null>(null);
  const [formData, setFormData] = useState<Partial<TribeItem>>(emptyForm);
  const [itemToDelete, setItemToDelete] = useState<TribeItem | null>(null);

  const filteredData = tribes.filter(item =>
    item.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.hindiName.includes(searchTerm)
  );

  const handleAdd = () => {
    setEditingItem(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const handleEdit = (item: TribeItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: TribeItem) => {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      updateTribes(tribes.filter(t => t.id !== itemToDelete.id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateTribes(tribes.map(t => t.id === editingItem.id ? { ...t, ...formData as TribeItem } : t));
    } else {
      const newId = formData.englishName?.toLowerCase().replace(/\s+/g, '') || `tribe-${Date.now()}`;
      updateTribes([...tribes, { ...formData as TribeItem, id: newId }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <AdminTable
        title="Tribal Groups"
        description="Manage information about indigenous tribes."
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
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0 p-1">
                <img src={item.image} alt={item.englishName} className="w-full h-full object-contain filter invert" />
              </div>
            )
          },
          { header: 'English Name', accessor: 'englishName', className: 'font-semibold text-white' },
          { header: 'Hindi Name', accessor: 'hindiName' },
          {
            header: 'Description',
            accessor: (item) => <span className="truncate max-w-xs block">{item.shortDesc}</span>
          },
        ]}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Tribe' : 'Add Tribe'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdminInput
              label="English Name"
              value={formData.englishName || ''}
              onChange={e => setFormData({ ...formData, englishName: e.target.value })}
              required
            />
            <AdminInput
              label="Hindi Name"
              value={formData.hindiName || ''}
              onChange={e => setFormData({ ...formData, hindiName: e.target.value })}
              required
            />
          </div>

          <AdminInput
            label="Image/Icon URL"
            value={formData.image || ''}
            onChange={e => setFormData({ ...formData, image: e.target.value })}
            required
            placeholder="/images/tribals/..."
          />
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 w-fit">
            <AdminImagePreview url={formData.image || ''} />
          </div>

          <AdminTextarea
            label="Short Description"
            value={formData.shortDesc || ''}
            onChange={e => setFormData({ ...formData, shortDesc: e.target.value })}
            required
            rows={3}
          />

          <div className="pt-6 border-t border-white/10 mt-2">
            <h3 className="text-lg font-bold text-white mb-4">Detailed Page Content (Read More)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AdminInput
                label="Left Title"
                value={formData.leftTitle || ''}
                onChange={e => setFormData({ ...formData, leftTitle: e.target.value })}
              />
              <AdminTextarea
                label="Left Description"
                value={formData.leftDesc || ''}
                onChange={e => setFormData({ ...formData, leftDesc: e.target.value })}
                rows={4}
              />
              <AdminInput
                label="Right Title"
                value={formData.rightTitle || ''}
                onChange={e => setFormData({ ...formData, rightTitle: e.target.value })}
              />
              <AdminTextarea
                label="Right Description"
                value={formData.rightDesc || ''}
                onChange={e => setFormData({ ...formData, rightDesc: e.target.value })}
                rows={4}
              />
            </div>
            <div className="mt-4">
              <AdminTextarea
                label="Bottom Quote/Description"
                value={formData.bottomDesc || ''}
                onChange={e => setFormData({ ...formData, bottomDesc: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6">
            <AdminCultureSectionsEditor
              sections={formData.cultureSections || []}
              onChange={(sections: CultureSection[]) => setFormData({ ...formData, cultureSections: sections })}
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-white font-medium hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#F4A261] text-black font-bold hover:bg-[#F4A261] transition-colors">
              {editingItem ? 'Save Changes' : 'Add Tribe'}
            </button>
          </div>
        </form>
      </AdminModal>

      <AdminDeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.englishName || ''}
      />
    </div>
  );
};

export default AdminTribes;
