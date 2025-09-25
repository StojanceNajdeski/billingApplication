"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Calculator from "../Calculator";

const MainComponent = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    const currentWaiter = localStorage.getItem("loggedUser");
    if (!currentWaiter) {
      router.push("/loginComponent");
    } else {
      setUsername(JSON.parse(currentWaiter).username);
    }
  }, [router]);

  const tables = [
    { id: 1, status: "празна" },
    { id: 2, status: "празна" },
    { id: 3, status: "празна" },
    { id: 4, status: "празна" },
    { id: 5, status: "празна" },
    { id: 6, status: "празна" },
    { id: 7, status: "празна" },
    { id: 8, status: "празна" },
    { id: 9, status: "празна" },
    { id: 10, status: "празна" },
    { id: 11, status: "празна" },
    { id: 12, status: "празна" },
    { id: 13, status: "празна" },
    { id: 14, status: "празна" },
    { id: 15, status: "празна" },
    { id: 16, status: "празна" },
    { id: 17, status: "празна" },
    { id: 18, status: "празна" },
    { id: 19, status: "празна" },
    { id: 20, status: "празна" },
    { id: 21, status: "празна" },
    { id: 22, status: "празна" },
    { id: 23, status: "празна" },
    { id: 24, status: "празна" },
    { id: 25, status: "празна" },
    { id: 26, status: "празна" },
    { id: 27, status: "празна" },
    { id: 28, status: "празна" },
    { id: 29, status: "празна" },
    { id: 30, status: "празна" },
  ];

  const currentWaiter =
    typeof window !== "undefined" ? localStorage.getItem("loggedUser") : null;

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    router.push("/loginComponent");
  };

  useEffect(() => {
    const user = localStorage.getItem("loggedUser");
    if (!user) {
      router.push("/loginComponent");
    } else {
      setUser(JSON.parse(user));
    }
  }, []);

  if (!currentWaiter) {
    return null;
  }

  const storedTables = localStorage.getItem("dodadenoJadenje");
  return (
    <div className="w-[95%] mx-auto">
      <div className="list-none mt-12 mb-15 text-2xl gap-5">
        <h2 className="text-4xl mb-8">
          <b>Келнер: </b>
          {username}
        </h2>
        <div className="flex p-4 overflow-auto">
          <div className="grid basis-full cursor-pointer sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-7">
            {tables.map((table) => {
              const isFull =
                typeof window !== "undefined" &&
                localStorage.getItem(`dodadenoJadenje_${table.id}`);

              return (
                <div
                  key={table.id}
                  onClick={() => router.push(`/masa/${table.id}`)}
                  className="transition-transform duration-300 hover:scale-95 bg-gray-700/80 text-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center h-40"
                >
                  <h2 className="text-2xl font-bold mb-2">Маса {table.id}</h2>
                  <p
                    className={`text-2xl ${
                      isFull ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {isFull ? "зафатена" : "празна"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
