"use client";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function LiveClock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm font-mono">{time}</span>
    </div>
  );
}
