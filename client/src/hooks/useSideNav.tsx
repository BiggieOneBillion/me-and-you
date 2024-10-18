
import { useEffect, useState } from "react";

function useSideNav(){
    const [size, setSize] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
    };
    document.addEventListener("resize", handleResize);
    handleResize();

    return () => document.removeEventListener("resize", handleResize);
  }, []);
  return {
    size,
  }
}

export default useSideNav