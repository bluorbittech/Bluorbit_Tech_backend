import { vehicles, drivers } from "@/data/mockData";
import { Car, Users, Satellite, Activity } from "lucide-react";

const stats = [
  { label: "Connected Vehicles", value: vehicles.filter((v) => v.status === "online").length, total: vehicles.length, icon: Car, color: "text-primary" },
  { label: "Active Drivers", value: drivers.filter((d) => d.status === "active").length, total: drivers.length, icon: Users, color: "text-success" },
  { label: "GPS Signal", value: "Strong", icon: Satellite, color: "text-primary" },
  { label: "System Health", value: "98.2%", icon: Activity, color: "text-success" },
];

export function VehicleStatusWidget() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="glass rounded-xl p-4 neon-border group hover:border-primary/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <s.icon className={`h-5 w-5 ${s.color}`} />
            <div className="w-2 h-2 rounded-full bg-success animate-pulse-glow status-online" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            {typeof s.value === "number" ? <>{s.value}<span className="text-sm text-muted-foreground font-normal">/{s.total}</span></> : s.value}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
