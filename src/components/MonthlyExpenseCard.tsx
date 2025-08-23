import { Card } from "@/components/ui/card";
import { MonthlyTotal } from "@/types/expense";
import { TrendingUp, Receipt } from "lucide-react";

interface MonthlyExpenseCardProps {
  monthData: MonthlyTotal;
  isCurrentMonth?: boolean;
}

export const MonthlyExpenseCard = ({ monthData, isCurrentMonth = false }: MonthlyExpenseCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };

  return (
    <Card className={`p-6 transition-all duration-300 hover:shadow-lg border ${
      isCurrentMonth 
        ? "border-primary bg-gradient-to-br from-primary-light/20 to-primary-light/5" 
        : "border-border hover:border-primary/30"
    } ${monthData.total > 0 ? "hover:scale-[1.02]" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-semibold text-lg ${
          isCurrentMonth ? "text-primary-dark" : "text-foreground"
        }`}>
          {monthData.monthName}
        </h3>
        {monthData.total > 0 && (
          <div className={`p-2 rounded-lg ${
            isCurrentMonth ? "bg-primary/10" : "bg-muted"
          }`}>
            <TrendingUp className={`h-4 w-4 ${
              isCurrentMonth ? "text-primary" : "text-muted-foreground"
            }`} />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-2xl font-bold text-foreground">
            {formatCurrency(monthData.total)}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Receipt className="h-4 w-4" />
          <span>
            {monthData.expenseCount} {monthData.expenseCount === 1 ? "gasto" : "gastos"}
          </span>
        </div>

        {monthData.total === 0 && (
          <div className="text-center py-4">
            <p className="text-muted-foreground text-sm">Nenhum gasto registrado</p>
          </div>
        )}
      </div>
    </Card>
  );
};