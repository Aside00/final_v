import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2Icon } from 'lucide-react';
export function WhyBasiraSection() {
  const reasons = [
  'مناسب للسوق السعودي',
  'واجهة عربية سهلة',
  'تحليل سريع وواضح',
  'شرح مبسط للبنود القانونية'];

  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <motion.div
              initial={{
                opacity: 0,
                x: 20
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.6
              }}>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                لماذا بصيرة؟
              </h2>
              <p className="text-primary-light text-lg mb-8 leading-relaxed">
                صُممت منصة بصيرة خصيصاً لتلبي احتياجات السوق السعودي، معتمدة على
                أحدث تقنيات الذكاء الاصطناعي لتبسيط اللغة القانونية المعقدة
                وجعلها مفهومة للجميع.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reasons.map((reason, index) =>
                <div
                  key={index}
                  className="flex items-center space-x-3 space-x-reverse">
                  
                    <CheckCircle2Icon className="w-6 h-6 text-gold flex-shrink-0" />
                    <span className="text-lg font-medium">{reason}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              whileInView={{
                opacity: 1,
                scale: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.6
              }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6 border-b border-white/20 pb-4">
                  <span className="text-white/80">نتيجة التحليل</span>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                    آمن نسبيًا
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-white/20 rounded w-3/4"></div>
                  <div className="h-4 bg-white/20 rounded w-full"></div>
                  <div className="h-4 bg-white/20 rounded w-5/6"></div>
                </div>
                <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm text-white/90 leading-relaxed">
                    "هذا البند يوضح مدة تجربة الموظف. المدة المذكورة (90 يوماً)
                    متوافقة مع نظام العمل السعودي."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>);

}