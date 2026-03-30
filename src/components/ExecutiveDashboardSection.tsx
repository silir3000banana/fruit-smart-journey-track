import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Package, ShieldCheck, BarChart3, Truck, Thermometer } from "lucide-react";

const ExecutiveDashboardSection = () => {
  const metrics = [
    { label: "Total Batches Tracked", value: "12,547", trend: "+347", up: true, icon: Package },
    { label: "Spoilage Prevented", value: "₹2,45,000", trend: "+18%", up: true, icon: ShieldCheck },
    { label: "Supply Chain Efficiency", value: "94.2%", trend: "+3.1%", up: true, icon: BarChart3 },
    { label: "Active Shipments", value: "38", trend: "+5", up: true, icon: Truck },
    { label: "Cold Storage Utilization", value: "87%", trend: "-2%", up: false, icon: Thermometer },
  ];

  const spoilageTrend = [
    { month: "Jan", value: 14 }, { month: "Feb", value: 12 },
    { month: "Mar", value: 9 }, { month: "Apr", value: 7 },
    { month: "May", value: 5 }, { month: "Jun", value: 3 },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4 text-xs tracking-wider uppercase px-4 py-1.5 rounded-full">
            Executive Dashboard
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real-Time Business Intelligence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Financial outcomes, operational efficiency, and supply chain visibility in one view.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {metrics.map((m, i) => (
            <Card key={i} className="bg-card hover:shadow-elegant border-border/40 transition-all duration-300 hover:-translate-y-0.5 animate-slide-up" style={{ animationDelay: `${i * 0.06}s` }}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                    <m.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className={`text-[11px] font-semibold flex items-center gap-0.5 ${m.up ? "text-success" : "text-warning"}`}>
                    {m.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {m.trend}
                  </span>
                </div>
                <div className="text-xl font-bold text-foreground">{m.value}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{m.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="border-border/40 hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Spoilage Trend</h3>
              <div className="flex items-end gap-2 h-32">
                {spoilageTrend.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-lg relative overflow-hidden" style={{ height: `${d.value * 8}px`, background: 'hsl(45 100% 65% / 0.15)' }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary-glow opacity-80 rounded-t-lg" />
                    </div>
                    <span className="text-[9px] text-muted-foreground">{d.month}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-success mt-3 font-medium">↓ 78% reduction in spoilage loss</p>
            </CardContent>
          </Card>

          <Card className="border-border/40 hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Profit Saved (₹ Lakhs)</h3>
              <div className="space-y-3">
                {[
                  { label: "Quality Grading", value: 8.5, max: 10 },
                  { label: "Cold Storage Opt.", value: 6.2, max: 10 },
                  { label: "Dispatch Timing", value: 4.8, max: 10 },
                  { label: "Transport Routing", value: 3.1, max: 10 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-foreground">₹{item.value}L</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-700" style={{ width: `${(item.value / item.max) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Dispatch Optimization</h3>
              <div className="space-y-4">
                {[
                  { batch: "BAN2403A", saving: "₹12,400", status: "Dispatched", statusClass: "bg-success/10 text-success border-success/20" },
                  { batch: "MAN2403B", saving: "₹8,900", status: "Ready", statusClass: "bg-primary/10 text-primary border-primary/20" },
                  { batch: "GRP2403C", saving: "₹15,200", status: "Pending", statusClass: "bg-warning/10 text-warning border-warning/20" },
                ].map((d, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/30 hover:border-primary/20 transition-colors duration-200">
                    <div>
                      <div className="text-sm font-semibold text-foreground">{d.batch}</div>
                      <div className="text-xs text-muted-foreground">Saved {d.saving}</div>
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${d.statusClass}`}>{d.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveDashboardSection;
