"use client";
import { useState, useCallback } from "react";
import CollectionStatusDashboard from "../../components/collection-status-dashboard";
import NotificationPermissionHandler from "../../components/notification-permission-handler";
import NotificationService from "../../components/notification-service";
import CollectorConfirmation from "../../components/collector-confirmation";

export default function PickupPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleNotify = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center px-2 pb-8">
      <h1 className="text-2xl sm:text-3xl font-bold mt-6 mb-4 text-center">Cardboard Collection Status</h1>
      <CollectionStatusDashboard />
      <NotificationPermissionHandler />
      <NotificationService onNotify={handleNotify} />
      <CollectorConfirmation open={modalOpen} onClose={handleClose} />
    </main>
  );
} 