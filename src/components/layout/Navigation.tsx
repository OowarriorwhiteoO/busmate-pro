import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bus, Settings, LogOut, Moon, Sun } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  userRole?: 'admin' | 'user';
  onLogout?: () => void;
}

export const Navigation = ({ userRole = 'user', onLogout }: NavigationProps) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-primary to-primary-glow p-2 rounded-lg">
              <Bus className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">BusMate Pro</h1>
              <p className="text-xs text-muted-foreground">Sistema de Gestión de Flota</p>
            </div>
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center space-x-4">
            <Badge variant={userRole === 'admin' ? 'default' : 'secondary'}>
              {userRole === 'admin' ? 'Administrador' : 'Usuario'}
            </Badge>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-accent"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button variant="ghost" size="icon" className="hover:bg-accent">
              <Settings className="h-4 w-4" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onLogout}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};