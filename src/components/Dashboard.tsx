import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MonthlyExpenseCard } from "./MonthlyExpenseCard";
import { ExpenseCard } from "./ExpenseCard";
import { mockExpenses, monthlyTotals, getTotalYear } from "@/data/mockExpenses";
import { Expense } from "@/types/expense";
import { Plus, Calendar, TrendingUp, Receipt, Filter } from "lucide-react";

export const Dashboard = () => {
  const [expenses] = useState<Expense[]>(mockExpenses);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const recentExpenses = expenses.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Sistema de Gastos de Manutenção
              </h1>
              <p className="text-muted-foreground mt-1">
                {formatDate(new Date())}
              </p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-primary-foreground shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Novo Gasto
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary-light/10 to-primary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total do Ano</p>
                <p className="text-3xl font-bold text-foreground">
                  {formatCurrency(getTotalYear())}
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-success-light/10 to-success/5 border-success/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Gastos Pagos</p>
                <p className="text-3xl font-bold text-foreground">
                  {expenses.filter(e => e.data_pagamento_1).length}
                </p>
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <Receipt className="h-6 w-6 text-success" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-warning-light/10 to-warning/5 border-warning/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mês Atual</p>
                <p className="text-3xl font-bold text-foreground">
                  {formatCurrency(monthlyTotals.find(m => m.month === currentMonth)?.total || 0)}
                </p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <Calendar className="h-6 w-6 text-warning" />
              </div>
            </div>
          </Card>
        </div>

        {/* Monthly Overview */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Resumo Mensal</h2>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {monthlyTotals.map((monthData) => (
              <MonthlyExpenseCard
                key={monthData.month}
                monthData={monthData}
                isCurrentMonth={monthData.month === currentMonth}
              />
            ))}
          </div>
        </section>

        {/* Recent Expenses */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Gastos Recentes</h2>
            <Button variant="outline" size="sm">
              Ver Todos
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recentExpenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                onEdit={(expense) => console.log("Edit expense:", expense)}
                onDelete={(id) => console.log("Delete expense:", id)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};