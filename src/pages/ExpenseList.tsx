import { useState } from "react";
import { useExpenseContext } from "@/context/ExpenseContext";
import { useNavigate } from "react-router-dom";
import { ExpenseCard } from "@/components/ExpenseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search, Filter, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Expense } from "@/types/expense";

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpenseContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMonth, setFilterMonth] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const filteredExpenses = expenses
    .filter(expense => {
      const matchesSearch = 
        expense.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.nfs_e_numero?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMonth = filterMonth === "all" || 
        expense.mes_referencia === parseInt(filterMonth);
      
      return matchesSearch && matchesMonth;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return b.data_emitida.getTime() - a.data_emitida.getTime();
        case "value":
          return b.valor_total - a.valor_total;
        case "company":
          return a.empresa.localeCompare(b.empresa);
        default:
          return 0;
      }
    });

  const handleEdit = (expense: Expense) => {
    navigate(`/gastos/editar/${expense.id}`);
  };

  const handleDelete = (id: string) => {
    const expense = expenses.find(e => e.id === id);
    if (expense) {
      deleteExpense(id);
      toast({
        title: "Gasto removido",
        description: `O gasto de ${expense.empresa} foi removido com sucesso.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Lista de Gastos
                </h1>
                <p className="text-muted-foreground">
                  {filteredExpenses.length} {filteredExpenses.length === 1 ? 'gasto encontrado' : 'gastos encontrados'}
                </p>
              </div>
            </div>
            <Button 
              className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-primary-foreground shadow-lg"
              onClick={() => navigate("/gastos/novo")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Gasto
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Empresa, descrição ou NFS-e..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Mês
              </label>
              <Select value={filterMonth} onValueChange={setFilterMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os meses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os meses</SelectItem>
                  {monthNames.map((month, index) => (
                    <SelectItem key={index + 1} value={(index + 1).toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Ordenar por
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Data mais recente</SelectItem>
                  <SelectItem value="value">Maior valor</SelectItem>
                  <SelectItem value="company">Empresa A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSearchTerm("");
                  setFilterMonth("all");
                  setSortBy("date");
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Limpar Filtros
              </Button>
            </div>
          </div>
        </Card>

        {/* Expenses Grid */}
        {filteredExpenses.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredExpenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Nenhum gasto encontrado</h3>
              <p className="mb-4">
                {searchTerm || filterMonth !== "all" 
                  ? "Tente ajustar os filtros de busca" 
                  : "Adicione seu primeiro gasto de manutenção"}
              </p>
              {!searchTerm && filterMonth === "all" && (
                <Button 
                  className="bg-gradient-to-r from-primary to-primary-dark"
                  onClick={() => navigate("/gastos/novo")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Gasto
                </Button>
              )}
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default ExpenseList;