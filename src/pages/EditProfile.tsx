import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Mail, Phone, User, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import TopBar from "@/components/TopBar";
import { mockUser } from "@/data/mockData";
import { toast } from "sonner";

type Field = "nombre" | "apellido" | "email" | "phone" | "password";

const fieldConfig: Record<Field, { title: string; label: string; icon: any; type?: string; placeholder?: string }> = {
  nombre: { title: "Editar nombre", label: "Nombre", icon: User, placeholder: "Tu nombre" },
  apellido: { title: "Editar apellido", label: "Apellido", icon: User, placeholder: "Tu apellido" },
  email: { title: "Editar correo", label: "Correo electrónico", icon: Mail, type: "email", placeholder: "tu@correo.com" },
  phone: { title: "Editar teléfono", label: "Teléfono", icon: Phone, type: "tel", placeholder: "+1 (809) 000-0000" },
  password: { title: "Cambiar contraseña", label: "Nueva contraseña", icon: Lock, type: "password", placeholder: "Mínimo 8 caracteres" },
};

const EditProfile = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const field = (params.get("field") as Field) || "nombre";
  const cfg = fieldConfig[field];

  const initial = field === "password" ? "" : (mockUser[field as keyof typeof mockUser] as string) ?? "";
  const [value, setValue] = useState(initial);
  const [currentPwd, setCurrentPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const Icon = cfg.icon;
  const isPassword = field === "password";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPassword) {
      if (!currentPwd) return toast.error("Ingresa tu contraseña actual");
      if (value.length < 8) return toast.error("La nueva contraseña debe tener al menos 8 caracteres");
      if (value !== confirm) return toast.error("Las contraseñas no coinciden");
    } else if (!value.trim()) {
      return toast.error("Este campo no puede estar vacío");
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast.success(isPassword ? "Contraseña actualizada" : `${cfg.label} actualizado`);
    navigate("/profile", { replace: true });
  };

  return (
    <AppLayout showNav={false}>
      <TopBar title={cfg.title} />

      <form onSubmit={handleSave} className="px-4 mt-4 space-y-4 pb-8">
        <div className="bg-card rounded-card p-5 shadow-sm flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mb-2">
            <Icon size={26} className="text-primary-medium" />
          </div>
          <p className="text-foreground font-semibold text-sm">{cfg.title}</p>
          <p className="text-muted-foreground text-xs mt-1">
            {isPassword
              ? "Por seguridad, confirma tu contraseña actual."
              : "Los cambios se aplicarán inmediatamente a tu cuenta."}
          </p>
        </div>

        <div className="bg-card rounded-card p-4 shadow-sm space-y-3">
          {isPassword && (
            <div>
              <label className="text-xs font-medium text-muted-foreground">Contraseña actual</label>
              <div className="relative mt-1">
                <input
                  type={showPwd ? "text" : "password"}
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                  className="w-full h-12 pl-10 pr-10 rounded-input border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary-medium"
                  placeholder="••••••••"
                />
                <Lock size={18} className="absolute left-3 top-3 text-muted-foreground" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-3 text-muted-foreground">
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-muted-foreground">{cfg.label}</label>
            <div className="relative mt-1">
              <input
                type={cfg.type || "text"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={cfg.placeholder}
                className="w-full h-12 pl-10 pr-3 rounded-input border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary-medium"
              />
              <Icon size={18} className="absolute left-3 top-3 text-muted-foreground" />
            </div>
          </div>

          {isPassword && (
            <div>
              <label className="text-xs font-medium text-muted-foreground">Confirmar nueva contraseña</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repite la contraseña"
                  className="w-full h-12 pl-10 pr-3 rounded-input border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary-medium"
                />
                <Lock size={18} className="absolute left-3 top-3 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>

        <div className="bg-primary-light/40 border border-primary-light rounded-card p-3 flex gap-2">
          <ShieldCheck size={18} className="text-primary-medium flex-shrink-0 mt-0.5" />
          <p className="text-xs text-primary leading-relaxed">
            Tus datos están protegidos con cifrado de extremo a extremo.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-primary text-primary-foreground rounded-button font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full h-12 border border-border text-muted-foreground rounded-button font-medium text-sm"
        >
          Cancelar
        </button>
      </form>
    </AppLayout>
  );
};

export default EditProfile;
