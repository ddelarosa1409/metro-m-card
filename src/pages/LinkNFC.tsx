import { useState } from "react";
import { Wifi, CheckCircle2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import TopBar from "@/components/TopBar";

const LinkNFC = () => {
  const [uid, setUid] = useState("");
  const [linked, setLinked] = useState(false);

  const handleLink = () => {
    if (uid.length >= 4) setLinked(true);
  };

  return (
    <AppLayout>
      <TopBar title="Vincular tarjeta NFC" />

      <div className="px-4 mt-4 space-y-4">
        {!linked ? (
          <>
            {/* NFC illustration */}
            <div className="flex justify-center py-8">
              <div className="relative w-[160px] h-[160px] flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-primary-light animate-pulse-ring" />
                <div className="absolute inset-4 rounded-full bg-primary-light animate-pulse-ring-delay" />
                <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center z-10">
                  <Wifi size={36} className="text-primary-medium" />
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-card rounded-card p-5 shadow-sm">
              <h3 className="font-bold text-sm text-foreground mb-4">Cómo vincular tu tarjeta</h3>
              {[
                "Activa el NFC en tu teléfono",
                "Acerca tu tarjeta del Metro al lector",
                "Espera la confirmación",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                  <div className="w-7 h-7 rounded-full bg-primary-medium text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm text-foreground pt-1">{step}</p>
                </div>
              ))}
            </div>

            {/* Manual input */}
            <div className="bg-card rounded-card p-5 shadow-sm">
              <p className="text-xs text-muted-foreground mb-3">O ingresa el UID manualmente</p>
              <input
                placeholder="Ej: A1B2C3D4"
                value={uid}
                onChange={(e) => setUid(e.target.value.toUpperCase())}
                className="w-full h-12 px-4 rounded-input border border-input bg-card text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-medium mb-3"
              />
              <button
                onClick={handleLink}
                disabled={uid.length < 4}
                className="w-full h-12 bg-primary text-primary-foreground rounded-button font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Vincular tarjeta
              </button>
            </div>
          </>
        ) : (
          /* Success state */
          <div className="flex flex-col items-center pt-16">
            <div className="w-24 h-24 rounded-full bg-success-light flex items-center justify-center mb-4">
              <CheckCircle2 size={48} className="text-success" />
            </div>
            <h3 className="text-success font-bold text-xl mb-2">¡Tarjeta vinculada!</h3>
            <p className="text-muted-foreground text-sm mb-1">UID</p>
            <p className="text-foreground font-mono text-lg font-bold mb-8">
              {uid.match(/.{1,2}/g)?.join(" · ") || uid}
            </p>
            <button
              onClick={() => { setLinked(false); setUid(""); }}
              className="w-full h-12 border border-destructive text-destructive rounded-button font-medium text-sm hover:bg-destructive-light/30 transition-colors"
            >
              Desvincular tarjeta
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default LinkNFC;
