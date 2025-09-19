import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  User, 
  LogOut,
  Sun,
  Moon
} from "lucide-react";
import VoltaliaBranding from "./VoltaliaBranding";

interface DataManagementInterfaceProps {
  onLogout: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  userName: string;
}

const DataManagementInterface = ({ onLogout, darkMode, onToggleTheme, userName }: DataManagementInterfaceProps) => {
  const [selectedDate, setSelectedDate] = useState("2024-01-15");

  // Sample data structure matching the third image
  const patamares = [
    "00:00 - 00:29", "00:30 - 00:59", "01:00 - 01:29", "01:30 - 01:59",
    "02:00 - 02:29", "02:30 - 02:59", "03:00 - 03:29", "03:30 - 03:59",
    "04:00 - 04:29", "04:30 - 04:59", "05:00 - 05:29", "05:30 - 05:59",
    "06:00 - 06:29", "06:30 - 06:59", "07:00 - 07:29", "07:30 - 07:59",
    "08:00 - 08:29"
  ];

  const usinas = ["Usina XX", "Usina YY"];
  
  const columns = ["Geração Verificada", "Disponibilidade", "Vento [m/s]"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold text-foreground">oltalia</span>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="rounded-full">
                Enviar Dados
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full">
                Consultar Eventos - ONS
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full">
                Gerar Relatórios - ONS
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full">
                Razões e Restrições
              </Button>
              <Button variant="default" size="sm" className="rounded-full">
                Analise
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full hover:bg-muted/50 transition-colors"
              aria-label="Alternar tema"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-foreground" />
              )}
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-foreground">Nome do Usuário</span>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Date Controls */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-lg font-medium text-foreground">Data</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="default" 
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              Salvar
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="bg-muted p-3 text-left font-medium text-muted-foreground border-r border-border">
                    Patamar
                  </th>
                  {usinas.map((usina) => (
                    <th 
                      key={usina}
                      className="bg-primary p-3 text-center font-medium text-primary-foreground border-r border-border"
                      colSpan={columns.length}
                    >
                      {usina}
                    </th>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <th className="bg-muted p-2 border-r border-border"></th>
                  {usinas.map((usina) => 
                    columns.map((column) => (
                      <th 
                        key={`${usina}-${column}`}
                        className="bg-muted p-2 text-xs font-medium text-muted-foreground border-r border-border min-w-[120px]"
                      >
                        {column}
                      </th>
                    ))
                  )}
                </tr>
              </thead>
              <tbody>
                {patamares.map((patamar, index) => (
                  <tr key={patamar} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="bg-muted/50 p-2 font-mono text-xs text-foreground border-r border-border">
                      {patamar}
                    </td>
                    {usinas.map((usina) => 
                      columns.map((column) => (
                        <td 
                          key={`${usina}-${column}-${index}`}
                          className="p-1 border-r border-border/30"
                        >
                          <Input
                            className="h-8 text-xs border-0 bg-transparent focus:bg-background"
                            placeholder="0.000"
                          />
                        </td>
                      ))
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default DataManagementInterface;