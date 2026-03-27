import { motion } from "framer-motion";
import { Brain, Shield, Navigation, UserCheck } from "lucide-react";

const metrics = [
  { label: "Risk Prediction", value: "Low", score: "15/100", icon: Shield, color: "text-success" },
  { label: "Traffic Intelligence", value: "Moderate", score: "52%", icon: Navigation, color: "text-warning" },
  { label: "Driver Behavior", value: "Grade A", score: "92/100", icon: UserCheck, color: "text-primary" },
];

export function AIEngineWidget() {
  return (
    <div className="glass rounded-xl p-6 neon-border relative overflow-hidden">
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" style={{ animation: "scan-line 4s linear infinite" }} />
      </div>

      <div className="text-center mb-6">
        <div className="relative inline-flex items-center justify-center w-20 h-20 mb-3">
          {/* Orbiting rings */}
          <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: "8s" }} />
          <div className="absolute inset-2 rounded-full border border-primary/10 animate-spin" style={{ animationDuration: "12s", animationDirection: "reverse" }} />
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Brain className="h-8 w-8 text-primary" />
          </motion.div>
        </div>
        <h3 className="font-display text-sm font-bold text-primary glow-text tracking-wider">AI MOBILITY ENGINE</h3>
        <p className="text-xs text-muted-foreground mt-1">Powered by BluOrbit AI</p>
      </div>

      {/* Data flow visualization */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {["Vehicles", "AI Core", "Insights"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className="text-center">
              <div className={`w-10 h-10 rounded-lg ${i === 1 ? "bg-primary/20 border-primary/40" : "bg-secondary/50 border-border"} border flex items-center justify-center`}>
                <div className={`w-2 h-2 rounded-full ${i === 1 ? "bg-primary animate-pulse-glow" : "bg-muted-foreground"}`} />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{label}</p>
            </div>
            {i < 2 && (
              <div className="w-12 h-px bg-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent" style={{ animation: "data-flow 2s ease-in-out infinite", animationDelay: `${i * 0.5}s` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="text-center p-3 rounded-lg bg-secondary/30">
            <m.icon className={`h-4 w-4 mx-auto mb-1 ${m.color}`} />
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
            <p className="text-[10px] text-muted-foreground">{m.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
