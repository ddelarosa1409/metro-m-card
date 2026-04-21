import { useNavigate, useLocation } from "react-router-dom";
import { X, RefreshCw, HelpCircle, AlertTriangle } from "lucide-react";

const reasons: Record<string, { title: string; desc: string }> = {
  declined: { title: "Tarjeta rechazada", desc: "Tu banco rechazó la transacción. Verifica los datos o intenta con otra tarjeta." },
  insufficient: { title: "Fondos insuficientes", desc: "No hay fondos suficientes en tu tarjeta para completar la recarga." },
  network: { title: "Sin conexión", desc: "No pudimos conectarnos al procesador de pagos. Verifica tu internet." },
  expired: { title: "Tarjeta vencida", desc: "La tarjeta utilizada está vencida. Actualízala o usa otra." },
  generic: { title: "Recarga fallida", desc: "Ocurrió un error al procesar tu recarga. No se realizó ningún cargo." },
};

const PaymentError = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as any) || {};
  const amount: number = state.amount || 0;
  const code: string = state.code || "generic";
  const info = reasons[code] || reasons.generic;

  const now = new Date();
  const dateStr = `Hoy, ${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 max-w-md mx-auto">
      <div className="w-24 h-24 rounded-full bg-destructive-light flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center">
          <X size={36} className="text-white" strokeWidth={3} />
        </div>
      </div>

      <h1 className="text-destructive text-2xl font-bold mb-1">{info.title}</h1>
      <p className="text-muted-foreground text-sm text-center mb-6 max-w-xs">{info.desc}</p>

      <div className="w-full bg-card rounded-card p-4 shadow-sm divide-y divide-border mb-4">
        <div className="flex justify-between py-3">
          <span className="text-sm text-muted-foreground">Monto intentado</span>
          <span className="text-sm font-bold text-foreground">RD$ {amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-3">
          <span className="text-sm text-muted-foreground">Estado</span>
          <span className="text-sm font-bold text-destructive">No procesada</span>
        </div>
        <div className="flex justify-between py-3">
          <span className="text-sm text-muted-foreground">Código</span>
          <span className="text-sm text-foreground font-mono">{code.toUpperCase()}</span>
        </div>
        <div className="flex justify-between py-3">
          <span className="text-sm text-muted-foreground">Fecha</span>
          <span className="text-sm text-foreground">{dateStr}</span>
        </div>
      </div>

      <div className="w-full bg-alert/10 border border-alert/30 rounded-card p-3 flex gap-2 mb-6">
        <AlertTriangle size={18} className="text-alert flex-shrink-0 mt-0.5" />
        <p className="text-xs text-foreground leading-relaxed">
          No se realizó ningún cargo a tu tarjeta. Tu saldo permanece igual.
        </p>
      </div>

      <button
        onClick={() => navigate("/recharge", { replace: true })}
        className="w-full h-12 bg-primary text-primary-foreground rounded-button font-medium text-sm hover:opacity-90 transition-opacity mb-3 flex items-center justify-center gap-2"
      >
        <RefreshCw size={16} />
        Reintentar recarga
      </button>
      <button
        onClick={() => navigate("/dashboard", { replace: true })}
        className="w-full h-12 border border-primary text-primary rounded-button font-medium text-sm hover:bg-primary/5 transition-colors mb-3"
      >
        Volver al inicio
      </button>
      <button
        onClick={() => navigate("/profile")}
        className="text-primary-medium text-sm font-medium flex items-center gap-1"
      >
        <HelpCircle size={14} /> Contactar soporte
      </button>
    </div>
  );
};

export default PaymentError;
