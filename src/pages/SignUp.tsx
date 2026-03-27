import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "", company: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await signUp({ fullName: form.fullName, email: form.email, password: form.password, company: form.company });
      navigate("/");
    } catch (err: any) {
      // Map Firebase error codes to friendly messages
      const code = err?.code ?? "";
      if (code === "auth/email-already-in-use") setError("This email is already registered. Please sign in.");
      else if (code === "auth/invalid-email") setError("Invalid email address.");
      else if (code === "auth/weak-password") setError("Password is too weak. Use at least 6 characters.");
      else setError(err?.message ?? "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(222_47%_6%)_70%)]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="glass rounded-2xl p-8 neon-border">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img src="/logo.svg" alt="BluOrbitTech" className="h-14 w-auto" />
              <span className="font-display text-xl font-bold text-primary glow-text">BluOrbitTech</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Create Account</h1>
            <p className="text-muted-foreground text-sm">Join the AI Mobility Command Center</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input placeholder="Alex Carter" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required className="bg-secondary/50 border-border focus:border-primary" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="you@company.com" value={form.email} onChange={(e) => update("email", e.target.value)} required className="bg-secondary/50 border-border focus:border-primary" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="••••••••" value={form.password} onChange={(e) => update("password", e.target.value)} required className="bg-secondary/50 border-border focus:border-primary" />
              </div>
              <div className="space-y-2">
                <Label>Confirm</Label>
                <Input type="password" placeholder="••••••••" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} required className="bg-secondary/50 border-border focus:border-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Company Name <span className="text-muted-foreground">(optional)</span></Label>
              <Input placeholder="BluOrbitTech" value={form.company} onChange={(e) => update("company", e.target.value)} className="bg-secondary/50 border-border focus:border-primary" />
            </div>
            <Button type="submit" className="w-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
              {loading ? "Creating..." : "Create BluOrbit Account"}
            </Button>
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
