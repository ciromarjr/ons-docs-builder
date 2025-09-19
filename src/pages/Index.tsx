import { useState, useEffect } from "react";
import LoginForm from "@/components/LoginForm";
import DataManagementInterface from "@/components/DataManagementInterface";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [userName, setUserName] = useState("");
  const { toast } = useToast();

  // Apply theme to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [darkMode]);

  const handleLogin = (credentials: { usuario: string; senha: string }) => {
    // Simple demo login - in real app this would call an API
    if (credentials.usuario && credentials.senha) {
      setUserName(credentials.usuario);
      setIsLoggedIn(true);
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${credentials.usuario}!`,
      });
    } else {
      toast({
        title: "Erro no login",
        description: "Por favor, verifique suas credenciais.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado do sistema.",
    });
  };

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };

  if (isLoggedIn) {
    return (
      <DataManagementInterface
        onLogout={handleLogout}
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        userName={userName}
      />
    );
  }

  return (
    <LoginForm
      onLogin={handleLogin}
      darkMode={darkMode}
      onToggleTheme={handleToggleTheme}
    />
  );
};

export default Index;
