import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Forgot password state
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState("");
  const [resetError, setResetError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signIn(email, password, rememberMe);
      navigate("/");
    } catch (err: any) {
      const code = err?.code ?? "";
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found")
        setError("Invalid email or password. If you're new, please sign up first.");
      else if (code === "auth/too-many-requests")
        setError("Too many failed attempts. Please try again later or reset your password.");
      else if (code === "auth/operation-not-allowed")
        setError("Email sign-in is not enabled. Please contact support.");
      else if (code === "auth/network-request-failed")
        setError("Network error. Please check your internet connection.");
      else
        setError(err.message ?? "Sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetMsg("");
    if (!resetEmail.trim()) {
      setResetError("Please enter your email address.");
      return;
    }
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail.trim());
      setResetMsg("✓ Reset link sent! Check your email inbox (and spam folder).");
    } catch (err: any) {
      const code = err?.code ?? "";
      if (code === "auth/user-not-found" || code === "auth/invalid-email")
        setResetError("No account found with that email address.");
      else
        setResetError(err.message ?? "Failed to send reset email.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(222_47%_6%)_70%)]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="glass rounded-2xl p-8 neon-border">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img src="/logo.svg" alt="BluOrbitTech" className="h-14 w-auto" />
              <span className="font-display text-xl font-bold text-primary glow-text">BluOrbitTech</span>
            </div>

            {forgotMode ? (
              <>
                <h1 className="text-2xl font-bold text-foreground mb-1">Reset Password</h1>
                <p className="text-muted-foreground text-sm">We'll send a reset link to your email</p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-foreground mb-1">Welcome Back</h1>
                <p className="text-muted-foreground text-sm">Sign in to your Command Center</p>
              </>
            )}
          </div>

          {/* ── Forgot Password form ── */}
          {forgotMode ? (
            <form onSubmit={handleForgotPassword} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email Address</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="you@company.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="bg-secondary/50 border-border focus:border-primary"
                />
              </div>

              {resetMsg && (
                <p className="text-sm text-success text-center bg-success/10 border border-success/30 rounded-lg px-3 py-2">
                  {resetMsg}
                </p>
              )}
              {resetError && <p className="text-sm text-destructive text-center">{resetError}</p>}

              <Button
                type="submit"
                className="w-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={resetLoading}
              >
                {resetLoading ? "Sending..." : "Send Reset Link"}
              </Button>

              <button
                type="button"
                onClick={() => { setForgotMode(false); setResetMsg(""); setResetError(""); }}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
              >
                <ArrowLeft className="h-3 w-3" /> Back to Sign In
              </button>
            </form>
          ) : (
            /* ── Sign In form ── */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-secondary/50 border-border focus:border-primary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-secondary/50 border-border focus:border-primary" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">Remember me</Label>
                </div>
                <button
                  type="button"
                  onClick={() => { setForgotMode(true); setResetEmail(email); setResetMsg(""); setResetError(""); }}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <Button type="submit" className="w-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
                {loading ? "Connecting..." : "Access Command Center"}
              </Button>
              {error && <p className="text-sm text-destructive text-center">{error}</p>}
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
