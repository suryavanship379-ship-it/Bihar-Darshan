import { useState, useRef } from 'react';
import { X, UploadCloud } from 'lucide-react';
import type { Discussion } from '../../data/communityData';

interface CreatePostModalProps {
  onClose: () => void;
  onPost: (post: Omit<Discussion, 'id' | 'author' | 'authorAvatar' | 'timeAgo' | 'views' | 'replies' | 'communityId'>) => void;
}

const CreatePostModal = ({ onClose, onPost }: CreatePostModalProps) => {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('Tips');
  const [content, setContent] = useState('');
  
  // Media State
  const [activeTab, setActiveTab] = useState<'text' | 'media' | 'poll'>('text');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Poll State
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState([{ id: '1', text: '' }, { id: '2', text: '' }]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaUrl(url);
      setMediaType(file.type.startsWith('video/') ? 'video' : 'image');
    }
  };

  const handlePost = () => {
    if (!title.trim()) return;
    
    let pollData;
    if (activeTab === 'poll' && pollQuestion.trim() && pollOptions.filter(o => o.text.trim()).length >= 2) {
      pollData = {
        question: pollQuestion,
        options: pollOptions.filter(o => o.text.trim()).map((o, i) => ({ id: `p${i}`, text: o.text, votes: 0 }))
      };
    }

    onPost({ 
      title, 
      content,
      tag: tag as any, 
      tagColor: 'bg-green-100 text-green-700',
      ...(activeTab === 'media' && mediaUrl ? { mediaUrl, mediaType } : {}),
      ...(pollData ? { poll: pollData } : {})
    });
    onClose();
  };

  const addPollOption = () => {
    if (pollOptions.length >= 5) return;
    setPollOptions([...pollOptions, { id: Date.now().toString(), text: '' }]);
  };

  const updatePollOption = (id: string, text: string) => {
    setPollOptions(pollOptions.map(o => o.id === id ? { ...o, text } : o));
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-gray-900 text-xl">Create a New Post</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin scrollbar-thumb-gray-200">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Title</label>
            <input
              type="text"
              placeholder="What do you want to discuss?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors font-semibold"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Select a Tag</label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            >
              <option value="Destinations">Destinations</option>
              <option value="Tips">Tips</option>
              <option value="Itinerary">Itinerary</option>
            </select>
          </div>

          {/* Tabs for content type */}
          <div className="flex gap-2 mt-2">
            {(['text', 'media', 'poll'] as const).map(t => (
              <button 
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-colors ${
                  activeTab === t ? 'bg-violet-100 text-violet-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {activeTab === 'text' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Details (optional)</label>
              <textarea
                placeholder="Add more details about your post..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors min-h-[120px] resize-none"
              />
            </div>
          )}

          {activeTab === 'media' && (
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center text-center">
              <input 
                type="file" 
                accept="image/*,video/*" 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              
              {mediaUrl ? (
                <div className="relative w-full max-h-[300px] rounded-lg overflow-hidden border border-gray-200 bg-black">
                  {mediaType === 'video' ? (
                    <video src={mediaUrl} controls className="w-full h-full object-contain max-h-[300px]" />
                  ) : (
                    <img src={mediaUrl} alt="Preview" className="w-full h-full object-contain max-h-[300px]" />
                  )}
                  <button 
                    onClick={() => {
                      setMediaUrl('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-sm"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div 
                  className="flex flex-col items-center gap-3 cursor-pointer p-8 w-full border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-100 hover:border-amber-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-violet-500">
                    <UploadCloud size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700">Click to upload media</p>
                    <p className="text-xs text-gray-500 mt-1">Supports images and videos</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'poll' && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Poll Question</label>
              <input
                type="text"
                placeholder="Ask a question..."
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors mb-4"
              />
              
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Options</label>
              <div className="space-y-2 mb-3">
                {pollOptions.map((opt, index) => (
                  <input
                    key={opt.id}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={opt.text}
                    onChange={(e) => updatePollOption(opt.id, e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-amber-400"
                  />
                ))}
              </div>
              {pollOptions.length < 5 && (
                <button 
                  onClick={addPollOption}
                  className="text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors"
                >
                  + Add another option
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-8">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-gray-600 font-bold text-sm hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handlePost}
            disabled={!title.trim()}
            className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm shadow-sm transition-all"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
