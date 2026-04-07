import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login", { replace: true }), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center relative">
      {/* Logo */}
      <div className="w-20 h-20 rounded-[20px] bg-primary-medium flex items-center justify-center mb-4">
        <span className="text-primary-foreground text-4xl font-bold">M</span>
      </div>

      <h1 className="text-primary-foreground text-[28px] font-bold mb-1">
        Metro SDQ
      </h1>
      <p className="text-[#8aabcc] text-sm">Sistema M-Charging</p>

      {/* Spinner */}
      <div className="mt-10">
        <Loader2 className="text-primary-medium animate-spin-slow" size={32} />
      </div>

      {/* Copyright */}
      <p className="absolute bottom-10 text-[#8aabcc] text-[11px]">
        © OPRET 2026
      </p>
    </div>
  );
};

export default Splash;
