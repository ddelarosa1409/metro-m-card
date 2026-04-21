import { useState } from "react";
import { Search, ArrowUp, Train, RefreshCw, CableCar } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import TopBar from "@/components/TopBar";
import { mockTransactions } from "@/data/mockData";

const iconMap = {
  "arrow-up": ArrowUp,
  "train": Train,
  "refresh-cw": RefreshCw,
  "cable-car": CableCar,
};

const filters = ["Todos", "Recargas", "Pasajes", "Este mes"];

const History = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = mockTransactions.filter((tx) => {
    if (activeFilter === "Recargas") return tx.type === "recarga" || tx.type === "auto-recarga";
    if (activeFilter === "Pasajes") return tx.type === "pasaje";
    return true;
  }).filter((tx) => tx.description.toLowerCase().includes(search.toLowerCase()));

  const groups = filtered.reduce((acc, tx) => {
    if (!acc[tx.dateGroup]) acc[tx.dateGroup] = [];
    acc[tx.dateGroup].push(tx);
    return acc;
  }, {} as Record<string, typeof mockTransactions>);

  return (
    <AppLayout>
      <TopBar title="Historial" showBack={true} />

      {/* Filters */}
      <div className="px-4 mt-4 flex gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeFilter === f
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground border border-border"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="px-4 mt-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Buscar transacción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-button bg-card border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-medium"
          />
        </div>
      </div>

      {/* Transaction list */}
      <div className="px-4 mt-4 space-y-4">
        {Object.entries(groups).map(([date, txs]) => (
          <div key={date}>
            <p className="text-xs text-muted-foreground mb-2 font-medium">{date}</p>
            <div className="space-y-2">
              {txs.map((tx) => {
                const Icon = iconMap[tx.icon];
                return (
                  <div key={tx.id} className="bg-card rounded-button p-3 flex items-center gap-3 shadow-sm">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
                      tx.positive ? "bg-success-light text-success" : "bg-destructive-light text-destructive"
                    }`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                      <p className="text-[11px] text-muted-foreground">{tx.time.split(" ").slice(-2).join(" ")}</p>
                    </div>
                    <span className={`text-sm font-bold ${tx.positive ? "text-success" : "text-destructive"}`}>
                      {tx.positive ? "+" : "-"}RD${tx.amount}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default History;
