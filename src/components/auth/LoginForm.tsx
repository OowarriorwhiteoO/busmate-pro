import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bus, Lock, Mail, User } from "lucide-react";

interface LoginFormProps {
  onLogin: (userRole: 'admin' | 'user') => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - check for admin credentials
    const isAdmin = email === "admin@busmate.com" && password === "admin123";
    onLogin(isAdmin ? 'admin' : 'user');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration - all new users are standard users
    onLogin('user');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/20 to-background p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl w-20 h-20 mx-auto mb-4 shadow-lg">
            <Bus className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">BusMate Pro</h1>
          <p className="text-muted-foreground">Sistema de Gestión de Flota</p>
        </div>

        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl">Bienvenido</CardTitle>
            <CardDescription>
              Inicia sesión o regístrate para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Contraseña
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium py-2.5">
                    Iniciar Sesión
                  </Button>
                </form>
                
                <div className="mt-4 p-4 bg-accent/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Credenciales de prueba:</p>
                  <p className="text-xs text-muted-foreground">
                    <strong>Admin:</strong> admin@busmate.com / admin123<br />
                    <strong>Usuario:</strong> cualquier email / cualquier contraseña
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Nombre Completo
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Contraseña
                    </Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white font-medium py-2.5">
                    Crear Cuenta
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};