import { useState, useRef } from 'react';
import { Type, Image, BarChart2, Video, X, UploadCloud } from 'lucide-react';
import type { Discussion } from '../../data/communityData';

interface DiscussionComposerProps {
  onPost?: (post: Omit<Discussion, 'id' | 'author' | 'authorAvatar' | 'timeAgo' | 'views' | 'replies' | 'communityId'>) => void;
}

const DiscussionComposer = ({ onPost }: DiscussionComposerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState<Discussion['tag']>('Tips');
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setMediaType(file.type.startsWith('video/') ? 'video' : 'image');
    }
  };

  const addPollOption = () => {
    if (pollOptions.length >= 5) return;
    setPollOptions([...pollOptions, { id: Date.now().toString(), text: '' }]);
  };

  const updatePollOption = (id: string, text: string) => {
    setPollOptions(pollOptions.map(o => o.id === id ? { ...o, text } : o));
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

    onPost?.({
      title,
      content,
      tag,
      tagColor: 'bg-green-100 text-green-700',
      ...(activeTab === 'media' && mediaUrl ? { mediaUrl, mediaType } : {}),
      ...(pollData ? { poll: pollData } : {})
    });

    // Reset state
    setTitle('');
    setContent('');
    setMediaUrl('');
    setPollQuestion('');
    setPollOptions([{ id: '1', text: '' }, { id: '2', text: '' }]);
    setIsExpanded(false);
  };


  if (isExpanded) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Create a New Post</h3>
          <button onClick={() => setIsExpanded(false)} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title of your discussion..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors duration-200 font-semibold"
            autoFocus
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">Tag:</span>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value as Discussion['tag'])}
                className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs font-semibold text-gray-700 focus:outline-none focus:border-brand-gold"
              >
                <option value="Destinations">Destinations</option>
                <option value="Tips">Tips</option>
                <option value="Itinerary">Itinerary</option>
              </select>
            </div>

            <div className="flex gap-2">
              {(['text', 'media', 'poll'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${activeTab === t ? 'bg-violet-100 text-violet-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'text' && (
            <textarea
              placeholder="Add more details about your post..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors min-h-[120px] resize-none"
            />
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
                  className="flex flex-col items-center gap-3 cursor-pointer p-8 w-full border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-100 hover:border-brand-gold transition-colors"
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
              <input
                type="text"
                placeholder="Ask a question..."
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-gold transition-colors mb-4"
              />
              <div className="space-y-2 mb-3">
                {pollOptions.map((opt, index) => (
                  <input
                    key={opt.id}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={opt.text}
                    onChange={(e) => updatePollOption(opt.id, e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-brand-gold"
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

          <div className="flex justify-end pt-3 border-t border-gray-100 mt-2">
            <button
              onClick={handlePost}
              disabled={!title.trim()}
              className="px-6 py-2 rounded-xl bg-violet-600 text-white font-bold text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-700 transition-colors"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Collapsed View
  return (
    <div
      className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm cursor-pointer hover:border-amber-200 transition-colors"
      onClick={() => { setIsExpanded(true); setActiveTab('text'); }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-brand-gold flex items-center justify-center text-black font-bold text-sm shrink-0">
          You
        </div>
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-400 transition-colors duration-200">
          What do you want to discuss today?
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div
            onClick={(e) => { e.stopPropagation(); setIsExpanded(true); setActiveTab('text'); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Type size={13} /> Text
          </div>
          <div
            onClick={(e) => { e.stopPropagation(); setIsExpanded(true); setActiveTab('media'); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Image size={13} /> Image
          </div>
          <div
            onClick={(e) => { e.stopPropagation(); setIsExpanded(true); setActiveTab('poll'); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <BarChart2 size={13} /> Poll
          </div>
          <div
            onClick={(e) => { e.stopPropagation(); setIsExpanded(true); setActiveTab('media'); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Video size={13} /> Video
          </div>
        </div>
        <button className="px-5 py-2 rounded-xl bg-violet-600 text-white font-bold text-sm shadow-sm pointer-events-none">
          Post
        </button>
      </div>
    </div>
  );
};

export default DiscussionComposer;
