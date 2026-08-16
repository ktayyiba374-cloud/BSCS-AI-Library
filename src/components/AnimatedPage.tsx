import React from 'react';
import { motion, HTMLMotionProps, type Variants } from 'motion/react';

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
}

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.995 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      duration: 0.35, 
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05
    } 
  },
  exit: { opacity: 0, y: -12, scale: 0.995, transition: { duration: 0.2 } }
};

export const containerStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05
    }
  }
};

export const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring',
      stiffness: 260,
      damping: 24 
    } 
  }
};

export const AnimatedPage: React.FC<AnimatedPageProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedCard: React.FC<HTMLMotionProps<'div'>> = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <motion.div
      variants={itemFadeUp}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.985 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedButton: React.FC<HTMLMotionProps<'button'>> = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`cursor-pointer transition-shadow ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const AnimatedBadge: React.FC<HTMLMotionProps<'span'>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export const ScaleIn: React.FC<HTMLMotionProps<'div'>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

