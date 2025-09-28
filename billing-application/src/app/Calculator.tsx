"use client";
import React, { useState } from "react";
import { CalculatorProps } from "./types";

const Calculator: React.FC<CalculatorProps> = ({ isOpen, setIsOpen }) => {
  const [givedMoney, setGivedMoney] = useState<string>("");
  const [billValue, setBillValue] = useState<string>("");

  if (!isOpen) return null;

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-8 rounded-2xl shadow-2xl relative">
            <h2 className="text-center text-5xl pt-6">Калкулатор</h2>
            <p
              className="absolute right-3 top-3 bg-red-500 text-3xl text-white px-4 pb-2 pt-1 rounded-4xl"
              onClick={() => {
                setIsOpen(false);
                setBillValue("");
                setGivedMoney("");
              }}
            >
              x
            </p>
            <div className="flex p-6">
              <div className="mr-5">
                <label htmlFor="text" className="text-3xl">
                  Дадени пари
                </label>
                <br />
                <input
                  type="number"
                  className="border rounded-lg text-4xl"
                  value={givedMoney}
                  onChange={(e) => {
                    setGivedMoney(e.target.value);
                  }}
                />
              </div>
              <div className="mr-5">
                <label htmlFor="text" className="text-3xl">
                  Износ на сметка
                </label>
                <br />
                <input
                  type="number"
                  className="border rounded-lg text-4xl"
                  value={billValue}
                  onChange={(e) => {
                    setBillValue(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="text" className="text-3xl">
                  Вкупно
                </label>
                <br />
                <input
                  type="number"
                  className="border rounded-lg text-4xl"
                  disabled
                  value={Number(givedMoney) - Number(billValue)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
