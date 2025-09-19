import { Sun, Moon } from "lucide-react";

interface VoltaliaBrandingProps {
  darkMode?: boolean;
  onToggleTheme?: () => void;
}

const VoltaliaBranding = ({ darkMode = true, onToggleTheme }: VoltaliaBrandingProps) => {
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">V</span>
        </div>
        <span className="text-xl font-bold text-foreground">oltalia</span>
      </div>
      
      {/* Theme Toggle */}
      {onToggleTheme && (
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-full hover:bg-muted/50 transition-colors"
          aria-label="Alternar tema"
        >
          {darkMode ? (
            <Sun className="h-6 w-6 text-foreground" />
          ) : (
            <Moon className="h-6 w-6 text-foreground" />
          )}
        </button>
      )}
    </div>
  );
};

export default VoltaliaBranding;