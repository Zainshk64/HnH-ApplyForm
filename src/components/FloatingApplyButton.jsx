import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FloatingApplyButton({ onClick }) {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-[#EE7A36] text-white font-bold text-lg px-8 py-5 rounded-full shadow-2xl z-50 flex items-center gap-3 hover:bg-[#e06b1f] transition-all"
    >
      Apply Now Fast
      <span className="bg-white/20 rounded-full p-2">
        <ArrowRight size={22} />
      </span>
    </motion.button>
  );
}