import { Plus, Check, Trash2, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AppLayout from "@/components/AppLayout";
import TopBar from "@/components/TopBar";
import { getCards, setDefaultCard, removeCard, type SavedCard } from "@/lib/cardsStore";

const Cards = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

  const refresh = () => {
    const list = getCards();
    setCards(list);
    setSelectedId((prev) => {
      if (prev && list.some((c) => c.id === prev)) return prev;
      return list.find((c) => c.isDefault)?.id || list[0]?.id || "";
    });
  };

  useEffect(() => {
    refresh();
    const onUpdate = () => refresh();
    window.addEventListener("cards:updated", onUpdate);
    return () => window.removeEventListener("cards:updated", onUpdate);
  }, []);

  const selected = cards.find((c) => c.id === selectedId);

  const handleSetDefault = () => {
    if (!selected) return;
    setDefaultCard(selected.id);
    toast.success("Tarjeta predeterminada actualizada");
  };

  const handleRemove = () => {
    if (!selected) return;
    removeCard(selected.id);
    toast.success("Tarjeta eliminada");
  };

  return (
    <AppLayout>
      <TopBar title="Mis tarjetas" showBack={true} />

      {/* Big card visual */}
      <div className="px-4 mt-4">
        {selected ? (
          <div className="w-full aspect-[300/180] rounded-xl p-5 flex flex-col justify-between shadow-md"
            style={{ background: "linear-gradient(135deg, hsl(210 100% 20%), hsl(210 75% 36%))" }}>
            <div className="flex items-center justify-between">
              <span className="text-primary-foreground/80 text-[11px] tracking-[2px] font-semibold">METRO SDQ</span>
              <div className="w-8 h-6 bg-gold rounded-sm" />
            </div>
            <p className="text-primary-foreground text-lg tracking-[3px] font-medium">
              •••• •••• •••• {selected.last4}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/60 text-[9px]">TITULAR</p>
                <p className="text-primary-foreground text-xs font-medium uppercase">{selected.holder}</p>
                <p className="text-primary-foreground/60 text-[9px] mt-1">Vence {selected.expiry}</p>
              </div>
              <span className="text-primary-foreground text-xl font-bold italic">{selected.brand}</span>
            </div>
          </div>
        ) : (
          <div className="w-full aspect-[300/180] rounded-xl border-2 border-dashed border-primary-light flex items-center justify-center">
            <p className="text-muted-foreground text-sm">No tienes tarjetas guardadas</p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {selected && (
        <div className="px-4 mt-4 flex gap-3">
          <button
            onClick={handleSetDefault}
            disabled={selected.isDefault}
            className="flex-1 h-10 border border-primary-medium text-primary-medium rounded-button text-xs font-medium hover:bg-primary-light/30 transition-colors disabled:opacity-50"
          >
            {selected.isDefault ? "Predeterminada ✓" : "Establecer predeterminada"}
          </button>
          <button
            onClick={handleRemove}
            className="flex-1 h-10 border border-destructive text-destructive rounded-button text-xs font-medium hover:bg-destructive-light/30 transition-colors"
          >
            Eliminar tarjeta
          </button>
        </div>
      )}

      {/* Card list */}
      {cards.length > 0 && (
        <div className="px-4 mt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Tus tarjetas ({cards.length})</h3>
          <div className="space-y-2">
            {cards.map((c) => {
              const isSel = c.id === selectedId;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={`w-full bg-card rounded-card p-3 flex items-center gap-3 shadow-sm border transition-colors ${
                    isSel ? "border-primary-medium" : "border-transparent"
                  }`}
                >
                  <div className="w-10 h-7 rounded-sm bg-primary-light flex items-center justify-center text-[9px] font-bold text-primary">
                    {c.brand.slice(0, 4)}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-foreground flex items-center gap-1">
                      {c.brand} ••• {c.last4}
                      {c.isDefault && <Star size={12} className="text-gold fill-gold" />}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{c.bank} · Vence {c.expiry}</p>
                  </div>
                  {isSel && (
                    <div className="w-5 h-5 rounded-full bg-primary-medium flex items-center justify-center">
                      <Check size={12} className="text-primary-foreground" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Add new card */}
      <div className="px-4 mt-6 pb-4">
        <button onClick={() => navigate("/cards/add")} className="w-full border-2 border-dashed border-primary-light rounded-card p-6 flex flex-col items-center gap-2 hover:bg-primary-light/20 transition-colors">
          <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
            <Plus size={24} className="text-primary-medium" />
          </div>
          <span className="text-primary-medium text-sm font-medium">Agregar nueva tarjeta</span>
        </button>
      </div>
    </AppLayout>
  );
};

export default Cards;
