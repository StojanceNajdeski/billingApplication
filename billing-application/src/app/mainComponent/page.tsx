"use client";

import { useRouter } from "next/navigation";
import React from "react";

const MainComponent = () => {
  const router = useRouter();

  const tables = [
    { id: 1, status: "празна" },
    { id: 2, status: "празна" },
    { id: 3, status: "празна" },
    { id: 4, status: "празна" },
    { id: 5, status: "зафатена" },
    { id: 6, status: "празна" },
    { id: 7, status: "празна" },
    { id: 8, status: "празна" },
    { id: 9, status: "празна" },
    { id: 10, status: "празна" },
  ];
  return (
    <div className="w-[90%] mx-auto">
      <div className="flex list-none mt-15 mb-20 text-2xl gap-5">
        <div className="flex-1 p-4 overflow-auto">
          <div className="grid cursor-pointer sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {tables.map((table) => (
              <div
                key={table.id}
                onClick={() => router.push(`/masa/${table.id}`)}
                className="transition-transform duration-300 hover:scale-95 bg-gray-700/80 text-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center h-40"
              >
                <h2 className="text-xl font-bold mb-2">Маса {table.id}</h2>
                <p
                  className={`text-lg ${
                    table.status === "празна"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {table.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
