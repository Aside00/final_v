import React from 'react';
import { FileTextIcon, ImageIcon, FileIcon, XIcon } from 'lucide-react';
interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}
export function FilePreview({ file, onRemove }: FilePreviewProps) {
  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  // Determine icon based on file type
  const getFileIcon = () => {
    if (file.type.includes('pdf'))
    return <FileTextIcon className="w-8 h-8 text-red-500" />;
    if (file.type.includes('image'))
    return <ImageIcon className="w-8 h-8 text-blue-500" />;
    if (file.type.includes('word') || file.name.endsWith('.docx'))
    return <FileTextIcon className="w-8 h-8 text-blue-700" />;
    return <FileIcon className="w-8 h-8 text-gray-500" />;
  };
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="flex items-center space-x-4 space-x-reverse">
        <div className="p-2 bg-gray-50 rounded-lg">{getFileIcon()}</div>
        <div>
          <p className="text-sm font-medium text-gray-900 truncate max-w-[200px] sm:max-w-xs">
            {file.name}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {formatSize(file.size)} •{' '}
            {file.name.split('.').pop()?.toUpperCase()}
          </p>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
        title="إزالة الملف">
        
        <XIcon className="w-5 h-5" />
      </button>
    </div>);

}