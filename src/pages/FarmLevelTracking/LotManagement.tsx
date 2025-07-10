import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/Header";
import { Package, Search, Filter, Eye, Edit, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const LotManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const lots = [
    {
      id: "LOT001",
      cropType: "Banana",
      variety: "Cavendish",
      quantity: "500kg",
      quality: "Grade A",
      status: "harvested",
      harvestDate: "2024-01-15",
      farmer: "Kumar Singh",
      fieldId: "Field-A-01",
      qrGenerated: true
    },
    {
      id: "LOT002",
      cropType: "Mango",
      variety: "Alphonso",
      quantity: "300kg",
      quality: "Grade A",
      status: "processing",
      harvestDate: "2024-01-14",
      farmer: "Raj Patel",
      fieldId: "Field-B-02",
      qrGenerated: false
    },
    {
      id: "LOT003",
      cropType: "Apple",
      variety: "Fuji",
      quantity: "450kg",
      quality: "Grade B",
      status: "ready",
      harvestDate: "2024-01-13",
      farmer: "Amit Sharma",
      fieldId: "Field-C-01",
      qrGenerated: true
    },
    {
      id: "LOT004",
      cropType: "Orange",
      variety: "Valencia",
      quantity: "600kg",
      quality: "Grade A",
      status: "shipped",
      harvestDate: "2024-01-12",
      farmer: "Suresh Kumar",
      fieldId: "Field-A-02",
      qrGenerated: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "harvested": return "default";
      case "processing": return "secondary";
      case "ready": return "default";
      case "shipped": return "outline";
      default: return "secondary";
    }
  };

  const filteredLots = lots.filter(lot => {
    const matchesSearch = lot.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lot.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lot.cropType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lot.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 mt-20">
        <div className="mb-6">
          <Link to="/farm-tracking" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Farm Tracking
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Lot Management</h1>
          <p className="text-muted-foreground">Track and manage all harvest lots</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Active Lots
            </CardTitle>
            <CardDescription>
              Manage harvest lots and track their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by lot ID, farmer, or crop type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full sm:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="harvested">Harvested</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lots Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lot ID</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Quality</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Harvest Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLots.map((lot) => (
                    <TableRow key={lot.id}>
                      <TableCell className="font-medium">{lot.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{lot.cropType}</div>
                          <div className="text-sm text-muted-foreground">{lot.variety}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{lot.farmer}</div>
                          <div className="text-sm text-muted-foreground">{lot.fieldId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{lot.quantity}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{lot.quality}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(lot.status)}>
                          {lot.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{lot.harvestDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredLots.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No lots found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LotManagement;