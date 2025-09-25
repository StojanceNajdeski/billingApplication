export interface MasaPageProps {
  params: Promise<{ id: string }>;
  onAddToBill: (item: Product) => void;
  item: Product;
}

export interface Product {
  productName: string;
  price: number;
  uniqueId: string;
  quantity: number;
}

export interface BillItem {
  productName: string;
  price: number;
  uniqueId: string;
  quantity: number;
}

export interface BillsView {
  id: number;
  table_id: number;
  bill_data: any[];
  total_amount: number;
  waiter_username: string | null;
  created_at: string;
}

export interface BillProps {
  billItems: BillItem[];
  item: Product;
  masaId: string;
  waiterNames: string | null;
  onClearBill: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onDelete: (item: Product) => void;
}

export interface CalculatorProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export interface CategoriesProps {
  onAddToBill: (item: Product) => void;
}
