import { useEffect, useState } from "react";
import { Bell, BellOff, Info } from "lucide-react";

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
      <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 rounded-lg p-3 my-2">
        <Info size={20} />
        Notifications are not supported in this browser.
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-3 my-2">
      {status === "granted" ? (
        <Bell className="text-green-500" size={20} />
      ) : status === "denied" ? (
        <BellOff className="text-red-500" size={20} />
      ) : (
        <Info className="text-yellow-500" size={20} />
      )}
      <span className="font-medium">
        Notification permission: {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
} 