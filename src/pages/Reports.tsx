import { FileBarChart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const reports = [
  { name: "Monthly Fleet Performance", date: "Mar 2026", type: "PDF" },
  { name: "Driver Behavior Analysis", date: "Mar 2026", type: "CSV" },
  { name: "Fuel Consumption Report", date: "Feb 2026", type: "PDF" },
  { name: "AI Risk Assessment", date: "Feb 2026", type: "PDF" },
  { name: "Route Optimization Summary", date: "Jan 2026", type: "CSV" },
];

export default function Reports() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground">Generated fleet and analytics reports</p>
      </div>
      <div className="glass rounded-xl neon-border divide-y divide-border">
        {reports.map((r, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-4 hover:bg-secondary/20 transition-colors">
            <div className="flex items-center gap-3">
              <FileBarChart className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.date} · {r.type}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary"><Download className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
}
