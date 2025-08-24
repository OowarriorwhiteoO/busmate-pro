import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Navigation } from "@/components/layout/Navigation";
import { FleetDashboard } from "@/components/fleet/FleetDashboard";

const Index = () => {
  const [user, setUser] = useState<{ role: 'admin' | 'user' } | null>(null);

  const handleLogin = (userRole: 'admin' | 'user') => {
    setUser({ role: userRole });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={user.role} onLogout={handleLogout} />
      <FleetDashboard userRole={user.role} />
    </div>
  );
};

export default Index;
