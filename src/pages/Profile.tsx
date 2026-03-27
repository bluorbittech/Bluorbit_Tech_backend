import { useAuth } from "@/contexts/AuthContext";
import { useAppearance, ACCENTS } from "@/contexts/AppearanceContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Activity, Car, Navigation, Palette, Monitor, Moon, Sun } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useState, useRef } from "react";
import { toast } from "@/hooks/use-toast";

export default function Profile() {
  const { user, updateProfile, updatePassword } = useAuth();
  const { accent, setAccent, compact, setCompact, theme, setTheme } = useAppearance();
  const [searchParams] = useSearchParams();
  const initials = user?.fullName?.split(" ").map(n => n[0]).join("") || "U";
  const defaultTab = searchParams.get("tab") ?? "profile";

  const [profile, setProfile] = useState({ fullName: user?.fullName ?? "", email: user?.email ?? "", role: user?.role ?? "", company: user?.company ?? "" });
  const [general, setGeneral] = useState({ fullName: user?.fullName ?? "", email: user?.email ?? "", language: "English" });
  const [security, setSecurity] = useState({ current: "", newPass: "", confirm: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateProfile({ avatar: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleProfileSave = () => {
    updateProfile({ fullName: profile.fullName, email: profile.email, role: profile.role, company: profile.company });
    toast({ title: "Profile saved", description: "Your profile has been updated." });
  };

  const handleGeneralUpdate = () => {
    updateProfile({ fullName: general.fullName, email: general.email });
    toast({ title: "Settings updated", description: "Your general settings have been saved." });
  };

  const handlePasswordUpdate = async () => {
    if (!security.current) return toast({ title: "Error", description: "Enter your current password.", variant: "destructive" });
    if (security.newPass.length < 6) return toast({ title: "Error", description: "New password must be at least 6 characters.", variant: "destructive" });
    if (security.newPass !== security.confirm) return toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });

    try {
      await updatePassword(security.current, security.newPass);
      setSecurity({ current: "", newPass: "", confirm: "" });
      toast({ title: "Password updated", description: "Your password has been changed successfully." });
    } catch (error: any) {
      toast({ title: "Error", description: error?.message || "Unable to update password.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground">Account</h1>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="bg-secondary/50 border border-border">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* ── Profile ── */}
        <TabsContent value="profile" className="mt-4 space-y-4">
          <div className="glass rounded-xl p-6 neon-border">
            <div className="flex items-center gap-5 mb-6">
              <div className="relative">
                <Avatar className="h-20 w-20 bg-primary/20 border-2 border-primary/30">
                  {user?.avatar && <AvatarImage src={user.avatar} alt={user.fullName} className="object-cover" />}
                  <AvatarFallback className="bg-primary/20 text-primary text-xl font-bold">{initials}</AvatarFallback>
                </Avatar>
                <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors">
                  <Camera className="h-3.5 w-3.5 text-primary-foreground" />
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{user?.fullName}</p>
                <p className="text-sm text-muted-foreground">{user?.role}</p>
                <p className="text-xs text-primary">{user?.company}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Full Name</Label><Input value={profile.fullName} onChange={e => setProfile(p => ({ ...p, fullName: e.target.value }))} className="bg-secondary/50 border-border" /></div>
              <div className="space-y-2"><Label>Email</Label><Input value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} className="bg-secondary/50 border-border" /></div>
              <div className="space-y-2"><Label>Role</Label><Input value={profile.role} onChange={e => setProfile(p => ({ ...p, role: e.target.value }))} className="bg-secondary/50 border-border" /></div>
              <div className="space-y-2"><Label>Company</Label><Input value={profile.company} onChange={e => setProfile(p => ({ ...p, company: e.target.value }))} className="bg-secondary/50 border-border" /></div>
            </div>
            <Button onClick={handleProfileSave} className="mt-5 bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
          </div>

          <div className="glass rounded-xl p-6 neon-border">
            <h3 className="text-sm font-semibold text-foreground mb-4">Account Activity</h3>
            <div className="grid grid-cols-3 gap-4">
              {[{ label: "Sessions", value: "42", icon: Activity }, { label: "Vehicles Managed", value: "8", icon: Car }, { label: "Routes Optimized", value: "156", icon: Navigation }].map(s => (
                <div key={s.label} className="text-center p-4 rounded-lg bg-secondary/30">
                  <s.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ── Settings ── */}
        <TabsContent value="settings" className="mt-4 space-y-4">
          <div className="glass rounded-xl p-6 neon-border space-y-4">
            <h3 className="text-sm font-semibold text-foreground">General</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Full Name</Label><Input value={general.fullName} onChange={e => setGeneral(p => ({ ...p, fullName: e.target.value }))} className="bg-secondary/50 border-border" /></div>
              <div className="space-y-2"><Label>Email</Label><Input value={general.email} onChange={e => setGeneral(p => ({ ...p, email: e.target.value }))} className="bg-secondary/50 border-border" /></div>
            </div>
            <div className="space-y-2"><Label>Language</Label><Input value={general.language} onChange={e => setGeneral(p => ({ ...p, language: e.target.value }))} className="bg-secondary/50 border-border" /></div>
            <Button onClick={handleGeneralUpdate} className="bg-primary text-primary-foreground hover:bg-primary/90">Update</Button>
          </div>

          <div className="glass rounded-xl p-6 neon-border space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Security</h3>
            <div className="space-y-2"><Label>Current Password</Label><Input type="password" placeholder="••••••••" value={security.current} onChange={e => setSecurity(p => ({ ...p, current: e.target.value }))} className="bg-secondary/50 border-border" /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>New Password</Label><Input type="password" placeholder="••••••••" value={security.newPass} onChange={e => setSecurity(p => ({ ...p, newPass: e.target.value }))} className="bg-secondary/50 border-border" /></div>
              <div className="space-y-2"><Label>Confirm</Label><Input type="password" placeholder="••••••••" value={security.confirm} onChange={e => setSecurity(p => ({ ...p, confirm: e.target.value }))} className="bg-secondary/50 border-border" /></div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div><p className="text-sm font-medium text-foreground">Two-Factor Authentication</p><p className="text-xs text-muted-foreground">Add extra security to your account</p></div>
              <Switch />
            </div>
            <Button onClick={handlePasswordUpdate} className="bg-primary text-primary-foreground hover:bg-primary/90">Update Password</Button>
          </div>

          <div className="glass rounded-xl p-6 neon-border space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
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

        {/* ── Appearance ── */}
        <TabsContent value="appearance" className="mt-4 space-y-4">
          <div className="glass rounded-xl p-6 neon-border space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Sun className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Theme</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(["dark", "light"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-all text-sm font-medium ${
                    theme === t
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-secondary/30 text-muted-foreground hover:border-white/20"
                  }`}
                >
                  {t === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-6 neon-border space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <Palette className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Accent Color</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {ACCENTS.map(a => (
                <button
                  key={a.name}
                  onClick={() => setAccent(a)}
                  title={a.name}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm ${accent.name === a.name ? "border-white/40 bg-white/10 font-medium" : "border-border hover:border-white/20 bg-secondary/30"}`}
                >
                  <span className="w-4 h-4 rounded-full shrink-0" style={{ background: `hsl(${a.hsl})`, boxShadow: `0 0 8px hsl(${a.hsl} / 0.6)` }} />
                  {a.name}
                </button>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-6 neon-border space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Monitor className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Display</h3>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm font-medium text-foreground">Compact Mode</p>
                <p className="text-xs text-muted-foreground">Reduce spacing for denser layout</p>
              </div>
              <Switch checked={compact} onCheckedChange={setCompact} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
