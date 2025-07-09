"use client";
import { useState, useCallback } from "react";
import { Truck, Package, Clock, MapPin, Bell, Calendar, Star, Phone, Mail, MessageCircle, HelpCircle, Award, Users, TrendingUp, Shield, Leaf, Wallet, Gift, Coins, Zap, Target, Trophy, CheckCircle, Lock } from "lucide-react";
import CollectionStatusDashboard from "../../components/collection-status-dashboard";
import NotificationPermissionHandler from "../../components/notification-permission-handler";
import NotificationService from "../../components/notification-service";
import CollectorConfirmation from "../../components/collector-confirmation";

export default function PickupPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('status');

  const handleNotify = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const pickupHistory = [
    { date: "2024-01-15", time: "2:30 PM", collector: "Ramesh", weight: "12 kg", status: "Completed", rating: 5 },
    { date: "2024-01-10", time: "11:45 AM", collector: "Ramesh", weight: "8 kg", status: "Completed", rating: 5 },
    { date: "2024-01-05", time: "3:15 PM", collector: "Ramesh", weight: "15 kg", status: "Completed", rating: 4 },
  ];

  const rewards = [
    {
      id: 1,
      title: "First Pickup Bonus",
      description: "Complete your first cardboard pickup",
      points: 100,
      status: "completed",
      icon: <Gift className="w-5 h-5" />,
      date: "2024-01-05",
      reward: "₹50 Cashback"
    },
    {
      id: 2,
      title: "Eco Warrior",
      description: "Collect 50kg of cardboard",
      points: 250,
      status: "completed",
      icon: <Leaf className="w-5 h-5" />,
      date: "2024-01-10",
      reward: "₹100 Cashback"
    },
    {
      id: 3,
      title: "Consistent Collector",
      description: "Complete 5 pickups in a month",
      points: 500,
      status: "in-progress",
      icon: <Target className="w-5 h-5" />,
      date: "2024-01-15",
      reward: "₹200 Cashback",
      progress: 3,
      total: 5
    },
    {
      id: 4,
      title: "Heavy Lifter",
      description: "Collect 100kg of cardboard",
      points: 750,
      status: "locked",
      icon: <Trophy className="w-5 h-5" />,
      date: "2024-01-20",
      reward: "₹300 Cashback"
    },
    {
      id: 5,
      title: "Monthly Champion",
      description: "Complete 10 pickups in a month",
      points: 1000,
      status: "locked",
      icon: <Award className="w-5 h-5" />,
      date: "2024-01-25",
      reward: "₹500 Cashback"
    }
  ];

  const faqs = [
    {
      question: "What types of cardboard do you accept?",
      answer: "We accept all types of clean, dry cardboard including boxes, packaging, cartons, and paper waste. Please ensure materials are not contaminated with food or liquids."
    },
    {
      question: "How much notice do you need for pickup?",
      answer: "No advance notice required! Our collectors work in real-time. When you receive a notification that a collector is nearby, you can request immediate pickup."
    },
    {
      question: "Is there a minimum or maximum quantity?",
      answer: "No minimum quantity required. We can handle any amount from a single box to large quantities. For very large amounts, we may schedule a special pickup."
    },
    {
      question: "What areas do you cover?",
      answer: "We currently cover Koramangala and surrounding areas. Our service area is expanding regularly. Contact us to check if we serve your location."
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'locked': return 'text-gray-500 bg-gray-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'locked': return <Lock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation Tabs - Hidden on mobile */}
      <div className="relative px-4 sm:px-6 lg:px-8 pt-8 hidden md:block">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { id: 'status', label: 'Live Status', icon: <TrendingUp className="w-4 h-4" /> },
                { id: 'rewards', label: 'Rewards', icon: <Wallet className="w-4 h-4" /> },
                { id: 'history', label: 'History', icon: <Calendar className="w-4 h-4" /> },
                { id: 'tips', label: 'Tips', icon: <HelpCircle className="w-4 h-4" /> },
                { id: 'faq', label: 'FAQ', icon: <MessageCircle className="w-4 h-4" /> },
                { id: 'contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-30 bg-white shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-6 h-6 text-green-600" />
            <h1 className="text-lg font-bold text-gray-900">Cardboard Collect</h1>
          </div>
          <div className="bg-gray-100 rounded-full p-2">
            <Bell className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative px-4 pb-24 sm:px-6 lg:px-8 md:pb-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Status Tab */}
          {activeTab === 'status' && (
            <>
              {/* Status Dashboard */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
                <div className="text-center mb-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Collection Status</h2>
                  <p className="text-gray-600 text-sm">Current pickup availability in your area</p>
                </div>
                <CollectionStatusDashboard />
              </div>

              {/* Notification Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
                    <p className="text-gray-600 text-sm">Stay updated on collector availability</p>
                  </div>
                </div>
                <NotificationPermissionHandler />
              </div>

              {/* Real-time Tracking */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-green-100 rounded-full p-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Real-time Tracking</h2>
                    <p className="text-gray-600 text-sm">Track collector location and ETA</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">2.3 km</div>
                      <div className="text-xs text-gray-600">Distance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">15 min</div>
                      <div className="text-xs text-gray-600">ETA</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">3 stops</div>
                      <div className="text-xs text-gray-600">Before you</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <div className="space-y-5">
              {/* Wallet Overview */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 text-white shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-2">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Green Wallet</h2>
                      <p className="text-green-100 text-xs">Earn rewards for eco-friendly actions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">850</div>
                    <div className="text-green-100 text-xs">Points</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/20 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Coins className="w-4 h-4" />
                      <span className="font-semibold text-sm">Available</span>
                    </div>
                    <div className="text-lg font-bold">₹350</div>
                    <div className="text-green-100 text-xs">Cashback</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4" />
                      <span className="font-semibold text-sm">This Month</span>
                    </div>
                    <div className="text-lg font-bold">3</div>
                    <div className="text-green-100 text-xs">Pickups</div>
                  </div>
                </div>
              </div>

              {/* Rewards Timeline */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-green-100 rounded-full p-2">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Rewards Timeline</h2>
                    <p className="text-gray-600 text-sm">Complete challenges to unlock rewards</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {rewards.map((reward, index) => (
                    <div key={reward.id} className="relative">
                      {/* Timeline Line */}
                      {index < rewards.length - 1 && (
                        <div className="absolute left-5 top-12 w-0.5 h-16 bg-gray-200"></div>
                      )}
                      
                      <div className="flex items-start gap-3">
                        {/* Status Icon */}
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(reward.status)}`}>
                          {getStatusIcon(reward.status)}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0 bg-gray-50 rounded-xl p-3 border border-gray-200">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {reward.icon}
                              <h3 className="font-semibold text-gray-900 text-sm">{reward.title}</h3>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-green-600">{reward.points}</div>
                              <div className="text-xs text-gray-500">points</div>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-2">{reward.description}</p>
                          
                          {/* Progress Bar for in-progress */}
                          {reward.status === 'in-progress' && (
                            <div className="mb-2">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>{reward.progress}/{reward.total}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="bg-green-500 h-1.5 rounded-full"
                                  style={{ width: `${(reward.progress / reward.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Gift className="w-3 h-3 text-green-600" />
                              <span className="text-xs font-medium text-green-600">{reward.reward}</span>
                            </div>
                            <span className="text-xs text-gray-500">{reward.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  <button className="bg-green-100 text-green-700 p-3 rounded-lg hover:bg-green-200 transition-colors">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      <span className="font-semibold text-sm">Redeem Points</span>
                    </div>
                  </button>
                  <button className="bg-blue-100 text-blue-700 p-3 rounded-lg hover:bg-blue-200 transition-colors">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4" />
                      <span className="font-semibold text-sm">View History</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-purple-100 rounded-full p-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Pickup History</h2>
                  <p className="text-gray-600 text-sm">Your recent collection records</p>
                </div>
              </div>
              <div className="space-y-3">
                {pickupHistory.map((pickup, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 rounded-full p-1.5">
                          <Package className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            {new Date(pickup.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} at {pickup.time}
                          </div>
                          <div className="text-xs text-gray-600">
                            {pickup.collector} • {pickup.weight}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(pickup.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {pickup.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips Tab */}
          {activeTab === 'tips' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-orange-100 rounded-full p-2">
                  <HelpCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Collection Tips</h2>
                  <p className="text-gray-600 text-sm">Best practices for efficient pickup</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <h3 className="font-bold text-orange-900 text-sm mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Preparation Tips
                  </h3>
                  <ul className="space-y-1 text-orange-800 text-xs">
                    <li>• Flatten all cardboard boxes</li>
                    <li>• Remove any tape or labels</li>
                    <li>• Keep materials dry and clean</li>
                    <li>• Separate by size for easy handling</li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h3 className="font-bold text-green-900 text-sm mb-2 flex items-center gap-2">
                    <Leaf className="w-4 h-4" />
                    Environmental Impact
                  </h3>
                  <ul className="space-y-1 text-green-800 text-xs">
                    <li>• Reduces landfill waste by 90%</li>
                    <li>• Saves energy in production</li>
                    <li>• Prevents deforestation</li>
                    <li>• Creates local jobs</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-blue-100 rounded-full p-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">FAQ</h2>
                  <p className="text-gray-600 text-sm">Common questions about our service</p>
                </div>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{faq.question}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-red-100 rounded-full p-2">
                  <Phone className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Contact</h2>
                  <p className="text-gray-600 text-sm">Get in touch with our team</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Phone Support</div>
                      <div className="text-xs text-gray-600">+91 98765 43210</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <Mail className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Email Support</div>
                      <div className="text-xs text-gray-600">support@cardboardcollect.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">WhatsApp</div>
                      <div className="text-xs text-gray-600">+91 98765 43210</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-3">Office Hours</h3>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>8AM - 8PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>9AM - 6PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>10AM - 4PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <div className="bg-green-500 rounded-full p-2">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-green-900 text-sm mb-1">What We Collect</h3>
                  <ul className="text-green-800 space-y-1 text-xs">
                    <li>• Cardboard boxes and packaging</li>
                    <li>• Paper waste and cartons</li>
                    <li>• Clean, dry materials only</li>
                    <li>• Any size or quantity</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500 rounded-full p-2">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 text-sm mb-1">Service Hours</h3>
                  <div className="text-blue-800 space-y-1 text-xs">
                    <p><strong>Mon-Sat:</strong> 9AM - 6PM</p>
                    <p><strong>Sunday:</strong> 10AM - 4PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-5 text-center text-white">
            <h3 className="font-bold mb-3">Ready to Schedule Pickup?</h3>
            <p className="text-blue-100 text-xs mb-4">
              Get notified when our collector is nearby
            </p>
            <div className="flex flex-col gap-2">
              <button className="bg-white text-blue-600 px-4 py-2.5 rounded-lg font-semibold text-sm">
                Learn More
              </button>
              <button className="border border-white text-white px-4 py-2.5 rounded-lg font-semibold text-sm">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg z-40 md:hidden">
        <div className="flex justify-around">
          {[
            { id: 'status', label: 'Status', icon: <TrendingUp className="w-5 h-5" /> },
            { id: 'rewards', label: 'Rewards', icon: <Wallet className="w-5 h-5" /> },
            { id: 'history', label: 'History', icon: <Calendar className="w-5 h-5" /> },
            { id: 'tips', label: 'Tips', icon: <HelpCircle className="w-5 h-5" /> },
            { id: 'contact', label: 'Contact', icon: <Phone className="w-5 h-5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center p-3 flex-1 min-w-0 ${
                activeTab === tab.id 
                  ? `${
                      tab.id === 'status' ? 'text-blue-600' :
                      tab.id === 'rewards' ? 'text-green-600' :
                      tab.id === 'history' ? 'text-purple-600' :
                      tab.id === 'tips' ? 'text-orange-600' :
                      'text-red-600'
                    }` 
                  : 'text-gray-500'
              }`}
            >
              {tab.icon}
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hidden Components */}
      <NotificationService onNotify={handleNotify} />
      <CollectorConfirmation open={modalOpen} onClose={handleClose} />
    </div>
  );
}
