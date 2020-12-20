import { useEffect, useRef, ReactNode } from "react";

const usePrevious = (value: ReactNode) => {
  const prevChildrenRef = useRef<ReactNode>();

  useEffect(() => {
    prevChildrenRef.current = value;
  }, [value]);

  return prevChildrenRef.current;
};

export default usePrevious;
