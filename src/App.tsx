import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppearanceProvider } from "@/contexts/AppearanceContext";
import { DashboardLayout } from "@/components/DashboardLayout";

import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Vehicles from "./pages/Vehicles";
import Drivers from "./pages/Drivers";
import AIInsights from "./pages/AIInsights";
import Fleet from "./pages/Fleet";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppearanceProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/signin" element={<AuthRoute><SignIn /></AuthRoute>} />
              <Route path="/signup" element={<AuthRoute><SignUp /></AuthRoute>} />
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/vehicles" element={<ProtectedRoute><Vehicles /></ProtectedRoute>} />
              <Route path="/drivers" element={<ProtectedRoute><Drivers /></ProtectedRoute>} />
              <Route path="/ai-insights" element={<ProtectedRoute><AIInsights /></ProtectedRoute>} />
              <Route path="/fleet" element={<ProtectedRoute><Fleet /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/settings" element={<Navigate to="/profile?tab=settings" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppearanceProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
