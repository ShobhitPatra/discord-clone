"use client";
import { useEffect, useState } from "react";

const UseOrigin = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const origin =
    typeof window !== undefined && window.location.origin
      ? window.location.origin
      : "";

  return isMounted ? origin : "";
};

export default UseOrigin;
