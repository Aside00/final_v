import React from 'react';
import { ShieldCheckIcon } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <ShieldCheckIcon className="w-6 h-6 text-primary ml-2" />
            <span className="text-xl font-bold text-primary">بصيرة</span>
          </div>

          <div className="text-gray-500 text-sm text-center md:text-right">
            <p>منصة ذكية لتحليل العقود بالذكاء الاصطناعي.</p>
            <p className="mt-1">
              © {new Date().getFullYear()} بصيرة. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>);

}