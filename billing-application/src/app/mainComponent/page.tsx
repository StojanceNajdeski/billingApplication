import React from "react";

const MainComponent = () => {
  return (
    <div className="w-[90%] mx-auto">
      <div className="flex list-none mt-15 mb-20 text-2xl gap-5">
        <div className="bg-white/50 w-1/5 shadow-md basis-1/6 text-center p-10 inline-block cursor-pointer rounded-xl">
          <ul className="space-y-3">
            <li className="relative group mb-3 cursor-pointer">
              <div className="bg-white rounded-xl p-4 hover:bg-blue-300 duration-300">
                Топли Пијалоци
              </div>
              {/* Dropdown content - појавува се кога hover-аш */}
              <ul className="absolute left-0 mt-1 hidden group-hover:block bg-white rounded shadow-md w-full z-10">
                <li className="p-2 hover:bg-blue-200">Кафе</li>
                <li className="p-2 hover:bg-blue-200">Чај</li>
                <li className="p-2 hover:bg-blue-200">Грејано Вино</li>
              </ul>
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Безалкохолни Пијалоци
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Апетисани
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Вина
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Ракии
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Жестоки Пијалоци
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Пива
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Салати
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Печење
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Ладни Предјадења
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Топли Предјадења
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Пилешка Скара
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Телешка Скара
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Свинска Скара
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Мешана Скара
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Рибни Специјалитети
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Пици
            </li>
            <li className="bg-white rounded-xl mb-5 p-4 hover:bg-blue-300 duration-300">
              Десерти
            </li>
            <li className="bg-white rounded-xl p-4 hover:bg-blue-300 duration-300">
              Бургери
            </li>
          </ul>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            <div className="bg-gray-700/80 text-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center h-40">
              <h2 className="text-xl font-bold mb-2">Маса 1</h2>
              <p className="text-green-500 text-lg">празна</p>
            </div>
            <div className="bg-gray-700/80 text-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center h-40">
              <h2 className="text-xl font-bold mb-2">Маса 2</h2>
              <p className="text-red-500 text-lg">зафатена</p>
            </div>
            <div className="bg-gray-700/80 text-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center h-40">
              <h2 className="text-xl font-bold mb-2">Маса 3</h2>
              <p className="text-green-500 text-lg">празна</p>
            </div>
            <div className="bg-gray-700/80 text-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center h-40">
              <h2 className="text-xl font-bold mb-2">Маса 4</h2>
              <p className="text-green-500 text-lg">празна</p>
            </div>
            <div className="bg-gray-700/80 text-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center h-40">
              <h2 className="text-xl font-bold mb-2">Маса 5</h2>
              <p className="text-green-500 text-lg">празна</p>
            </div>
            <div className="bg-gray-700/80 text-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center h-40">
              <h2 className="text-xl font-bold mb-2">Маса 6</h2>
              <p className="text-green-500 text-lg">празна</p>
            </div>
            <div className="bg-gray-700/80 text-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center h-40">
              <h2 className="text-xl font-bold mb-2">Маса 7</h2>
              <p className="text-green-500 text-lg">празна</p>
            </div>
            <div className="bg-gray-700/80 text-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center h-40">
              <h2 className="text-xl font-bold mb-2">Маса 8</h2>
              <p className="text-green-500 text-lg">празна</p>
            </div>
            <div className="bg-gray-700/80 text-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center h-40">
              <h2 className="text-xl font-bold mb-2">Маса 9</h2>
              <p className="text-green-500 text-lg">празна</p>
            </div>
            <div className="bg-gray-700/80 text-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center h-40">
              <h2 className="text-xl font-bold mb-2">Маса 10</h2>
              <p className="text-green-500 text-lg">празна</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
