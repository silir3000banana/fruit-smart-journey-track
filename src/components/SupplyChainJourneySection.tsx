import { Badge } from "@/components/ui/badge";
import { Leaf, Building2, Filter, Thermometer, ThermometerSnowflake, Truck, Store, ArrowRight } from "lucide-react";

const stages = [
  { icon: Leaf, label: "Farm", batches: 142, quality: 88, time: "0-2h", risk: "low" },
  { icon: Building2, label: "Collection", batches: 138, quality: 87, time: "2-4h", risk: "low" },
  { icon: Filter, label: "Sorting", batches: 130, quality: 91, time: "1-2h", risk: "low" },
  { icon: Thermometer, label: "Ripening", batches: 85, quality: 89, time: "24-72h", risk: "medium" },
  { icon: ThermometerSnowflake, label: "Cold Storage", batches: 62, quality: 93, time: "12-48h", risk: "low" },
  { icon: Truck, label: "Transport", batches: 45, quality: 90, time: "6-18h", risk: "medium" },
  { icon: Store, label: "Retail / Export", batches: 38, quality: 92, time: "—", risk: "low" },
];

const riskColor: Record<string, string> = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
};

const SupplyChainJourneySection = () => (
  <section className="py-20 bg-gradient-subtle">
    <div className="container mx-auto px-6">
      <div className="text-center mb-14">
        <Badge variant="secondary" className="mb-4 text-xs tracking-wider uppercase px-4 py-1.5 rounded-full">Supply Chain Pipeline</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Fruit Lifecycle Journey</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Real-time visibility across every stage of the supply chain.</p>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex items-start gap-2 min-w-[900px]">
          {stages.map((stage, i) => (
            <div key={i} className="flex items-start">
              <div className="glass-strong rounded-2xl p-5 w-[130px] text-center hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mx-auto mb-3">
                  <stage.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm font-semibold text-foreground mb-3">{stage.label}</div>
                <div className="space-y-2 text-[10px]">
                  <div>
                    <span className="text-muted-foreground">Batches</span>
                    <div className="font-bold text-foreground text-sm">{stage.batches}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Quality</span>
                    <div className="font-bold text-primary text-sm">{stage.quality}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time</span>
                    <div className="font-medium text-foreground">{stage.time}</div>
                  </div>
                  <Badge variant="outline" className={`text-[9px] mt-1 ${riskColor[stage.risk]}`}>
                    {stage.risk} risk
                  </Badge>
                </div>
              </div>
              {i < stages.length - 1 && (
                <div className="flex items-center self-center mt-12">
                  <ArrowRight className="w-4 h-4 text-primary mx-1" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SupplyChainJourneySection;
