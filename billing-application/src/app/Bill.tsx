"use client";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons/faSquareXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { BillProps } from "./types";
import { getUsername } from "./utils/user";
import { useRouter } from "next/navigation";

const Bill: React.FC<BillProps> = ({
  billItems,
  onDelete,
  onClearBill,
  onUpdateQuantity,
  waiterNames,
  masaId,
}: BillProps) => {
  const [username, setUsername] = useState<string | null>(null);
  const totalPrice = billItems.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  );
  const [billNumber, setBillNumber] = useState<number>(1);

  const router = useRouter();

  useEffect(() => {
    const lastBill = localStorage.getItem("lastBillNumber");
    if (lastBill) {
      setBillNumber(Number(lastBill) + 1);
    }
    setUsername(getUsername());

    const storedWaiter = localStorage.getItem("loggedUser");
    if (!storedWaiter) {
      router.push("/loginComponent");
    } else {
      const parsedUser = JSON.parse(storedWaiter);
      setUsername(parsedUser.username);
    }
  }, []);

  const date = new Date();
  const currentDate = `${date.getDate().toString().padStart(2, "0")}.${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;
  const currentTime = date.toLocaleTimeString("mk-MK", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  const handlePrintBill = async () => {
    const tableId = masaId;

    const mergeBillData = billItems.reduce((acc: any[], item) => {
      const existing = acc.find((i) => i.productName === item.productName);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);

    try {
      const response = await fetch("/api/bills/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableId: masaId,
          billData: mergeBillData,
          totalAmount: mergeBillData.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          waiterNames,
        }),
      });
    } catch (error) {
      console.error("Настана грешка:", error);
    }
    window.print();
    onClearBill();
  };

  return (
    <div className="bg-white p-6 rounded shadow overflow-auto">
      <h2 className="text-4xl print:hidden font-semibold mb-10 text-center">
        Сметка
      </h2>
      {billItems.length === 0 ? (
        <p>Нема додадени производи</p>
      ) : (
        <ul className="space-y-2">
          <li className="flex print:hidden justify-between w-[95%] mx-auto text-xl font-bold text-center">
            <h2>Производ</h2>
            <h2>Количина</h2>
            <h2 className="justify-end">Цена</h2>
          </li>
          {billItems.map((item, idx) => {
            const quantity = item.quantity ?? 1;
            return (
              <li key={idx}>
                <div className="flex print:hidden justify-between border-b pb-1 text-xl">
                  <div className="w-1/3">
                    <span>{item.productName}</span>
                  </div>
                  <div className="w-1/3 flex justify-center items-center">
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);
                        if (!isNaN(newQuantity)) {
                          onUpdateQuantity(item.uniqueId, newQuantity);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "+") {
                          onUpdateQuantity(item.uniqueId, quantity + 1);
                        } else if (e.key === "-") {
                          onUpdateQuantity(item.uniqueId, quantity - 1);
                        }
                      }}
                      className="text-center w-16"
                    />
                  </div>
                  <div className="w-1/3 flex items-center justify-end">
                    <span className="font-bold">
                      {item.price * quantity} ден
                    </span>
                    <FontAwesomeIcon
                      icon={faSquareXmark}
                      style={{ color: "#fe3434" }}
                      className="ml-1 text-3xl"
                      onClick={() => onDelete(item)}
                    />
                  </div>
                </div>
              </li>
            );
          })}
          <div className="mt-4 print:hidden text-3xl font-bold justify-end flex">
            Вкупно: {totalPrice} ден
          </div>
          <div className="flex print:hidden justify-center">
            <button
              className="bg-red-600 text-white py-2 px-2 rounded-md mt-5 hover:bg-red-800 transition-all duration-300"
              onClick={onClearBill}
            >
              Избриши сметка
            </button>
            <button
              className="bg-green-600 text-white py-2 px-2 ml-4 rounded-md mt-5 hover:bg-green-800 transition-all duration-300"
              onClick={handlePrintBill}
            >
              Печати сметка
            </button>
          </div>
          <div
            id="print-area"
            className="hidden print:block absolute bg-white text-black"
          >
            <h2 className="text-center text-2xl font-bold mb-6">
              Мерак Сметка #{billNumber.toString().padStart(3, "0")}
            </h2>
            <div className="flex justify-between">
              <div>
                <h2>
                  <b>Датум: </b>
                  {currentDate}
                </h2>
                <h2>
                  <b>Време: </b>
                  {currentTime}
                </h2>
              </div>
              <div>
                <h2>Келнер: {username}</h2>
              </div>
            </div>
            <li className="flex justify-between mx-auto font-bold text-center">
              <h2 className="justify-start">Производ</h2>
              <h2 className="justify-center">Количина</h2>
              <h2 className="justify-end">Цена</h2>
            </li>
            <div className="border-b-2 border-black my-2 w-full"></div>
            {billItems.map((item, idx) => {
              const quantity = item.quantity ?? 1;
              return (
                <div>
                  <div key={idx} className="flex justify-between pb-1">
                    <div className="w-1/3">{item.productName}</div>
                    <div className="w-1/3 text-center">{quantity}</div>
                    <div className="w-1/3 text-right font-bold">
                      {item.price * quantity} ден
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="border-b-2 border-black my-2 w-full"></div>
            <div className="mt-4 text-2xl font-bold text-center">
              Вкупно: {totalPrice} ден
            </div>
            <h2 className="text-center mt-10">
              Ви благодариме за посетата, ве чекаме повторно
            </h2>
          </div>
        </ul>
      )}
    </div>
  );
};

export default Bill;
