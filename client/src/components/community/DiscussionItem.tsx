import { useState } from 'react';
import { MessageSquare, Eye, ArrowBigUp, ArrowBigDown, Share2, Image as ImageIcon, Video, Send } from 'lucide-react';
import type { Discussion, Comment } from '../../data/communityData';
import { auth } from '../../lib/firebase';

interface DiscussionItemProps {
  discussion: Discussion;
}

const tagStyleMap: Record<string, string> = {
  Destinations: 'bg-blue-100 text-blue-700',
  Tips: 'bg-green-100 text-green-700',
  Itinerary: 'bg-yellow-100 text-yellow-700',
};

const avatarColorMap: Record<string, string> = {
  RK: 'bg-orange-400',
  NS: 'bg-purple-500',
  AR: 'bg-blue-500',
  TA: 'bg-teal-500',
  PV: 'bg-pink-500',
  BA: 'bg-indigo-500',
  WP: 'bg-green-500',
  ER: 'bg-red-500',
  YOU: 'bg-brand-gold',
};

const DiscussionItem = ({ discussion }: DiscussionItemProps) => {
  const tagStyle = tagStyleMap[discussion.tag] ?? 'bg-gray-100 text-gray-600';
  const avatarColor = avatarColorMap[discussion.authorAvatar] ?? 'bg-gray-400';
  const [voted, setVoted] = useState<'up' | 'down' | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [localComments, setLocalComments] = useState<Comment[]>(discussion.comments || []);
  const [newCommentText, setNewCommentText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [voteCountAdjustment, setVoteCountAdjustment] = useState(0);

  // Calculate total votes for poll
  const totalVotes = discussion.poll?.options.reduce((sum, o) => sum + o.votes, 0) ?? 0;

  const baseLikes = discussion.likes !== undefined ? discussion.likes : (discussion.replies || 0);
  const currentLikes = baseLikes + voteCountAdjustment;

  const handleVote = async (newVote: 'up' | 'down' | null) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login to vote on posts.");
      return;
    }

    const previousVote = voted;
    const prevVal = previousVote === 'up' ? 1 : previousVote === 'down' ? -1 : 0;
    const newVal = newVote === 'up' ? 1 : newVote === 'down' ? -1 : 0;
    const diff = newVal - prevVal;

    // Fast local update
    setVoted(newVote);
    setVoteCountAdjustment(prev => prev + diff);

    if (String(discussion.id).startsWith('d') || String(discussion.id).startsWith('local_')) {
      return;
    }

    try {
      const token = await user.getIdToken();
      const response = await fetch(`http://localhost:5000/api/v1/community/posts/${discussion.id}/like`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          voteType: newVote ? newVote.toUpperCase() : 'NONE',
          previousVote: previousVote ? previousVote.toUpperCase() : 'NONE'
        })
      });
      if (!response.ok) {
        throw new Error('Failed to update vote on server');
      }
    } catch (err) {
      console.error(err);
      // Rollback
      setVoted(previousVote);
      setVoteCountAdjustment(prev => prev - diff);
    }
  };

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `c_${Date.now()}`,
      author: 'You',
      authorAvatar: 'YOU',
      timeAgo: 'Just now',
      content: newCommentText.trim(),
      replies: []
    };

    if (replyingToId) {
      // Find the comment and add reply
      const updatedComments = localComments.map(c => {
        if (c.id === replyingToId) {
          return { ...c, replies: [...(c.replies || []), newComment] };
        }
        return c;
      });
      setLocalComments(updatedComments);
    } else {
      setLocalComments([...localComments, newComment]);
    }

    setNewCommentText('');
    setReplyingToId(null);
  };

  return (
    <div className="border-b border-gray-100 last:border-0 group hover:bg-gray-50/80 transition-colors duration-150">
      <div className="px-4 py-3">
        {/* Top row: avatar, author, tag */}
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`w-7 h-7 rounded-full ${avatarColor} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}
          >
            {discussion.authorAvatar}
          </div>
          <span className="text-xs font-semibold text-gray-700">{discussion.author}</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-400">{discussion.timeAgo}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagStyle} ml-auto`}>
            {discussion.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-semibold text-gray-900 leading-snug mb-1 group-hover:text-amber-700 transition-colors duration-150">
          {discussion.title}
        </h3>

        {/* Full content */}
        {discussion.content && (
          <p className="text-sm text-gray-500 leading-relaxed mb-2">
            {discussion.content}
          </p>
        )}

        {/* Inline Image / Video */}
        {discussion.mediaUrl && (
          <div className="mt-2 mb-2 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 max-h-[350px]">
            {discussion.mediaType === 'video' ? (
              <video
                src={discussion.mediaUrl}
                controls
                className="w-full max-h-[350px] object-cover"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={discussion.mediaUrl}
                alt={discussion.title}
                className="w-full max-h-[350px] object-cover"
                loading="lazy"
              />
            )}
          </div>
        )}

        {/* Inline Poll */}
        {discussion.poll && (
          <div className="mt-2 mb-2 bg-gray-50 rounded-xl border border-gray-100 p-3" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm font-semibold text-gray-800 mb-3">{discussion.poll.question}</p>
            <div className="space-y-2">
              {discussion.poll.options.map((option) => {
                const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                return (
                  <div key={option.id} className="relative">
                    <div
                      className="absolute inset-0 rounded-lg bg-amber-100/60"
                      style={{ width: `${pct}%` }}
                    />
                    <div className="relative flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200 bg-white/60 hover:border-amber-300 transition-colors">
                      <span className="text-xs font-medium text-gray-700">{option.text}</span>
                      <span className="text-xs font-bold text-gray-500 ml-2 shrink-0">{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-gray-400 mt-2">{totalVotes} votes</p>
          </div>
        )}

        {/* Bottom action bar — Reddit-style */}
        <div className="flex items-center gap-1 mt-2 -ml-1">
          {/* Upvote/Downvote */}
          <div className="flex items-center bg-gray-100/80 rounded-full">
            <button
              onClick={(e) => { e.stopPropagation(); handleVote(voted === 'up' ? null : 'up'); }}
              className={`p-1.5 rounded-l-full hover:bg-gray-200 transition-colors ${voted === 'up' ? 'text-gold-dark' : 'text-gray-500'}`}
            >
              <ArrowBigUp size={18} fill={voted === 'up' ? 'currentColor' : 'none'} />
            </button>
            <span className="text-xs font-bold text-gray-700 px-1 min-w-[20px] text-center">
              {currentLikes}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); handleVote(voted === 'down' ? null : 'down'); }}
              className={`p-1.5 rounded-r-full hover:bg-gray-200 transition-colors ${voted === 'down' ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <ArrowBigDown size={18} fill={voted === 'down' ? 'currentColor' : 'none'} />
            </button>
          </div>



          {/* Share */}
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Share2 size={14} />
            Share
          </button>

          {/* Comment */}
          <button
            onClick={(e) => { e.stopPropagation(); setShowComments(!showComments); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${showComments ? 'bg-amber-50 text-amber-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <MessageSquare size={14} />
            {localComments.length > 0 ? localComments.length : 'Comment'}
          </button>

          {/* Views */}
          <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
            <Eye size={13} />
            {discussion.views}
          </span>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 border-t border-gray-100 pt-4" onClick={(e) => e.stopPropagation()}>
            {/* Existing Comments */}
            <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {localComments.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No comments yet. Be the first to start the discussion!</p>
              ) : (
                localComments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50/50 border border-gray-100 rounded-xl p-3.5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={`w-7 h-7 rounded-full ${avatarColorMap[comment.authorAvatar] || 'bg-gray-400'} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                        {comment.authorAvatar}
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-gray-800 leading-none">{comment.author}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{comment.timeAgo}</div>
                      </div>
                    </div>
                    <p className="text-[14px] text-gray-700 ml-[38px] mb-2 leading-relaxed">{comment.content}</p>
                    <div className="ml-[38px] flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setReplyingToId(replyingToId === comment.id ? null : comment.id);
                          if (replyingToId !== comment.id) {
                            setNewCommentText('');
                          }
                        }}
                        className={`text-[12px] font-semibold transition-colors flex items-center gap-1 ${replyingToId === comment.id ? 'text-amber-600' : 'text-gray-500 hover:text-amber-600'}`}
                      >
                        <MessageSquare size={12} />
                        Reply
                      </button>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-[38px] mt-3 space-y-3 border-l-2 border-gray-100 pl-3">
                        {comment.replies.map(reply => (
                          <div key={reply.id} className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className={`w-5 h-5 rounded-full ${avatarColorMap[reply.authorAvatar] || 'bg-gray-400'} flex items-center justify-center text-white text-[8px] font-bold shrink-0`}>
                                {reply.authorAvatar}
                              </div>
                              <span className="text-[12px] font-semibold text-gray-800">{reply.author}</span>
                              <span className="text-[11px] text-gray-400">· {reply.timeAgo}</span>
                            </div>
                            <p className="text-[13px] text-gray-600 ml-7">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input */}
                    {replyingToId === comment.id && (
                      <div className="ml-[38px] mt-3 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <input
                          type="text"
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          placeholder={`Replying to ${comment.author}...`}
                          className="flex-1 text-[13px] bg-white border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-sm"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddComment();
                            }
                          }}
                          autoFocus
                        />
                        <button
                          onClick={(e) => { e.stopPropagation(); handleAddComment(); }}
                          disabled={!newCommentText.trim()}
                          className="p-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-400 transition-colors shadow-sm"
                        >
                          <Send size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Main Comment Input */}
            {!replyingToId && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 text-[14px] bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 focus:outline-none focus:border-amber-400 focus:bg-white focus:ring-1 focus:ring-amber-400 transition-all"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                />
                <button
                  onClick={(e) => { e.stopPropagation(); handleAddComment(); }}
                  disabled={!newCommentText.trim()}
                  className="p-2.5 bg-amber-500 text-white rounded-full hover:bg-amber-600 disabled:opacity-50 disabled:bg-gray-300 transition-colors shadow-sm"
                >
                  <Send size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionItem;
