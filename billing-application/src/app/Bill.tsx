import React from "react";

interface BillItem {
  productName: string;
  price: number;
}

interface BillProps {
  billItems: BillItem[];
}

const Bill: React.FC<BillProps> = ({ billItems }) => {
  return (
    <div className="flex-1 bg-white p-6 rounded shadow max-h-[80vh] overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Сметка</h2>
      {billItems.length === 0 ? (
        <p>Нема додадени производи</p>
      ) : (
        <ul className="space-y-2">
          {billItems.map((item, idx) => (
            <li key={idx} className="flex justify-between border-b pb-1">
              <span>{item.productName}</span>
              <span className="font-bold">{item.price} ден</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bill;
