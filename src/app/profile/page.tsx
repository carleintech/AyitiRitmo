"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { 
  User, 
  Music, 
  Settings, 
  Bell, 
  CreditCard, 
  LogOut,
  Edit,
  Check
} from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-haiti-blue/30 to-haiti-red/30 backdrop-blur-sm rounded-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-haiti-gold/20 flex items-center justify-center text-haiti-gold text-5xl">
              {user?.name?.charAt(0) || "U"}
            </div>
            <button className="absolute bottom-0 right-0 bg-haiti-blue rounded-full p-2 text-white">
              <Edit size={16} />
            </button>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">{user?.name || "User"}</h1>
            <div className="text-white/80">{user?.email}</div>
            
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-md px-4 py-2 text-white">
                <div className="text-sm text-white/70">Joined</div>
                <div className="font-medium">May 2025</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-md px-4 py-2 text-white">
                <div className="text-sm text-white/70">Playlists</div>
                <div className="font-medium">12</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-md px-4 py-2 text-white">
                <div className="text-sm text-white/70">Following</div>
                <div className="font-medium">36 Artists</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex">
        <div className="w-64 mr-8 hidden md:block">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
            <div className="p-2">
              <ProfileNavItem 
                icon={<User size={18} />}
                label="Personal Info"
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
              />
              <ProfileNavItem 
                icon={<Music size={18} />}
                label="Preferences"
                active={activeTab === "preferences"}
                onClick={() => setActiveTab("preferences")}
              />
              <ProfileNavItem 
                icon={<Bell size={18} />}
                label="Notifications"
                active={activeTab === "notifications"}
                onClick={() => setActiveTab("notifications")}
              />
              <ProfileNavItem 
                icon={<CreditCard size={18} />}
                label="Subscription"
                active={activeTab === "subscription"}
                onClick={() => setActiveTab("subscription")}
              />
              <ProfileNavItem 
                icon={<Settings size={18} />}
                label="Account Settings"
                active={activeTab === "settings"}
                onClick={() => setActiveTab("settings")}
              />
              <ProfileNavItem 
                icon={<LogOut size={18} />}
                label="Logout"
                onClick={logout}
              />
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          {activeTab === "profile" && <PersonalInfoTab />}
          {activeTab === "preferences" && <PreferencesTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "subscription" && <SubscriptionTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}

