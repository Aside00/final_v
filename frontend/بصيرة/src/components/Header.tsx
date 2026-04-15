import React from 'react';
import { ShieldCheckIcon } from 'lucide-react';
type ViewState = 'landing' | 'upload' | 'analyzing' | 'results' | 'general-chat';
interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}
export function Header({ currentView, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('landing')}>
            
            <div className="bg-primary text-white p-2 rounded-lg mr-0 ml-3 group-hover:bg-primary-light transition-colors">
              <ShieldCheckIcon className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-primary tracking-tight">
              بصيرة
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <button
              onClick={() => onNavigate('landing')}
              className={`text-sm font-medium transition-colors hover:text-primary ${currentView === 'landing' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
              
              الرئيسية
            </button>
            <button
              onClick={() => onNavigate('upload')}
              className={`text-sm font-medium transition-colors hover:text-primary ${['upload', 'analyzing', 'results'].includes(currentView) ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
              
              ارفع عقدك
            </button>
            <button
              onClick={() => onNavigate('general-chat')}
              className={`text-sm font-medium transition-colors hover:text-primary ${currentView === 'general-chat' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
              
              اسأل سؤال
            </button>
          </nav>

          {/* Mobile Menu Button (Simplified for now) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => onNavigate('upload')}
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium">
              
              ابدأ الآن
            </button>
          </div>
        </div>
      </div>
    </header>);

}