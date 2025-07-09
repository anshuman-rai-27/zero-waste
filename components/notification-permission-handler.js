"use client";
import { useEffect, useState } from "react";
import { Bell, BellOff, Info, CheckCircle, AlertCircle } from "lucide-react";

export default function NotificationPermissionHandler() {
  const [status, setStatus] = useState("default");
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!("Notification" in window)) {
      setSupported(false);
      return;
    }
    setStatus(Notification.permission);
    if (Notification.permission === "default") {
      Notification.requestPermission().then(setStatus);
    }
  }, []);

  if (!supported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="bg-yellow-100 rounded-full p-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-yellow-900 mb-2">Browser Not Supported</h3>
            <p className="text-yellow-800 text-sm">
              Notifications are not supported in this browser. Please use a modern browser like Chrome, Firefox, or Safari for the best experience.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusConfig = () => {
    switch (status) {
      case "granted":
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          title: "Notifications Enabled",
          description: "You'll receive alerts when collectors are nearby",
          statusText: "Active",
          statusColor: "text-green-600",
        };
      case "denied":
        return {
          icon: <BellOff className="w-5 h-5 text-red-600" />,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          title: "Notifications Disabled",
          description: "You won't receive collection alerts. Enable in browser settings.",
          statusText: "Blocked",
          statusColor: "text-red-600",
        };
      default:
        return {
          icon: <Info className="w-5 h-5 text-blue-600" />,
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          title: "Enable Notifications",
          description: "Get notified when collectors are in your area",
          statusText: "Pending",
          statusColor: "text-blue-600",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-xl p-6`}>
      <div className="flex items-start gap-4">
        <div className={`${config.bgColor.replace('50', '100')} rounded-full p-2`}>
          {config.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{config.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.statusColor} bg-white/80`}>
              {config.statusText}
            </span>
          </div>
          <p className="text-gray-700 text-sm mb-4">{config.description}</p>
          
          {status === "denied" && (
            <div className="bg-white/50 rounded-lg p-3 border border-gray-200">
              <p className="text-xs text-gray-600 mb-2">
                <strong>To enable notifications:</strong>
              </p>
              <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                <li>Click the lock/info icon in your browser's address bar</li>
                <li>Change "Notifications" from "Block" to "Allow"</li>
                <li>Refresh this page</li>
              </ol>
            </div>
          )}
          
          {status === "default" && (
            <div className="bg-white/50 rounded-lg p-3 border border-gray-200">
              <p className="text-xs text-gray-600">
                Click "Allow" when prompted to receive collection notifications.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 