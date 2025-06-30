import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Monitor,
  Volume2,
  Globe,
  Moon,
  Sun,
  Eye,
  Download,
  Trash2,
  Key,
  CreditCard,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Save,
  X,
  Check,
  AlertCircle,
} from "lucide-react";

function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    theme: "dark",
    language: "en",
    autoplay: true,
    defaultQuality: "auto",

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    commentNotifications: false,
    uploadNotifications: true,

    // Privacy
    profileVisibility: "public",
    showWatchHistory: true,
    showSubscriptions: true,
    restrictedMode: false,

    // Playback
    volume: 80,
    playbackSpeed: 1,
    captions: true,
    captionSize: "medium",

    // Data & Storage
    downloadQuality: "high",
    offlineStorage: "2GB",
    clearCache: false,
  });

  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const handleSettingChange = (category, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleSave = () => {
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const settingSections = [
    { id: "general", title: "General", icon: SettingsIcon },
    { id: "account", title: "Account", icon: User },
    { id: "notifications", title: "Notifications", icon: Bell },
    { id: "privacy", title: "Privacy & Safety", icon: Shield },
    { id: "playback", title: "Playback", icon: Monitor },
    { id: "data", title: "Data & Storage", icon: Download },
    { id: "billing", title: "Billing", icon: CreditCard },
    { id: "help", title: "Help & Support", icon: HelpCircle },
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-300 font-medium">Theme</label>
              <p className="text-gray-400 text-sm">
                Choose your preferred color scheme
              </p>
            </div>
            <div className="flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => handleSettingChange("general", "theme", "light")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  settings.theme === "light"
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </button>
              <button
                onClick={() => handleSettingChange("general", "theme", "dark")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  settings.theme === "dark"
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-300 font-medium">Language</label>
              <p className="text-gray-400 text-sm">
                Select your preferred language
              </p>
            </div>
            <select
              value={settings.language}
              onChange={(e) =>
                handleSettingChange("general", "language", e.target.value)
              }
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Video Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-300 font-medium">Autoplay</label>
              <p className="text-gray-400 text-sm">
                Automatically play next video
              </p>
            </div>
            <button
              onClick={() =>
                handleSettingChange("general", "autoplay", !settings.autoplay)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoplay ? "bg-blue-500" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoplay ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-300 font-medium">
                Default Quality
              </label>
              <p className="text-gray-400 text-sm">
                Choose default video quality
              </p>
            </div>
            <select
              value={settings.defaultQuality}
              onChange={(e) =>
                handleSettingChange("general", "defaultQuality", e.target.value)
              }
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="auto">Auto</option>
              <option value="1080p">1080p</option>
              <option value="720p">720p</option>
              <option value="480p">480p</option>
              <option value="360p">360p</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          {[
            {
              key: "emailNotifications",
              title: "Email Notifications",
              desc: "Receive updates via email",
            },
            {
              key: "pushNotifications",
              title: "Push Notifications",
              desc: "Browser notifications",
            },
            {
              key: "commentNotifications",
              title: "Comment Notifications",
              desc: "When someone comments on your videos",
            },
            {
              key: "uploadNotifications",
              title: "Upload Notifications",
              desc: "When channels you subscribe to upload",
            },
          ].map((notification) => (
            <div
              key={notification.key}
              className="flex items-center justify-between"
            >
              <div>
                <label className="text-gray-300 font-medium">
                  {notification.title}
                </label>
                <p className="text-gray-400 text-sm">{notification.desc}</p>
              </div>
              <button
                onClick={() =>
                  handleSettingChange(
                    "notifications",
                    notification.key,
                    !settings[notification.key]
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings[notification.key] ? "bg-blue-500" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings[notification.key]
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Privacy Controls
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-300 font-medium">
                Profile Visibility
              </label>
              <p className="text-gray-400 text-sm">Who can see your profile</p>
            </div>
            <select
              value={settings.profileVisibility}
              onChange={(e) =>
                handleSettingChange(
                  "privacy",
                  "profileVisibility",
                  e.target.value
                )
              }
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="public">Public</option>
              <option value="subscribers">Subscribers Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          {[
            {
              key: "showWatchHistory",
              title: "Show Watch History",
              desc: "Make your watch history visible to others",
            },
            {
              key: "showSubscriptions",
              title: "Show Subscriptions",
              desc: "Display your subscription list publicly",
            },
            {
              key: "restrictedMode",
              title: "Restricted Mode",
              desc: "Filter out potentially mature content",
            },
          ].map((setting) => (
            <div
              key={setting.key}
              className="flex items-center justify-between"
            >
              <div>
                <label className="text-gray-300 font-medium">
                  {setting.title}
                </label>
                <p className="text-gray-400 text-sm">{setting.desc}</p>
              </div>
              <button
                onClick={() =>
                  handleSettingChange(
                    "privacy",
                    setting.key,
                    !settings[setting.key]
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings[setting.key] ? "bg-blue-500" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings[setting.key] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPlaybackSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Playback Controls
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-300 font-medium">
                Default Volume
              </label>
              <p className="text-gray-400 text-sm">
                Set your preferred volume level
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Volume2 className="h-4 w-4 text-gray-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={settings.volume}
                onChange={(e) =>
                  handleSettingChange(
                    "playback",
                    "volume",
                    parseInt(e.target.value)
                  )
                }
                className="w-24 accent-blue-500"
              />
              <span className="text-white text-sm w-8">{settings.volume}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-300 font-medium">
                Playback Speed
              </label>
              <p className="text-gray-400 text-sm">
                Default playback speed for videos
              </p>
            </div>
            <select
              value={settings.playbackSpeed}
              onChange={(e) =>
                handleSettingChange(
                  "playback",
                  "playbackSpeed",
                  parseFloat(e.target.value)
                )
              }
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x (Normal)</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-300 font-medium">Captions</label>
              <p className="text-gray-400 text-sm">Show captions by default</p>
            </div>
            <button
              onClick={() =>
                handleSettingChange("playback", "captions", !settings.captions)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.captions ? "bg-blue-500" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.captions ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-300 font-medium">Caption Size</label>
              <p className="text-gray-400 text-sm">Size of caption text</p>
            </div>
            <select
              value={settings.captionSize}
              onChange={(e) =>
                handleSettingChange("playback", "captionSize", e.target.value)
              }
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Storage & Downloads
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-300 font-medium">
                Download Quality
              </label>
              <p className="text-gray-400 text-sm">
                Quality for offline downloads
              </p>
            </div>
            <select
              value={settings.downloadQuality}
              onChange={(e) =>
                handleSettingChange("data", "downloadQuality", e.target.value)
              }
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low (360p)</option>
              <option value="medium">Medium (720p)</option>
              <option value="high">High (1080p)</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-300 font-medium">
                Offline Storage Limit
              </label>
              <p className="text-gray-400 text-sm">
                Maximum storage for offline videos
              </p>
            </div>
            <select
              value={settings.offlineStorage}
              onChange={(e) =>
                handleSettingChange("data", "offlineStorage", e.target.value)
              }
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1GB">1 GB</option>
              <option value="2GB">2 GB</option>
              <option value="5GB">5 GB</option>
              <option value="10GB">10 GB</option>
            </select>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <h4 className="text-red-400 font-medium">Clear Cache</h4>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              Clear cached data to free up space. This will remove temporary
              files and may slow down initial loading.
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Trash2 className="h-4 w-4" />
              <span>Clear Cache</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Account Information
        </h3>
        <div className="bg-white/5 rounded-lg p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face"
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h4 className="text-white font-semibold">John Doe</h4>
              <p className="text-gray-400">john.doe@example.com</p>
              <button className="text-blue-400 hover:text-blue-300 text-sm">
                Change Avatar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
        <div className="space-y-3">
          <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-4 text-left transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Key className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-white font-medium">Change Password</p>
                  <p className="text-gray-400 text-sm">
                    Update your account password
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </button>

          <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-4 text-left transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-white font-medium">
                    Two-Factor Authentication
                  </p>
                  <p className="text-gray-400 text-sm">
                    Add an extra layer of security
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return renderGeneralSettings();
      case "notifications":
        return renderNotificationSettings();
      case "privacy":
        return renderPrivacySettings();
      case "playback":
        return renderPlaybackSettings();
      case "data":
        return renderDataSettings();
      case "account":
        return renderAccountSettings();
      case "billing":
        return (
          <div className="text-center py-12">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Billing Settings
            </h3>
            <p className="text-gray-400">
              Manage your subscription and payment methods
            </p>
          </div>
        );
      case "help":
        return (
          <div className="text-center py-12">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Help & Support
            </h3>
            <p className="text-gray-400">
              Get help with your account and troubleshooting
            </p>
          </div>
        );
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">
            Customize your experience and manage your account
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl p-6 sticky top-6">
              <nav className="space-y-1">
                {settingSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-500 text-white"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl p-8">
              {renderSection()}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div className="text-gray-400">
                    <p className="text-sm">Changes are saved automatically</p>
                  </div>
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Notification */}
      {showSaveNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-pulse">
          <Check className="h-4 w-4" />
          <span>Settings saved successfully!</span>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
