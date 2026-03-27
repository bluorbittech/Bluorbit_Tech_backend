import { VehicleStatusWidget } from "@/components/widgets/VehicleStatusWidget";
import { AIEngineWidget } from "@/components/widgets/AIEngineWidget";
import { MonitoringWidget } from "@/components/widgets/MonitoringWidget";

export default function Index() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Command Center</h1>
        <p className="text-sm text-muted-foreground">Real-time AI mobility intelligence overview</p>
      </div>

      {/* Widget A: Vehicle & Driver Status */}
      <VehicleStatusWidget />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Widget B: AI Engine */}
        <div className="lg:col-span-2">
          <AIEngineWidget />
        </div>

        {/* Widget C: Monitoring */}
        <div className="lg:col-span-3">
          <MonitoringWidget />
        </div>
      </div>
    </div>
  );
}
