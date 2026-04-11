import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, CheckCircle } from "lucide-react";
import { resetPassword } from "@/lib/supabase";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await resetPassword(email);
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <div className="flex-none flex flex-col items-center justify-center pt-20 pb-10">
        <div className="w-[60px] h-[60px] rounded-[16px] bg-primary-medium flex items-center justify-center mb-3">
          <span className="text-primary-foreground text-3xl font-bold">M</span>
        </div>
        <h1 className="text-primary-foreground text-2xl font-bold">Metro SDQ</h1>
        <p className="text-[#8aabcc] text-[13px] mt-1">Sistema M-Charging</p>
      </div>

      <div className="flex-1 bg-card rounded-t-2xl px-6 pt-8 pb-10">
        {!sent ? (
          <>
            <h2 className="text-primary text-xl font-bold mb-1">Recuperar contraseña</h2>
            <p className="text-muted-foreground text-[13px] mb-6">
              Ingresa tu correo y te enviaremos un enlace
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 pl-10 pr-4 rounded-input border border-input bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full h-12 bg-primary text-primary-foreground rounded-button font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar enlace"}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center pt-8">
            <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-success" />
            </div>
            <h2 className="text-success text-xl font-bold mb-2">Correo enviado</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Revisa tu bandeja de entrada en <span className="font-medium text-foreground">{email}</span>
            </p>
          </div>
        )}

        <button
          onClick={() => navigate("/login")}
          className="w-full text-center text-primary-medium text-sm font-medium mt-6"
        >
          Volver al inicio de sesión
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
