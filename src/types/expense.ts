export interface Expense {
  id: string;
  empresa: string;
  descricao: string;
  nfs_e_numero?: string;
  valor_total: number;
  data_emitida: Date;
  prazo?: string;
  
  // Campos para controle de pagamentos parcelados (até 4 parcelas)
  valor_parcela_1?: number;
  data_pagamento_1?: Date;
  valor_parcela_2?: number;
  data_pagamento_2?: Date;
  valor_parcela_3?: number;
  data_pagamento_3?: Date;
  valor_parcela_4?: number;
  data_pagamento_4?: Date;
  
  mes_referencia: number;
  ano_referencia: number;
}

export interface MonthlyTotal {
  month: number;
  monthName: string;
  total: number;
  expenseCount: number;
}

export interface PaymentStatus {
  status: 'paid' | 'pending' | 'overdue';
  label: string;
  nextPaymentDate?: Date;
  remainingAmount?: number;
}