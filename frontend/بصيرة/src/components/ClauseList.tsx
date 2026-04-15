import React, { useState } from 'react';
import type { Clause } from '../data/mockData';
import { ClauseCard } from './ClauseCard';
interface ClauseListProps {
  clauses: Clause[];
}
type FilterType = 'all' | 'matched' | 'missing' | 'risky' | 'unclear';
export function ClauseList({ clauses }: ClauseListProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const filteredClauses = clauses.filter((clause) =>
  filter === 'all' ? true : clause.status === filter
  );
  const filterButtons = [
  {
    id: 'all',
    label: 'الكل'
  },
  {
    id: 'risky',
    label: 'خطير'
  },
  {
    id: 'missing',
    label: 'مفقود'
  },
  {
    id: 'unclear',
    label: 'غير واضح'
  },
  {
    id: 'matched',
    label: 'مطابق'
  }];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-bold text-gray-900">تفاصيل البنود</h3>

        <div className="flex flex-wrap gap-2">
          {filterButtons.map((btn) =>
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id as FilterType)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === btn.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            
              {btn.label}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {filteredClauses.length > 0 ?
        filteredClauses.map((clause) =>
        <ClauseCard key={clause.id} clause={clause} />
        ) :

        <div className="text-center py-8 text-gray-500">
            لا توجد بنود تطابق هذا الفلتر.
          </div>
        }
      </div>
    </div>);

}