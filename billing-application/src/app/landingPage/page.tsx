"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calculator from "../Calculator";

const LandingPage = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentWaiter, setCurrentWaiter] = useState(null);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleString("en-GB");
      setTime(now);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleF2 = () => {
    router.push("/mainComponent");
  };
  const handleF4 = () => {
    setIsOpen(true);
  };
  const handleF9 = () => {
    router.push("/kontrolenIzvestaj");
  };
  const handleF10 = () => {
    router.push("/dnevenPromet");
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F2") handleF2();
      if (e.key === "F4") handleF4();
      if (e.key === "F9") handleF9();
      if (e.key === "F10") handleF10();
      if (e.key === "Escape") {
        router.back();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedUser = localStorage.getItem("loggedUser");

      if (loggedUser) {
        try {
          const parsedUser = JSON.parse(loggedUser);

          if (parsedUser && parsedUser.username) {
            setUsername(parsedUser.username);
          }
        } catch (error) {
          console.error("Грешка при парсирање на JSON:", error);
          localStorage.removeItem("loggedUser");
        }
      }
    }
  }, []);

  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen space-x-0 relative">
      <div>
        <div className="flex absolute top-5 left-5 text-7xl robotoFlex">
          <p>{time}</p>
        </div>
        <div className="flex absolute top-5 right-5 text-7xl robotoFlex">
          <p>Кичево</p>
        </div>
        <p className="text-center text-5xl mb-8">
          <b>Келнер: </b>
          {username}
        </p>
        <h2 className="text-9xl text-center robotoFlex tracking-widest">
          Restoran
        </h2>
        <h2 className="text-9xl text-blue-600 text-center rubikFont tracking-widest">
          MERAK
        </h2>
        <div className="flex justify-center items-center">
          {username ? (
            <div>
              <div className="w-[98%] mx-auto absolute bottom-10 left-1/2 transform -translate-x-1/2 flex">
                <button
                  onClick={handleF2}
                  className="bg-blue-500 text-white text-3xl w-full mr-5 px-8 rounded-2xl mt-7 hover:bg-blue-600 transition-all duration-400"
                >
                  (F2) Маси
                </button>
                <button
                  className="bg-blue-500 text-white text-3xl w-full mr-5 px-8 rounded-2xl mt-7 hover:bg-blue-600 transition-all duration-400"
                  onClick={handleF4}
                >
                  (F4) Калкулатор
                </button>
                <button
                  onClick={handleF9}
                  className="bg-blue-500 text-white text-3xl w-full mr-5 px-8 rounded-2xl mt-7 hover:bg-blue-600 transition-all duration-400"
                >
                  (F9) Контролен извештај
                </button>
                <button
                  onClick={handleF10}
                  className="bg-blue-500 text-white text-3xl w-full mr-5 px-8 rounded-2xl mt-7 hover:bg-blue-600 transition-all duration-400"
                >
                  (F10) Дневен извештај
                </button>
                <button
                  className="bg-red-600 text-white text-3xl w-full px-8 py-3 rounded-2xl mt-7 hover:bg-red-800 transition-all duration-400"
                  onClick={() => {
                    localStorage.removeItem("loggedUser");
                    router.push("/loginComponent");
                  }}
                >
                  Одјави се
                </button>
              </div>
              <div>
                <Link href={"/zalihaPijaloci"}>
                  <button className="bg-blue-500 text-white text-3xl w-full mr-5 px-10 py-4 rounded-2xl mt-7 hover:bg-blue-600 transition-all duration-400">
                    Залиха пијалоци
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <Link href={"/loginComponent"}>
              <button className="bg-red-600 text-white text-4xl px-8 py-4 rounded-2xl mt-7 hover:bg-red-800 transition-all duration-400">
                Најави се
              </button>
            </Link>
          )}
        </div>
        <Calculator isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default LandingPage;
