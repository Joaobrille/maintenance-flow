import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Expense, PaymentStatus } from "@/types/expense";
import { Calendar, Building2, FileText, CreditCard, Edit, Trash2 } from "lucide-react";

interface ExpenseCardProps {
  expense: Expense;
  onEdit?: (expense: Expense) => void;
  onDelete?: (id: string) => void;
}

export const ExpenseCard = ({ expense, onEdit, onDelete }: ExpenseCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const getPaymentStatus = (): PaymentStatus => {
    const today = new Date();
    const hasAllPayments = expense.valor_parcela_1 && expense.data_pagamento_1;
    
    if (!hasAllPayments) {
      return { status: "pending", label: "Pendente" };
    }

    // Check if all payments are completed
    const allPaymentDates = [
      expense.data_pagamento_1,
      expense.data_pagamento_2,
      expense.data_pagamento_3,
      expense.data_pagamento_4
    ].filter(date => date);

    const latestPaymentDate = allPaymentDates.reduce((latest, current) => {
      return current && (!latest || current > latest) ? current : latest;
    }, null as Date | null);

    if (latestPaymentDate && latestPaymentDate <= today) {
      return { status: "paid", label: "Pago" };
    }

    const nextPaymentDate = allPaymentDates.find(date => date && date > today);
    if (nextPaymentDate) {
      return { 
        status: "pending", 
        label: "Pendente",
        nextPaymentDate 
      };
    }

    return { status: "overdue", label: "Em atraso" };
  };

  const paymentStatus = getPaymentStatus();

  const getStatusVariant = (status: PaymentStatus["status"]) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "overdue":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] border border-border hover:border-primary/30">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-lg text-foreground">{expense.empresa}</h3>
          </div>
          <p className="text-muted-foreground mb-2">{expense.descricao}</p>
          {expense.nfs_e_numero && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-3 w-3" />
              <span>NFS-e: {expense.nfs_e_numero}</span>
            </div>
          )}
        </div>
        <Badge variant={getStatusVariant(paymentStatus.status)}>
          {paymentStatus.label}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-foreground">
            {formatCurrency(expense.valor_total)}
          </span>
          {expense.prazo && (
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
              {expense.prazo}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Emitida: {formatDate(expense.data_emitida)}</span>
          </div>
          {paymentStatus.nextPaymentDate && (
            <div className="flex items-center gap-1">
              <CreditCard className="h-3 w-3" />
              <span>Próximo: {formatDate(paymentStatus.nextPaymentDate)}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(expense)}
            className="flex-1"
          >
            <Edit className="h-3 w-3 mr-1" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete?.(expense.id)}
            className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};