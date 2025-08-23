import { useState } from "react";
import { Expense } from "@/types/expense";
import { mockExpenses } from "@/data/mockExpenses";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);

  const addExpense = (expenseData: Partial<Expense>) => {
    const newExpense: Expense = {
      id: Math.random().toString(36).substr(2, 9),
      empresa: expenseData.empresa || "",
      descricao: expenseData.descricao || "",
      nfs_e_numero: expenseData.nfs_e_numero,
      valor_total: expenseData.valor_total || 0,
      data_emitida: expenseData.data_emitida || new Date(),
      prazo: expenseData.prazo,
      valor_parcela_1: expenseData.valor_parcela_1,
      data_pagamento_1: expenseData.data_pagamento_1,
      valor_parcela_2: expenseData.valor_parcela_2,
      data_pagamento_2: expenseData.data_pagamento_2,
      valor_parcela_3: expenseData.valor_parcela_3,
      data_pagamento_3: expenseData.data_pagamento_3,
      valor_parcela_4: expenseData.valor_parcela_4,
      data_pagamento_4: expenseData.data_pagamento_4,
      mes_referencia: expenseData.mes_referencia || new Date().getMonth() + 1,
      ano_referencia: expenseData.ano_referencia || new Date().getFullYear(),
    };

    setExpenses(prev => [newExpense, ...prev]);
    return newExpense;
  };

  const updateExpense = (id: string, expenseData: Partial<Expense>) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === id ? { ...expense, ...expenseData } : expense
      )
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const getExpenseById = (id: string) => {
    return expenses.find(expense => expense.id === id);
  };

  const getExpensesByMonth = (month: number, year: number) => {
    return expenses.filter(
      expense => 
        expense.mes_referencia === month && 
        expense.ano_referencia === year
    );
  };

  const getTotalByMonth = (month: number, year: number) => {
    return getExpensesByMonth(month, year)
      .reduce((total, expense) => total + expense.valor_total, 0);
  };

  const getTotalByYear = (year: number) => {
    return expenses
      .filter(expense => expense.ano_referencia === year)
      .reduce((total, expense) => total + expense.valor_total, 0);
  };

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
    getExpensesByMonth,
    getTotalByMonth,
    getTotalByYear,
  };
};