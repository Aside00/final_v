import React from 'react';
import { MessageCircleIcon } from 'lucide-react';
interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
}
export function SuggestedQuestions({
  questions,
  onSelect
}: SuggestedQuestionsProps) {
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold text-gray-500 mb-2 px-1">
        أسئلة مقترحة:
      </p>
      <div className="flex flex-wrap gap-2">
        {questions.map((q, idx) =>
        <button
          key={idx}
          onClick={() => onSelect(q)}
          className="text-xs bg-white border border-primary/20 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5">
          
            <MessageCircleIcon className="w-3 h-3" />
            {q}
          </button>
        )}
      </div>
    </div>);

}