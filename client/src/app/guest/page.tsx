import { useEffect, useState } from "react";

export const GuestUser = async () => {
  const [user, setUser] = useState<String[]>([]);

  useEffect(() => {
    const Guest = async () => {
      const existing = localStorage.getItem("guestUser");
      if (existing) {
        setUser(JSON.parse(existing));
        return;
      }

      const response = await fetch(`http://localhost:4001/guest`, {
        method: "POST",
      });
      const data = await response.json();
      setUser(data);

      localStorage.setItem("guestUser", JSON.stringify(data));
    };
    Guest();
  }, []);
};
