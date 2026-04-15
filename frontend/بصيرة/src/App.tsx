import React, { useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2Icon, FileSearchIcon } from 'lucide-react';
// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { WhyBasiraSection } from './components/WhyBasiraSection';
import { UploadArea } from './components/UploadArea';
import { AnalysisSummary } from './components/AnalysisSummary';
import { ClauseList } from './components/ClauseList';
import { ContractChat } from './components/ContractChat';
import { GeneralChat } from './components/GeneralChat';
// Data & Services
import type { AnalysisResult } from './data/mockData';
import { mockContractChatMessages } from './data/mockData';
import { uploadContract, analyzeContract } from './services/api';
type ViewState = 'landing' | 'upload' | 'analyzing' | 'results' | 'general-chat';
export function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const handleAnalyze = async (file: File) => {
    setSelectedFile(file);
    setCurrentView('analyzing');
    try {
      // 1. Upload file
      const uploadRes = await uploadContract(file);
      setFileId(uploadRes.fileId);
      // 2. Analyze file
      const result = await analyzeContract(uploadRes.fileId);
      setAnalysisResult(result);
      // 3. Show results
      setCurrentView('results');
    } catch (error) {
      console.error('Analysis failed', error);
      // Fallback to upload view on error (could add error state later)
      setCurrentView('upload');
      alert('حدث خطأ أثناء تحليل الملف. يرجى المحاولة مرة أخرى.');
    }
  };
  const renderContent = () => {
    switch (currentView) {
      case 'landing':
        return (
          <motion.div
            key="landing"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="flex flex-col min-h-screen">
            
            <HeroSection
              onUpload={() => handleNavigate('upload')}
              onGeneralChat={() => handleNavigate('general-chat')} />
            
            <FeaturesSection />
            <WhyBasiraSection />
          </motion.div>);

      case 'upload':
        return (
          <motion.div
            key="upload"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -20
            }}
            className="flex-grow flex items-center justify-center py-20 px-4">
            
            <UploadArea onAnalyze={handleAnalyze} />
          </motion.div>);

      case 'analyzing':
        return (
          <motion.div
            key="analyzing"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="flex-grow flex flex-col items-center justify-center py-32 px-4 text-center">
            
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-ring"></div>
              <div className="relative bg-white p-6 rounded-full shadow-lg border border-gray-100">
                <FileSearchIcon className="w-12 h-12 text-primary animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              جاري تحليل العقد...
            </h2>
            <p className="text-gray-500 max-w-md">
              يقوم الذكاء الاصطناعي بقراءة النص، استخراج البنود، ومقارنتها
              بالمعايير النظامية. قد يستغرق هذا بضع ثوانٍ.
            </p>
            <div className="mt-8 flex items-center gap-2 text-primary font-medium">
              <Loader2Icon className="w-5 h-5 animate-spin" />
              <span>نقرأ البنود...</span>
            </div>
          </motion.div>);

      case 'results':
        if (!analysisResult || !fileId) return null;
        return (
          <motion.div
            key="results"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -20
            }}
            className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                نتائج تحليل العقد
              </h1>
              <p className="text-gray-500">
                تم تحليل الملف: {selectedFile?.name}
              </p>
            </div>

            <AnalysisSummary result={analysisResult} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ClauseList clauses={analysisResult.clauses} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <ContractChat
                    fileId={fileId}
                    analysisResult={analysisResult}
                    initialMessages={mockContractChatMessages} />
                  
                </div>
              </div>
            </div>
          </motion.div>);

      case 'general-chat':
        return (
          <motion.div
            key="general-chat"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -20
            }}
            className="flex-grow py-12 px-4 sm:px-6 lg:px-8 w-full">
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                اسأل بدون رفع عقد
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                لديك استفسار قانوني عام؟ اسأل مساعدنا الذكي عن أي شيء يخص عقود
                العمل، الإيجار، أو اتفاقيات السرية في السعودية.
              </p>
            </div>
            <GeneralChat />
          </motion.div>);

    }
  };
  return (
    <div className="min-h-screen flex flex-col font-arabic bg-bg text-text selection:bg-primary/20">
      <Header currentView={currentView} onNavigate={handleNavigate} />

      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </main>

      <Footer />
    </div>);

}