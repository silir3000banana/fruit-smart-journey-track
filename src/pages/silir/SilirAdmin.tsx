import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function SilirAdmin() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Admin</h1>
        <p className="text-sm text-gray-500">System administration and user management</p>
      </div>
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-12 text-center text-gray-400">
          <ShieldCheck className="w-10 h-10 mx-auto mb-3" />
          <p>Admin panel — User roles, system settings, and audit logs</p>
        </CardContent>
      </Card>
    </div>
  );
}
