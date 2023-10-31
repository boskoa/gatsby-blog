import { useEffect, useRef, useState } from "react";

function useRoller(n, rollerRef) {
  const degGap = useRef(360 / n);
  const steps = useRef(Array.from(Array(n).keys()).map((i) => i * (360 / n)));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let span = 0;
    function handleWheel(e) {
      e.preventDefault();

      span++;
      if (span < 10) return;

      if (e.deltaY < 0) {
        setCurrent((p) => (p > 0 ? p - 1 : p));
      } else if (e.deltaY > 0) {
        setCurrent((p) => (p < n - 1 ? p + 1 : p));
      }
      span = 0;
    }

    if (rollerRef.current) {
      rollerRef.current.addEventListener("wheel", handleWheel);
    }

    return () => rollerRef.current?.removeEventListener("wheel", handleWheel);
  }, []);

  return { degGap: degGap.current, steps: steps.current, current };
}

export default useRoller;
