'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Music, 
  Bell, 
  Globe, 
  Shield, 
  Palette,
  Download,
  RefreshCw,
  ChevronRight,
  LogOut
} from 'lucide-react';

const Settings = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    notifications: {
      newReleases: true,
      artistUpdates: true,
      friendActivity: false,
      email: true,
      push: false,
    },
    playback: {
      autoplay: true,
      fadeTransition: true,
      highQuality: false,
      showLyrics: true,
      downloadLimit: 100,
    },
    privacy: {
      profilePublic: true,
      showListening: true,
      shareActivity: false,
    },
    display: {
      theme: 'dark',
      accentColor: 'haiti-red',
      animations: true,
    }
  });

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/60">Manage your AyitiRitmo preferences</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800">
            <TabsTrigger value="account">
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="playback">
              <Music className="h-4 w-4 mr-2" />
              Playback
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="h-4 w-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="display">
              <Palette className="h-4 w-4 mr-2" />
              Display
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Full Name</Label>
                    <Input value={session?.user?.name || ''} className="bg-slate-800 border-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Email</Label>
                    <Input value={session?.user?.email || ''} className="bg-slate-800 border-slate-700" disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Language</Label>
                  <select className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white">
                    <option>English</option>
                    <option>Kreyòl</option>
                    <option>Français</option>
                    <option>Español</option>
                  </select>
                </div>
                <div className="pt-4 border-t border-slate-700">
                  <Button className="bg-haiti-red hover:bg-haiti-red/90">Save Changes</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="playback" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Playback Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">Autoplay</h4>
                    <p className="text-sm text-white/60">Automatically play related content</p>
                  </div>
                  <Switch
                    checked={settings.playback.autoplay}
                    onCheckedChange={(checked) => handleSettingChange('playback', 'autoplay', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">Fade Transitions</h4>
                    <p className="text-sm text-white/60">Smooth transitions between tracks</p>
                  </div>
                  <Switch
                    checked={settings.playback.fadeTransition}
                    onCheckedChange={(checked) => handleSettingChange('playback', 'fadeTransition', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">High Quality Audio</h4>
                    <p className="text-sm text-white/60">Stream in highest quality (premium only)</p>
                  </div>
                  <Switch
                    checked={settings.playback.highQuality}
                    onCheckedChange={(checked) => handleSettingChange('playback', 'highQuality', checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white">Download Limit</h4>
                    <span className="text-sm text-white/60">{settings.playback.downloadLimit} songs</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="50"
                    value={settings.playback.downloadLimit}
                    onChange={(e) => handleSettingChange('playback', 'downloadLimit', parseInt(e.target.value))}
                    className="w-full accent-haiti-red"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">New Releases</h4>
                    <p className="text-sm text-white/60">Get notified about new releases from your favorite artists</p>
                  </div>
                  <Switch
                    checked={settings.notifications.newReleases}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'newReleases', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">Artist Updates</h4>
                    <p className="text-sm text-white/60">Tour announcements, new content, etc.</p>
                  </div>
                  <Switch
                    checked={settings.notifications.artistUpdates}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'artistUpdates', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">Friend Activity</h4>
                    <p className="text-sm text-white/60">See what your friends are listening to</p>
                  </div>
                  <Switch
                    checked={settings.notifications.friendActivity}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'friendActivity', checked)}
                  />
                </div>
                
                <div className="pt-4 border-t border-slate-700">
                  <h4 className="text-white mb-4">Delivery Methods</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Email Notifications</span>
                      <Switch
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'email', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Push Notifications</span>
                      <Switch
                        checked={settings.notifications.push}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'push', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Privacy & Safety</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">Public Profile</h4>
                    <p className="text-sm text-white/60">Make your profile visible to other users</p>
                  </div>
                  <Switch
                    checked={settings.privacy.profilePublic}
                    onCheckedChange={(checked) => handleSettingChange('privacy', 'profilePublic', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">Show Listening Activity</h4>
                    <p className="text-sm text-white/60">Let others see what you're currently playing</p>
                  </div>
                  <Switch
                    checked={settings.privacy.showListening}
                    onCheckedChange={(checked) => handleSettingChange('privacy', 'showListening', checked)}
                  />
                </div>
                
                <div className="pt-4 border-t border-slate-700">
                  <h4 className="text-white mb-4">Data & Privacy</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Download Your Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-400 hover:text-red-300">
                      <LogOut className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="display" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Display Preferences</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-white">Theme</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {['dark', 'light', 'auto'].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => handleSettingChange('display', 'theme', theme)}
                        className={`p-3 rounded-lg border text-center capitalize ${
                          settings.display.theme === theme
                            ? 'border-haiti-red bg-haiti-red/10 text-haiti-red'
                            : 'border-white/10 text-white/60'
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-white">Accent Color</h4>
                  <div className="grid grid-cols-5 gap-3">
                    {[
                      { name: 'haiti-red', color: 'bg-haiti-red' },
                      { name: 'haiti-blue', color: 'bg-haiti-blue' },
                      { name: 'haiti-gold', color: 'bg-haiti-gold' },
                      { name: 'purple', color: 'bg-purple-500' },
                      { name: 'green', color: 'bg-green-500' },
                    ].map((accent) => (
                      <button
                        key={accent.name}
                        onClick={() => handleSettingChange('display', 'accentColor', accent.name)}
                        className={`w-12 h-12 rounded-full ${accent.color} border-2 ${
                          settings.display.accentColor === accent.name
                            ? 'border-white ring-2 ring-white/50'
                            : 'border-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">Animations</h4>
                    <p className="text-sm text-white/60">Enable smooth animations and transitions</p>
                  </div>
                  <Switch
                    checked={settings.display.animations}
                    onCheckedChange={(checked) => handleSettingChange('display', 'animations', checked)}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Settings;