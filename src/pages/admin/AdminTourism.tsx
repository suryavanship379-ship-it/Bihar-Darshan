import { useState } from 'react';
import { useAdminData } from '../../data/AdminContext';
import { AdminTable } from '../../components/admin/AdminTable';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminInput, AdminTextarea, AdminImagePreview } from '../../components/admin/AdminFormField';
import { AdminDeleteConfirm } from '../../components/admin/AdminDeleteConfirm';
import type { TourTrip } from '../../data/tourismData';

const emptyForm: Partial<TourTrip> = {
  id: '',
  title: '',
  provider: '',
  price: '',
  duration: '',
  image: '',
  description: '',
  overviewText: '',
  places: [],
};

const AdminTourism = () => {
  const { tourism, updateTourism } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TourTrip | null>(null);
  const [formData, setFormData] = useState<Partial<TourTrip>>(emptyForm);
  const [itemToDelete, setItemToDelete] = useState<TourTrip | null>(null);

  const filteredData = tourism.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingItem(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const handleEdit = (item: TourTrip) => {
    setEditingItem(item);
    setFormData({ ...item });
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
          { header: 'Price', accessor: 'price' },
          { header: 'Duration', accessor: 'duration' },
        ]}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Tour Package' : 'Add Tour Package'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdminInput
              label="Package Title"
              value={formData.title || ''}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <AdminInput
              label="Provider Name"
              value={formData.provider || ''}
              onChange={e => setFormData({ ...formData, provider: e.target.value })}
              required
            />
            <AdminInput
              label="Price (e.g. ₹15,000)"
              value={formData.price || ''}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <AdminInput
              label="Duration (e.g. 3 Days, 2 Nights)"
              value={formData.duration || ''}
              onChange={e => setFormData({ ...formData, duration: e.target.value })}
              required
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
            rows={2}
          />
          
          <AdminTextarea
            label="Overview Text (Detailed)"
            value={formData.overviewText || ''}
            onChange={e => setFormData({ ...formData, overviewText: e.target.value })}
            rows={4}
          />

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-white font-medium hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#D4A017] text-black font-bold hover:bg-[#b8860b] transition-colors">
              {editingItem ? 'Save Changes' : 'Add Package'}
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

export default AdminTourism;
