import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, LogOut, Lock } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import TopBar from "@/components/TopBar";
import { mockUser } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const navigate = useNavigate();
  const { signOut, actionLoading } = useAuth();
  const [pushNotif, setPushNotif] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);
  const [biometric, setBiometric] = useState(false);

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full relative transition-colors ${checked ? "bg-success" : "bg-muted-foreground/30"}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );

  return (
    <AppLayout showNav={false}>
      <TopBar title="Mi perfil" />

      <div className="px-4 mt-4 space-y-4 pb-8">
        {/* Avatar & info */}
        <div className="bg-card rounded-card p-5 shadow-sm flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary-medium flex items-center justify-center">
              <span className="text-primary-foreground text-2xl font-bold">{mockUser.initials}</span>
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow">
              <span className="text-primary-foreground text-xs">✎</span>
            </button>
          </div>
          <p className="text-foreground font-bold text-lg mt-3">{mockUser.nombre} {mockUser.apellido}</p>
          <p className="text-muted-foreground text-sm">{mockUser.email}</p>
          <span className="mt-2 bg-success-light text-success text-[11px] font-medium px-3 py-1 rounded-full">
            Usuario activo
          </span>
        </div>

        {/* Personal info */}
        <div className="bg-card rounded-card shadow-sm divide-y divide-border">
          <p className="px-4 pt-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Información personal
          </p>
          <button onClick={() => navigate("/profile/edit?field=nombre")} className="w-full px-4 py-3 flex items-center justify-between text-left">
            <div>
              <p className="text-xs text-muted-foreground">Nombre completo</p>
              <p className="text-sm font-medium text-foreground">{mockUser.nombre} {mockUser.apellido}</p>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
          <button onClick={() => navigate("/profile/edit?field=email")} className="w-full px-4 py-3 flex items-center justify-between text-left">
            <div>
              <p className="text-xs text-muted-foreground">Correo electrónico</p>
              <p className="text-sm font-medium text-foreground">{mockUser.email}</p>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
          <div className="px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                Cédula <Lock size={10} />
              </p>
              <p className="text-sm font-medium text-foreground">{mockUser.cedula}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">No editable · Identidad única</p>
            </div>
          </div>
          <button onClick={() => navigate("/profile/edit?field=phone")} className="w-full px-4 py-3 flex items-center justify-between text-left">
            <div>
              <p className="text-xs text-muted-foreground">Teléfono</p>
              <p className="text-sm font-medium text-foreground">{mockUser.phone || "Agregar teléfono"}</p>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
          <button onClick={() => navigate("/profile/edit?field=password")} className="w-full px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Cambiar contraseña</p>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Preferences */}
        <div className="bg-card rounded-card shadow-sm divide-y divide-border">
          <p className="px-4 pt-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Preferencias
          </p>
          <div className="px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Notificaciones push</p>
            <Toggle checked={pushNotif} onChange={setPushNotif} />
          </div>
          <button onClick={() => navigate("/auto-recharge")} className="w-full px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Recarga automática</p>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
          <div className="px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Tema oscuro</p>
            <Toggle checked={darkTheme} onChange={setDarkTheme} />
          </div>
        </div>

        {/* Security */}
        <div className="bg-card rounded-card shadow-sm divide-y divide-border">
          <p className="px-4 pt-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Seguridad
          </p>
          <div className="px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Autenticación biométrica</p>
            <Toggle checked={biometric} onChange={setBiometric} />
          </div>
          <button onClick={() => navigate("/profile/sessions")} className="w-full px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Sesiones activas</p>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
          <button onClick={() => navigate("/terms")} className="w-full px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Términos y privacidad</p>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Sign out */}
        <button
          onClick={signOut}
          disabled={actionLoading}
          className="w-full h-12 border-2 border-destructive text-destructive rounded-button font-medium text-sm flex items-center justify-center gap-2 hover:bg-destructive/5 transition-colors disabled:opacity-50"
        >
          <LogOut size={18} />
          {actionLoading ? "Cerrando sesión..." : "Cerrar sesión"}
        </button>
      </div>
    </AppLayout>
  );
};

export default Profile;
