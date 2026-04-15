import React from 'react';
import {
  ShieldCheckIcon,
  ShieldAlertIcon,
  AlertTriangleIcon } from
'lucide-react';
interface StatusBadgeProps {
  status: 'safe' | 'needs_review' | 'high_risk';
  label?: string;
  className?: string;
}
export function StatusBadge({
  status,
  label,
  className = ''
}: StatusBadgeProps) {
  const config = {
    safe: {
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: <ShieldCheckIcon className="w-4 h-4 mr-1.5" />,
      defaultLabel: 'آمن'
    },
    needs_review: {
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: <AlertTriangleIcon className="w-4 h-4 mr-1.5" />,
      defaultLabel: 'يحتاج مراجعة'
    },
    high_risk: {
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: <ShieldAlertIcon className="w-4 h-4 mr-1.5" />,
      defaultLabel: 'عالي الخطورة'
    }
  };
  const currentConfig = config[status];
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${currentConfig.color} ${className}`}>
      
      {currentConfig.icon}
      {label || currentConfig.defaultLabel}
    </span>);

}