import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Calendar, Lock, User, ShieldCheck } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import TopBar from "@/components/TopBar";
import { toast } from "sonner";

const formatCard = (v: string) =>
  v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
};

const detectBrand = (n: string) => {
  const c = n.replace(/\s/g, "");
  if (/^4/.test(c)) return "VISA";
  if (/^5[1-5]/.test(c)) return "MASTERCARD";
  if (/^3[47]/.test(c)) return "AMEX";
  return "TARJETA";
};

const AddCard = () => {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [holder, setHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [setDefault, setSetDefault] = useState(true);
  const [loading, setLoading] = useState(false);

  const brand = detectBrand(number);
  const last4 = number.replace(/\s/g, "").slice(-4).padStart(4, "•");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = number.replace(/\s/g, "");
    if (digits.length < 15) return toast.error("Número de tarjeta inválido");
    if (!holder.trim()) return toast.error("Ingresa el nombre del titular");
    if (expiry.length < 5) return toast.error("Fecha de vencimiento inválida");
    if (cvv.length < 3) return toast.error("CVV inválido");

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Tarjeta agregada exitosamente");
    navigate(-1);
  };

  return (
    <AppLayout showNav={false}>
      <TopBar title="Agregar tarjeta" />

      {/* Live preview */}
      <div className="px-4 mt-4">
        <div
          className="w-full aspect-[300/180] rounded-xl p-5 flex flex-col justify-between shadow-md"
          style={{ background: "linear-gradient(135deg, hsl(210 100% 20%), hsl(210 75% 36%))" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-primary-foreground/80 text-[11px] tracking-[2px] font-semibold">METRO SDQ</span>
            <div className="w-8 h-6 bg-gold rounded-sm" />
          </div>
          <p className="text-primary-foreground text-lg tracking-[3px] font-medium">
            {number ? number.padEnd(19, "•") : "•••• •••• •••• ••••"}
          </p>
          <div className="flex items-end justify-between">
            <div className="min-w-0">
              <p className="text-primary-foreground/60 text-[9px]">TITULAR</p>
              <p className="text-primary-foreground text-xs font-medium truncate uppercase">
                {holder || "NOMBRE APELLIDO"}
              </p>
              <p className="text-primary-foreground/60 text-[9px] mt-1">Vence {expiry || "MM/AA"}</p>
            </div>
            <span className="text-primary-foreground text-base font-bold italic">{brand}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 mt-4 space-y-3 pb-8">
        <div className="bg-card rounded-card p-4 shadow-sm space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Número de tarjeta</label>
            <div className="relative mt-1">
              <input
                inputMode="numeric"
                value={number}
                onChange={(e) => setNumber(formatCard(e.target.value))}
                placeholder="0000 0000 0000 0000"
                className="w-full h-12 pl-10 pr-3 rounded-input border border-input bg-card text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-primary-medium"
              />
              <CreditCard size={18} className="absolute left-3 top-3 text-muted-foreground" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Titular</label>
            <div className="relative mt-1">
              <input
                value={holder}
                onChange={(e) => setHolder(e.target.value.toUpperCase())}
                placeholder="NOMBRE APELLIDO"
                className="w-full h-12 pl-10 pr-3 rounded-input border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary-medium"
              />
              <User size={18} className="absolute left-3 top-3 text-muted-foreground" />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground">Vencimiento</label>
              <div className="relative mt-1">
                <input
                  inputMode="numeric"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/AA"
                  className="w-full h-12 pl-10 pr-3 rounded-input border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary-medium"
                />
                <Calendar size={18} className="absolute left-3 top-3 text-muted-foreground" />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground">CVV</label>
              <div className="relative mt-1">
                <input
                  inputMode="numeric"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="•••"
                  className="w-full h-12 pl-10 pr-3 rounded-input border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary-medium"
                />
                <Lock size={18} className="absolute left-3 top-3 text-muted-foreground" />
              </div>
            </div>
          </div>

          <label className="flex items-center justify-between pt-2 cursor-pointer">
            <span className="text-sm text-foreground">Establecer como predeterminada</span>
            <button
              type="button"
              onClick={() => setSetDefault(!setDefault)}
              className={`w-11 h-6 rounded-full relative transition-colors ${setDefault ? "bg-success" : "bg-muted-foreground/30"}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${setDefault ? "left-[22px]" : "left-0.5"}`} />
            </button>
          </label>
        </div>

        <div className="bg-primary-light/40 border border-primary-light rounded-card p-3 flex gap-2">
          <ShieldCheck size={18} className="text-primary-medium flex-shrink-0 mt-0.5" />
          <p className="text-xs text-primary leading-relaxed">
            Procesamos pagos con cifrado PCI-DSS. Nunca almacenamos tu CVV.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-primary text-primary-foreground rounded-button font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Lock size={16} />
          {loading ? "Guardando..." : `Guardar tarjeta ${brand !== "TARJETA" ? `${brand} •••• ${last4}` : ""}`}
        </button>
      </form>
    </AppLayout>
  );
};

export default AddCard;
