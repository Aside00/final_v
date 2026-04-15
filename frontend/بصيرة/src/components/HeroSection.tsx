import React from 'react';
import { motion } from 'framer-motion';
import { FileUpIcon, MessageSquareIcon } from 'lucide-react';
interface HeroSectionProps {
  onUpload: () => void;
  onGeneralChat: () => void;
}
export function HeroSection({ onUpload, onGeneralChat }: HeroSectionProps) {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 rounded-full bg-gold/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6
          }}>
          
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 tracking-tight">
            بصيرة
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-700 mb-8">
            افهم قبل أن توقّع
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 mb-10 leading-relaxed">
            منصة ذكية تساعدك على فهم العقود، كشف البنود الخطرة، ومعرفة ما إذا
            كان العقد يحتاج مراجعة قبل التوقيع.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={onUpload}
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-light transition-colors shadow-md hover:shadow-lg">
              
              <FileUpIcon className="w-5 h-5 ml-2" />
              ارفع عقدك
            </button>
            <button
              onClick={onGeneralChat}
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white text-primary border-2 border-primary/20 rounded-xl font-semibold text-lg hover:bg-gray-50 hover:border-primary transition-colors">
              
              <MessageSquareIcon className="w-5 h-5 ml-2" />
              اسأل بدون رفع عقد
            </button>
          </div>
        </motion.div>
      </div>
    </section>);

}