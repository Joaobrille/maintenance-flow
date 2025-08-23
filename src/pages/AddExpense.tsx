import { ExpenseForm } from "@/components/ExpenseForm";
import { useExpenseContext } from "@/context/ExpenseContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AddExpense = () => {
  const { addExpense } = useExpenseContext();
  const navigate = useNavigate();

  const handleSave = (expenseData: any) => {
    addExpense(expenseData);
    toast({
      title: "Gasto adicionado com sucesso!",
      description: `O gasto de ${expenseData.empresa} foi registrado.`,
    });
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <ExpenseForm 
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default AddExpense;