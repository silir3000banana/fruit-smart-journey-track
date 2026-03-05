import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, Settings2, Factory, Cpu, Package, Truck,
  QrCode, BarChart3, ShieldCheck, Bell, Search, ChevronDown,
  Menu, X, LogOut, User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navItems = [
  { title: "Dashboard", url: "/silir", icon: LayoutDashboard },
  { title: "Operations", url: "/silir/operations", icon: Settings2 },
  { title: "Facilities", url: "/silir/facilities", icon: Factory },
  { title: "Quality AI", url: "/silir/quality-ai", icon: Cpu },
  { title: "Inventory", url: "/silir/inventory", icon: Package },
  { title: "Dispatch", url: "/silir/dispatch", icon: Truck },
  { title: "Traceability", url: "/silir/traceability", icon: QrCode },
  { title: "Reports", url: "/silir/reports", icon: BarChart3 },
  { title: "Admin", url: "/silir/admin", icon: ShieldCheck },
];

interface SilirLayoutProps {
  children: ReactNode;
}

export default function SilirLayout({ children }: SilirLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (url: string) =>
    url === "/silir"
      ? location.pathname === "/silir"
      : location.pathname.startsWith(url);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-[#111827] text-white transition-all duration-300 fixed inset-y-0 left-0 z-40",
          sidebarOpen ? "w-60" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-sm shrink-0 text-primary-foreground">
            FF
          </div>
          {sidebarOpen && (
            <span className="ml-3 font-semibold text-sm tracking-tight">
              FruitFlow AI
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.url}
              onClick={() => navigate(item.url)}
              className={cn(
                "flex items-center w-full rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive(item.url)
                  ? "bg-[#1E7F5A] text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" />
              {sidebarOpen && <span className="ml-3">{item.title}</span>}
            </button>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center text-gray-400 hover:text-white text-xs w-full"
          >
            <Menu className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span className="ml-2">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 inset-y-0 w-64 bg-[#111827] text-white flex flex-col">
            <div className="h-14 flex items-center justify-between px-4 border-b border-white/10">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-[#1E7F5A] flex items-center justify-center font-bold text-sm">S</div>
                <span className="ml-3 font-semibold text-sm">Silir</span>
              </div>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <nav className="flex-1 py-4 space-y-1 px-2">
              {navItems.map((item) => (
                <button
                  key={item.url}
                  onClick={() => { navigate(item.url); setMobileOpen(false); }}
                  className={cn(
                    "flex items-center w-full rounded-lg px-3 py-2.5 text-sm transition-colors",
                    isActive(item.url)
                      ? "bg-[#1E7F5A] text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-4.5 h-4.5 shrink-0" />
                  <span className="ml-3">{item.title}</span>
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content area */}
      <div className={cn("flex-1 flex flex-col transition-all duration-300", sidebarOpen ? "lg:ml-60" : "lg:ml-16")}>
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 sticky top-0 z-30">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Facility selector */}
          <button className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg px-3 py-1.5 hover:bg-gray-200 transition-colors">
            <Factory className="w-3.5 h-3.5" />
            Main Facility
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search batches, chambers..."
                className="pl-9 h-9 bg-gray-50 border-gray-200 text-sm"
              />
            </div>
          </div>

          <div className="flex-1" />

          {/* Right side */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full" />
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-[#1E7F5A] flex items-center justify-center text-white text-xs font-medium">
              {profile?.full_name?.charAt(0) || "U"}
            </div>
            <div className="hidden sm:block text-sm">
              <p className="font-medium text-gray-800 leading-tight">{profile?.full_name || "User"}</p>
              <p className="text-gray-400 text-xs leading-tight capitalize">{profile?.role || "operator"}</p>
            </div>
            <button onClick={handleSignOut} className="ml-1 p-1.5 text-gray-400 hover:text-[#EF4444] transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