interface ProfileNavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function ProfileNavItem({ icon, label, active = false, onClick }: ProfileNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center p-3 rounded-md ${
        active 
          ? 'bg-haiti-gold/20 text-haiti-gold' 
          : 'text-white/80 hover:bg-white/10 hover:text-white'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function PersonalInfoTab() {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-white/70 text-sm mb-2">Name</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
            defaultValue="Jean Baptiste"
          />
        </div>
        
        <div>
          <label className="block text-white/70 text-sm mb-2">Email</label>
          <input 
            type="email" 
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
            defaultValue="jean@example.com"
          />
        </div>
        
        <div>
          <label className="block text-white/70 text-sm mb-2">Date of Birth</label>
          <div className="flex gap-4">
            <select className="p-3 rounded-lg bg-white/10 border border-white/20 text-white">
              <option>1</option>
              {/* More options here */}
            </select>
            <select className="p-3 rounded-lg bg-white/10 border border-white/20 text-white">
              <option>January</option>
              {/* More options here */}
            </select>
            <select className="p-3 rounded-lg bg-white/10 border border-white/20 text-white">
              <option>1990</option>
              {/* More options here */}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-white/70 text-sm mb-2">Country</label>
          <select className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white">
            <option>Haiti</option>
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            {/* More options here */}
          </select>
        </div>
        
        <button className="bg-haiti-gold text-haiti-blue px-6 py-3 rounded-lg font-medium">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function PreferencesTab() {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Music Preferences</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Favorite Genres</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <GenreCheckbox label="Kompa" checked={true} />
            <GenreCheckbox label="Rasin" checked={true} />
            <GenreCheckbox label="Zouk" checked={false} />
            <GenreCheckbox label="Rap Kreyòl" checked={true} />
            <GenreCheckbox label="Twoubadou" checked={false} />
            <GenreCheckbox label="Rara" checked={false} />
            <GenreCheckbox label="Gospel" checked={false} />
            <GenreCheckbox label="Jazz" checked={false} />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Language Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="lang-kreyol" 
                name="language" 
                checked 
                className="h-4 w-4 text-haiti-gold focus:ring-haiti-gold" 
              />
              <label htmlFor="lang-kreyol" className="ml-2 text-white">
                Haitian Creole
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="lang-english" 
                name="language" 
                className="h-4 w-4 text-haiti-gold focus:ring-haiti-gold" 
              />
              <label htmlFor="lang-english" className="ml-2 text-white">
                English
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="lang-french" 
                name="language" 
                className="h-4 w-4 text-haiti-gold focus:ring-haiti-gold" 
              />
              <label htmlFor="lang-french" className="ml-2 text-white">
                French
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="lang-spanish" 
                name="language" 
                className="h-4 w-4 text-haiti-gold focus:ring-haiti-gold" 
              />
              <label htmlFor="lang-spanish" className="ml-2 text-white">
                Spanish
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Audio Quality</h3>
          <select className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white">
            <option>Auto (Based on Connection)</option>
            <option>High (320 kbps)</option>
            <option>Medium (160 kbps)</option>
            <option>Low (96 kbps)</option>
          </select>
          <p className="text-white/60 text-sm mt-2">
            Higher quality uses more data when streaming.
          </p>
        </div>
        
        <button className="bg-haiti-gold text-haiti-blue px-6 py-3 rounded-lg font-medium">
          Save Preferences
        </button>
      </div>
    </div>
  );
}

interface GenreCheckboxProps {
  label: string;
  checked: boolean;
}

function GenreCheckbox({ label, checked }: GenreCheckboxProps) {
  return (
    <div className="flex items-center">
      <input 
        type="checkbox" 
        id={`genre-${label.toLowerCase()}`} 
        defaultChecked={checked}
        className="h-4 w-4 text-haiti-gold focus:ring-haiti-gold rounded" 
      />
      <label htmlFor={`genre-${label.toLowerCase()}`} className="ml-2 text-white">
        {label}
      </label>
    </div>
  );
}

function NotificationsTab() {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>
      
      <div className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-white">Email Notifications</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked className="sr-only peer" />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-haiti-gold"></div>
            </label>
          </div>
          <p className="text-white/70">Receive emails about new releases, updates, and announcements.</p>
        </div>
        
        <div className="border-b border-white/10 pb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-white">New Music Alerts</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked className="sr-only peer" />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-haiti-gold"></div>
            </label>
          </div>
          <p className="text-white/70">Get notified when your favorite artists release new music.</p>
        </div>
        
        <div className="border-b border-white/10 pb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-white">Live Event Notifications</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-haiti-gold"></div>
            </label>
          </div>
          <p className="text-white/70">Receive notifications about upcoming concerts and live events.</p>
        </div>
        
        <div className="border-b border-white/10 pb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-white">Platform Updates</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked className="sr-only peer" />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-haiti-gold"></div>
            </label>
          </div>
          <p className="text-white/70">Stay updated about new features and improvements to AyitiRitmo.</p>
        </div>
        
        <button className="bg-haiti-gold text-haiti-blue px-6 py-3 rounded-lg font-medium">
          Save Notification Settings
        </button>
      </div>
    </div>
  );
}

function SubscriptionTab() {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Subscription Plan</h2>
      
      <div className="mb-8">
        <div className="bg-haiti-gold/20 border border-haiti-gold/30 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="mr-4">
              <Check className="h-6 w-6 text-haiti-gold" />
            </div>
            <div>
              <h3 className="text-white font-medium">Free Plan</h3>
              <p className="text-white/70">You are currently on the Free Plan</p>
            </div>
          </div>
        </div>
        
        <div className="text-white/70 mb-6">
          Upgrade to Premium to enjoy ad-free listening, offline playback, and higher quality audio.
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-white font-medium mb-1">Premium</div>
            <div className="text-2xl font-bold text-white mb-4">$5<span className="text-sm font-normal">/month</span></div>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-white/80">
                <Check className="h-4 w-4 text-haiti-gold mr-2" />
                <span>Ad-free listening</span>
              </li>
              <li className="flex items-center text-white/80">
                <Check className="h-4 w-4 text-haiti-gold mr-2" />
                <span>Download for offline</span>
              </li>
              <li className="flex items-center text-white/80">
                <Check className="h-4 w-4 text-haiti-gold mr-2" />
                <span>Higher quality audio</span>
              </li>
              <li className="flex items-center text-white/80">
                <Check className="h-4 w-4 text-haiti-gold mr-2" />
                <span>Exclusive content access</span>
              </li>
            </ul>
            
            <button className="w-full bg-haiti-gold text-haiti-blue px-4 py-2 rounded-md font-medium">
              Upgrade to Premium
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-white font-medium mb-1">Artist Pro</div>
            <div className="text-2xl font-bold text-white mb-4">$12<span className="text-sm font-normal">/month</span></div>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-white/80">
                <Check className="h-4 w-4 text-haiti-gold mr-2" />
                <span>All Premium features</span>
              </li>
              <li className="flex items-center text-white/80">
                <Check className="h-4 w-4 text-haiti-gold mr-2" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center text-white/80">
                <Check className="h-4 w-4 text-haiti-gold mr-2" />
                <span>Direct monetization</span>
              </li>
              <li className="flex items-center text-white/80">
                <Check className="h-4 w-4 text-haiti-gold mr-2" />
                <span>Priority support</span>
              </li>
            </ul>
            
            <button className="w-full bg-haiti-red text-white px-4 py-2 rounded-md font-medium">
              Upgrade to Artist Pro
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-medium text-white mb-4">Payment Methods</h3>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-white/20 rounded flex items-center justify-center mr-4">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-white font-medium">Add Payment Method</div>
              <div className="text-white/70 text-sm">Set up a payment method for subscriptions</div>
            </div>
          </div>
          <button className="bg-haiti-gold/20 text-haiti-gold px-3 py-1 rounded font-medium text-sm">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
      
      <div className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Current Password</label>
              <input 
                type="password" 
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">New Password</label>
              <input 
                type="password" 
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Confirm New Password</label>
              <input 
                type="password" 
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                placeholder="••••••••"
              />
            </div>
            
            <button className="bg-haiti-gold text-haiti-blue px-4 py-2 rounded font-medium">
              Update Password
            </button>
          </div>
        </div>
        
        <div className="border-b border-white/10 pb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-white">Dark Mode</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked className="sr-only peer" />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-haiti-gold"></div>
            </label>
          </div>
          <p className="text-white/70">Toggle between light and dark theme.</p>
        </div>
        
        <div className="border-b border-white/10 pb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-white">Data Saver Mode</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-haiti-gold"></div>
            </label>
          </div>
          <p className="text-white/70">Reduce data usage when streaming music.</p>
        </div>
        
        <div className="border-b border-white/10 pb-4">
          <h3 className="text-lg font-medium text-white mb-4">Download Settings</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="download-wifi" 
                name="download" 
                checked 
                className="h-4 w-4 text-haiti-gold focus:ring-haiti-gold" 
              />
              <label htmlFor="download-wifi" className="ml-2 text-white">
                Download over Wi-Fi only
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="download-any" 
                name="download" 
                className="h-4 w-4 text-haiti-gold focus:ring-haiti-gold" 
              />
              <label htmlFor="download-any" className="ml-2 text-white">
                Download over any connection
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Privacy</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="privacy-history" 
                checked
                className="h-4 w-4 text-haiti-gold focus:ring-haiti-gold rounded" 
              />
              <label htmlFor="privacy-history" className="ml-2 text-white">
                Save listening history
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="privacy-public" 
                className="h-4 w-4 text-haiti-gold focus:ring-haiti-gold rounded" 
              />
              <label htmlFor="privacy-public" className="ml-2 text-white">
                Make playlists public by default
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="privacy-social" 
                checked
                className="h-4 w-4 text-haiti-gold focus:ring-haiti-gold rounded" 
              />
              <label htmlFor="privacy-social" className="ml-2 text-white">
                Connect to social media
              </label>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <button className="bg-haiti-red/80 hover:bg-haiti-red text-white px-4 py-2 rounded font-medium">
            Delete Account
          </button>
          <p className="text-white/60 text-sm mt-2">
            This action cannot be undone. All your data will be permanently deleted.
          </p>
        </div>
      </div>
    </div>
  );
}