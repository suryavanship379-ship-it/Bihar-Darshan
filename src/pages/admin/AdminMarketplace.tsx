import { useState } from 'react';
import { useAdminData } from '../../data/AdminContext';
import type { ProductItem } from '../../data/AdminContext';
import { AdminTable } from '../../components/admin/AdminTable';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminInput, AdminTextarea, AdminImagePreview } from '../../components/admin/AdminFormField';
import { AdminDeleteConfirm } from '../../components/admin/AdminDeleteConfirm';

const emptyForm: Partial<ProductItem> = {
  id: 0,
  businessName: '',
  productName: '',
  category: '',
  image: '',
  description: '',
  contact: '',
};

const AdminMarketplace = () => {
  const { products, updateProducts } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProductItem | null>(null);
  const [formData, setFormData] = useState<Partial<ProductItem>>(emptyForm);
  const [itemToDelete, setItemToDelete] = useState<ProductItem | null>(null);

  const filteredData = products.filter(item => 
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingItem(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const handleEdit = (item: ProductItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: ProductItem) => {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      updateProducts(products.filter(p => p.id !== itemToDelete.id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateProducts(products.map(p => p.id === editingItem.id ? { ...p, ...formData as ProductItem } : p));
    } else {
      updateProducts([{ ...formData as ProductItem, id: Date.now() }, ...products]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <AdminTable
        title="Marketplace"
        description="Manage local products and businesses."
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
                <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
              </div>
            )
          },
          { header: 'Product Name', accessor: 'productName', className: 'font-semibold text-white' },
          { header: 'Business', accessor: 'businessName' },
          { header: 'Category', accessor: 'category' },
        ]}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Product' : 'Add Product'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdminInput
              label="Product Name"
              value={formData.productName || ''}
              onChange={e => setFormData({ ...formData, productName: e.target.value })}
              required
            />
            <AdminInput
              label="Business Name"
              value={formData.businessName || ''}
              onChange={e => setFormData({ ...formData, businessName: e.target.value })}
              required
            />
            <AdminInput
              label="Category"
              value={formData.category || ''}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              required
            />
            <AdminInput
              label="Contact Info"
              value={formData.contact || ''}
              onChange={e => setFormData({ ...formData, contact: e.target.value })}
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
              {editingItem ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </AdminModal>

      <AdminDeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.productName || ''}
      />
    </div>
  );
};

export default AdminMarketplace;
