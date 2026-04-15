import React from 'react';
import { motion } from 'framer-motion';
import {
  FileTextIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  XCircleIcon,
  HelpCircleIcon } from
'lucide-react';
import type { AnalysisResult } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { RiskScoreCard } from './RiskScoreCard';
interface AnalysisSummaryProps {
  result: AnalysisResult;
}
export function AnalysisSummary({ result }: AnalysisSummaryProps) {
  const stats = [
  {
    label: 'إجمالي البنود',
    value: result.totalClauses,
    icon: <FileTextIcon className="w-5 h-5 text-gray-500" />,
    color: 'bg-gray-50'
  },
  {
    label: 'بنود مطابقة',
    value: result.matchedClauses,
    icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
    color: 'bg-green-50'
  },
  {
    label: 'بنود مفقودة',
    value: result.missingClauses,
    icon: <XCircleIcon className="w-5 h-5 text-red-500" />,
    color: 'bg-red-50'
  },
  {
    label: 'بنود خطرة',
    value: result.riskyClauses,
    icon: <AlertCircleIcon className="w-5 h-5 text-amber-500" />,
    color: 'bg-amber-50'
  },
  {
    label: 'بنود غير واضحة',
    value: result.unclearClauses,
    icon: <HelpCircleIcon className="w-5 h-5 text-blue-500" />,
    color: 'bg-blue-50'
  }];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
      
      <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">ملخص التحليل</h2>
            <StatusBadge
              status={result.safetyStatus}
              label={result.safetyStatusLabel} />
            
          </div>
          <p className="text-gray-500 font-medium">
            نوع العقد:{' '}
            <span className="text-primary">{result.contractTypeLabel}</span>
          </p>
        </div>
        <RiskScoreCard score={result.riskScore} />
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {stats.map((stat, index) =>
          <div
            key={index}
            className={`p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center ${stat.color}`}>
            
              <div className="mb-2">{stat.icon}</div>
              <span className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </span>
              <span className="text-xs font-medium text-gray-600">
                {stat.label}
              </span>
            </div>
          )}
        </div>

        <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
          <h3 className="text-lg font-semibold text-primary mb-2">
            النتيجة النهائية والتوصية
          </h3>
          <p className="text-gray-700 mb-3 leading-relaxed">{result.summary}</p>
          <div className="flex items-start gap-2 bg-white p-4 rounded-lg border border-primary/10">
            <AlertCircleIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-gray-800">
              {result.recommendation}
            </p>
          </div>
        </div>
      </div>
    </motion.div>);

}