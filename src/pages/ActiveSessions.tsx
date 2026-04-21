import { useState } from "react";
import { Smartphone, Monitor, Tablet, ShieldAlert, LogOut } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import TopBar from "@/components/TopBar";
import { toast } from "sonner";

interface Session {
  id: string;
  device: string;
  type: "phone" | "desktop" | "tablet";
  location: string;
  lastActive: string;
  current: boolean;
}

const initialSessions: Session[] = [
  {
    id: "s1",
    device: "iPhone 15 Pro · Safari",
    type: "phone",
    location: "Santo Domingo, RD",
    lastActive: "Activa ahora",
    current: true,
  },
  {
    id: "s2",
    device: "MacBook Pro · Chrome",
    type: "desktop",
    location: "Santo Domingo, RD",
    lastActive: "hace 3 horas",
    current: false,
  },
  {
    id: "s3",
    device: "iPad Air · Safari",
    type: "tablet",
    location: "Santiago, RD",
    lastActive: "hace 2 días",
    current: false,
  },
];

const iconMap = { phone: Smartphone, desktop: Monitor, tablet: Tablet };

const ActiveSessions = () => {
  const [sessions, setSessions] = useState(initialSessions);

  const revoke = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
    toast.success("Sesión cerrada");
  };

  const revokeAll = () => {
    setSessions(sessions.filter((s) => s.current));
    toast.success("Se cerraron todas las demás sesiones");
  };

  return (
    <AppLayout showNav={false}>
      <TopBar title="Sesiones activas" />

      <div className="px-4 mt-4 space-y-3 pb-8">
        <div className="bg-card rounded-card p-4 shadow-sm flex gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
            <ShieldAlert size={20} className="text-primary-medium" />
          </div>
          <div>
            <p className="text-foreground font-semibold text-sm">Dispositivos conectados</p>
            <p className="text-muted-foreground text-xs mt-0.5">
              Si no reconoces un dispositivo, ciérralo y cambia tu contraseña.
            </p>
          </div>
        </div>

        <div className="bg-card rounded-card shadow-sm divide-y divide-border overflow-hidden">
          {sessions.map((s) => {
            const Icon = iconMap[s.type];
            return (
              <div key={s.id} className="p-4 flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${s.current ? "bg-success-light" : "bg-muted"}`}>
                  <Icon size={20} className={s.current ? "text-success" : "text-muted-foreground"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-foreground">{s.device}</p>
                    {s.current && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-success-light text-success">
                        Este dispositivo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.location}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{s.lastActive}</p>
                  {!s.current && (
                    <button
                      onClick={() => revoke(s.id)}
                      className="mt-2 text-xs text-destructive font-medium flex items-center gap-1"
                    >
                      <LogOut size={12} /> Cerrar sesión
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {sessions.filter((s) => !s.current).length > 0 && (
          <button
            onClick={revokeAll}
            className="w-full h-12 border-2 border-destructive text-destructive rounded-button font-medium text-sm flex items-center justify-center gap-2 hover:bg-destructive/5 transition-colors"
          >
            <LogOut size={16} />
            Cerrar todas las demás sesiones
          </button>
        )}
      </div>
    </AppLayout>
  );
};

export default ActiveSessions;
