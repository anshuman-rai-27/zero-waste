import { CheckCircle } from "lucide-react";

const statuses = [
  {
    label: "Collector",
    value: "Ramesh",
    status: "Active",
    icon: <CheckCircle className="text-green-500" size={24} />,
  },
  {
    label: "Your Area",
    value: "Koramangala",
    status: "Covered",
    icon: <CheckCircle className="text-green-500" size={24} />,
  },
  {
    label: "Window",
    value: "9 AM–6 PM",
    status: "Open",
    icon: <CheckCircle className="text-green-500" size={24} />,
  },
];

export default function CollectionStatusDashboard() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto py-4">
      {statuses.map((s) => (
        <div
          key={s.label}
          className="flex-1 bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-200 cursor-pointer min-w-[120px]"
        >
          <div className="mb-2">{s.icon}</div>
          <div className="font-semibold text-lg">{s.value}</div>
          <div className="text-gray-500 text-sm">{s.label}</div>
          <div className="mt-1 text-xs text-green-600 font-medium">{s.status}</div>
        </div>
      ))}
    </div>
  );
} 