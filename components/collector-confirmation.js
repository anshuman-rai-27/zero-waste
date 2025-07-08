import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResponseInterface from "./response-interface";

export default function CollectorConfirmation({ open, onClose }) {
  const [response, setResponse] = useState(null);

  const handleResponse = (res) => {
    setResponse(res);
    setTimeout(() => {
      setResponse(null);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && !response && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="text-2xl mb-4">📍 Ramesh is in your locality to collect cardboard.</div>
            <div className="flex gap-4 justify-center mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                onClick={() => handleResponse("yes")}
              >
                Yes, I have cardboard
              </button>
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                onClick={() => handleResponse("no")}
              >
                No, not this time
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      {response && (
        <ResponseInterface response={response} />
      )}
    </AnimatePresence>
  );
} 