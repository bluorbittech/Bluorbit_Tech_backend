import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-secondary/50 border border-border">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <div className="glass rounded-xl p-6 neon-border space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Full Name</Label><Input defaultValue={user?.fullName} className="bg-secondary/50 border-border" /></div>
              <div className="space-y-2"><Label>Email</Label><Input defaultValue={user?.email} className="bg-secondary/50 border-border" /></div>
            </div>
            <div className="space-y-2"><Label>Language</Label><Input defaultValue="English" className="bg-secondary/50 border-border" /></div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Update</Button>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <div className="glass rounded-xl p-6 neon-border space-y-4">
            <div className="space-y-2"><Label>Current Password</Label><Input type="password" placeholder="••••••••" className="bg-secondary/50 border-border" /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>New Password</Label><Input type="password" placeholder="••••••••" className="bg-secondary/50 border-border" /></div>
              <div className="space-y-2"><Label>Confirm</Label><Input type="password" placeholder="••••••••" className="bg-secondary/50 border-border" /></div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div><p className="text-sm font-medium text-foreground">Two-Factor Authentication</p><p className="text-xs text-muted-foreground">Add extra security to your account</p></div>
              <Switch />
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Update Password</Button>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="mt-4">
          <div className="glass rounded-xl p-6 neon-border space-y-4">
            {[
              { label: "Email Notifications", desc: "Receive alerts via email" },
              { label: "Push Notifications", desc: "Browser push notifications" },
              { label: "Weekly Reports", desc: "Get weekly fleet summary" },
              { label: "Real-time Alerts", desc: "Instant alert for critical events" },
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div><p className="text-sm font-medium text-foreground">{pref.label}</p><p className="text-xs text-muted-foreground">{pref.desc}</p></div>
                <Switch defaultChecked={i < 2} />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
