import React, { useState } from "react";
import {
  Crown,
  Zap,
  Shield,
  Download,
  Wifi,
  Volume2,
  Eye,
  Star,
  Check,
  X,
  CreditCard,
  Smartphone,
  Monitor,
  Gamepad2,
  Users,
  Sparkles,
  TrendingUp,
  Gift,
  Clock,
  PlayCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Mock subscription data
const subscriptionPlans = [
  {
    id: "free",
    name: "Free Tier",
    price: 0,
    period: "forever",
    color: "gray",
    popular: false,
    features: [
      { text: "Watch with ads", included: true },
      { text: "Standard definition (480p)", included: true },
      { text: "Limited offline downloads", included: true },
      { text: "Community access", included: true },
      { text: "HD streaming (1080p)", included: false },
      { text: "4K Ultra HD", included: false },
      { text: "Ad-free experience", included: false },
      { text: "Premium content library", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro Gamer",
    price: 9.99,
    period: "month",
    color: "blue",
    popular: true,
    features: [
      { text: "Ad-free streaming", included: true },
      { text: "HD streaming (1080p)", included: true },
      { text: "Unlimited offline downloads", included: true },
      { text: "Early access to content", included: true },
      { text: "Premium gaming tutorials", included: true },
      { text: "Priority customer support", included: true },
      { text: "4K Ultra HD", included: false },
      { text: "Multiple device streaming", included: false },
    ],
  },
  {
    id: "elite",
    name: "Elite Champion",
    price: 19.99,
    period: "month",
    color: "purple",
    popular: false,
    features: [
      { text: "4K Ultra HD streaming", included: true },
      { text: "Stream on 4 devices simultaneously", included: true },
      { text: "Exclusive content & livestreams", included: true },
      { text: "Gaming coaching sessions", included: true },
      { text: "Beta access to new features", included: true },
      { text: "Custom profile badges", included: true },
      { text: "Ad-free experience", included: true },
      { text: "Everything from Pro Gamer", included: true },
    ],
  },
];

const currentSubscriptions = [
  {
    id: 1,
    channel: "ProGamer",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face",
    subscribers: "2.5M",
    verified: true,
    subscribed: true,
    notifications: true,
    lastVideo: "2 hours ago",
    description: "Epic gaming content and tutorials",
  },
  {
    id: 2,
    channel: "GameHighlights",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    subscribers: "1.8M",
    verified: true,
    subscribed: true,
    notifications: false,
    lastVideo: "1 day ago",
    description: "Best gaming moments and compilations",
  },
  {
    id: 3,
    channel: "ValorantPro",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    subscribers: "967K",
    verified: false,
    subscribed: true,
    notifications: true,
    lastVideo: "3 days ago",
    description: "Professional Valorant gameplay and tips",
  },
  {
    id: 4,
    channel: "StreamQueen",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b332c2ba?w=80&h=80&fit=crop&crop=face",
    subscribers: "3.2M",
    verified: true,
    subscribed: true,
    notifications: true,
    lastVideo: "5 hours ago",
    description: "Variety gaming streams and reviews",
  },
];

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [showBilling, setShowBilling] = useState(false);
  const [showChannels, setShowChannels] = useState(true);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [subscriptions, setSubscriptions] = useState(currentSubscriptions);

  const handleSubscriptionToggle = (channelId) => {
    setSubscriptions((subs) =>
      subs.map((sub) =>
        sub.id === channelId ? { ...sub, subscribed: !sub.subscribed } : sub
      )
    );
  };

  const handleNotificationToggle = (channelId) => {
    setSubscriptions((subs) =>
      subs.map((sub) =>
        sub.id === channelId
          ? { ...sub, notifications: !sub.notifications }
          : sub
      )
    );
  };

  const getColorClasses = (color, selected = false) => {
    const colors = {
      gray: selected
        ? "border-gray-400 bg-gray-500/20"
        : "border-gray-600 hover:border-gray-500",
      blue: selected
        ? "border-blue-400 bg-blue-500/20"
        : "border-blue-600 hover:border-blue-500",
      purple: selected
        ? "border-purple-400 bg-purple-500/20"
        : "border-purple-600 hover:border-purple-500",
    };
    return colors[color] || colors.blue;
  };

  const getButtonClasses = (color) => {
    const colors = {
      gray: "bg-gray-600 hover:bg-gray-700 text-white",
      blue: "bg-blue-500 hover:bg-blue-600 text-white",
      purple: "bg-purple-500 hover:bg-purple-600 text-white",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Crown className="h-8 w-8 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">
              Gaming Subscriptions
            </h1>
            <Sparkles className="h-8 w-8 text-purple-400" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Unlock premium gaming content, ad-free streaming, and exclusive
            features with our subscription plans
          </p>
        </div>

        {/* Subscription Plans */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-full border border-white/20 p-1">
              <div className="flex">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    billingCycle === "monthly"
                      ? "bg-blue-500 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                    billingCycle === "yearly"
                      ? "bg-purple-500 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span>Yearly</span>
                  <Gift className="h-4 w-4" />
                  <span className="text-xs bg-green-500 px-2 py-0.5 rounded-full">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white/10 backdrop-blur-md rounded-2xl border-2 shadow-2xl p-8 transition-all duration-300 hover:transform hover:scale-105 ${getColorClasses(
                  plan.color,
                  selectedPlan === plan.id
                )}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                      <Star className="h-4 w-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">
                      $
                      {billingCycle === "yearly" && plan.price > 0
                        ? (plan.price * 12 * 0.8).toFixed(2)
                        : plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-400 ml-2">
                        /{billingCycle === "yearly" ? "year" : plan.period}
                      </span>
                    )}
                  </div>
                  {billingCycle === "yearly" && plan.price > 0 && (
                    <div className="text-green-400 text-sm">
                      Save ${(plan.price * 12 * 0.2).toFixed(2)} per year!
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      )}
                      <span
                        className={
                          feature.included ? "text-white" : "text-gray-500"
                        }
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    if (plan.price > 0) setShowBilling(true);
                  }}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${getButtonClasses(
                    plan.color
                  )} transform hover:scale-105 flex items-center justify-center space-x-2`}
                >
                  {plan.id === "free" ? (
                    <>
                      <PlayCircle className="h-5 w-5" />
                      <span>Current Plan</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Upgrade Now</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Features Showcase */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center space-x-3">
              <Zap className="h-8 w-8 text-yellow-400" />
              <span>Premium Features</span>
            </h2>
            <p className="text-gray-300">
              Experience gaming content like never before
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Ad-Free Experience",
                desc: "Enjoy uninterrupted gaming content",
              },
              {
                icon: Eye,
                title: "4K Ultra HD",
                desc: "Crystal clear video quality",
              },
              {
                icon: Download,
                title: "Offline Downloads",
                desc: "Watch anywhere, anytime",
              },
              {
                icon: Users,
                title: "Exclusive Content",
                desc: "Access premium gaming tutorials",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 mb-4">
                  <feature.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Subscriptions */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
              <Users className="h-6 w-6" />
              <span>Your Subscriptions</span>
              <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                {subscriptions.filter((sub) => sub.subscribed).length}
              </span>
            </h2>
            <button
              onClick={() => setShowChannels(!showChannels)}
              className="text-blue-400 hover:text-blue-300 flex items-center space-x-2"
            >
              <span>{showChannels ? "Hide" : "Show"} Channels</span>
              {showChannels ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>

          {showChannels && (
            <div className="grid md:grid-cols-2 gap-6">
              {subscriptions.map((channel) => (
                <div
                  key={channel.id}
                  className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={channel.avatar}
                      alt={channel.channel}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-white font-semibold">
                          {channel.channel}
                        </h3>
                        {channel.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-2">
                        {channel.subscribers} subscribers
                      </p>
                      <p className="text-gray-400 text-sm mb-3">
                        {channel.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-gray-400 text-xs">
                          <Clock className="h-3 w-3" />
                          <span>Last video: {channel.lastVideo}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleNotificationToggle(channel.id)}
                            className={`p-1 rounded ${
                              channel.notifications
                                ? "text-blue-400 hover:text-blue-300"
                                : "text-gray-500 hover:text-gray-400"
                            }`}
                            title={
                              channel.notifications
                                ? "Turn off notifications"
                                : "Turn on notifications"
                            }
                          >
                            <Volume2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleSubscriptionToggle(channel.id)}
                            className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                              channel.subscribed
                                ? "bg-gray-600 text-white hover:bg-gray-700"
                                : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                          >
                            {channel.subscribed ? "Subscribed" : "Subscribe"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Billing Modal */}
        {showBilling && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl max-w-md w-full p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Complete Your Upgrade
                </h3>
                <button
                  onClick={() => setShowBilling(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">
                    {subscriptionPlans.find((p) => p.id === selectedPlan)?.name}
                  </span>
                  <span className="text-white font-bold">
                    $
                    {billingCycle === "yearly"
                      ? (
                          subscriptionPlans.find((p) => p.id === selectedPlan)
                            ?.price *
                          12 *
                          0.8
                        ).toFixed(2)
                      : subscriptionPlans.find((p) => p.id === selectedPlan)
                          ?.price}
                  </span>
                </div>
                <div className="text-gray-400 text-sm">
                  Billed {billingCycle === "yearly" ? "annually" : "monthly"}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    <button className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-left text-white hover:bg-white/20 transition-colors flex items-center space-x-3">
                      <CreditCard className="h-5 w-5" />
                      <span>Credit Card</span>
                    </button>
                    <button className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-left text-white hover:bg-white/20 transition-colors flex items-center space-x-3">
                      <Smartphone className="h-5 w-5" />
                      <span>Mobile Payment</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowBilling(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowBilling(false);
                    // Handle subscription logic here
                  }}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Crown className="h-5 w-5" />
                  <span>Subscribe</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Subscription;
