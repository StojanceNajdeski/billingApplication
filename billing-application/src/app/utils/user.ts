export const getUsername = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    const user = localStorage.getItem("loggedUser");
    if (!user) return null;
    const parsed = JSON.parse(user);
    return parsed.username || null;
  } catch (error) {
    console.error("Не може да се прочита username од localStorage:", error);
    return null;
  }
};
