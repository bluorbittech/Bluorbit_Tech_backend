import { aiInsightsData } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";
import { Brain, TrendingDown, TrendingUp, Shield } from "lucide-react";

export default function AIInsights() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Insights</h1>
        <p className="text-sm text-muted-foreground">Predictive analytics and AI-driven intelligence</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Risk Score Trend", value: "↓ 53%", desc: "Reduced over 6 months", icon: TrendingDown, color: "text-success" },
          { label: "Fleet Efficiency", value: "94%", desc: "Peak performance", icon: TrendingUp, color: "text-primary" },
          { label: "Safety Grade", value: "A+", desc: "Top 5% industry-wide", icon: Shield, color: "text-success" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-xl p-5 neon-border">
            <div className="flex items-center gap-2 mb-2"><s.icon className={`h-4 w-4 ${s.color}`} /><span className="text-xs text-muted-foreground">{s.label}</span></div>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-5 neon-border">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><Brain className="h-4 w-4 text-primary" /> Risk Score Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={aiInsightsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} stroke="hsl(222 30% 16%)" />
                <YAxis tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} stroke="hsl(222 30% 16%)" />
                <Tooltip contentStyle={{ background: "hsl(222 47% 8%)", border: "1px solid hsl(222 30% 16%)", borderRadius: "8px", fontSize: 12 }} />
                <Area type="monotone" dataKey="riskScore" stroke="hsl(195 100% 50%)" fill="hsl(195 100% 50% / 0.1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-xl p-5 neon-border">
          <h3 className="text-sm font-semibold text-foreground mb-4">Fleet Efficiency & Incidents</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aiInsightsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} stroke="hsl(222 30% 16%)" />
                <YAxis tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} stroke="hsl(222 30% 16%)" />
                <Tooltip contentStyle={{ background: "hsl(222 47% 8%)", border: "1px solid hsl(222 30% 16%)", borderRadius: "8px", fontSize: 12 }} />
                <Bar dataKey="efficiency" fill="hsl(195 100% 50%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="incidents" fill="hsl(0 72% 51%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
