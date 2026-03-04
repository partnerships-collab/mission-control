'use client';

import { useEffect, useState } from "react";

export function DateLine() {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);
  return <p className="text-sm text-slate-500 mt-1">{date}</p>;
}
