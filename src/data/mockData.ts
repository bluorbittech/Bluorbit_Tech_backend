export const vehicles = [
  { id: "V-001", name: "Tesla Model Y", plate: "BLU-2847", status: "online", health: 94, fuel: 82, battery: 76, lat: 37.7749, lng: -122.4194, driver: "Sarah Chen", speed: 45 },
  { id: "V-002", name: "Ford Transit", plate: "BLU-1923", status: "online", health: 87, fuel: 61, battery: 100, lat: 37.7849, lng: -122.4094, driver: "James Wilson", speed: 32 },
  { id: "V-003", name: "BMW iX", plate: "BLU-3156", status: "idle", health: 91, fuel: 95, battery: 89, lat: 37.7649, lng: -122.4294, driver: "Maria Lopez", speed: 0 },
  { id: "V-004", name: "Mercedes EQS", plate: "BLU-4201", status: "online", health: 78, fuel: 43, battery: 52, lat: 37.7949, lng: -122.3994, driver: "David Park", speed: 67 },
  { id: "V-005", name: "Rivian R1T", plate: "BLU-5089", status: "maintenance", health: 45, fuel: 12, battery: 31, lat: 37.7549, lng: -122.4394, driver: "Unassigned", speed: 0 },
  { id: "V-006", name: "Volvo XC40", plate: "BLU-6734", status: "online", health: 96, fuel: 78, battery: 91, lat: 37.8049, lng: -122.4494, driver: "Nina Patel", speed: 55 },
  { id: "V-007", name: "Audi e-tron", plate: "BLU-7812", status: "offline", health: 82, fuel: 34, battery: 18, lat: 37.7449, lng: -122.4594, driver: "Tom Hayes", speed: 0 },
  { id: "V-008", name: "Hyundai Ioniq 5", plate: "BLU-8456", status: "online", health: 89, fuel: 67, battery: 84, lat: 37.7849, lng: -122.4194, driver: "Lisa Chang", speed: 41 },
];

export const drivers = [
  { id: "D-001", name: "Sarah Chen", score: 92, trips: 156, alerts: 2, status: "active", vehicle: "V-001" },
  { id: "D-002", name: "James Wilson", score: 87, trips: 203, alerts: 5, status: "active", vehicle: "V-002" },
  { id: "D-003", name: "Maria Lopez", score: 95, trips: 89, alerts: 0, status: "idle", vehicle: "V-003" },
  { id: "D-004", name: "David Park", score: 73, trips: 312, alerts: 11, status: "active", vehicle: "V-004" },
  { id: "D-005", name: "Nina Patel", score: 98, trips: 178, alerts: 1, status: "active", vehicle: "V-006" },
  { id: "D-006", name: "Tom Hayes", score: 81, trips: 245, alerts: 7, status: "offline", vehicle: "V-007" },
  { id: "D-007", name: "Lisa Chang", score: 90, trips: 134, alerts: 3, status: "active", vehicle: "V-008" },
];

export const notifications = [
  { id: 1, type: "danger", message: "Harsh braking detected — Vehicle V-004", time: "2 min ago" },
  { id: 2, type: "warning", message: "Traffic congestion ahead on Route A-12", time: "5 min ago" },
  { id: 3, type: "info", message: "Vehicle V-005 maintenance scheduled", time: "12 min ago" },
  { id: 4, type: "danger", message: "Speed limit exceeded — Driver D-004", time: "18 min ago" },
  { id: 5, type: "success", message: "Route optimization saved 23 min on Fleet B", time: "25 min ago" },
  { id: 6, type: "warning", message: "Low battery alert — Vehicle V-007 (18%)", time: "31 min ago" },
];

export const vehicleHealthData = [
  { time: "00:00", engine: 92, fuel: 85, battery: 90 },
  { time: "04:00", engine: 91, fuel: 78, battery: 87 },
  { time: "08:00", engine: 89, fuel: 70, battery: 82 },
  { time: "12:00", engine: 93, fuel: 62, battery: 76 },
  { time: "16:00", engine: 87, fuel: 55, battery: 71 },
  { time: "20:00", engine: 90, fuel: 48, battery: 68 },
  { time: "24:00", engine: 94, fuel: 90, battery: 95 },
];

export const trafficData = [
  { route: "Highway A-12", level: "high", congestion: 78, eta: "+15 min" },
  { route: "Downtown Loop", level: "medium", congestion: 52, eta: "+7 min" },
  { route: "Industrial Zone", level: "low", congestion: 18, eta: "+2 min" },
  { route: "Airport Express", level: "medium", congestion: 45, eta: "+5 min" },
];

export const aiInsightsData = [
  { month: "Jan", riskScore: 32, efficiency: 78, incidents: 4 },
  { month: "Feb", riskScore: 28, efficiency: 82, incidents: 3 },
  { month: "Mar", riskScore: 35, efficiency: 76, incidents: 5 },
  { month: "Apr", riskScore: 22, efficiency: 88, incidents: 2 },
  { month: "May", riskScore: 18, efficiency: 91, incidents: 1 },
  { month: "Jun", riskScore: 15, efficiency: 94, incidents: 1 },
];
