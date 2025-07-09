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
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <Truck className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              Cardboard Collection
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 font-medium">
              Real-time pickup status & notifications
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Package className="w-4 h-4" />
                <span>Eco-friendly disposal</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="w-4 h-4" />
                <span>Same-day pickup</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin className="w-4 h-4" />
                <span>Local coverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="relative -mt-8 px-4 sm:px-6 lg:px-8">
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

      {/* Main Content */}
      <main className="relative px-4 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Status Tab */}
          {activeTab === 'status' && (
            <>
              {/* Status Dashboard */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Collection Status</h2>
                  <p className="text-gray-600">Current pickup availability in your area</p>
                </div>
                <CollectionStatusDashboard />
              </div>

              {/* Notification Section */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Bell className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                    <p className="text-gray-600">Stay updated on collector availability</p>
                  </div>
                </div>
                <NotificationPermissionHandler />
              </div>

              {/* Real-time Tracking */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 rounded-full p-2">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Real-time Tracking</h2>
                    <p className="text-gray-600">Track collector location and ETA</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">2.3 km</div>
                      <div className="text-sm text-gray-600">Distance from you</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">15 min</div>
                      <div className="text-sm text-gray-600">Estimated arrival</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">3 stops</div>
                      <div className="text-sm text-gray-600">Before your pickup</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <div className="space-y-6">
              {/* Wallet Overview */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Your Green Wallet</h2>
                      <p className="text-green-100 text-sm">Earn rewards for eco-friendly actions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">850</div>
                    <div className="text-green-100 text-sm">Total Points</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Coins className="w-5 h-5" />
                      <span className="font-semibold">Available</span>
                    </div>
                    <div className="text-2xl font-bold">₹350</div>
                    <div className="text-green-100 text-sm">Cashback</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5" />
                      <span className="font-semibold">This Month</span>
                    </div>
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-green-100 text-sm">Pickups</div>
                  </div>
                </div>
              </div>

              {/* Rewards Timeline */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 rounded-full p-2">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Rewards Timeline</h2>
                    <p className="text-gray-600">Complete challenges to unlock rewards</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {rewards.map((reward, index) => (
                    <div key={reward.id} className="relative">
                      {/* Timeline Line */}
                      {index < rewards.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                      )}
                      
                      <div className="flex items-start gap-4">
                        {/* Status Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(reward.status)}`}>
                          {getStatusIcon(reward.status)}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0 bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {reward.icon}
                              <h3 className="font-semibold text-gray-900">{reward.title}</h3>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-600">{reward.points}</div>
                              <div className="text-xs text-gray-500">points</div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                          
                          {/* Progress Bar for in-progress */}
                          {reward.status === 'in-progress' && (
                            <div className="mb-3">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>{reward.progress}/{reward.total}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${(reward.progress / reward.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Gift className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-600">{reward.reward}</span>
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
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-green-100 text-green-700 p-4 rounded-xl hover:bg-green-200 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="w-5 h-5" />
                      <span className="font-semibold">Redeem Points</span>
                    </div>
                    <p className="text-sm">Convert points to cashback</p>
                  </button>
                  <button className="bg-blue-100 text-blue-700 p-4 rounded-xl hover:bg-blue-200 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="w-5 h-5" />
                      <span className="font-semibold">View History</span>
                    </div>
                    <p className="text-sm">See all your rewards</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 rounded-full p-2">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Pickup History</h2>
                  <p className="text-gray-600">Your recent collection records</p>
                </div>
              </div>
              <div className="space-y-4">
                {pickupHistory.map((pickup, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 rounded-full p-2">
                          <Package className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {new Date(pickup.date).toLocaleDateString()} at {pickup.time}
                          </div>
                          <div className="text-sm text-gray-600">
                            Collector: {pickup.collector} • Weight: {pickup.weight}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(pickup.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
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
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 rounded-full p-2">
                  <HelpCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Collection Tips</h2>
                  <p className="text-gray-600">Best practices for efficient pickup</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Preparation Tips
                  </h3>
                  <ul className="space-y-2 text-orange-800 text-sm">
                    <li>• Flatten all cardboard boxes</li>
                    <li>• Remove any tape or labels</li>
                    <li>• Keep materials dry and clean</li>
                    <li>• Separate by size for easy handling</li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    Environmental Impact
                  </h3>
                  <ul className="space-y-2 text-green-800 text-sm">
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
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 rounded-full p-2">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
                  <p className="text-gray-600">Common questions about our service</p>
                </div>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-100 rounded-full p-2">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
                  <p className="text-gray-600">Get in touch with our team</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Phone Support</div>
                      <div className="text-sm text-gray-600">+91 98765 43210</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Email Support</div>
                      <div className="text-sm text-gray-600">support@cardboardcollect.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-semibold text-gray-900">WhatsApp</div>
                      <div className="text-sm text-gray-600">+91 98765 43210</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Office Hours</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="flex items-start gap-4">
                <div className="bg-green-500 rounded-full p-3">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-900 mb-2">What We Collect</h3>
                  <ul className="text-green-800 space-y-1 text-sm">
                    <li>• Cardboard boxes and packaging</li>
                    <li>• Paper waste and cartons</li>
                    <li>• Clean, dry materials only</li>
                    <li>• Any size or quantity</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 rounded-full p-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Service Hours</h3>
                  <div className="text-blue-800 space-y-1 text-sm">
                    <p><strong>Monday - Saturday:</strong></p>
                    <p>9:00 AM - 6:00 PM</p>
                    <p className="mt-2"><strong>Sunday:</strong></p>
                    <p>10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Schedule Pickup?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get notified when our collector is in your area and schedule your cardboard pickup instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Learn More
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Hidden Components */}
      <NotificationService onNotify={handleNotify} />
      <CollectorConfirmation open={modalOpen} onClose={handleClose} />
    </div>
  );
} 
