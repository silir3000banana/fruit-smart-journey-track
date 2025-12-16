import { CheckCircle, Circle, Clock, Leaf, Package, Thermometer, Truck, Warehouse, ShoppingBag, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TraceabilityStage {
  id: string;
  stage: 'harvest' | 'post_harvest' | 'ripening' | 'transport' | 'warehouse' | 'retail';
  stageName: string;
  status: 'completed' | 'in_progress' | 'pending';
  date?: string;
  time?: string;
  location?: string;
  responsibleRole?: string;
  responsibleName?: string;
  qualityScore?: number;
  qualityGrade?: string;
  temperature?: number;
  humidity?: number;
  notes?: string;
  metadata?: Record<string, any>;
}

interface BatchTraceabilityTimelineProps {
  batchId: string;
  productType: string;
  variety: string;
  stages: TraceabilityStage[];
  orientation?: 'horizontal' | 'vertical';
  compact?: boolean;
  showDetails?: boolean;
  onStageClick?: (stage: TraceabilityStage) => void;
}

const stageConfig = {
  harvest: {
    icon: Leaf,
    label: 'Farm & Harvest',
    color: 'bg-green-500',
    borderColor: 'border-green-500',
    textColor: 'text-green-600',
    bgLight: 'bg-green-50',
  },
  post_harvest: {
    icon: Package,
    label: 'Post-Harvest',
    color: 'bg-amber-500',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-600',
    bgLight: 'bg-amber-50',
  },
  ripening: {
    icon: Thermometer,
    label: 'Ripening',
    color: 'bg-orange-500',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-600',
    bgLight: 'bg-orange-50',
  },
  transport: {
    icon: Truck,
    label: 'Transport',
    color: 'bg-blue-500',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-600',
    bgLight: 'bg-blue-50',
  },
  warehouse: {
    icon: Warehouse,
    label: 'Warehouse',
    color: 'bg-purple-500',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-600',
    bgLight: 'bg-purple-50',
  },
  retail: {
    icon: ShoppingBag,
    label: 'Retail',
    color: 'bg-pink-500',
    borderColor: 'border-pink-500',
    textColor: 'text-pink-600',
    bgLight: 'bg-pink-50',
  },
};

const getProductEmoji = (productType: string) => {
  const emojiMap: Record<string, string> = {
    'Banana': '🍌',
    'Mango': '🥭',
    'Apple': '🍎',
    'Orange': '🍊',
    'Grapes': '🍇',
  };
  return emojiMap[productType] || '🍃';
};

const BatchTraceabilityTimeline = ({
  batchId,
  productType,
  variety,
  stages,
  orientation = 'vertical',
  compact = false,
  showDetails = true,
  onStageClick,
}: BatchTraceabilityTimelineProps) => {
  const orderedStages: Array<'harvest' | 'post_harvest' | 'ripening' | 'transport' | 'warehouse' | 'retail'> = [
    'harvest',
    'post_harvest',
    'ripening',
    'transport',
    'warehouse',
    'retail',
  ];

  const getStageData = (stageKey: string) => {
    return stages.find(s => s.stage === stageKey);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-warning animate-pulse" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const renderHorizontalTimeline = () => (
    <div className="w-full overflow-x-auto">
      <div className="flex items-start gap-2 min-w-max p-4">
        {orderedStages.map((stageKey, index) => {
          const config = stageConfig[stageKey];
          const stageData = getStageData(stageKey);
          const Icon = config.icon;
          const isLast = index === orderedStages.length - 1;

          return (
            <div key={stageKey} className="flex items-start">
              <div
                onClick={() => stageData && onStageClick?.(stageData)}
                className={cn(
                  "flex flex-col items-center p-3 rounded-lg transition-all min-w-[120px]",
                  stageData?.status === 'completed' && `${config.bgLight} border-2 ${config.borderColor}`,
                  stageData?.status === 'in_progress' && `${config.bgLight} border-2 border-dashed ${config.borderColor}`,
                  !stageData && "bg-muted/30 border-2 border-dashed border-muted",
                  onStageClick && stageData && "cursor-pointer hover:shadow-md"
                )}
              >
                <div className={cn(
                  "p-2 rounded-full mb-2",
                  stageData?.status === 'completed' ? config.color : "bg-muted"
                )}>
                  <Icon className={cn(
                    "w-5 h-5",
                    stageData?.status === 'completed' ? "text-white" : "text-muted-foreground"
                  )} />
                </div>
                <span className={cn(
                  "text-xs font-medium text-center",
                  stageData?.status === 'completed' ? config.textColor : "text-muted-foreground"
                )}>
                  {config.label}
                </span>
                {stageData?.status === 'completed' && (
                  <CheckCircle className="w-4 h-4 text-success mt-1" />
                )}
                {stageData?.status === 'in_progress' && (
                  <Clock className="w-4 h-4 text-warning mt-1 animate-pulse" />
                )}
                {compact && stageData?.date && (
                  <span className="text-[10px] text-muted-foreground mt-1">
                    {new Date(stageData.date).toLocaleDateString()}
                  </span>
                )}
              </div>
              {!isLast && (
                <div className={cn(
                  "flex-shrink-0 w-8 h-1 mt-6 mx-1 rounded",
                  stageData?.status === 'completed' ? "bg-success" : "bg-muted"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderVerticalTimeline = () => (
    <div className="space-y-4">
      {orderedStages.map((stageKey, index) => {
        const config = stageConfig[stageKey];
        const stageData = getStageData(stageKey);
        const Icon = config.icon;
        const isLast = index === orderedStages.length - 1;

        return (
          <div key={stageKey} className="flex gap-4">
            {/* Timeline connector */}
            <div className="flex flex-col items-center">
              <div className={cn(
                "p-2 rounded-full border-2 z-10",
                stageData?.status === 'completed' ? `${config.color} border-transparent` : "bg-card border-muted"
              )}>
                <Icon className={cn(
                  "w-5 h-5",
                  stageData?.status === 'completed' ? "text-white" : "text-muted-foreground"
                )} />
              </div>
              {!isLast && (
                <div className={cn(
                  "w-0.5 flex-1 min-h-[60px] -mt-1",
                  stageData?.status === 'completed' ? "bg-success" : "bg-muted"
                )} />
              )}
            </div>

            {/* Stage card */}
            <Card
              onClick={() => stageData && onStageClick?.(stageData)}
              className={cn(
                "flex-1 transition-all",
                stageData?.status === 'completed' && `border-l-4 ${config.borderColor}`,
                stageData?.status === 'in_progress' && `border-l-4 border-l-warning border-dashed`,
                !stageData && "opacity-50",
                onStageClick && stageData && "cursor-pointer hover:shadow-md"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className={cn(
                      "font-semibold",
                      stageData?.status === 'completed' ? config.textColor : "text-muted-foreground"
                    )}>
                      {config.label}
                    </h4>
                    {stageData?.responsibleRole && (
                      <span className="text-xs text-muted-foreground">
                        Owner: {stageData.responsibleRole}
                      </span>
                    )}
                  </div>
                  {getStatusIcon(stageData?.status || 'pending')}
                </div>

                {stageData && showDetails && (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 text-xs">
                      {stageData.date && (
                        <Badge variant="secondary" className="font-normal">
                          📅 {new Date(stageData.date).toLocaleDateString()} {stageData.time}
                        </Badge>
                      )}
                      {stageData.location && (
                        <Badge variant="secondary" className="font-normal">
                          📍 {stageData.location}
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                      {stageData.qualityScore && (
                        <Badge className="bg-success font-normal">
                          Quality: {stageData.qualityScore}%
                        </Badge>
                      )}
                      {stageData.qualityGrade && (
                        <Badge className="bg-success font-normal">
                          {stageData.qualityGrade}
                        </Badge>
                      )}
                      {stageData.temperature !== undefined && (
                        <Badge variant="outline" className="font-normal">
                          🌡️ {stageData.temperature}°C
                        </Badge>
                      )}
                      {stageData.humidity !== undefined && (
                        <Badge variant="outline" className="font-normal">
                          💧 {stageData.humidity}%
                        </Badge>
                      )}
                    </div>

                    {stageData.notes && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {stageData.notes}
                      </p>
                    )}
                  </div>
                )}

                {!stageData && (
                  <p className="text-xs text-muted-foreground">
                    Awaiting stage completion
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full">
      {/* Batch Header */}
      <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{getProductEmoji(productType)}</span>
          <div>
            <h3 className="font-bold text-lg">Batch ID: {batchId}</h3>
            <p className="text-sm text-muted-foreground">
              {productType} • {variety}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge className="bg-success">
            <CheckCircle className="w-3 h-3 mr-1" />
            Cold Chain Verified
          </Badge>
          <Badge variant="outline">
            Full Traceability
          </Badge>
        </div>
      </div>

      {/* Timeline */}
      {orientation === 'horizontal' ? renderHorizontalTimeline() : renderVerticalTimeline()}
    </div>
  );
};

export default BatchTraceabilityTimeline;