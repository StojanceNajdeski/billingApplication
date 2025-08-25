"use client";
import React, { use, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Categories from "@/app/Categories";
import Bill from "@/app/Bill";
import { BillItem, MasaPageProps, Product } from "@/app/types";
import { useRouter } from "next/navigation";
import { subcategories } from "@/app/components/data/subcategories";

const MasaPage: React.FC<MasaPageProps> = ({ params, item, onAddToBill }) => {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [loggedInWaiter, setLoggedInWaiter] = useState<string>();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      onAddToBill({
        ...results[activeIndex],
        uniqueId: crypto.randomUUID(),
        quantity: 1,
      });
      setQuery("");
      setActiveIndex(-1);
    }
  };

  const mkToLatin = (char: string) => {
    const map: Record<string, string> = {
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      ѓ: "gj",
      е: "e",
      ж: "zh",
      з: "z",
      ѕ: "dz",
      и: "i",
      ј: "j",
      к: "k",
      л: "l",
      љ: "lj",
      м: "m",
      н: "n",
      њ: "nj",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      ќ: "kj",
      у: "u",
      ф: "f",
      х: "h",
      ц: "c",
      ч: "ch",
      џ: "dj",
      ш: "sh",
      А: "a",
      Б: "b",
      В: "v",
      Г: "g",
      Д: "d",
      Ѓ: "gj",
      Е: "e",
      Ж: "zh",
      З: "z",
      Ѕ: "dz",
      И: "i",
      Ј: "j",
      К: "k",
      Л: "l",
      Љ: "lj",
      М: "m",
      Н: "n",
      Њ: "nj",
      О: "o",
      П: "p",
      Р: "r",
      С: "s",
      Т: "t",
      Ќ: "kj",
      У: "u",
      Ф: "f",
      Х: "h",
      Ц: "c",
      Ч: "ch",
      Џ: "dj",
      Ш: "sh",
    };
    return map[char] || char;
  };

  const results = Object.values(subcategories)
    .flat()
    .filter((item) => {
      const normalize = (str: string) =>
        str
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[а-яА-Я]/g, (char) => mkToLatin(char));

      return normalize(item.productName).includes(normalize(query));
    });

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem(`dodadenoJadenje_${id}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setBillItems(parsed);
        else setBillItems([]);
      } catch {
        setBillItems([]);
      }
    }

    const storedWaiter = localStorage.getItem("loggedInWaiter");
    if (!storedWaiter) {
      router.push("/loginComponent");
    } else {
      setLoggedInWaiter(storedWaiter);
    }
  }, []);

  const handleClearBill = () => {
    setBillItems([]);
    localStorage.removeItem(`dodadenoJadenje_${id}`);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setBillItems((prev) =>
      prev.map((item) =>
        item.uniqueId === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleAddToBill = (item: Omit<Product, "uniqueId" | "quantity">) => {
    const itemWithId: Product = { ...item, uniqueId: uuidv4(), quantity: 1 };
    setBillItems((prev) => {
      const updatedBill = [...prev, itemWithId];

      localStorage.setItem(
        `dodadenoJadenje_${id}`,
        JSON.stringify(updatedBill)
      );
      return updatedBill;
    });
  };

  const handleDelete = (itemToDelete: Product) => {
    setBillItems((prev) =>
      prev.filter((item) => item.uniqueId !== itemToDelete.uniqueId)
    );
  };

  return (
    <div>
      <div className="flex min-h-screen">
        <div className="bg-white/50  shadow-md  text-center p-10 rounded-xl overflow-auto">
          <div className="relative mb-5">
            <input
              type="text"
              placeholder="Пребарај..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              className="border w-full p-2 rounded-md"
            />
            <button className="bg-white mt-1 border-r hover:bg-blue-300 duration-300 text-xl right-0 top-0 bottom-1 py-1 px-4 absolute">
              Барај
            </button>
          </div>
          {query && results.length > 0 && (
            <ul className="w-full z-50 rounded max-h-60 ml-2 overflow-y-auto mb-3">
              {results.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    handleAddToBill(item);
                    setQuery("");
                    setActiveIndex(-1);
                  }}
                  className={`p-3 mb-1 cursor-pointer ${
                    idx === activeIndex
                      ? "bg-blue-300"
                      : "bg-emerald-200 hover:bg-blue-300"
                  }`}
                >
                  <div className="flex justify-between">
                    <span>{item.productName}</span>
                    <span className="text-blue-500 font-bold">
                      {item.price} ден
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {query && results.length === 0 && (
            <p className="bg-white border rounded w-full p-3 mb-3">
              Нема резултати
            </p>
          )}
          <Categories onAddToBill={handleAddToBill} />
        </div>
        <div className="w-[80%] mt-20 px-4">
          <h2 className="text-4xl font-semibold text-center">{`Маса ${id}`}</h2>
          <div className="mt-10">
            <Bill
              billItems={billItems}
              item={item}
              onDelete={handleDelete}
              onClearBill={handleClearBill}
              onUpdateQuantity={handleUpdateQuantity}
              waiterNames={loggedInWaiter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasaPage;
