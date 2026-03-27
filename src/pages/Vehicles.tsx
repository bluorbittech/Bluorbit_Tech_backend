import { vehicles } from "@/data/mockData";
import { Car } from "lucide-react";

export default function Vehicles() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Vehicles</h1>
        <p className="text-sm text-muted-foreground">Monitor and manage your connected fleet</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <div key={v.id} className="glass rounded-xl p-5 neon-border hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Car className="h-5 w-5 text-primary" /></div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{v.name}</p>
                  <p className="text-xs text-muted-foreground">{v.plate}</p>
                </div>
              </div>
              <div className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${v.status === "online" ? "bg-success/10 text-success" : v.status === "idle" ? "bg-warning/10 text-warning" : v.status === "maintenance" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>
                {v.status}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[{ label: "Health", value: v.health, color: v.health > 80 ? "bg-success" : "bg-warning" }, { label: "Fuel", value: v.fuel, color: v.fuel > 50 ? "bg-primary" : "bg-warning" }, { label: "Battery", value: v.battery, color: v.battery > 50 ? "bg-success" : "bg-destructive" }].map((m) => (
                <div key={m.label} className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden"><div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.value}%` }} /></div>
                  <p className="text-xs font-semibold text-foreground mt-1">{m.value}%</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">Driver: <span className="text-foreground">{v.driver}</span></p>
              <p className="text-xs text-muted-foreground">{v.speed > 0 ? `${v.speed} mph` : "Parked"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
