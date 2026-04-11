import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center relative px-6">
      <div className="w-20 h-20 rounded-[20px] bg-primary-medium flex items-center justify-center mb-6">
        <span className="text-primary-foreground text-4xl font-bold">M</span>
      </div>

      <h1 className="text-primary-foreground text-[72px] font-bold leading-none mb-2">404</h1>
      <p className="text-primary-foreground text-xl font-semibold mb-1">Página no encontrada</p>
      <p className="text-[#8aabcc] text-sm text-center mb-8">
        La página que buscas no existe.
      </p>

      <button
        onClick={() => navigate("/dashboard", { replace: true })}
        className="h-12 px-8 border-2 border-primary-foreground/50 text-primary-foreground rounded-button font-medium text-sm hover:bg-primary-foreground/10 transition-colors"
      >
        Ir al inicio
      </button>

      <p className="absolute bottom-10 text-[#8aabcc] text-[11px]">© OPRET 2026</p>
    </div>
  );
};

export default NotFound;
