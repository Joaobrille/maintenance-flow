import React, { createContext, useContext, useState } from 'react';
import { Expense, MonthlyTotal } from '@/types/expense';
import { mockExpenses } from '@/data/mockExpenses';

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Partial<Expense>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  getExpenseById: (id: string) => Expense | undefined;
  getMonthlyTotals: () => MonthlyTotal[];
  getTotalYear: () => number;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const getMonthlyTotals = (): MonthlyTotal[] => {
    const monthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    return monthNames.map((monthName, index) => {
      const month = index + 1;
      const monthExpenses = expenses.filter(expense => expense.mes_referencia === month);
      const total = monthExpenses.reduce((sum, expense) => sum + expense.valor_total, 0);
      
      return {
        month,
        monthName,
        total,
        expenseCount: monthExpenses.length
      };
    });
  };

  const getTotalYear = () => {
    return expenses.reduce((total, expense) => total + expense.valor_total, 0);
  };

  const value = {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
    getMonthlyTotals,
    getTotalYear,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};