import { ArrowUp, AlertTriangle, RefreshCw, Train } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import TopBar from "@/components/TopBar";
import { mockNotifications } from "@/data/mockData";

const iconMap: Record<string, React.ElementType> = {
  "arrow-up": ArrowUp,
  "alert-triangle": AlertTriangle,
  "refresh-cw": RefreshCw,
  train: Train,
};

const colorMap: Record<string, string> = {
  green: "bg-success-light text-success",
  blue: "bg-primary-light text-primary-medium",
  gray: "bg-muted text-muted-foreground",
};

const Notifications = () => {
  const groups = mockNotifications.reduce<Record<string, typeof mockNotifications>>((acc, n) => {
    (acc[n.dateGroup] ||= []).push(n);
    return acc;
  }, {});

  return (
    <AppLayout showNav={false}>
      <TopBar title="Notificaciones" />

      <div className="px-4 mt-4 pb-8 space-y-5">
        {Object.entries(groups).map(([group, items]) => (
          <div key={group}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{group}</p>
            <div className="space-y-2">
              {items.map((n) => {
                const Icon = iconMap[n.icon] || ArrowUp;
                return (
                  <div key={n.id} className="bg-card rounded-[12px] border border-border p-3 flex items-start gap-3 shadow-sm">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${colorMap[n.color]}`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-foreground">{n.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{n.description}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                    </div>
                    {n.unread && <div className="w-2 h-2 rounded-full bg-primary-medium shrink-0 mt-1.5" />}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {mockNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <AlertTriangle size={48} className="text-muted-foreground mb-3" />
            <p className="text-muted-foreground text-sm">Sin notificaciones</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Notifications;
