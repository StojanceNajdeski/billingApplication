"use client";
import React, { useEffect, useState } from "react";
import { subcategories } from "../components/data/subcategories";
import Error from "next/error";

const ZalihaPijaloci = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [stocks, setStocks] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/stocks");
      const data = await result.json();

      setStocks(data);
      fetchData();
    };
  });

  const handleSave = async () => {
    try {
      const updates = [];

      const allItems = [
        ...subcategories.topliPijaloci,
        ...subcategories.bezalkoholniPijaloci,
        ...subcategories.zestokiPijaloci,
        ...subcategories.piva,
        ...subcategories.rakii,
        ...subcategories.vina,
      ];

      for (const item of allItems) {
        if (stocks[item.id] !== undefined) {
          updates.push({
            id: item.id,
            productName: item.productName,
            quantity: stocks[item.id],
          });
        }
      }

      const res = await fetch("/api/stocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const data = await res.json();
      if (data.success) {
        alert(`✅ Успешно зачувана залиха`);
      }
    } catch (error) {
      console.error("Грешка во зачувување залиха:", error);
    }
    setIsEditing(false);
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
          onClick={handleSave}
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
            <div className="basis-4/5 p-4 text-center border-r-2">
              {item.productName}
            </div>
            <div className="basis-1/5 p-3 flex justify-center items-center">
              {isEditing ? (
                <input
                  type="number"
                  value={stocks[item.id] ?? 0}
                  onChange={(e) =>
                    setStocks((prev) => ({
                      ...prev,
                      [item.id]: Number(e.target.value),
                    }))
                  }
                />
              ) : (
                <p className="text-xl text-center">{stocks[item.id] ?? 0}</p>
              )}
            </div>
          </div>
        ))}
        {subcategories.bezalkoholniPijaloci.map((item: any, index: number) => (
          <div key={index} className="flex border-b items-center">
            <div className="basis-4/5 p-4 text-center border-r-2">
              {item.productName}
            </div>
            <div className="basis-1/5 p-3 flex justify-center items-center">
              {isEditing ? (
                <input
                  type="number"
                  value={stocks[item.id] ?? 0}
                  onChange={(e) =>
                    setStocks((prev) => ({
                      ...prev,
                      [item.id]: Number(e.target.value),
                    }))
                  }
                />
              ) : (
                <p className="text-xl text-center">{stocks[item.id] ?? 0}</p>
              )}
            </div>
          </div>
        ))}
        {subcategories.zestokiPijaloci.map((item: any, index: number) => (
          <div key={index} className="flex border-b items-center">
            <div className="basis-4/5 p-4 text-center border-r-2">
              {item.productName}
            </div>
            <div className="basis-1/5 p-3 flex justify-center items-center">
              {isEditing ? (
                <input
                  type="number"
                  value={stocks[item.id] ?? 0}
                  onChange={(e) =>
                    setStocks((prev) => ({
                      ...prev,
                      [item.id]: Number(e.target.value),
                    }))
                  }
                />
              ) : (
                <p className="text-xl text-center">{stocks[item.id] ?? 0}</p>
              )}
            </div>
          </div>
        ))}
        {subcategories.piva.map((item: any, index: number) => (
          <div key={index} className="flex border-b items-center">
            <div className="basis-4/5 p-4 text-center border-r-2">
              {item.productName}
            </div>
            <div className="basis-1/5 p-3 flex justify-center items-center">
              {isEditing ? (
                <input
                  type="number"
                  value={stocks[item.id] ?? 0}
                  onChange={(e) =>
                    setStocks((prev) => ({
                      ...prev,
                      [item.id]: Number(e.target.value),
                    }))
                  }
                />
              ) : (
                <p className="text-xl text-center">{stocks[item.id] ?? 0}</p>
              )}
            </div>
          </div>
        ))}
        {subcategories.rakii.map((item: any, index: number) => (
          <div key={index} className="flex border-b items-center">
            <div className="basis-4/5 p-4 text-center border-r-2">
              {item.productName}
            </div>
            <div className="basis-1/5 p-3 flex justify-center items-center">
              {isEditing ? (
                <input
                  type="number"
                  value={stocks[item.id] ?? 0}
                  onChange={(e) =>
                    setStocks((prev) => ({
                      ...prev,
                      [item.id]: Number(e.target.value),
                    }))
                  }
                />
              ) : (
                <p className="text-xl text-center">{stocks[item.id] ?? 0}</p>
              )}
            </div>
          </div>
        ))}
        {subcategories.vina.map((item: any, index: number) => (
          <div key={index} className="flex border-b items-center">
            <div className="basis-4/5 p-4 text-center border-r-2">
              {item.productName}
            </div>
            <div className="basis-1/5 p-3 flex justify-center items-center">
              {isEditing ? (
                <input
                  type="number"
                  value={stocks[item.id] ?? 0}
                  onChange={(e) =>
                    setStocks((prev) => ({
                      ...prev,
                      [item.id]: Number(e.target.value),
                    }))
                  }
                />
              ) : (
                <p className="text-xl text-center">{stocks[item.id] ?? 0}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZalihaPijaloci;
