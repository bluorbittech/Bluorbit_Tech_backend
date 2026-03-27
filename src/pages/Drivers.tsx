import { drivers } from "@/data/mockData";
import { UserCheck, AlertTriangle } from "lucide-react";

export default function Drivers() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Drivers</h1>
        <p className="text-sm text-muted-foreground">Driver performance and behavior monitoring</p>
      </div>
      <div className="glass rounded-xl neon-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Driver", "Score", "Trips", "Alerts", "Status"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {drivers.map((d) => (
                <tr key={d.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{d.name.split(" ").map(n => n[0]).join("")}</div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{d.name}</p>
                        <p className="text-xs text-muted-foreground">{d.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`text-sm font-bold ${d.score >= 90 ? "text-success" : d.score >= 75 ? "text-warning" : "text-destructive"}`}>{d.score}</div>
                      <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className={`h-full rounded-full ${d.score >= 90 ? "bg-success" : d.score >= 75 ? "bg-warning" : "bg-destructive"}`} style={{ width: `${d.score}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-foreground">{d.trips}</td>
                  <td className="px-5 py-4">
                    {d.alerts > 0 ? (
                      <span className="flex items-center gap-1 text-sm text-warning"><AlertTriangle className="h-3 w-3" />{d.alerts}</span>
                    ) : (
                      <span className="flex items-center gap-1 text-sm text-success"><UserCheck className="h-3 w-3" />Clean</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${d.status === "active" ? "bg-success/10 text-success" : d.status === "idle" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"}`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
