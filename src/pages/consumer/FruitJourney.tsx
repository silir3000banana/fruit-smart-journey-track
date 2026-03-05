import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Leaf, MapPin, Truck, Warehouse, ShoppingBag, Package, Thermometer,
  Droplets, Sun, Wind, CheckCircle, ArrowLeft, Share2, Clock,
  Apple, Flame, Shield, Heart, Recycle, User
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for the fruit journey
const getMockData = (batchId: string) => ({
  batchId,
  product: { name: "Premium Cavendish Banana", variety: "Grand Naine", emoji: "🍌", weight: "25 kg" },
  freshness: { score: 87, shelfLife: "5 days", optimalWindow: "Next 2 days", status: "fresh" as const },
  farmer: {
    name: "Ravi Shankar",
    photo: null,
    location: "Theni District, Tamil Nadu",
    story: "Third-generation banana farmer practicing integrated pest management across 12 acres of rich alluvial soil in the Western Ghats foothills.",
    method: "Organic",
    experience: "18 years",
    certifications: ["India Organic", "GlobalG.A.P.", "Fair Trade"],
  },
  journey: [
    { stage: "Farm Harvest", icon: Leaf, date: "2026-02-28", time: "06:30 AM", location: "Green Valley Farm, Theni", conditions: "28°C, Hand-picked at optimal maturity", quality: "Grade A", status: "completed" as const },
    { stage: "Packing Center", icon: Package, date: "2026-02-28", time: "11:00 AM", location: "Theni Pack House", conditions: "Sorted, washed, graded by AI", quality: "96/100 AI Score", status: "completed" as const },
    { stage: "Cold Storage", icon: Thermometer, date: "2026-02-28", time: "02:00 PM", location: "ColdChain Hub, Madurai", conditions: "13°C, 90% RH, Controlled Atmosphere", quality: "Optimal", status: "completed" as const },
    { stage: "Transport", icon: Truck, date: "2026-03-01", time: "05:00 AM", location: "Madurai → Chennai", conditions: "Refrigerated vehicle, 13°C maintained", quality: "No breaches", status: "completed" as const },
    { stage: "Distribution", icon: Warehouse, date: "2026-03-01", time: "04:00 PM", location: "Chennai Distribution Center", conditions: "FIFO allocation, Zone B-4", quality: "Verified", status: "in_progress" as const },
    { stage: "Retail Store", icon: ShoppingBag, date: "2026-03-02", time: "—", location: "Metro Fresh, T. Nagar", conditions: "—", quality: "—", status: "pending" as const },
  ],
  iot: {
    temperature: { value: "13.2°C", trend: "stable", data: [14, 13.5, 13.2, 13.1, 13.2, 13.3, 13.2] },
    humidity: { value: "89%", trend: "stable", data: [88, 89, 90, 89, 88, 89, 89] },
    soilMoisture: { value: "42%", trend: "optimal", data: [40, 41, 42, 43, 42, 41, 42] },
    sunlight: { value: "6.2 hrs", trend: "good", data: [5.8, 6.0, 6.2, 6.5, 6.1, 6.3, 6.2] },
  },
  nutrition: [
    { name: "Calories", value: "89 kcal", icon: Flame },
    { name: "Vitamin C", value: "8.7 mg", icon: Sun },
    { name: "Fiber", value: "2.6 g", icon: Wind },
    { name: "Natural Sugars", value: "12 g", icon: Apple },
    { name: "Antioxidants", value: "High", icon: Heart },
  ],
  sustainability: {
    carbon: "0.48 kg CO₂",
    water: "790 L / kg",
    badge: "Sustainable Farming Certified",
  },
  tips: {
    storage: "Store at room temperature until ripe, then refrigerate to extend freshness by 2–3 days.",
    bestTime: "Best consumed when skin shows light brown spots — peak sweetness and nutrition.",
    recipe: "Banana Smoothie Bowl — Blend with yogurt, top with granola and honey.",
  },
});

const statusColor = (s: string) => {
  if (s === "completed") return "bg-[#1E7F5A]";
  if (s === "in_progress") return "bg-[#F59E0B]";
  return "bg-[hsl(210,8%,75%)]";
};

const freshnessColor = (score: number) => {
  if (score >= 70) return { bg: "bg-[#1E7F5A]/10", text: "text-[#1E7F5A]", bar: "#1E7F5A" };
  if (score >= 40) return { bg: "bg-[#F59E0B]/10", text: "text-[#F59E0B]", bar: "#F59E0B" };
  return { bg: "bg-[#EF4444]/10", text: "text-[#EF4444]", bar: "#EF4444" };
};

