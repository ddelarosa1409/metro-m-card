import { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

const AppLayout = ({ children, showNav = true }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <div className={showNav ? "pb-24" : ""}>{children}</div>
      {showNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
