import { useState } from "react";
import { Info } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import TopBar from "@/components/TopBar";
import { mockSavedCard } from "@/data/mockData";

const amountPills = [100, 200, 300, 500];

const AutoRecharge = () => {
  const [enabled, setEnabled] = useState(true);
  const [threshold, setThreshold] = useState(50);
  const [amount, setAmount] = useState(200);

  return (
    <AppLayout>
      <TopBar title="Recarga automática" />

      <div className="px-4 mt-4 space-y-4">
        {/* Status */}
        <div className="bg-card rounded-card p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="font-semibold text-sm text-foreground">Recarga automática</p>
            <p className={`text-xs ${enabled ? "text-success" : "text-muted-foreground"}`}>
              {enabled ? "Activa desde hoy" : "Desactivada"}
            </p>
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`w-12 h-7 rounded-full p-0.5 transition-colors ${enabled ? "bg-success" : "bg-muted"}`}
          >
            <div className={`w-6 h-6 bg-card rounded-full shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </div>

        {/* Settings */}
        <div className="bg-card rounded-card p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Activar cuando el saldo baje de</span>
            <span className="text-primary-medium font-bold text-sm">RD$ {threshold}</span>
          </div>
          <input
            type="range" min={20} max={200} step={10} value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full accent-primary-medium h-2"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>RD$20</span><span>RD$200</span>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-foreground">Monto a recargar</span>
              <span className="text-primary-medium font-bold text-sm">RD$ {amount}</span>
            </div>
            <div className="flex gap-2">
              {amountPills.map((a) => (
                <button
                  key={a}
                  onClick={() => setAmount(a)}
                  className={`flex-1 py-2 rounded-button text-xs font-medium transition-colors ${
                    amount === a
                      ? "bg-primary-medium text-primary-foreground"
                      : "bg-background text-foreground border border-border"
                  }`}
                >
                  RD${a}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Payment method */}
        <div className="bg-card rounded-card p-4 shadow-sm">
          <p className="text-xs text-muted-foreground mb-2">Método de pago</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">💳</span>
              <span className="text-sm font-medium text-foreground">Visa ••• {mockSavedCard.last4}</span>
            </div>
            <button className="text-primary-medium text-xs font-medium">Cambiar</button>
          </div>
        </div>

        {/* Info */}
        <div className="bg-primary-light rounded-card p-4 flex gap-3">
          <Info size={18} className="text-primary-medium flex-shrink-0 mt-0.5" />
          <p className="text-xs text-foreground leading-relaxed">
            La recarga se ejecutará automáticamente cuando tu saldo disponible sea menor al umbral configurado.
          </p>
        </div>

        {/* Save */}
        <button className="w-full h-12 bg-primary text-primary-foreground rounded-button font-medium text-sm hover:opacity-90 transition-opacity">
          Guardar configuración
        </button>
      </div>
    </AppLayout>
  );
};

export default AutoRecharge;
