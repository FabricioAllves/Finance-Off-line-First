export interface Payment {
  id?: number; 
  supplier: string; 
  type: string;
  paymentMethod: string; 
  dueDate: string | null;
  amount: number; 
  created_at?: string;
  isSynced?: number;
  isDeleted?: number;
  idWeb?: number
}

export interface PaymentAPI {
  id: string;             // ID único do pagamento ou conta
  supplier: string;       // Nome do fornecedor, ex: "BMB OFFICE CONSULTORIA"
  type: string;           // Tipo de conta, ex: "CONTAS A PAGAR"
  created_at: string;     // '2023-07-11T13:05:55.318+10:00';
  dueDate: string;        // Data de vencimento no formato ISO ou string, ex: "2024-09-30"
  amount: number;         // Valor do pagamento, ex: 1360.00
}
