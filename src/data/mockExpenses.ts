import { Expense, MonthlyTotal } from "@/types/expense";

export const mockExpenses: Expense[] = [
  {
    id: "1",
    empresa: "Belton Pneumático",
    descricao: "Kit Reparo Cilindro",
    nfs_e_numero: "55742",
    valor_total: 236.10,
    data_emitida: new Date(2024, 11, 16), // December 16, 2024
    prazo: "À vista",
    valor_parcela_1: 236.10,
    data_pagamento_1: new Date(2024, 11, 16),
    mes_referencia: 1,
    ano_referencia: 2024,
  },
  {
    id: "2",
    empresa: "R Clemente",
    descricao: "Eixo Engordurador",
    nfs_e_numero: "208",
    valor_total: 25000.00,
    data_emitida: new Date(2024, 0, 10), // January 10, 2024
    prazo: "7 - 28 - 56 DDL",
    valor_parcela_1: 8333.33,
    data_pagamento_1: new Date(2024, 0, 28),
    valor_parcela_2: 8333.33,
    data_pagamento_2: new Date(2024, 1, 7),
    valor_parcela_3: 8333.34,
    data_pagamento_3: new Date(2024, 2, 7),
    mes_referencia: 1,
    ano_referencia: 2024,
  },
  {
    id: "3",
    empresa: "Hidráulica São Paulo",
    descricao: "Mangueira Alta Pressão",
    nfs_e_numero: "1024",
    valor_total: 1450.00,
    data_emitida: new Date(2024, 1, 15),
    prazo: "30 DDL",
    valor_parcela_1: 1450.00,
    data_pagamento_1: new Date(2024, 2, 15),
    mes_referencia: 2,
    ano_referencia: 2024,
  },
];

export const monthlyTotals: MonthlyTotal[] = [
  { month: 1, monthName: "Janeiro", total: 9322.49, expenseCount: 3 },
  { month: 2, monthName: "Fevereiro", total: 23505.52, expenseCount: 5 },
  { month: 3, monthName: "Março", total: 23000.75, expenseCount: 4 },
  { month: 4, monthName: "Abril", total: 7500.00, expenseCount: 2 },
  { month: 5, monthName: "Maio", total: 0.00, expenseCount: 0 },
  { month: 6, monthName: "Junho", total: 0.00, expenseCount: 0 },
  { month: 7, monthName: "Julho", total: 0.00, expenseCount: 0 },
  { month: 8, monthName: "Agosto", total: 0.00, expenseCount: 0 },
  { month: 9, monthName: "Setembro", total: 0.00, expenseCount: 0 },
  { month: 10, monthName: "Outubro", total: 0.00, expenseCount: 0 },
  { month: 11, monthName: "Novembro", total: 0.00, expenseCount: 0 },
  { month: 12, monthName: "Dezembro", total: 0.00, expenseCount: 0 },
];

export const getTotalYear = () => monthlyTotals.reduce((acc, month) => acc + month.total, 0);