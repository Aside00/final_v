import React, { useState, useRef } from 'react';
import { UploadCloudIcon, FileUpIcon } from 'lucide-react';
import { FilePreview } from './FilePreview';
interface UploadAreaProps {
  onAnalyze: (file: File) => void;
}
export function UploadArea({ onAnalyze }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };
  const handleFileSelection = (file: File) => {
    // Basic validation could go here
    setSelectedFile(file);
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ارفع عقدك للتحليل
        </h2>
        <p className="text-gray-600">
          ندعم ملفات PDF، Word، الصور، والنصوص. سيتم تحليل العقد وتحديد البنود
          الخطرة والناقصة.
        </p>
      </div>

      {!selectedFile ?
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ease-in-out cursor-pointer
            ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-gray-300 bg-white hover:border-primary/50 hover:bg-gray-50'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}>
        
          <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,image/*" />
        
          <div className="flex flex-col items-center justify-center space-y-4">
            <div
            className={`p-4 rounded-full ${isDragging ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
            
              <UploadCloudIcon className="w-10 h-10" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                اسحب الملف هنا أو اضغط للاختيار
              </p>
              <p className="text-sm text-gray-500 mt-2">
                PDF, DOCX, JPG, PNG, TXT (الحد الأقصى 10MB)
              </p>
            </div>
          </div>
        </div> :

      <div className="space-y-6">
          <FilePreview file={selectedFile} onRemove={handleRemoveFile} />

          <button
          onClick={() => onAnalyze(selectedFile)}
          className="w-full flex items-center justify-center px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-light transition-colors shadow-md">
          
            <FileUpIcon className="w-5 h-5 ml-2" />
            ابدأ التحليل
          </button>
        </div>
      }
    </div>);

}