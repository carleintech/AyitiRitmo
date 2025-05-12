// File: src/app/settings/page.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Music, Bell, Shield, Palette } from 'lucide-react';
import AccountSettingsTab from './_components/AccountSettingsTab';
import PlaybackSettingsTab from './_components/PlaybackSettingsTab';
import NotificationSettingsTab from './_components/NotificationSettingsTab';
import PrivacySettingsTab from './_components/PrivacySettingsTab';
import DisplaySettingsTab from './_components/DisplaySettingsTab';

// Define types for settings structure for better type safety
interface NotificationSettings {
  newReleases: boolean;
  artistUpdates: boolean;
  friendActivity: boolean;
  email: boolean;
  push: boolean;
}

interface PlaybackSettings {
  autoplay: boolean;
  fadeTransition: boolean;
  highQuality: boolean;
  showLyrics: boolean;
  downloadLimit: number;
}

interface PrivacySettings {
  profilePublic: boolean;
  showListening: boolean;
  shareActivity: boolean;
}

interface DisplaySettings {
  theme: string;
  accentColor: string;
  animations: boolean;
}

interface AppSettings {
  notifications: NotificationSettings;
  playback: PlaybackSettings;
  privacy: PrivacySettings;
  display: DisplaySettings;
}

const Settings = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState<AppSettings>({
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

  // Generic handler for updating nested state
  const handleSettingChange = <
    TCategory extends keyof AppSettings,
    TSetting extends keyof AppSettings[TCategory]
  >(
    category: TCategory,
    setting: TSetting,
    value: AppSettings[TCategory][TSetting]
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/60">Manage your AyitiRitmo preferences</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
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
            <AccountSettingsTab session={session} />
          </TabsContent>
          <TabsContent value="playback" className="mt-6">
            <PlaybackSettingsTab
              settings={settings.playback}
              onSettingChange={(setting, value) => handleSettingChange('playback', setting, value)}
            />
          </TabsContent>
          <TabsContent value="notifications" className="mt-6">
            <NotificationSettingsTab
              settings={settings.notifications}
              onSettingChange={(setting, value) => handleSettingChange('notifications', setting, value)}
            />
          </TabsContent>
          <TabsContent value="privacy" className="mt-6">
            <PrivacySettingsTab
              settings={settings.privacy}
              onSettingChange={(setting, value) => handleSettingChange('privacy', setting, value)}
            />
          </TabsContent>
          <TabsContent value="display" className="mt-6">
            <DisplaySettingsTab
              settings={settings.display}
              onSettingChange={(setting, value) => handleSettingChange('display', setting, value)}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Settings;
