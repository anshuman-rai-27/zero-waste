"use client";
import { useEffect, useRef } from "react";

export default function NotificationService({ onNotify }) {
  const sentRef = useRef(false);
  const agentNearby = true;

  useEffect(() => {
    if (!agentNearby) return;
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;
    if (sentRef.current) return;
    const timer = setTimeout(() => {
      if (!sentRef.current) {
        const notification = new Notification("Collector Nearby", {
          body: "Ramesh is now in your area to collect leftover packaging.",
        });
        sentRef.current = true;
        notification.onclick = (e) => {
          e.preventDefault();
          window.dispatchEvent(new Event("collector-notification-clicked"));
          if (onNotify) onNotify();
          // Always redirect to /pickup
          if (window.location.pathname !== "/pickup") {
            window.location.assign("/pickup");
          }
        };
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [onNotify, agentNearby]);

  useEffect(() => {
    if (!onNotify) return;
    const handler = () => {
      onNotify();
      // Always redirect to /pickup
      if (window.location.pathname !== "/pickup") {
        window.location.assign("/pickup");
      }
    };
    window.addEventListener("collector-notification-clicked", handler);
    return () => window.removeEventListener("collector-notification-clicked", handler);
  }, [onNotify]);

  return null;
} 