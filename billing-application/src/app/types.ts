export interface MasaPageProps {
  params: { id: string };
  item: Product;
}

export interface Product {
  productName: string;
  price: number;
  uniqueId: string;
}

export interface BillItem {
  productName: string;
  price: number;
  uniqueId: string;
}

export interface BillProps {
  billItems: BillItem[];
  item: Product;
  onDelete: (item: Product) => void;
}
