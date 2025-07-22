"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Categories from "@/app/Categories";
import Bill from "@/app/Bill";
import { MasaPageProps, Product } from "@/app/types";

const MasaPage: React.FC<MasaPageProps> = ({ params, item }) => {
  const { id } = params;
  const [billItems, setBillItems] = useState<Product[]>([]);

  const handleAddToBill = (item: Omit<Product, "uniqueId">) => {
    const itemWithId: Product = { ...item, uniqueId: uuidv4() };
    setBillItems((prev) => [...prev, itemWithId]);
  };

  const handleDelete = (itemToDelete: Product) => {
    setBillItems((prev) =>
      prev.filter((item) => item.uniqueId !== itemToDelete.uniqueId)
    );
  };

  return (
    <div>
      <div className="flex min-h-screen">
        <div className="bg-white/50 w-1/5 shadow-md basis-1/6 text-center p-10 inline-block rounded-xl overflow-auto">
          <div className="relative mb-5">
            <input
              type="text"
              placeholder="Пребарај..."
              className="border w-full p-2 rounded-md"
            />
            <button className="bg-white mt-1 border-r hover:bg-blue-300 duration-300 text-xl right-0 top-0 bottom-1 py-1 px-4 absolute">
              Барај
            </button>
          </div>
          <Categories onAddToBill={handleAddToBill} />
        </div>

        <h2 className="text-4xl mt-20">{`Маса ${id}`}</h2>
        <Bill billItems={billItems} item={item} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default MasaPage;
