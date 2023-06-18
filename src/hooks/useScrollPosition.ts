import { useEffect, useRef } from "react";

const useScrollPosition = () => {
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.pageYOffset;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollRef;
};

export default useScrollPosition;
