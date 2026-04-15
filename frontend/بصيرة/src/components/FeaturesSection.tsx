import React, { Children } from 'react';
import { motion } from 'framer-motion';
import {
  FileSearchIcon,
  ShieldAlertIcon,
  MessageSquareIcon,
  BriefcaseIcon } from
'lucide-react';
export function FeaturesSection() {
  const features = [
  {
    icon: <FileSearchIcon className="w-8 h-8 text-primary" />,
    title: 'قراءة وتحليل العقود',
    description:
    'استخراج ذكي للنصوص وتقسيم العقد إلى بنود واضحة يسهل فهمها ومراجعتها.'
  },
  {
    icon: <ShieldAlertIcon className="w-8 h-8 text-amber-500" />,
    title: 'كشف البنود الخطرة والناقصة',
    description:
    'مقارنة عقدك مع المعايير النظامية لاكتشاف أي ثغرات أو شروط مجحفة أو بنود مفقودة.'
  },
  {
    icon: <MessageSquareIcon className="w-8 h-8 text-accent" />,
    title: 'شات ذكي للإجابة عن الأسئلة',
    description:
    'مساعد قانوني ذكي يجيب على استفساراتك حول العقد المرفوع أو أسئلتك العامة.'
  },
  {
    icon: <BriefcaseIcon className="w-8 h-8 text-gold" />,
    title: 'دعم عقود العمل والإيجار والسرية',
    description:
    'قواعد بيانات متخصصة لتحليل أشهر أنواع العقود في السوق السعودي بدقة عالية.'
  }];

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">مميزات بصيرة</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: '-100px'
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {features.map((feature, index) =>
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            
              <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>);

}