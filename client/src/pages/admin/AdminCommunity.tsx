import { useState } from 'react';
import { useAdminData } from '../../data/AdminContext';
import { AdminDeleteConfirm } from '../../components/admin/AdminDeleteConfirm';
import type { Community } from '../../data/communityData';
import { auth } from '../../lib/firebase';
import { CheckCircle, XCircle, Clock, Users, MessageSquare, Trash2 } from 'lucide-react';

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { label: string; cls: string }> = {
    PENDING: { label: 'Pending', cls: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' },
    APPROVED: { label: 'Approved', cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
    REJECTED: { label: 'Rejected', cls: 'bg-red-500/15 text-red-400 border-red-500/30' },
  };
  const { label, cls } = map[status] ?? { label: status, cls: 'bg-white/10 text-white/50 border-white/20' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cls}`}>
      {status === 'PENDING' && <Clock size={11} />}
      {status === 'APPROVED' && <CheckCircle size={11} />}
      {status === 'REJECTED' && <XCircle size={11} />}
      {label}
    </span>
  );
};

const AdminCommunity = () => {
  const { communities, updateCommunities } = useAdminData();
  const [tab, setTab] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Community | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const tabItems = {
    PENDING: communities.filter(c => (c as any).status === 'PENDING'),
    APPROVED: communities.filter(c => (c as any).status === 'APPROVED' || !(c as any).status),
    REJECTED: communities.filter(c => (c as any).status === 'REJECTED'),
  };

  const filtered = tabItems[tab].filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getToken = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('Not authenticated');
    return user.getIdToken();
  };

  const handleApprove = async (community: Community) => {
    setLoadingId(community.id);
    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:5000/api/v1/community/${community.id}/approve`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        updateCommunities(
          communities.map(c => c.id === community.id ? { ...c, status: 'APPROVED' } as any : c)
        );
      }
    } catch (e) {
      console.error('Approve failed', e);
    } finally {
      setLoadingId(null);
    }
  };

  const handleReject = async (community: Community) => {
    setLoadingId(community.id);
    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:5000/api/v1/community/${community.id}/reject`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        updateCommunities(
          communities.map(c => c.id === community.id ? { ...c, status: 'REJECTED' } as any : c)
        );
      }
    } catch (e) {
      console.error('Reject failed', e);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteClick = (item: Community) => {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const token = await getToken();
      await fetch(`http://localhost:5000/api/v1/community/${itemToDelete.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      updateCommunities(communities.filter(c => c.id !== itemToDelete.id));
    } catch (e) {
      console.error('Delete failed', e);
    }
  };

  const tabs = [
    { key: 'PENDING', label: 'Pending Approval', count: tabItems.PENDING.length, icon: Clock },
    { key: 'APPROVED', label: 'Approved', count: tabItems.APPROVED.length, icon: CheckCircle },
    { key: 'REJECTED', label: 'Rejected', count: tabItems.REJECTED.length, icon: XCircle },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-display tracking-tight">Communities</h2>
          <p className="text-white/40 text-sm mt-1">Review and approve community requests from users.</p>
        </div>
        <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-2.5">
          <Clock size={16} className="text-yellow-400" />
          <span className="text-yellow-400 font-semibold text-sm">{tabItems.PENDING.length} awaiting review</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-1.5">
        {tabs.map(({ key, label, count, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${tab === key
              ? 'bg-[#EAB308] text-black shadow-lg shadow-[#EAB308]/20'
              : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
          >
            <Icon size={15} />
            <span className="hidden sm:inline">{label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tab === key ? 'bg-black/20 text-black' : 'bg-white/10 text-white/60'
              }`}>{count}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search communities..."
          className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-4 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#EAB308]/40 transition-colors"
        />
      </div>

      {/* Community Cards */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-white/30">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {tab === 'PENDING' && <Clock size={28} className="text-yellow-500/50" />}
              {tab === 'APPROVED' && <CheckCircle size={28} className="text-emerald-500/50" />}
              {tab === 'REJECTED' && <XCircle size={28} className="text-red-500/50" />}
            </div>
            <p className="text-sm">No {tab.toLowerCase()} communities</p>
          </div>
        ) : (
          filtered.map(community => (
            <div
              key={community.id}
              className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                {/* Banner / Logo */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10">
                  <img
                    src={community.image || (community as any).bannerImageUrl || '/images/culture/hero-artwork.png'}
                    alt={community.name}
                    className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).src = '/images/culture/hero-artwork.png'; }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-white font-semibold text-base truncate">{community.name}</h3>
                    <StatusBadge status={(community as any).status || 'APPROVED'} />
                    {community.category && (
                      <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded-md">{community.category}</span>
                    )}
                  </div>
                  <p className="text-white/50 text-sm mt-1 line-clamp-2 leading-relaxed">
                    {(community as any).description || (community as any).shortDescription || community.subtitle || '—'}
                  </p>
                  <div className="flex items-center gap-4 mt-2.5 text-xs text-white/40">
                    <span className="flex items-center gap-1.5"><Users size={12} />{community.members || 0} members</span>
                    <span className="flex items-center gap-1.5"><MessageSquare size={12} />{community.posts || 0} posts</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {(community as any).status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleApprove(community)}
                        disabled={loadingId === community.id}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors disabled:opacity-50"
                      >
                        <CheckCircle size={13} />
                        {loadingId === community.id ? '…' : 'Approve'}
                      </button>
                      <button
                        onClick={() => handleReject(community)}
                        disabled={loadingId === community.id}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 transition-colors disabled:opacity-50"
                      >
                        <XCircle size={13} />
                        {loadingId === community.id ? '…' : 'Reject'}
                      </button>
                    </>
                  )}
                  {(community as any).status === 'APPROVED' && (
                    <button
                      onClick={() => handleReject(community)}
                      disabled={loadingId === community.id}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white/50 hover:text-red-400 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 transition-colors disabled:opacity-50"
                    >
                      <XCircle size={13} />
                      Revoke
                    </button>
                  )}
                  {(community as any).status === 'REJECTED' && (
                    <button
                      onClick={() => handleApprove(community)}
                      disabled={loadingId === community.id}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white/50 hover:text-emerald-400 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/20 transition-colors disabled:opacity-50"
                    >
                      <CheckCircle size={13} />
                      Re-approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClick(community)}
                    className="p-2 rounded-xl text-white/30 hover:text-red-400 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

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
