"use client";
import React, { useEffect, useState } from "react";
import { BillProps, Product } from "../types";

const KontrolenIzvestaj: React.FC = () => {
  const [soldItems, setSoldItems] = useState<Product[]>([]);
  const handleDailyReport = () => {
    window.print();
    localStorage.removeItem("lastBillNumber");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("soldItemsCheck") || "[]");
    setSoldItems(data);
  }, []);

  const groupedItems = soldItems.reduce<
    Record<string, { price: number; quantity: number }>
  >((acc, item) => {
    if (!acc[item.productName]) {
      acc[item.productName] = { price: item.price, quantity: 1 };
    } else {
      acc[item.productName].quantity += 1;
    }
    return acc;
  }, {});

  const totalPrice = soldItems.reduce(
    (sum, item) => sum + (item.price ?? 1),
    0
  );

  return (
    <div>
      <div className="flex justify-center">
        <button
          onClick={handleDailyReport}
          className="bg-green-600 text-white py-2 hover:bg-green-800 duration-300 px-6 rounded-xl mb-8 mt-8 text-2xl"
        >
          Печати извештај
        </button>
        <br />
      </div>
      <div className="block print:hidden">
        <div className="flex justify-center ">
          <table className="w-3/6 text-center border bg-white border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Производ</th>
                <th className="border p-2">Количина</th>
                <th className="border p-2">Цена</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedItems).map(
                ([productName, data], index) => (
                  <tr key={index}>
                    <td className="border p-2 text-left">{productName}</td>
                    <td className="border p-2">{data.quantity}</td>
                    <td className="border p-2">{data.price * data.quantity}</td>
                  </tr>
                )
              )}
              <tr>
                <td className="text-left border text-2xl">Вкупно</td>
                <td className="border text-2xl" colSpan={2}>
                  {totalPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="hidden print:block" id="dneven-izvestaj">
        <div className="flex justify-center">
          <div className="w-3/6 bg-white border-collapse">
            <div className="grid grid-cols-3 gap-2 p-2 font-bold text-center border-b border-black">
              <p>Производ</p>
              <p>Количина</p>
              <p>Цена</p>
            </div>
            {Object.entries(groupedItems).map(([productName, data], index) => (
              <div key={index} className="grid grid-cols-3 gap-2 p-2 border-b">
                <p className="text-left">{productName}</p>
                <p className="text-center">{data.quantity}</p>
                <p className="text-right">{data.price * data.quantity}</p>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-2 p-2 mt-2 text-2xl font-bold">
              <p className="col-span-2 text-left">Вкупно</p>
              <p className="text-right">{totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KontrolenIzvestaj;
