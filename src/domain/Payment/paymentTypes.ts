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
  id: string;            
  supplier: string;       
  type: string;          
  created_at: string;    
  dueDate: string;       
  amount: number;       
}
