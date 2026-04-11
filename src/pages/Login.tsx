import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Fingerprint, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, actionLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = await signIn(email, password);
    if (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Top section */}
      <div className="flex-none flex flex-col items-center justify-center pt-20 pb-10">
        <div className="w-[60px] h-[60px] rounded-[16px] bg-primary-medium flex items-center justify-center mb-3">
          <span className="text-primary-foreground text-3xl font-bold">M</span>
        </div>
        <h1 className="text-primary-foreground text-2xl font-bold">Metro SDQ</h1>
        <p className="text-[#8aabcc] text-[13px] mt-1">Sistema M-Charging</p>
      </div>

      {/* Bottom card */}
      <div className="flex-1 bg-card rounded-t-2xl px-6 pt-8 pb-10">
        <h2 className="text-primary text-xl font-bold mb-1">Bienvenido</h2>
        <p className="text-muted-foreground text-[13px] mb-6">
          Inicia sesión para continuar
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-input border border-input bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-medium"
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 pl-10 pr-12 rounded-input border border-input bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={actionLoading}
            className="w-full h-12 bg-primary text-primary-foreground rounded-button font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {actionLoading && <Loader2 size={18} className="animate-spin" />}
            {actionLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <button
          onClick={() => navigate("/forgot-password")}
          className="w-full text-center text-primary-medium text-sm font-medium mt-3"
        >
          ¿Olvidaste tu contraseña?
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-xs">o</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <button className="w-full h-12 border border-primary-medium rounded-button flex items-center justify-center gap-2 text-primary-medium text-sm font-medium hover:bg-primary-light/30 transition-colors">
          <Fingerprint size={20} />
          Usar huella / Face ID
        </button>

        <p className="text-center text-sm mt-6 text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <button onClick={() => navigate("/register")} className="text-primary-medium font-bold">
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