const MiniChart = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((v, i) => (
        <div
          key={i}
          className="w-2 rounded-sm"
          style={{
            height: `${((v - min) / range) * 100}%`,
            minHeight: 4,
            backgroundColor: color,
            opacity: i === data.length - 1 ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  );
};

const FruitJourney = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const data = getMockData(batchId || "FRUIT-2026-TN-000145");
  const fc = freshnessColor(data.freshness.score);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(140,30%,97%)] to-[hsl(140,20%,93%)]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-[hsl(210,16%,92%)]">
        <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto">
          <button onClick={() => navigate("/know-your-fruit")} className="p-1.5 rounded-lg hover:bg-[hsl(210,14%,95%)] transition-colors">
            <ArrowLeft className="w-5 h-5 text-[hsl(210,18%,12%)]" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[hsl(210,18%,12%)] truncate">{data.product.name}</p>
            <p className="text-[10px] text-[hsl(210,8%,50%)] font-mono">{data.batchId}</p>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-[hsl(210,14%,95%)] transition-colors">
            <Share2 className="w-4 h-4 text-[hsl(210,8%,50%)]" />
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-5">
        {/* Product Hero */}
        <div className="text-center">
          <span className="text-5xl mb-2 block">{data.product.emoji}</span>
          <h1 className="text-xl font-bold text-[hsl(210,18%,12%)]">{data.product.name}</h1>
          <p className="text-xs text-[hsl(210,8%,50%)] mt-0.5">{data.product.variety} · {data.product.weight}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge className="bg-[#1E7F5A]/10 text-[#1E7F5A] border-[#1E7F5A]/20 text-[10px]">
              <CheckCircle className="w-3 h-3 mr-1" /> Verified
            </Badge>
            <Badge variant="outline" className="text-[10px]">Full Traceability</Badge>
          </div>
        </div>

        {/* Freshness Score */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[hsl(210,18%,12%)]">Freshness Score</h2>
              <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${fc.bg} ${fc.text}`}>
                {data.freshness.score}%
              </div>
            </div>
            <Progress value={data.freshness.score} className="h-2 mb-3" />
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-xs">
                <Clock className="w-3.5 h-3.5 text-[hsl(210,8%,50%)]" />
                <div>
                  <p className="text-[hsl(210,8%,50%)]">Shelf Life</p>
                  <p className="font-medium text-[hsl(210,18%,12%)]">{data.freshness.shelfLife}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle className="w-3.5 h-3.5 text-[#1E7F5A]" />
                <div>
                  <p className="text-[hsl(210,8%,50%)]">Best Before</p>
                  <p className="font-medium text-[#1E7F5A]">{data.freshness.optimalWindow}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fruit Journey Timeline */}
        <div>
          <h2 className="text-sm font-semibold text-[hsl(210,18%,12%)] mb-3 flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#1E7F5A]" /> Fruit Journey
          </h2>
          <div className="space-y-0">
            {data.journey.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === data.journey.length - 1;
              return (
                <div key={step.stage} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${statusColor(step.status)}`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    {!isLast && <div className={`w-0.5 flex-1 min-h-[40px] ${step.status === "completed" ? "bg-[#1E7F5A]/30" : "bg-[hsl(210,16%,90%)]"}`} />}
                  </div>
                  <div className="pb-4 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[hsl(210,18%,12%)]">{step.stage}</p>
                      {step.status === "in_progress" && <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />}
                    </div>
                    <p className="text-[11px] text-[hsl(210,8%,50%)] mt-0.5">{step.date} · {step.time}</p>
                    <p className="text-[11px] text-[hsl(210,8%,50%)]">{step.location}</p>
                    {step.status !== "pending" && (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(210,14%,95%)] text-[hsl(210,8%,45%)]">{step.conditions}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1E7F5A]/10 text-[#1E7F5A]">{step.quality}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Meet the Farmer */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-sm font-semibold text-[hsl(210,18%,12%)] mb-3 flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#1E7F5A]" /> Meet the Farmer
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-[#1E7F5A]/10 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 text-[#1E7F5A]" />
              </div>
              <div>
                <p className="font-semibold text-sm text-[hsl(210,18%,12%)]">{data.farmer.name}</p>
                <p className="text-xs text-[hsl(210,8%,50%)] flex items-center gap-1"><MapPin className="w-3 h-3" />{data.farmer.location}</p>
                <div className="flex gap-1 mt-1.5">
                  <Badge className="bg-[#1E7F5A]/10 text-[#1E7F5A] border-0 text-[10px]">{data.farmer.method}</Badge>
                  <Badge variant="outline" className="text-[10px]">{data.farmer.experience}</Badge>
                </div>
              </div>
            </div>
            <p className="text-xs text-[hsl(210,8%,40%)] leading-relaxed italic">"{data.farmer.story}"</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {data.farmer.certifications.map((c) => (
                <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(140,30%,94%)] text-[#1E7F5A] font-medium">{c}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Farm Environment IoT Data */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-sm font-semibold text-[hsl(210,18%,12%)] mb-1 flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-[#1E7F5A]" /> Farm Environment Data
            </h2>
            <p className="text-[10px] text-[hsl(210,8%,55%)] mb-3">Data recorded from smart farm monitoring systems</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Temperature", ...data.iot.temperature, icon: Thermometer, color: "#EF4444" },
                { label: "Humidity", ...data.iot.humidity, icon: Droplets, color: "#3B82F6" },
                { label: "Soil Moisture", ...data.iot.soilMoisture, icon: Wind, color: "#8B5CF6" },
                { label: "Sunlight", ...data.iot.sunlight, icon: Sun, color: "#F59E0B" },
              ].map((sensor) => (
                <div key={sensor.label} className="p-3 rounded-xl bg-[hsl(210,14%,97%)]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <sensor.icon className="w-3.5 h-3.5" style={{ color: sensor.color }} />
                    <span className="text-[10px] text-[hsl(210,8%,50%)]">{sensor.label}</span>
                  </div>
                  <p className="text-sm font-bold text-[hsl(210,18%,12%)]">{sensor.value}</p>
                  <MiniChart data={sensor.data} color={sensor.color} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nutritional Value */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-sm font-semibold text-[hsl(210,18%,12%)] mb-3 flex items-center gap-1.5">
              <Apple className="w-4 h-4 text-[#1E7F5A]" /> Nutritional Value
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {data.nutrition.map((n) => (
                <div key={n.name} className="text-center p-2.5 rounded-xl bg-[hsl(210,14%,97%)]">
                  <n.icon className="w-4 h-4 mx-auto mb-1 text-[#1E7F5A]" />
                  <p className="text-xs font-semibold text-[hsl(210,18%,12%)]">{n.value}</p>
                  <p className="text-[10px] text-[hsl(210,8%,50%)]">{n.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sustainability Impact */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-sm font-semibold text-[hsl(210,18%,12%)] mb-3 flex items-center gap-1.5">
              <Recycle className="w-4 h-4 text-[#1E7F5A]" /> Sustainability Impact
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[hsl(140,30%,96%)]">
                <p className="text-[10px] text-[hsl(210,8%,50%)]">Carbon Footprint</p>
                <p className="text-sm font-bold text-[hsl(210,18%,12%)]">{data.sustainability.carbon}</p>
                <p className="text-[10px] text-[#1E7F5A]">Low impact</p>
              </div>
              <div className="p-3 rounded-xl bg-[hsl(200,30%,96%)]">
                <p className="text-[10px] text-[hsl(210,8%,50%)]">Water Usage</p>
                <p className="text-sm font-bold text-[hsl(210,18%,12%)]">{data.sustainability.water}</p>
                <p className="text-[10px] text-[#3B82F6]">Efficient</p>
              </div>
            </div>
            <div className="mt-3 p-2.5 rounded-xl bg-[#1E7F5A]/10 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#1E7F5A]" />
              <span className="text-xs font-medium text-[#1E7F5A]">{data.sustainability.badge}</span>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-3">
            <h2 className="text-sm font-semibold text-[hsl(210,18%,12%)]">Tips & Recipes</h2>
            {[
              { title: "Storage", text: data.tips.storage, emoji: "🧊" },
              { title: "Best Time to Eat", text: data.tips.bestTime, emoji: "⏰" },
              { title: "Recipe Idea", text: data.tips.recipe, emoji: "🍽️" },
            ].map((tip) => (
              <div key={tip.title} className="flex gap-2.5 p-3 rounded-xl bg-[hsl(210,14%,97%)]">
                <span className="text-lg">{tip.emoji}</span>
                <div>
                  <p className="text-xs font-semibold text-[hsl(210,18%,12%)]">{tip.title}</p>
                  <p className="text-[11px] text-[hsl(210,8%,45%)] leading-relaxed">{tip.text}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trust & Verification */}
        <div className="rounded-2xl bg-[#1E7F5A] p-4 text-white text-center">
          <Shield className="w-8 h-8 mx-auto mb-2 opacity-90" />
          <p className="font-semibold text-sm">Verified Farm Produce</p>
          <p className="text-[11px] text-white/70 mt-1">This product's journey is fully traced and verified</p>
          <div className="flex justify-center gap-3 mt-3">
            {["Farm Verified", "Quality Checked", "Traceability Enabled"].map((b) => (
              <div key={b} className="flex items-center gap-1 text-[10px] text-white/80">
                <CheckCircle className="w-3 h-3" /> {b}
              </div>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="text-center pb-4">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Share2 className="w-3.5 h-3.5" /> Share Fruit Story
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center pb-8 pt-2">
          <p className="text-[10px] text-[hsl(210,8%,55%)]">Powered by <span className="font-semibold text-[#1E7F5A]">iYarKai Tech Lab</span></p>
          <p className="text-[10px] text-[hsl(210,8%,60%)]">AIoT Post-Harvest Intelligence</p>
        </div>
      </div>
    </div>
  );
};

export default FruitJourney;
