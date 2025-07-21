"use client";
import React, { useState } from "react";
import { subcategories } from "@/app/components/data/subcategories";
import Categories from "@/app/Categories";
import Bill from "@/app/Bill";

interface MasaPageProps {
  params: { id: string };
}

interface Product {
  productName: string;
  price: number;
}

const MasaPage: React.FC<MasaPageProps> = ({ params }) => {
  const { id } = params;
  const [billItems, setBillItems] = useState<Product[]>([]);

  const handleAddToBill = (item: Product) => {
    setBillItems((prev) => [...prev, item]);
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
        <Bill billItems={billItems} />
      </div>
    </div>
  );
};

export default MasaPage;
