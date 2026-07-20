import { useState } from 'react';
import { useAdminData } from '../../data/AdminContext';
import type { ProductItem } from '../../data/AdminContext';
import { AdminTable } from '../../components/admin/AdminTable';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminInput, AdminTextarea, AdminImagePreview, AdminImageUpload } from '../../components/admin/AdminFormField';
import { AdminDeleteConfirm } from '../../components/admin/AdminDeleteConfirm';
import { LayoutList, ListChecks, CheckCircle, XCircle } from 'lucide-react';

const emptyForm: Partial<ProductItem> = {
  businessName: '',
  productName: '',
  category: 'Art & Craft',
  image: '',
  images: [],
  description: '',
  contact: '',
  email: '',
  address: '',
  website: '',
  mapLink: '',
};

const AdminMarketplace = () => {
  const {
    products,
    approveProduct,
    rejectProduct,
    deleteProductDetail,
    updateProductDetail,
    createProductDetail,
  } = useAdminData();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProductItem | null>(null);
  const [formData, setFormData] = useState<Partial<ProductItem>>(emptyForm);
  const [itemToDelete, setItemToDelete] = useState<ProductItem | null>(null);

  // Sub-view Tab Control
  const [subView, setSubView] = useState<'approved' | 'pending'>('approved');

  // Filter items by status
  const approvedItems = products.filter(item => item.status === 'APPROVED' || !item.status);
  const pendingItems = products.filter(item => item.status === 'PENDING');

  const activeDataList = subView === 'approved' ? approvedItems : pendingItems;

  const filteredData = activeDataList.filter(item =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = async (id: string | number) => {
    try {
      await approveProduct(id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReject = async (id: string | number) => {
    try {
      await rejectProduct(id);
    } catch (e) {
      console.error(e);
    }
  };

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

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteProductDetail(itemToDelete.id);
        setIsDeleteOpen(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateProductDetail(editingItem.id, formData);
      } else {
        await createProductDetail({ ...formData, images: [formData.image || ''], status: 'APPROVED' }); // Admin additions are approved by default
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
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
          <LayoutList size={18} /> Marketplace Database ({approvedItems.length})
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
        title={subView === 'approved' ? "Marketplace Products" : "Pending Products"}
        description={subView === 'approved' ? "Manage local products and businesses on the marketplace." : "Review user-submitted products."}
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
                <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
              </div>
            )
          },
          { header: 'Product Name', accessor: 'productName', className: 'font-semibold text-white' },
          { header: 'Business', accessor: 'businessName' },
          { header: 'Category', accessor: 'category' },
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
        title={editingItem ? 'Edit Product' : 'Add Product'}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdminInput
              label="Product Name *"
              value={formData.productName || ''}
              onChange={e => setFormData({ ...formData, productName: e.target.value })}
              required
            />
            <AdminInput
              label="Business Name *"
              value={formData.businessName || ''}
              onChange={e => setFormData({ ...formData, businessName: e.target.value })}
              required
            />
            <AdminInput
              label="Category *"
              value={formData.category || ''}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              required
            />
            <AdminInput
              label="Contact Info *"
              value={formData.contact || ''}
              onChange={e => setFormData({ ...formData, contact: e.target.value })}
              required
            />
            <AdminInput
              label="Email Address"
              value={formData.email || ''}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <AdminInput
              label="Full Address (Optional)"
              value={formData.address || ''}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
            />
            <AdminInput
              label="Website Link (Optional)"
              value={formData.website || ''}
              onChange={e => setFormData({ ...formData, website: e.target.value })}
            />
            <AdminInput
              label="Google Maps Link (Optional)"
              value={formData.mapLink || ''}
              onChange={e => setFormData({ ...formData, mapLink: e.target.value })}
            />
          </div>

          <AdminImageUpload
            label="Image"
            value={formData.image || ''}
            onChange={val => setFormData({ ...formData, image: val })}
            required
          />

          <AdminTextarea
            label="Description *"
            value={formData.description || ''}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            required
            rows={3}
          />

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-white font-medium hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#EAB308] text-black font-bold hover:bg-[#EAB308] transition-colors">
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
