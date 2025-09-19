import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Table, Users, Zap, FileText, Settings } from "lucide-react";

interface Table {
  name: string;
  description: string;
  columns: Column[];
  type: "master" | "data" | "system";
}

interface Column {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
}

const DatabaseDocumentation = () => {
  const tables: Table[] = [
    {
      name: "conjuntos",
      description: "Tabela mestre para os conjuntos eólicos",
      type: "master",
      columns: [
        { name: "id", type: "UUID", required: true, description: "Identificador único do conjunto" },
        { name: "nome", type: "VARCHAR(100)", required: true, description: "Nome do conjunto eólico", example: "CANUDOS I" },
        { name: "codigo", type: "VARCHAR(20)", required: true, description: "Código único do conjunto", example: "CAN_I" },
        { name: "potencia_instalada", type: "DECIMAL(10,3)", required: true, description: "Potência instalada total (MW)", example: "99.400" },
        { name: "ativo", type: "BOOLEAN", required: true, description: "Se o conjunto está ativo" },
        { name: "created_at", type: "TIMESTAMP", required: true, description: "Data de criação" },
        { name: "updated_at", type: "TIMESTAMP", required: true, description: "Data de atualização" }
      ]
    },
    {
      name: "usinas",
      description: "Usinas individuais dentro dos conjuntos",
      type: "master",
      columns: [
        { name: "id", type: "UUID", required: true, description: "Identificador único da usina" },
        { name: "conjunto_id", type: "UUID", required: true, description: "FK para conjuntos" },
        { name: "nome", type: "VARCHAR(100)", required: true, description: "Nome da usina", example: "CAN_CANUDOS 1" },
        { name: "codigo", type: "VARCHAR(20)", required: true, description: "Código da usina", example: "CAN1" },
        { name: "potencia_instalada", type: "DECIMAL(10,3)", required: true, description: "Potência da usina (MW)", example: "49.700" },
        { name: "participacao_conjunto", type: "DECIMAL(5,2)", required: true, description: "% de participação no conjunto", example: "50.00" },
        { name: "ativo", type: "BOOLEAN", required: true, description: "Se a usina está ativa" }
      ]
    },
    {
      name: "usuarios",
      description: "Usuários do sistema com diferentes perfis de acesso",
      type: "system",
      columns: [
        { name: "id", type: "UUID", required: true, description: "Identificador único do usuário" },
        { name: "nome", type: "VARCHAR(100)", required: true, description: "Nome completo" },
        { name: "email", type: "VARCHAR(100)", required: true, description: "Email (único)" },
        { name: "senha_hash", type: "VARCHAR(255)", required: true, description: "Hash da senha" },
        { name: "perfil", type: "ENUM", required: true, description: "admin, analista, cliente, filgueiras" },
        { name: "conjunto_id", type: "UUID", required: false, description: "FK para conjuntos (apenas clientes)" },
        { name: "ativo", type: "BOOLEAN", required: true, description: "Se o usuário está ativo" }
      ]
    },
    {
      name: "dados_ons_brutos",
      description: "Dados originais importados do ONS (RG e RR)",
      type: "data",
      columns: [
        { name: "id", type: "UUID", required: true, description: "Identificador único" },
        { name: "conjunto_id", type: "UUID", required: true, description: "FK para conjuntos" },
        { name: "usina_id", type: "UUID", required: true, description: "FK para usinas" },
        { name: "data_operacao", type: "DATE", required: true, description: "Data da operação" },
        { name: "patamar", type: "VARCHAR(20)", required: true, description: "Patamar horário", example: "00:00 - 00:29" },
        { name: "geracao_verificada", type: "DECIMAL(10,3)", required: false, description: "Geração verificada ONS (MWh/h)" },
        { name: "disponibilidade", type: "DECIMAL(10,3)", required: false, description: "Disponibilidade ONS (MWh/h)" },
        { name: "vento_ms", type: "DECIMAL(8,3)", required: false, description: "Velocidade do vento (m/s)" },
        { name: "geracao_limitada", type: "DECIMAL(10,3)", required: false, description: "Geração limitada (MWh/h)" },
        { name: "geracao_referencia", type: "DECIMAL(10,3)", required: false, description: "Geração de referência (MWh/h)" },
        { name: "geracao_referencia_final", type: "DECIMAL(10,3)", required: false, description: "Geração de referência final (MWh/h)" },
        { name: "razao_restricao", type: "TEXT", required: false, description: "Razão da restrição" },
        { name: "origem_restricao", type: "TEXT", required: false, description: "Origem da restrição" },
        { name: "importado_em", type: "TIMESTAMP", required: true, description: "Data/hora da importação" }
      ]
    },
    {
      name: "dados_editados",
      description: "Dados alterados pelos analistas (versões editadas)",
      type: "data",
      columns: [
        { name: "id", type: "UUID", required: true, description: "Identificador único" },
        { name: "dados_ons_id", type: "UUID", required: true, description: "FK para dados_ons_brutos" },
        { name: "geracao_verificada_alterada", type: "DECIMAL(10,3)", required: false, description: "Geração verificada alterada (MWh/h)" },
        { name: "disponibilidade_alterada", type: "DECIMAL(10,3)", required: false, description: "Disponibilidade alterada (MWh/h)" },
        { name: "vento_alterado", type: "DECIMAL(8,3)", required: false, description: "Vento alterado (m/s)" },
        { name: "editado_por", type: "UUID", required: true, description: "FK para usuarios (analista)" },
        { name: "editado_em", type: "TIMESTAMP", required: true, description: "Data/hora da edição" },
        { name: "observacoes", type: "TEXT", required: false, description: "Observações da alteração" }
      ]
    },
    {
      name: "config_ons",
      description: "Configurações de acesso ao ONS (credenciais fixas)",
      type: "system",
      columns: [
        { name: "id", type: "UUID", required: true, description: "Identificador único" },
        { name: "ambiente", type: "VARCHAR(20)", required: true, description: "producao ou teste" },
        { name: "url_base", type: "VARCHAR(255)", required: true, description: "URL base da API ONS" },
        { name: "usuario_ons", type: "VARCHAR(100)", required: true, description: "Usuário ONS (criptografado)" },
        { name: "senha_ons", type: "VARCHAR(255)", required: true, description: "Senha ONS (criptografada)" },
        { name: "token_acesso", type: "TEXT", required: false, description: "Token atual (temporário)" },
        { name: "token_expira_em", type: "TIMESTAMP", required: false, description: "Expiração do token" },
        { name: "ativo", type: "BOOLEAN", required: true, description: "Se a configuração está ativa" }
      ]
    }
  ];

  const getTableIcon = (type: string) => {
    switch (type) {
      case "master": return <Database className="h-4 w-4" />;
      case "data": return <Zap className="h-4 w-4" />;
      case "system": return <Settings className="h-4 w-4" />;
      default: return <Table className="h-4 w-4" />;
    }
  };

  const getTableColor = (type: string) => {
    switch (type) {
      case "master": return "bg-primary";
      case "data": return "bg-energy-blue";
      case "system": return "bg-energy-orange";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">V</span>
            </div>
            <span className="text-xl font-bold text-foreground">Voltalia</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Documentação do Sistema</h1>
        <p className="text-lg text-muted-foreground">Apuração da Geração - Estrutura de Banco de Dados</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="tables">Tabelas</TabsTrigger>
          <TabsTrigger value="flows">Fluxos de Dados</TabsTrigger>
          <TabsTrigger value="permissions">Permissões</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tabelas Mestras</CardTitle>
                <Database className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">3</div>
                <p className="text-xs text-muted-foreground">Conjuntos, Usinas, Usuários</p>
              </CardContent>
            </Card>
            
            <Card className="border-energy-blue/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tabelas de Dados</CardTitle>
                <Zap className="h-4 w-4 text-energy-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-energy-blue">2</div>
                <p className="text-xs text-muted-foreground">Dados ONS, Dados Editados</p>
              </CardContent>
            </Card>
            
            <Card className="border-energy-orange/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Configurações</CardTitle>
                <Settings className="h-4 w-4 text-energy-orange" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-energy-orange">1</div>
                <p className="text-xs text-muted-foreground">Credenciais ONS</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Arquitetura do Sistema</CardTitle>
              <CardDescription>
                Sistema de apuração de geração eólica integrado com o ONS (Operador Nacional do Sistema Elétrico)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Fluxo Principal:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Sistema importa dados automaticamente do ONS (RG e RR)</li>
                  <li>Analistas visualizam e editam dados quando necessário</li>
                  <li>Clientes acessam apenas dados do seu conjunto específico</li>
                  <li>Filgueiras acessa dados editados de todos os conjuntos</li>
                  <li>Todos podem exportar planilhas com seus dados permitidos</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tables" className="space-y-6">
          <div className="space-y-6">
            {tables.map((table) => (
              <Card key={table.name} className="w-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getTableColor(table.type)}`}>
                      {getTableIcon(table.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{table.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {table.type === "master" ? "Mestra" : table.type === "data" ? "Dados" : "Sistema"}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">{table.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-2 font-medium">Coluna</th>
                          <th className="text-left p-2 font-medium">Tipo</th>
                          <th className="text-left p-2 font-medium">Obrigatório</th>
                          <th className="text-left p-2 font-medium">Descrição</th>
                          <th className="text-left p-2 font-medium">Exemplo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.columns.map((column, index) => (
                          <tr key={index} className="border-b border-border/50">
                            <td className="p-2 font-mono text-xs">{column.name}</td>
                            <td className="p-2 font-mono text-xs text-energy-blue">{column.type}</td>
                            <td className="p-2">
                              {column.required ? (
                                <Badge variant="destructive" className="text-xs">Sim</Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs">Não</Badge>
                              )}
                            </td>
                            <td className="p-2 text-xs text-muted-foreground">{column.description}</td>
                            <td className="p-2 font-mono text-xs text-energy-green">{column.example || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="flows" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de Dados ONS</CardTitle>
              <CardDescription>Como os dados fluem desde o ONS até os usuários finais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-energy-blue flex items-center justify-center text-primary-foreground font-bold">1</div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Importação Automática ONS</h4>
                    <p className="text-sm text-muted-foreground">Sistema conecta automaticamente ao ONS usando credenciais fixas e importa dados RG e RR para dados_ons_brutos</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-energy-orange flex items-center justify-center text-primary-foreground font-bold">2</div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Análise e Edição</h4>
                    <p className="text-sm text-muted-foreground">Analistas visualizam dados importados e criam versões alteradas quando necessário em dados_editados</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-energy-green flex items-center justify-center text-primary-foreground font-bold">3</div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Acesso por Perfil</h4>
                    <p className="text-sm text-muted-foreground">Cada tipo de usuário acessa dados específicos conforme suas permissões</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Relacionamentos Entre Tabelas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="p-3 border border-border rounded">
                  <strong>conjuntos</strong> (1) → (N) <strong>usinas</strong>
                  <p className="text-xs text-muted-foreground mt-1">Um conjunto pode ter várias usinas</p>
                </div>
                
                <div className="p-3 border border-border rounded">
                  <strong>conjuntos</strong> (1) → (N) <strong>usuarios</strong> (apenas clientes)
                  <p className="text-xs text-muted-foreground mt-1">Cliente está vinculado a um conjunto específico</p>
                </div>
                
                <div className="p-3 border border-border rounded">
                  <strong>usinas</strong> (1) → (N) <strong>dados_ons_brutos</strong>
                  <p className="text-xs text-muted-foreground mt-1">Cada usina tem muitos registros de dados por data/patamar</p>
                </div>
                
                <div className="p-3 border border-border rounded">
                  <strong>dados_ons_brutos</strong> (1) → (0..1) <strong>dados_editados</strong>
                  <p className="text-xs text-muted-foreground mt-1">Dados originais podem ter uma versão editada</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Perfis de Usuário
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border border-primary/20 rounded-lg bg-primary/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-primary">Admin</Badge>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Acesso total ao sistema</li>
                      <li>• Gerencia usuários e configurações</li>
                      <li>• Configura credenciais ONS</li>
                      <li>• Visualiza todos os dados</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border border-energy-blue/20 rounded-lg bg-energy-blue/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge style={{backgroundColor: "hsl(var(--energy-blue))"}}>Analista</Badge>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Visualiza dados de todos conjuntos</li>
                      <li>• Edita dados quando necessário</li>
                      <li>• Exporta planilhas</li>
                      <li>• Gerencia dados ONS</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border border-energy-green/20 rounded-lg bg-energy-green/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge style={{backgroundColor: "hsl(var(--energy-green))"}}>Cliente</Badge>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Acessa apenas seu conjunto</li>
                      <li>• Visualiza dados (não edita)</li>
                      <li>• Exporta planilha do seu conjunto</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border border-energy-orange/20 rounded-lg bg-energy-orange/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge style={{backgroundColor: "hsl(var(--energy-orange))"}}>Filgueiras</Badge>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Acessa dados editados de todos conjuntos</li>
                      <li>• Visualiza apenas versões alteradas</li>
                      <li>• Exporta planilhas consolidadas</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Regras de Negócio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Importação ONS</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Credenciais fixas no sistema (não por usuário)</li>
                      <li>• Importação automática de RG e RR</li>
                      <li>• Dados originais nunca são alterados</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Edição de Dados</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Apenas analistas podem editar</li>
                      <li>• Edições ficam em tabela separada</li>
                      <li>• Histórico de alterações mantido</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Exportação</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Cliente: apenas seu conjunto</li>
                      <li>• Filgueiras: dados editados de todos</li>
                      <li>• Analista: dados originais e editados</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Segurança</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Credenciais ONS criptografadas</li>
                      <li>• Acesso baseado em perfis</li>
                      <li>• Auditoria de alterações</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseDocumentation;