import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Pencil, Check } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import TopBar from "@/components/TopBar";
import { mockUser, mockSavedCard, rechargeAmounts } from "@/data/mockData";

const paymentMethods = [
  { id: "visa", label: `Visa ••• ${mockSavedCard.last4}`, sub: mockSavedCard.bank, icon: "💳" },
  { id: "apple", label: "Apple Pay", sub: "", icon: "" },
  { id: "google", label: "Google Pay", sub: "", icon: "🅖" },
];

const Recharge = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(200);
  const [payMethod, setPayMethod] = useState("visa");
  const [custom, setCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

  const amount = custom ? (parseInt(customAmount) || 0) : selected;
  const newBalance = mockUser.balance + amount;

  return (
    <AppLayout>
      <TopBar title="Recargar tarjeta" />

      {/* Balance preview */}
      <div className="mx-4 mt-4 bg-card rounded-card p-4 flex items-center justify-between shadow-sm">
        <div className="text-center">
          <p className="text-[11px] text-muted-foreground">Saldo actual</p>
          <p className="text-primary font-bold text-lg">RD$ {mockUser.balance.toFixed(2)}</p>
        </div>
        <span className="text-primary-medium text-lg">→</span>
        <div className="text-center">
          <p className="text-[11px] text-muted-foreground">Saldo nuevo</p>
          <p className="text-success font-bold text-lg">RD$ {newBalance.toFixed(2)}</p>
        </div>
      </div>

      {/* Amount selection */}
      <div className="px-4 mt-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Selecciona un monto</h3>
        <div className="grid grid-cols-3 gap-2">
          {rechargeAmounts.map((a) => (
            <button
              key={a.value}
              onClick={() => { setSelected(a.value); setCustom(false); }}
              className={`rounded-button p-3 text-center border transition-colors ${
                !custom && selected === a.value
                  ? "border-primary-medium bg-primary-light"
                  : "border-border bg-card"
              }`}
            >
              <p className="font-bold text-sm text-foreground">RD${a.value.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">{a.trips}</p>
            </button>
          ))}
          <button
            onClick={() => setCustom(true)}
            className={`rounded-button p-3 text-center border transition-colors ${
              custom ? "border-primary-medium bg-primary-light" : "border-border bg-card"
            }`}
          >
            <Pencil size={16} className="mx-auto text-muted-foreground mb-1" />
            <p className="text-[10px] text-muted-foreground">Personalizado</p>
          </button>
        </div>

        {custom && (
          <input
            type="number"
            placeholder="Monto en RD$"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="w-full h-12 px-4 mt-3 rounded-input border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary-medium"
          />
        )}
      </div>

      {/* Payment method */}
      <div className="px-4 mt-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Método de pago</h3>
        <div className="space-y-2">
          {paymentMethods.map((m) => (
            <button
              key={m.id}
              onClick={() => setPayMethod(m.id)}
              className="w-full bg-card rounded-button p-3 flex items-center gap-3 shadow-sm"
            >
              <span className="text-xl">{m.icon}</span>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">{m.label}</p>
                {m.sub && <p className="text-[11px] text-muted-foreground">{m.sub}</p>}
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                payMethod === m.id ? "border-primary-medium bg-primary-medium" : "border-muted-foreground"
              }`}>
                {payMethod === m.id && <Check size={12} className="text-primary-foreground" />}
              </div>
            </button>
          ))}
        </div>
        <button onClick={() => navigate("/cards/add")} className="text-primary-medium text-sm font-medium mt-3">+ Agregar tarjeta</button>
      </div>

      {/* Confirm button */}
      <div className="px-4 mt-6 pb-4">
        <button
          onClick={() => {
            if (amount <= 0) return;
            // Simulación: ~25% de las recargas fallan con código aleatorio
            const fail = Math.random() < 0.25;
            if (fail) {
              const codes = ["declined", "insufficient", "network", "expired"];
              const code = codes[Math.floor(Math.random() * codes.length)];
              navigate("/payment-error", { state: { amount, code } });
            } else {
              navigate("/payment-success", { state: { amount } });
            }
          }}
          className="w-full h-[52px] bg-primary text-primary-foreground rounded-card font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          disabled={amount <= 0}
        >
          <Lock size={16} />
          Confirmar recarga — RD${amount.toLocaleString()}
        </button>
      </div>
    </AppLayout>
  );
};

export default Recharge;
