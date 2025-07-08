import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Info } from "lucide-react";

const messages = {
  yes: {
    icon: <CheckCircle className="text-green-500" size={28} />,
    text: "Thank you! Our collector will stop by soon.",
  },
  no: {
    icon: <Info className="text-blue-500" size={28} />,
    text: "No worries! We'll notify you next time.",
  },
};

export default function ResponseInterface({ response }) {
  useEffect(() => {
    const timer = setTimeout(() => {}, 2000);
    return () => clearTimeout(timer);
  }, []);

  const msg = messages[response];
  if (!msg) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6 max-w-xs w-full text-center flex flex-col items-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="mb-2">{msg.icon}</div>
        <div className="text-lg font-medium">{msg.text}</div>
      </motion.div>
    </motion.div>
  );
} 