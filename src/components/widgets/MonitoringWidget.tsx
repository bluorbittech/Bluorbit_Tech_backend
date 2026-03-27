import { vehicleHealthData, trafficData } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { AlertTriangle, Navigation, Zap } from "lucide-react";

export function MonitoringWidget() {
  return (
    <div className="space-y-4">
      {/* Vehicle Health Chart */}
      <div className="glass rounded-xl p-5 neon-border">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" /> Vehicle Health Metrics
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={vehicleHealthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} stroke="hsl(222 30% 16%)" />
              <YAxis tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} stroke="hsl(222 30% 16%)" domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "hsl(222 47% 8%)", border: "1px solid hsl(222 30% 16%)", borderRadius: "8px", fontSize: 12 }} />
              <Line type="monotone" dataKey="engine" stroke="hsl(195 100% 50%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="fuel" stroke="hsl(38 92% 50%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="battery" stroke="hsl(142 71% 45%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 mt-2 justify-center">
          {[{ label: "Engine", color: "bg-primary" }, { label: "Fuel", color: "bg-warning" }, { label: "Battery", color: "bg-success" }].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground"><div className={`w-2 h-2 rounded-full ${l.color}`} />{l.label}</div>
          ))}
        </div>
      </div>

      {/* Traffic & Routes */}
      <div className="glass rounded-xl p-5 neon-border">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Navigation className="h-4 w-4 text-primary" /> Traffic & Route Status
        </h3>
        <div className="space-y-3">
          {trafficData.map((t) => (
            <div key={t.route} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${t.level === "high" ? "bg-destructive status-danger" : t.level === "medium" ? "bg-warning status-warning" : "bg-success status-online"}`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{t.route}</p>
                  <p className="text-xs text-muted-foreground">{t.eta}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{t.congestion}%</p>
                <p className="text-xs text-muted-foreground capitalize">{t.level}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Cards */}
      <div className="glass rounded-xl p-5 neon-border">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" /> Route Optimization
        </h3>
        <div className="space-y-2">
          {[
            { text: "Reroute Fleet B via Highway B-7 to save 23 min", priority: "high" },
            { text: "Schedule Vehicle V-005 maintenance before next shift", priority: "medium" },
            { text: "Reassign Driver D-004 to lower-risk route", priority: "low" },
          ].map((alert, i) => (
            <div key={i} className={`p-3 rounded-lg border text-sm ${alert.priority === "high" ? "border-destructive/30 bg-destructive/5 text-foreground" : alert.priority === "medium" ? "border-warning/30 bg-warning/5 text-foreground" : "border-primary/30 bg-primary/5 text-foreground"}`}>
              {alert.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
