import { useNavigate, useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import { mockUser, mockSavedCard } from "@/data/mockData";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amount = (location.state as any)?.amount || 200;
  const newBalance = mockUser.balance + amount;

  const now = new Date();
  const dateStr = `Hoy, ${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 max-w-md mx-auto">
      {/* Checkmark */}
      <div className="w-24 h-24 rounded-full bg-success-light flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center">
          <Check size={36} className="text-white" strokeWidth={3} />
        </div>
      </div>

      <h1 className="text-success text-2xl font-bold mb-1">¡Recarga exitosa!</h1>
      <p className="text-muted-foreground text-sm mb-6">Tu tarjeta ha sido recargada</p>

      {/* Summary card */}
      <div className="w-full bg-card rounded-card p-4 shadow-sm divide-y divide-border mb-8">
        <div className="flex justify-between py-3">
          <span className="text-sm text-muted-foreground">Monto recargado</span>
          <span className="text-sm font-bold text-success">RD$ {amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-3">
          <span className="text-sm text-muted-foreground">Nuevo saldo</span>
          <span className="text-sm font-bold text-primary">RD$ {newBalance.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-3">
          <span className="text-sm text-muted-foreground">Método de pago</span>
          <span className="text-sm text-foreground">Visa ••• {mockSavedCard.last4}</span>
        </div>
        <div className="flex justify-between py-3">
          <span className="text-sm text-muted-foreground">Fecha</span>
          <span className="text-sm text-foreground">{dateStr}</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/dashboard", { replace: true })}
        className="w-full h-12 bg-primary text-primary-foreground rounded-button font-medium text-sm hover:opacity-90 transition-opacity mb-3"
      >
        Volver al inicio
      </button>
      <button
        onClick={() => navigate("/history")}
        className="w-full h-12 border border-primary text-primary rounded-button font-medium text-sm hover:bg-primary/5 transition-colors"
      >
        Ver historial
      </button>
    </div>
  );
};

export default PaymentSuccess;
