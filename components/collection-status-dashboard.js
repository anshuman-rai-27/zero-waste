import { CheckCircle, User, MapPin, Clock, TrendingUp } from "lucide-react";

const statuses = [
  {
    label: "Collector",
    value: "Ramesh",
    status: "Active",
    description: "Currently on duty",
    icon: <User className="text-blue-600" size={24} />,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    statusColor: "text-blue-600",
  },
  {
    label: "Your Area",
    value: "Koramangala",
    status: "Covered",
    description: "Service available",
    icon: <MapPin className="text-green-600" size={24} />,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    statusColor: "text-green-600",
  },
  {
    label: "Window",
    value: "9 AM–6 PM",
    status: "Open",
    description: "Pickup hours",
    icon: <Clock className="text-orange-600" size={24} />,
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    statusColor: "text-orange-600",
  },
];

export default function CollectionStatusDashboard() {
  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statuses.map((s) => (
          <div
            key={s.label}
            className={`${s.bgColor} ${s.borderColor} border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                {s.icon}
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${s.statusColor} bg-white/80`}>
                {s.status}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-gray-900">{s.value}</h3>
              <p className="text-sm text-gray-600">{s.label}</p>
              <p className="text-xs text-gray-500">{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-500 rounded-full p-2">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Today's Activity</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-600">Pickups</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">156</div>
            <div className="text-sm text-gray-600">kg Collected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">8</div>
            <div className="text-sm text-gray-600">Areas Covered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">4.8</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
        </div>
      </div>

      {/* Next Pickup Info */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-100 rounded-full p-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Next Available Pickup</h3>
            <p className="text-sm text-gray-600">Estimated arrival time</p>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold text-green-900">Within 30 minutes</div>
              <div className="text-sm text-green-700">Ramesh is in your vicinity</div>
            </div>
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Ready
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 