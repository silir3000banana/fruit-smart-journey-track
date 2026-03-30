import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { 
  Leaf, QrCode, Truck, Warehouse, BarChart3, Bell,
  ThermometerSnowflake, Package, Cpu, Store
} from "lucide-react";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border/40">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-shadow duration-300">
              <span className="text-primary-foreground font-bold text-sm">FF</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground tracking-tight">FruitFlow <span className="text-primary">AI</span></h1>
              <p className="text-[9px] text-muted-foreground leading-tight tracking-wide uppercase">iYarKai Tech Lab</p>
            </div>
          </div>
          
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm hover:text-primary transition-colors duration-200">
                  <QrCode className="w-3.5 h-3.5 mr-1.5" />
                  Traceability
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link to="/batch-trace" className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-hero p-6 no-underline outline-none focus:shadow-md transition-all duration-200 hover:shadow-glow">
                          <QrCode className="h-5 w-5 text-primary" />
                          <div className="mb-2 mt-4 text-lg font-semibold text-white">Trace Batch</div>
                          <p className="text-sm leading-tight text-white/50">Complete farm-to-retail journey tracking.</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/know-your-fruit" title="Know Your Fruit" icon={<Store className="w-4 h-4" />}>Consumer transparency portal</ListItem>
                    <ListItem href="/farm-tracking" title="Farm Tracking" icon={<Leaf className="w-4 h-4" />}>Harvest & batch creation</ListItem>
                    <ListItem href="/packing-logistics" title="Post-Harvest" icon={<Package className="w-4 h-4" />}>Sorting, grading & packing</ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm hover:text-primary transition-colors duration-200">Operations</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <ListItem href="/cold-storage" title="Ripening & Storage" icon={<ThermometerSnowflake className="w-4 h-4" />}>Chamber control & monitoring</ListItem>
                    <ListItem href="/smart-container" title="Cold Chain Transport" icon={<Truck className="w-4 h-4" />}>Real-time logistics tracking</ListItem>
                    <ListItem href="/warehouse" title="Warehouse" icon={<Warehouse className="w-4 h-4" />}>Inventory & FIFO management</ListItem>
                    <ListItem href="/ai-grading" title="AI Quality Grading" icon={<Cpu className="w-4 h-4" />}>Vision-based quality assessment</ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm hover:text-primary transition-colors duration-200">Insights</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4">
                    <ListItem href="/analytics" title="Analytics" icon={<BarChart3 className="w-4 h-4" />}>Wastage, quality & performance</ListItem>
                    <ListItem href="/alerts" title="Alerts" icon={<Bell className="w-4 h-4" />}>Temperature breaches & notifications</ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 px-3 py-2">Pricing</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 px-3 py-2">Contact</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <Button variant="ghost" size="sm" className="hover:text-primary transition-colors duration-200" onClick={() => navigate('/batch-trace')}>
                  <QrCode className="w-4 h-4 mr-1" />Trace
                </Button>
                <Button variant="ghost" size="sm" className="hover:text-primary transition-colors duration-200" onClick={() => navigate('/silir')}>Dashboard</Button>
                <Button variant="outline" size="sm" className="hover:border-primary/40 transition-all duration-200" onClick={async () => { await signOut(); navigate('/'); }}>Sign Out</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="hover:text-primary transition-colors duration-200" onClick={() => navigate('/know-your-fruit')}>
                  <QrCode className="w-4 h-4 mr-1" />Know Your Fruit
                </Button>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary-glow shadow-elegant hover:shadow-glow transition-all duration-300" onClick={() => navigate('/auth')}>Sign In</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string; icon?: React.ReactNode; href: string;
}
const ListItem = forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, icon, href, ...props }, ref) => (
    <li>
      <NavigationMenuLink asChild>
        <Link to={href} ref={ref} className={cn("block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:shadow-soft", className)} {...props}>
          <div className="flex items-center gap-2 text-sm font-medium leading-none">{icon}{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
);
ListItem.displayName = "ListItem";

export default Header;
