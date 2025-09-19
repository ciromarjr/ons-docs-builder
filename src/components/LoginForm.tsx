import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { User, Lock } from "lucide-react";
import VoltaliaBranding from "./VoltaliaBranding";

interface LoginFormProps {
  onLogin: (credentials: { usuario: string; senha: string }) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

const LoginForm = ({ onLogin, darkMode, onToggleTheme }: LoginFormProps) => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ usuario, senha });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: darkMode 
          ? 'linear-gradient(135deg, hsl(217, 32%, 8%) 0%, hsl(217, 32%, 15%) 100%)'
          : 'linear-gradient(135deg, hsl(220, 15%, 95%) 0%, hsl(0, 0%, 100%) 100%)'
      }}
    >
      <div className="w-full max-w-md space-y-8">
        <VoltaliaBranding darkMode={darkMode} onToggleTheme={onToggleTheme} />
        
        <Card className="border-2 border-border/20 backdrop-blur-sm bg-card/80 shadow-lg">
          <div className="p-8 space-y-6">
            {/* Title */}
            <div className="text-center">
              <div className="inline-block border-2 border-primary rounded-full px-8 py-3">
                <h1 className="text-xl font-medium text-foreground">
                  Apuração da Geração
                </h1>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="usuario" className="text-sm font-medium text-foreground">
                  Usuário <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="usuario"
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                    className="pl-10 h-12 bg-input border-border text-foreground rounded-lg"
                    placeholder="Digite seu usuário"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha" className="text-sm font-medium text-foreground">
                  Senha <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="senha"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    className="pl-10 h-12 bg-input border-border text-foreground rounded-lg"
                    placeholder="Digite sua senha"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
                  >
                    Esqueceu sua senha?
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Entrar
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;