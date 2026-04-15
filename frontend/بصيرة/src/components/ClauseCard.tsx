import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon,
  HelpCircleIcon } from
'lucide-react';
import type { Clause } from '../data/mockData';
interface ClauseCardProps {
  clause: Clause;
}
export function ClauseCard({ clause }: ClauseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const getStatusConfig = () => {
    switch (clause.status) {
      case 'matched':
        return {
          color: 'bg-green-50 border-green-200',
          icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
          label: 'مطابق',
          textColor: 'text-green-700'
        };
      case 'missing':
        return {
          color: 'bg-red-50 border-red-200',
          icon: <XCircleIcon className="w-5 h-5 text-red-500" />,
          label: 'مفقود',
          textColor: 'text-red-700'
        };
      case 'risky':
        return {
          color: 'bg-amber-50 border-amber-200',
          icon: <AlertTriangleIcon className="w-5 h-5 text-amber-500" />,
          label: 'خطير',
          textColor: 'text-amber-700'
        };
      case 'unclear':
        return {
          color: 'bg-blue-50 border-blue-200',
          icon: <HelpCircleIcon className="w-5 h-5 text-blue-500" />,
          label: 'غير واضح',
          textColor: 'text-blue-700'
        };
    }
  };
  const config = getStatusConfig();
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${config.color} ${isExpanded ? 'shadow-md' : 'shadow-sm'}`}>
      
      <div
        className="p-4 cursor-pointer flex items-center justify-between bg-white/50 hover:bg-white/80 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}>
        
        <div className="flex items-center gap-3">
          {config.icon}
          <div>
            <h4 className="font-semibold text-gray-900">{clause.title}</h4>
            <span className={`text-xs font-medium ${config.textColor}`}>
              {config.label}
            </span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-1">
          {isExpanded ?
          <ChevronUpIcon className="w-5 h-5" /> :

          <ChevronDownIcon className="w-5 h-5" />
          }
        </button>
      </div>

      <AnimatePresence>
        {isExpanded &&
        <motion.div
          initial={{
            height: 0,
            opacity: 0
          }}
          animate={{
            height: 'auto',
            opacity: 1
          }}
          exit={{
            height: 0,
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}
          className="overflow-hidden bg-white">
          
            <div className="p-4 border-t border-gray-100 space-y-4">
              <div>
                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  الشرح
                </h5>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {clause.description}
                </p>
              </div>

              <div
              className={`p-3 rounded-lg text-sm font-medium ${clause.status === 'matched' ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>
              
                {clause.note}
              </div>

              {clause.originalText &&
            <div>
                  <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    النص الأصلي من العقد
                  </h5>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-600 font-serif leading-relaxed">
                    "{clause.originalText}"
                  </div>
                </div>
            }

              {clause.referenceText &&
            <div>
                  <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    المرجع النظامي
                  </h5>
                  <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-sm text-blue-800 leading-relaxed">
                    {clause.referenceText}
                  </div>
                </div>
            }
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}