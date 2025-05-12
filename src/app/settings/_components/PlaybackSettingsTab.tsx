// File: src/app/settings/_components/PlaybackSettingsTab.tsx
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

// Define the type for Playback Settings (can be imported from a shared types file)
interface PlaybackSettings {
  autoplay: boolean;
  fadeTransition: boolean;
  highQuality: boolean;
  showLyrics: boolean;
  downloadLimit: number;
}

// Define the props for the component
interface PlaybackSettingsTabProps {
  settings: PlaybackSettings;
  onSettingChange: <TSetting extends keyof PlaybackSettings>(
    setting: TSetting,
    value: PlaybackSettings[TSetting]
  ) => void;
}

const PlaybackSettingsTab: React.FC<PlaybackSettingsTabProps> = ({
  settings,
  onSettingChange,
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Playback Settings</h3>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white">Autoplay</h4>
            <p className="text-sm text-white/60">Automatically play related content</p>
          </div>
          <Switch
            checked={settings.autoplay}
            onCheckedChange={(checked) => onSettingChange('autoplay', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white">Fade Transitions</h4>
            <p className="text-sm text-white/60">Smooth transitions between tracks</p>
          </div>
          <Switch
            checked={settings.fadeTransition}
            onCheckedChange={(checked) => onSettingChange('fadeTransition', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white">High Quality Audio</h4>
            <p className="text-sm text-white/60">Stream in highest quality (premium only)</p>
          </div>
          <Switch
            checked={settings.highQuality}
            onCheckedChange={(checked) => onSettingChange('highQuality', checked)}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-white">Download Limit</h4>
            <span className="text-sm text-white/60">{settings.downloadLimit} songs</span>
          </div>
          <input
            type="range"
            min="50"
            max="500"
            step="50"
            value={settings.downloadLimit}
            onChange={(e) => onSettingChange('downloadLimit', parseInt(e.target.value))}
            className="w-full accent-haiti-red"
            title="Set download limit"
          />
        </div>
      </div>
    </Card>
  );
};

export default PlaybackSettingsTab;
