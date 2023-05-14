"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    setIsAuthenticated(Boolean(isAuthenticated));
    if (!isAuthenticated) {
      router.replace("auth");
    }
  }, [router]);

  return {
    isAuthenticated,
  };
};
export default useAuth;
