"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GlobalEscHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.addEventListener("keydown", handleEsc);
  }, [router]);

  return <>{children}</>;
}
