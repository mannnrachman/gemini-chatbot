import { motion } from 'framer-motion';

export default function TypingIndicator() {
  return (
    <div className="flex space-x-1.5 p-4 bg-white rounded-2xl rounded-bl-sm border border-slate-200 w-16 justify-center items-center shadow-sm">
      <motion.div
        className="w-2 h-2 bg-slate-400 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="w-2 h-2 bg-slate-400 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 bg-slate-400 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
}
