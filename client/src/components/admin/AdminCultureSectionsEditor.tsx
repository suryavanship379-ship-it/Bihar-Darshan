import { useState } from 'react';
import { AdminInput, AdminTextarea } from './AdminFormField';
import type { CultureSection } from '../../components/tribals/CulturalHighlightsGrid';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  sections: CultureSection[];
  onChange: (sections: CultureSection[]) => void;
}

export const AdminCultureSectionsEditor = ({ sections, onChange }: Props) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const addSection = () => {
    onChange([...sections, { heading: 'New Section', cards: [] }]);
    setExpandedSection(sections.length);
  };

  const updateSectionHeading = (index: number, heading: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], heading };
    onChange(newSections);
  };

  const removeSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    onChange(newSections);
  };

  const addCard = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].cards.push({ image: '', title: '', description: '' });
    onChange(newSections);
  };

  const updateCard = (sectionIndex: number, cardIndex: number, field: string, value: string) => {
    const newSections = [...sections];
    newSections[sectionIndex].cards[cardIndex] = {
      ...newSections[sectionIndex].cards[cardIndex],
      [field]: value
    };
    onChange(newSections);
  };

  const removeCard = (sectionIndex: number, cardIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].cards = newSections[sectionIndex].cards.filter((_, i) => i !== cardIndex);
    onChange(newSections);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Culture & Traditions Sections</h3>
        <button
          type="button"
          onClick={addSection}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-sm"
        >
          <Plus size={16} /> Add Section
        </button>
      </div>

      {sections.map((section, sIdx) => (
        <div key={sIdx} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5"
            onClick={() => setExpandedSection(expandedSection === sIdx ? null : sIdx)}
          >
            <h4 className="font-semibold text-white">{section.heading || 'Untitled Section'}</h4>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeSection(sIdx); }}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={16} />
              </button>
              {expandedSection === sIdx ? <ChevronUp size={16} className="text-white" /> : <ChevronDown size={16} className="text-white" />}
            </div>
          </div>
          
          {expandedSection === sIdx && (
            <div className="p-4 border-t border-white/10 space-y-4 bg-black/20">
              <AdminInput
                label="Section Heading"
                value={section.heading}
                onChange={(e) => updateSectionHeading(sIdx, e.target.value)}
                placeholder="e.g. Traditions & Culture"
              />

              <div className="space-y-3">
                <div className="flex justify-between items-center mt-4 mb-2">
                  <h5 className="font-medium text-white text-sm">Cards</h5>
                  <button
                    type="button"
                    onClick={() => addCard(sIdx)}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20 transition-colors text-xs"
                  >
                    <Plus size={14} /> Add Card
                  </button>
                </div>

                {section.cards.map((card, cIdx) => (
                  <div key={cIdx} className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-3 relative group">
                    <button
                      type="button"
                      onClick={() => removeCard(sIdx, cIdx)}
                      className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                    
                    <div className="grid grid-cols-1 gap-3 pt-2">
                      <AdminInput
                        label="Card Title"
                        value={card.title}
                        onChange={(e) => updateCard(sIdx, cIdx, 'title', e.target.value)}
                        placeholder="e.g. Karam Festival"
                      />
                      <AdminInput
                        label="Image URL"
                        value={card.image}
                        onChange={(e) => updateCard(sIdx, cIdx, 'image', e.target.value)}
                        placeholder="/images/tribals/..."
                      />
                      <AdminTextarea
                        label="Description"
                        value={card.description}
                        onChange={(e) => updateCard(sIdx, cIdx, 'description', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
                {section.cards.length === 0 && (
                  <p className="text-white/50 text-sm text-center py-4">No cards added to this section yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
      
      {sections.length === 0 && (
        <p className="text-white/50 text-center py-6 bg-white/5 rounded-xl border border-white/10">
          No culture sections defined. Click "Add Section" to create one.
        </p>
      )}
    </div>
  );
};
