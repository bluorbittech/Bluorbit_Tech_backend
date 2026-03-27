import { vehicles } from "@/data/mockData";
import { Truck, MapPin, Gauge } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function Fleet() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.trim().toLowerCase() || "";
  const filteredVehicles = searchQuery
    ? vehicles.filter((v) =>
        [v.name, v.plate, v.driver, v.status].some((field) => field.toLowerCase().includes(searchQuery))
      )
    : vehicles;

  const onlineCount = filteredVehicles.filter((v) => v.status === "online").length;
  const avgHealth = filteredVehicles.length
    ? Math.round(filteredVehicles.reduce((s, v) => s + v.health, 0) / filteredVehicles.length)
    : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Fleet Management</h1>
        <p className="text-sm text-muted-foreground">Overview of your entire fleet operations</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Fleet", value: vehicles.length, icon: Truck },
          { label: "Active Now", value: onlineCount, icon: MapPin },
          { label: "Avg Health", value: `${avgHealth}%`, icon: Gauge },
        ].map((s) => (
          <div key={s.label} className="glass rounded-xl p-5 neon-border">
            <s.icon className="h-5 w-5 text-primary mb-2" />
            <p className="text-3xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="glass rounded-xl p-5 neon-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">Fleet Roster</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border">{["Vehicle", "Plate", "Driver", "Status", "Health", "Speed"].map(h => <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2">{h}</th>)}</tr></thead>
            <tbody>
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((v) => (
                  <tr key={v.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground">{v.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{v.plate}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{v.driver}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          v.status === "online"
                            ? "bg-success/10 text-success"
                            : v.status === "idle"
                            ? "bg-warning/10 text-warning"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">{v.health}%</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{v.speed > 0 ? `${v.speed} mph` : "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-sm text-muted-foreground">
                    No vehicles match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
