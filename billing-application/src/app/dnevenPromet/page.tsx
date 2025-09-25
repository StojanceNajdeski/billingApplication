"use client";
import React, { useEffect, useState } from "react";
import { BillsView } from "../types";

const DnevenPromet: React.FC = () => {
  const [bills, setBills] = useState<BillsView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const handleDailyReport = () => {
    const today = new Date().toLocaleDateString("mk-MK");

    const lastReportDate = localStorage.getItem("lastReportDate");

    if (lastReportDate === today) {
      alert("Дневниот извештај веќе е изваден за денес.");
    } else {
      window.print();
    }
    localStorage.removeItem("soldItems");
    localStorage.removeItem("lastBillNumber");
    localStorage.setItem("lastReportDate", today);
  };
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await fetch("/api/bills/all");
        if (!response.ok) {
          throw new Error("Грешка при вчитување на податоците.");
        }
        const data = await response.json();
        console.log("Податоци добиени од API:", data);
        setBills(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Настана непозната грешка. ");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

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
        <div className="flex justify-center">
          <table className="w-3/6 text-center border bg-white border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Производ</th>
                <th className="border p-2">Количина</th>
                <th className="border p-2">Цена</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) =>
                bill.bill_data.map((item: any) => (
                  <tr key={item.uniqueId}>
                    <td className="border p-2">{item.productName}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">{item.price}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="hidden print:block" id="dneven-izvestaj">
          <div className="flex justify-center">
            <div className="w-3/6 bg-white border-collapse">
              <div className="grid grid-cols-3 gap-2 p-2 font-bold text-center border-b border-black">
                <p>Производ</p>
                <p>Количина</p>
                <p>Цена</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DnevenPromet;
