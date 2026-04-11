import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const { signUp, actionLoading } = useAuth();
  const [form, setForm] = useState({
    nombre: "", apellido: "", email: "", cedula: "", password: "", confirmPassword: "",
  });
  const [accepted, setAccepted] = useState(false);

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  const formatCedula = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 10) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 10)}-${digits.slice(10)}`;
  };

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const strengthColors = ["bg-destructive", "bg-alert", "bg-gold", "bg-success"];
  const strength = passwordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = await signUp(form.email, form.password, form.nombre, form.apellido, form.cedula);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Cuenta creada exitosamente. Inicia sesión.");
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <div className="flex-none flex flex-col items-center justify-center pt-16 pb-8">
        <div className="w-[60px] h-[60px] rounded-[16px] bg-primary-medium flex items-center justify-center mb-3">
          <span className="text-primary-foreground text-3xl font-bold">M</span>
        </div>
        <h1 className="text-primary-foreground text-2xl font-bold">Metro SDQ</h1>
        <p className="text-[#8aabcc] text-[13px] mt-1">Sistema M-Charging</p>
      </div>

      <div className="flex-1 bg-card rounded-t-2xl px-6 pt-6 pb-10 overflow-y-auto">
        <h2 className="text-primary text-xl font-bold mb-1">Crear cuenta</h2>
        <p className="text-muted-foreground text-[13px] mb-5">Regístrate para comenzar</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-3">
            <input placeholder="Nombre" value={form.nombre} onChange={(e) => update("nombre", e.target.value)}
              className="flex-1 h-12 px-4 rounded-input border border-input bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-medium" />
            <input placeholder="Apellido" value={form.apellido} onChange={(e) => update("apellido", e.target.value)}
              className="flex-1 h-12 px-4 rounded-input border border-input bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-medium" />
          </div>

          <input type="email" placeholder="Correo electrónico" value={form.email} onChange={(e) => update("email", e.target.value)}
            className="w-full h-12 px-4 rounded-input border border-input bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-medium" />

          <input placeholder="Cédula (000-0000000-0)" value={form.cedula}
            onChange={(e) => update("cedula", formatCedula(e.target.value))}
            className="w-full h-12 px-4 rounded-input border border-input bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-medium" />

          <div>
            <input type="password" placeholder="Contraseña" value={form.password} onChange={(e) => update("password", e.target.value)}
              className="w-full h-12 px-4 rounded-input border border-input bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-medium" />
            {form.password && (
              <div className="flex gap-1 mt-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${i < strength ? strengthColors[strength - 1] : "bg-border"}`} />
                ))}
              </div>
            )}
          </div>

          <input type="password" placeholder="Confirmar contraseña" value={form.confirmPassword}
            onChange={(e) => update("confirmPassword", e.target.value)}
            className="w-full h-12 px-4 rounded-input border border-input bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-medium" />

          <label className="flex items-start gap-2 cursor-pointer pt-1">
            <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 rounded accent-primary-medium" />
            <span className="text-xs text-muted-foreground leading-relaxed">
              Acepto los <span className="text-primary-medium font-medium">Términos</span> y{" "}
              <span className="text-primary-medium font-medium">Política de privacidad</span>
            </span>
          </label>

          <button type="submit" disabled={!accepted || actionLoading}
            className="w-full h-12 bg-primary text-primary-foreground rounded-button font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 mt-2 flex items-center justify-center gap-2">
            {actionLoading && <Loader2 size={18} className="animate-spin" />}
            {actionLoading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="text-center text-sm mt-5 text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <button onClick={() => navigate("/login")} className="text-primary-medium font-bold">
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
