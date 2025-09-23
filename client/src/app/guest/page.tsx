"use client";
import { useEffect, useState } from "react";

function GuestUser() {
  const [user, setUser] = useState<string[]>([]);

  useEffect(() => {
    const Guest = async () => {
      const existing = localStorage.getItem("guestUser");
      if (existing) {
        setUser(JSON.parse(existing));
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/guest`, {
        method: "POST",
      });
      const data = await response.json();
      setUser(data);

      localStorage.setItem("guestUser", JSON.stringify(data));
    };
    Guest();
  }, []);
}

export default GuestUser;
