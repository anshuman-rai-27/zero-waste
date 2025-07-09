"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Info, Package, Clock, MapPin } from "lucide-react";

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Collector Available</h2>
                    <p className="text-blue-100 text-sm">Ready for pickup</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Ramesh is in your locality
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our collector is currently in your area and ready to collect your cardboard packaging.
                </p>
              </div>

              {/* Collector Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">Collector Details</div>
                    <div className="text-gray-600">Ramesh • ID: COL-2024-001</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>ETA: 10-15 min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>2.3 km away</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleResponse("yes")}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Yes, I have cardboard
                </button>
                <button
                  onClick={() => handleResponse("no")}
                  className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-200 flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  No, not this time
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  You can also schedule for later or contact support for special arrangements.
                </p>
              </div>
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

function ResponseInterface({ response }) {
  const messages = {
    yes: {
      icon: (
        <img
          src="/tick.gif"
          alt="Success"
          className="w-16 h-16 mx-auto mb-2"
          style={{ pointerEvents: 'none' }}
        />
      ),
      title: "Thank you!",
      message: "Ramesh has been notified and will arrive shortly.",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    no: {
      icon: <Info className="text-blue-500" size={32} />,
      title: "No worries!",
      message: "We'll notify you next time a collector is nearby.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
  };

  const msg = messages[response];
  if (!msg) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`${msg.bgColor} ${msg.borderColor} border rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl`}
      >
        <div className="mb-4">{msg.icon}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{msg.title}</h3>
        <p className="text-gray-600">{msg.message}</p>
      </motion.div>
    </motion.div>
  );
} 
