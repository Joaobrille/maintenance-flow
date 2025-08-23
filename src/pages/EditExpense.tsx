import { ExpenseForm } from "@/components/ExpenseForm";
import { useExpenseContext } from "@/context/ExpenseContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Expense } from "@/types/expense";

const EditExpense = () => {
  const { updateExpense, getExpenseById } = useExpenseContext();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [expense, setExpense] = useState<Expense | undefined>();

  useEffect(() => {
    if (id) {
      const foundExpense = getExpenseById(id);
      if (foundExpense) {
        setExpense(foundExpense);
      } else {
        toast({
          title: "Gasto não encontrado",
          description: "O gasto que você está tentando editar não foi encontrado.",
          variant: "destructive",
        });
        navigate("/");
      }
    }
  }, [id, getExpenseById, navigate]);

  const handleSave = (expenseData: any) => {
    if (id) {
      updateExpense(id, expenseData);
      toast({
        title: "Gasto atualizado com sucesso!",
        description: `As alterações foram salvas.`,
      });
      navigate("/");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (!expense) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">Carregando...</h2>
        </div>
      </div>
    );
  }

  return (
    <ExpenseForm 
      expense={expense}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default EditExpense;