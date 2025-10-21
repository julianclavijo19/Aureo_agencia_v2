import { memo } from 'react';
import { motion } from 'motion/react';

interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'gradient' | 'dots';
  flip?: boolean;
  className?: string;
}

export const SectionDivider = memo(({ variant = 'wave', flip = false, className = '' }: SectionDividerProps) => {
  const baseClass = `w-full ${flip ? 'rotate-180' : ''} ${className}`;

  if (variant === 'wave') {
    return (
      <div className={`relative h-16 md:h-24 overflow-hidden ${className}`}>
        <svg
          className={`absolute w-full h-full ${flip ? 'bottom-0' : 'top-0'}`}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0,0 C150,50 350,50 600,25 C850,0 1050,0 1200,25 L1200,120 L0,120 Z"
            className="fill-slate-50 dark:fill-slate-900"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,40 C200,80 400,60 600,70 C800,80 1000,60 1200,80 L1200,120 L0,120 Z"
            className="fill-white dark:fill-slate-950 opacity-60"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
          />
        </svg>
      </div>
    );
  }

  if (variant === 'curve') {
    return (
      <div className={`relative h-12 md:h-20 overflow-hidden ${className}`}>
        <svg
          className={`absolute w-full h-full ${flip ? 'bottom-0' : 'top-0'}`}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0,0 Q600,100 1200,0 L1200,120 L0,120 Z"
            className="fill-slate-50 dark:fill-slate-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </svg>
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className={`relative py-8 w-full overflow-hidden ${className}`}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="relative h-px w-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/50 dark:via-blue-400/50 to-transparent blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
          </motion.div>
        </div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`relative py-12 flex items-center justify-center ${className}`}>
        <motion.div 
          className="px-8 py-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-full shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/50"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
});

SectionDivider.displayName = 'SectionDivider';
