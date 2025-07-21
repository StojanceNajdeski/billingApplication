"use client";
import React, { useRef, useState } from "react";
import { subcategories } from "./components/data/subcategories";

const foodCategories = [
  { name: "Топли Пијалоци", key: "topliPijaloci" },
  { name: "Безалкохолни Пијалоци", key: "bezalkoholniPijaloci" },
  { name: "Апетисани", key: "apetisani" },
  { name: "Вина", key: "vina" },
  { name: "Ракии", key: "rakii" },
  { name: "Жестотки Пијалоци", key: "zestokiPijaloci" },
  { name: "Пива", key: "piva" },
  { name: "Салати", key: "salati" },
  { name: "Печење", key: "pecenje" },
  { name: "Ладни Предјадења", key: "ladniPredjadenja" },
  { name: "Топли Предјадења", key: "topliPredjadenja" },
  { name: "Пилешка Скара", key: "pileskaSkara" },
  { name: "Телешка Скара", key: "teleskaSkara" },
  { name: "Свинска Скара", key: "svinskaSkara" },
  { name: "Мешана Скара", key: "mesanaSkara" },
  { name: "Рибни Специјалитети", key: "ribniSpecijaliteti" },
  { name: "Пици", key: "pici" },
  { name: "Десерти", key: "deserti" },
  { name: "Бургери", key: "burgeri" },
];

interface Product {
  productName: string;
  price: number;
}

interface CategoriesProps {
  onAddToBill: (item: Product) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onAddToBill }) => {
  const [openedCategory, setOpenedCategory] = useState<string | null>(null);

  const toggleCategory = (key: string) => {
    if (openedCategory === key) {
      setOpenedCategory(null);
    } else {
      setOpenedCategory(key);
    }
  };
  return (
    <div>
      <ul className="space-y-2 text-left">
        {foodCategories.map((cat) => (
          <li key={cat.key} className="mb-2">
            <div
              onClick={() => toggleCategory(cat.key)}
              className={`cursor-pointer bg-white p-4 rounded-xl shadow-md hover:bg-blue-300 transition flex justify-between items-center ${
                openedCategory === cat.key ? "bg-blue-200" : ""
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-xl select-none">
                {openedCategory === cat.key ? "▲" : "▼"}
              </span>
            </div>
            {openedCategory === cat.key && (
              <ul className="mt-2 ml-4 space-y-3">
                {((subcategories as any)[cat.key] || []).map(
                  (item: any, index: number) => {
                    return (
                      <li
                        key={index}
                        onClick={() => onAddToBill(item)}
                        className="p-3 bg-emerald-200 rounded hover:bg-blue-300 duration-300"
                      >
                        <div className="flex justify-between cursor-pointer">
                          <span>{item.productName}</span>
                          <span className="text-blue-500 font-bold">
                            {item.price} ден
                          </span>
                        </div>
                      </li>
                    );
                  }
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
