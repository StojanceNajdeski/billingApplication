"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const waiters = [
    {
      braneUsername: "branep",
      branePassword: "branep",
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = waiters.find(
      (user) =>
        user.braneUsername === username && user.branePassword === password
    );

    if (isValid) {
      localStorage.setItem("loggedInWaiter", isValid.braneUsername);
      router.push("/mainComponent");
    } else {
      setError("Погрешно корисничко име или лозинка");
    }
  };
  return (
    <div className="relative h-screen w-full ">
      <div className="absolute top-1/2 left-1/2 bg-white/30 backdrop-blur-md p-20 rounded-2xl  transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-5xl text-center">
          Ресторан Мерак <br /> Најава
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-5 mb-2">
            {error && (
              <p className="text-red-600 text-center text-xl my-3">{error}</p>
            )}
            <label htmlFor="korisnickoIme" className="text-2xl">
              Корисничко Име
            </label>
          </div>
          <div>
            <input
              type="text"
              id="korisnickoIme"
              className="border-2 w-100 p-3 rounded-2xl"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Внеси корисничко име"
            />
          </div>
          <div className="mt-5 mb-2">
            <label htmlFor="password" className="text-2xl">
              Лозинка
            </label>
          </div>
          <div>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border-2 w-100 p-3 rounded-2xl"
              placeholder="Внеси лозинка"
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              className="bg-amber-700 text-white text-2xl font-bold w-full mt-4 py-3 rounded-2xl"
              type="submit"
            >
              Најави се
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
