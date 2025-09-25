"use client";
import React, { useState } from "react";
import { subcategories } from "../components/data/subcategories";

const ZalihaPijaloci = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [stocks, setStocks] = useState<{ [key: number]: string }>({});

  const handleChange = (index: number, value: string) => {
    setStocks((prev) => ({
      ...prev,
      [index]: value,
    }));
  };
  return (
    <div>
      <button
        className="bg-red-400 font-bold hover:bg-red-600 translation duration-300 rounded-xl text-white text-2xl px-6 py-2 top-10 absolute left-50"
        onClick={() => {
          setIsEditing(true);
        }}
      >
        Промени залиха
      </button>
      {isEditing ? (
        <button
          className="bg-green-400 font-bold hover:bg-green-600 translation duration-300 rounded-xl text-white text-2xl px-6 py-2 top-30 absolute left-50"
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Зачувај залиха
        </button>
      ) : (
        <div></div>
      )}
      <div className="w-[40%] mx-auto bg-white border">
        <div className="flex bg-gray-300 border-b font-bold">
          <div className="basis-4/5 p-2 text-center border-r-2">Производ</div>
          <div className="basis-1/5 p-2 text-center">Залиха</div>
        </div>
        {subcategories.topliPijaloci.map((item: any, index: number) => (
          <div key={index} className="flex border-b items-center">
            <div className="basis-4/5 p-2 text-center border-r-2">
              {item.productName}
            </div>
            {isEditing ? (
              <div className="basis-1/5 p-2 flex justify-center">
                <input
                  type="text"
                  className="border w-16 text-center"
                  value={stocks[index] || ""}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </div>
            ) : (
              <div className="flex justify-center">
                <p>{stocks[index] || ""}</p>
              </div>
            )}
          </div>
        ))}
        {subcategories.bezalkoholniPijaloci.map((item: any, index: number) => (
          <div key={index} className="flex border-b items-center">
            <div className="basis-4/5 p-2 text-center border-r-2">
              {item.productName}
            </div>
            {isEditing ? (
              <div className="basis-1/5 p-2 flex justify-center">
                <input type="text" className="border w-16 text-center" />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
        {subcategories.zestokiPijaloci.map((item: any, index: number) => (
          <div key={index} className="flex border-b items-center">
            <div className="basis-4/5 p-2 text-center border-r-2">
              {item.productName}
            </div>
            {isEditing ? (
              <div className="basis-1/5 p-2 flex justify-center">
                <input type="text" className="border w-16 text-center" />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
        {subcategories.piva.map((item: any, index: number) => (
          <div key={index} className="flex border-b items-center">
            <div className="basis-4/5 p-2 text-center border-r-2">
              {item.productName}
            </div>
            {isEditing ? (
              <div className="basis-1/5 p-2 flex justify-center">
                <input type="text" className="border w-16 text-center" />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
        {subcategories.rakii.map((item: any, index: number) => (
          <div key={index} className="flex border-b items-center">
            <div className="basis-4/5 p-2 text-center border-r-2">
              {item.productName}
            </div>
            {isEditing ? (
              <div className="basis-1/5 p-2 flex justify-center">
                <input type="text" className="border w-16 text-center" />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
        {subcategories.vina.map((item: any, index: number) => (
          <div key={index} className="flex border-b items-center">
            <div className="basis-4/5 p-2 text-center border-r-2">
              {item.productName}
            </div>
            {isEditing ? (
              <div className="basis-1/5 p-2 flex justify-center">
                <input type="text" className="border w-16 text-center" />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZalihaPijaloci;
