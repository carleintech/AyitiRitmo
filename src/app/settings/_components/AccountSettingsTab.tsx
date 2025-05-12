import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const AccountSettingsTab = ({ session }: { session: any }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white">Full Name</Label>
            <Input value={session?.user?.name ?? ''} className="bg-slate-800 border-slate-700" />
          </div>
          <div className="space-y-2">
            <Label className="text-white">Email</Label>
            <Input value={session?.user?.email ?? ''} className="bg-slate-800 border-slate-700" disabled />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="language-select" className="text-white">Language</Label>
          <select 
            id="language-select" 
            className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white" 
            title="Select your preferred language"
          >
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
  );
};

export default AccountSettingsTab;
