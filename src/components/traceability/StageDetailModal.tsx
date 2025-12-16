import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, MapPin, User, Thermometer, Droplets, FileText } from "lucide-react";
import { TraceabilityStage } from "./BatchTraceabilityTimeline";

interface StageDetailModalProps {
  stage: TraceabilityStage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const stageLabels: Record<string, string> = {
  harvest: 'Farm & Harvest',
  post_harvest: 'Post-Harvest Handling',
  ripening: 'Ripening / Storage',
  transport: 'Logistics & Transport',
  warehouse: 'Warehouse / Distribution',
  retail: 'Retail Receipt & Shelf',
};

const StageDetailModal = ({ stage, open, onOpenChange }: StageDetailModalProps) => {
  if (!stage) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {stage.status === 'completed' ? (
              <CheckCircle className="w-5 h-5 text-success" />
            ) : (
              <Clock className="w-5 h-5 text-warning" />
            )}
            {stageLabels[stage.stage] || stage.stageName}
          </DialogTitle>
          <DialogDescription>
            Traceability checkpoint details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <Badge className={stage.status === 'completed' ? 'bg-success' : 'bg-warning'}>
              {stage.status === 'completed' ? '✔ Completed' : '⏳ In Progress'}
            </Badge>
          </div>

          <Separator />

          {/* Date & Time */}
          {stage.date && (
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Date & Time</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(stage.date).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} {stage.time && `at ${stage.time}`}
                </p>
              </div>
            </div>
          )}

          {/* Location */}
          {stage.location && (
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{stage.location}</p>
              </div>
            </div>
          )}

          {/* Responsible Person */}
          {(stage.responsibleRole || stage.responsibleName) && (
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Responsible</p>
                <p className="text-sm text-muted-foreground">
                  {stage.responsibleName && <span>{stage.responsibleName}</span>}
                  {stage.responsibleRole && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      {stage.responsibleRole}
                    </Badge>
                  )}
                </p>
              </div>
            </div>
          )}

          <Separator />

          {/* Quality Metrics */}
          <div className="grid grid-cols-2 gap-4">
            {stage.qualityScore !== undefined && (
              <div className="bg-success/10 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Quality Score</p>
                <p className="text-2xl font-bold text-success">{stage.qualityScore}%</p>
              </div>
            )}
            {stage.qualityGrade && (
              <div className="bg-success/10 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Quality Grade</p>
                <p className="text-2xl font-bold text-success">{stage.qualityGrade}</p>
              </div>
            )}
          </div>

          {/* Environmental Conditions */}
          {(stage.temperature !== undefined || stage.humidity !== undefined) && (
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm font-medium mb-3">Environmental Conditions</p>
              <div className="grid grid-cols-2 gap-4">
                {stage.temperature !== undefined && (
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-orange-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Temperature</p>
                      <p className="font-semibold">{stage.temperature}°C</p>
                    </div>
                  </div>
                )}
                {stage.humidity !== undefined && (
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Humidity</p>
                      <p className="font-semibold">{stage.humidity}%</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {stage.notes && (
            <div className="flex items-start gap-3">
              <FileText className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Notes</p>
                <p className="text-sm text-muted-foreground">{stage.notes}</p>
              </div>
            </div>
          )}

          {/* Metadata */}
          {stage.metadata && Object.keys(stage.metadata).length > 0 && (
            <div className="bg-muted/20 p-3 rounded-lg">
              <p className="text-xs font-medium mb-2">Additional Data</p>
              <div className="space-y-1">
                {Object.entries(stage.metadata).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span className="text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className="font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StageDetailModal;