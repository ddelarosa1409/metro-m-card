import { Plus } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import TopBar from "@/components/TopBar";
import { mockSavedCard, mockUser } from "@/data/mockData";

const Cards = () => {
  return (
    <AppLayout>
      <TopBar title="Mis tarjetas" showBack={false} />

      {/* Card visual */}
      <div className="px-4 mt-4">
        <div className="w-full aspect-[300/180] rounded-xl p-5 flex flex-col justify-between"
          style={{ background: "linear-gradient(135deg, hsl(210 100% 20%), hsl(210 75% 36%))" }}>
          <div className="flex items-center justify-between">
            <span className="text-primary-foreground/80 text-[11px] tracking-[2px] font-semibold">METRO SDQ</span>
            <div className="w-8 h-6 bg-gold rounded-sm" />
          </div>
          <p className="text-primary-foreground text-lg tracking-[3px] font-medium">
            •••• •••• •••• {mockSavedCard.last4}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/60 text-[9px]">TITULAR</p>
              <p className="text-primary-foreground text-xs font-medium">{mockSavedCard.holder}</p>
              <p className="text-primary-foreground/60 text-[9px] mt-1">Vence {mockSavedCard.expiry}</p>
            </div>
            <span className="text-primary-foreground text-xl font-bold italic">VISA</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-4 mt-4 flex gap-3">
        <button className="flex-1 h-10 border border-primary-medium text-primary-medium rounded-button text-xs font-medium hover:bg-primary-light/30 transition-colors">
          Establecer predeterminada
        </button>
        <button className="flex-1 h-10 border border-destructive text-destructive rounded-button text-xs font-medium hover:bg-destructive-light/30 transition-colors">
          Eliminar tarjeta
        </button>
      </div>

      {/* Add new card */}
      <div className="px-4 mt-6">
        <button className="w-full border-2 border-dashed border-primary-light rounded-card p-8 flex flex-col items-center gap-2 hover:bg-primary-light/20 transition-colors">
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
