import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Truck, Ship, Clock, ShieldCheck, Thermometer, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const locations = [
  { id: "farm", label: "Theni Farm", lat: 55, lng: 12, type: "origin" as const },
  { id: "cold", label: "Chennai Cold Storage", lat: 50, lng: 38, type: "waypoint" as const },
  { id: "port", label: "Chennai Port", lat: 48, lng: 52, type: "waypoint" as const },
  { id: "dest", label: "Dubai Market", lat: 42, lng: 88, type: "destination" as const },
];

const shipments = [
  {
    batchId: "BAN2403A",
    fruit: "Banana — Grade A",
    origin: "Theni Farm",
    destination: "Dubai Market",
    eta: "36h",
    quality: 92,
    temp: "13.2°C",
    status: "In Transit" as const,
    progress: 62,
  },
  {
    batchId: "MAN2403B",
    fruit: "Mango — Grade A",
    origin: "Ratnagiri Farm",
    destination: "London Retail",
    eta: "54h",
    quality: 89,
    temp: "11.8°C",
    status: "At Port" as const,
    progress: 45,
  },
  {
    batchId: "GRP2403C",
    fruit: "Grape — Grade B",
    origin: "Nashik Farm",
    destination: "Singapore Hub",
    eta: "18h",
    quality: 95,
    temp: "4.5°C",
    status: "Delivered" as const,
    progress: 100,
  },
];

const statusColor: Record<string, string> = {
  "In Transit": "bg-info/10 text-info border-info/20",
  "At Port": "bg-warning/10 text-warning border-warning/20",
  "Delivered": "bg-success/10 text-success border-success/20",
};

