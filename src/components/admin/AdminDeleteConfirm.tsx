import { AlertTriangle } from 'lucide-react';
import { AdminModal } from './AdminModal';

interface AdminDeleteConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

export const AdminDeleteConfirm = ({ isOpen, onClose, onConfirm, itemName }: AdminDeleteConfirmProps) => {
  return (
    <AdminModal isOpen={isOpen} onClose={onClose} title="Confirm Deletion">
      <div className="flex flex-col items-center text-center p-4">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle size={32} className="text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Delete Item</h3>
        <p className="text-white/60 mb-8">
          Are you sure you want to delete <strong className="text-white">"{itemName}"</strong>? This action cannot be undone.
        </p>
        <div className="flex items-center gap-4 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors shadow-lg shadow-red-500/20"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </AdminModal>
  );
};
