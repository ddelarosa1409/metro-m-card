import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  title: string;
  showBack?: boolean;
}

const TopBar = ({ title, showBack = true }: TopBarProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-primary safe-top px-4 pb-4 flex items-center gap-3">
      {showBack && (
        <button onClick={() => navigate(-1)} className="text-primary-foreground">
          <ArrowLeft size={22} />
        </button>
      )}
      <h1 className="text-primary-foreground font-semibold text-lg flex-1 text-center pr-6">
        {title}
      </h1>
    </div>
  );
};

export default TopBar;