const ShipmentTrackingSection = () => {
  const [dashOffset, setDashOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDashOffset((prev) => (prev + 1) % 40);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4 text-xs tracking-wider uppercase px-4 py-1">
            Shipment Tracking
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Live Supply Chain Map
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time batch tracking across farms, cold storage, ports, and global markets.
          </p>
        </div>

        {/* Map Visualization */}
        <Card className="border-border/50 mb-8 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative bg-gradient-to-br from-muted/50 to-accent/20 h-[360px] md:h-[420px] overflow-hidden">
              {/* Grid overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Animated route SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Route path: Farm → Cold Storage → Port → Dubai */}
                <path
                  d={`M ${locations[0].lng} ${locations[0].lat} C ${locations[0].lng + 10} ${locations[0].lat - 8}, ${locations[1].lng - 8} ${locations[1].lat - 5}, ${locations[1].lng} ${locations[1].lat}`}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="0.3"
                  strokeDasharray="2 1.5"
                  strokeDashoffset={-dashOffset * 0.1}
                  opacity="0.6"
                />
                <path
                  d={`M ${locations[1].lng} ${locations[1].lat} L ${locations[2].lng} ${locations[2].lat}`}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="0.3"
                  strokeDasharray="2 1.5"
                  strokeDashoffset={-dashOffset * 0.1}
                  opacity="0.6"
                />
                <path
                  d={`M ${locations[2].lng} ${locations[2].lat} C ${locations[2].lng + 12} ${locations[2].lat - 10}, ${locations[3].lng - 12} ${locations[3].lat + 6}, ${locations[3].lng} ${locations[3].lat}`}
                  fill="none"
                  stroke="hsl(var(--info))"
                  strokeWidth="0.3"
                  strokeDasharray="2 1.5"
                  strokeDashoffset={-dashOffset * 0.1}
                  opacity="0.5"
                />

                {/* Animated pulse along route */}
                <circle r="0.8" fill="hsl(var(--primary))" opacity="0.9">
                  <animateMotion
                    dur="6s"
                    repeatCount="indefinite"
                    path={`M ${locations[0].lng} ${locations[0].lat} C ${locations[0].lng + 10} ${locations[0].lat - 8}, ${locations[1].lng - 8} ${locations[1].lat - 5}, ${locations[1].lng} ${locations[1].lat} L ${locations[2].lng} ${locations[2].lat} C ${locations[2].lng + 12} ${locations[2].lat - 10}, ${locations[3].lng - 12} ${locations[3].lat + 6}, ${locations[3].lng} ${locations[3].lat}`}
                  />
                </circle>
                <circle r="0.5" fill="hsl(var(--primary-glow))" opacity="0.5">
                  <animateMotion
                    dur="6s"
                    repeatCount="indefinite"
                    begin="0.3s"
                    path={`M ${locations[0].lng} ${locations[0].lat} C ${locations[0].lng + 10} ${locations[0].lat - 8}, ${locations[1].lng - 8} ${locations[1].lat - 5}, ${locations[1].lng} ${locations[1].lat} L ${locations[2].lng} ${locations[2].lat} C ${locations[2].lng + 12} ${locations[2].lat - 10}, ${locations[3].lng - 12} ${locations[3].lat + 6}, ${locations[3].lng} ${locations[3].lat}`}
                  />
                </circle>
              </svg>

              {/* Location markers */}
              {locations.map((loc, i) => (
                <div
                  key={loc.id}
                  className="absolute flex flex-col items-center animate-fade-in"
                  style={{
                    left: `${loc.lng}%`,
                    top: `${loc.lat}%`,
                    transform: "translate(-50%, -50%)",
                    animationDelay: `${i * 0.15}s`,
                  }}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg ${
                    loc.type === "origin"
                      ? "bg-primary text-primary-foreground"
                      : loc.type === "destination"
                      ? "bg-info text-info-foreground"
                      : "bg-card text-primary border-2 border-primary/30"
                  }`}>
                    {loc.type === "origin" ? (
                      <MapPin className="w-4 h-4" />
                    ) : loc.type === "destination" ? (
                      <Ship className="w-4 h-4" />
                    ) : (
                      <Truck className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="mt-1.5 px-2 py-0.5 rounded bg-card/90 border border-border/40 shadow-sm">
                    <span className="text-[10px] font-semibold text-foreground whitespace-nowrap">{loc.label}</span>
                  </div>
                  {loc.type === "origin" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-success border-2 border-card animate-pulse" />
                  )}
                </div>
              ))}

              {/* Live batch indicator floating on map */}
              <div
                className="absolute px-3 py-2 rounded-lg bg-card/95 border border-primary/30 shadow-lg animate-fade-in"
                style={{ left: "32%", top: "30%", animationDelay: "0.6s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-bold text-foreground">BAN2403A</span>
                  <Badge variant="outline" className="text-[8px] px-1.5 py-0 h-4 bg-info/10 text-info border-info/20">
                    In Transit
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                    <Thermometer className="w-2.5 h-2.5" /> 13.2°C
                  </span>
                  <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                    <ShieldCheck className="w-2.5 h-2.5" /> 92%
                  </span>
                  <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" /> ETA 36h
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shipments.map((s, i) => (
            <Card
              key={i}
              className="border-border/50 hover:shadow-elegant transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-foreground">{s.batchId}</span>
                  <Badge variant="outline" className={`text-[10px] ${statusColor[s.status]}`}>
                    {s.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{s.fruit}</p>

                {/* Route */}
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-4">
                  <MapPin className="w-3 h-3 text-primary shrink-0" />
                  <span className="truncate">{s.origin}</span>
                  <ArrowRight className="w-3 h-3 shrink-0" />
                  <Ship className="w-3 h-3 text-info shrink-0" />
                  <span className="truncate">{s.destination}</span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-1000"
                    style={{ width: `${s.progress}%` }}
                  />
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <Clock className="w-3 h-3 text-muted-foreground mx-auto mb-0.5" />
                    <div className="text-xs font-bold text-foreground">{s.eta}</div>
                    <div className="text-[9px] text-muted-foreground">ETA</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <ShieldCheck className="w-3 h-3 text-success mx-auto mb-0.5" />
                    <div className="text-xs font-bold text-success">{s.quality}%</div>
                    <div className="text-[9px] text-muted-foreground">Quality</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <Thermometer className="w-3 h-3 text-info mx-auto mb-0.5" />
                    <div className="text-xs font-bold text-foreground">{s.temp}</div>
                    <div className="text-[9px] text-muted-foreground">Temp</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShipmentTrackingSection;
