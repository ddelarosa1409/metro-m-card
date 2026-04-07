import { Home, CreditCard, IdCard, List } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Inicio", path: "/dashboard" },
  { icon: CreditCard, label: "Recargar", path: "/recharge" },
  { icon: IdCard, label: "Tarjetas", path: "/cards" },
  { icon: List, label: "Historial", path: "/history" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 py-2 px-4 transition-colors"
            >
              <item.icon
                size={22}
                className={isActive ? "text-nav-active" : "text-nav-inactive"}
              />
              <span
                className={`text-[10px] ${
                  isActive
                    ? "text-nav-active font-semibold"
                    : "text-nav-inactive"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-nav-active -mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
