import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CreditCard, List, RefreshCw, Wifi, ArrowUp, Train, CableCar } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { mockUser, mockTransactions } from "@/data/mockData";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap = {
  "arrow-up": ArrowUp,
  "train": Train,
  "refresh-cw": RefreshCw,
  "cable-car": CableCar,
};

const quickActions = [
  { label: "Recargar", icon: CreditCard, color: "text-primary-medium", path: "/recharge" },
  { label: "Historial", icon: List, color: "text-primary-medium", path: "/history" },
  { label: "Auto-recarga", icon: RefreshCw, color: "text-success", path: "/auto-recharge" },
  { label: "Vincular NFC", icon: Wifi, color: "text-alert", path: "/link-nfc" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const recentTransactions = mockTransactions.slice(0, 3);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppLayout>
      {/* Header */}
      <div className="bg-primary safe-top px-5 pb-16 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-foreground/70 text-sm">Buenos días,</p>
            <p className="text-primary-foreground font-bold text-lg">{mockUser.nombre} {mockUser.apellido}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/notifications")} className="relative text-primary-foreground">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <button onClick={() => navigate("/profile")} className="w-10 h-10 rounded-full bg-primary-medium flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">{mockUser.initials}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Balance card */}
      <div className="px-4 -mt-12">
        {isLoading ? (
          <Skeleton className="h-[140px] w-full rounded-xl" />
        ) : (
          <div className="bg-primary-medium rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-primary-foreground/60 text-[10px] tracking-[2px] font-semibold">METRO SDQ</span>
              <div className="w-8 h-6 bg-gold rounded-sm flex items-center justify-center">
                <div className="w-5 h-4 border border-gold/50 rounded-[2px]" />
              </div>
            </div>
            <p className="text-[#8aabcc] text-[11px] mb-1">Saldo disponible</p>
            <p className="text-primary-foreground text-[32px] font-bold leading-tight">
              RD$ {mockUser.balance.toFixed(2)}
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[#8aabcc] text-[11px]">
                {mockUser.cardUID.join(" · ")}
              </span>
              <span className="bg-primary-foreground/10 text-primary-foreground/70 text-[10px] px-2 py-0.5 rounded-full">
                {mockUser.cardType}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="px-4 mt-6">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-[88px] rounded-card" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="bg-card rounded-card p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center ${action.color}`}>
                  <action.icon size={20} />
                </div>
                <span className="text-foreground text-xs font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Recent transactions */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Últimas transacciones</h3>
        {isLoading ? (
          <div className="space-y-2">
            {[0, 1, 2].map((i) => <Skeleton key={i} className="h-[60px] rounded-button" />)}
          </div>
        ) : (
          <div className="space-y-2">
            {recentTransactions.map((tx) => {
              const Icon = iconMap[tx.icon];
              return (
                <div key={tx.id} className="bg-card rounded-button p-3 flex items-center gap-3 shadow-sm">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.positive ? "bg-success-light text-success" : "bg-destructive-light text-destructive"
                  }`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                    <p className="text-[11px] text-muted-foreground">{tx.time}</p>
                  </div>
                  <span className={`text-sm font-bold ${tx.positive ? "text-success" : "text-destructive"}`}>
                    {tx.positive ? "+" : "-"}RD${tx.amount}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
