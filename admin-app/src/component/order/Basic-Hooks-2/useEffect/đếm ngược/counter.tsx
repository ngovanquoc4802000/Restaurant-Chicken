import { useEffect, useState } from "react";

export function Counter() {
  const [counter, setCounter] = useState(1000);
  useEffect(() => {
    const dem = setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);
    return () => clearInterval(dem);
  }, []);
  return (
    <>
      <h1>{counter}</h1>
    </>
  );
}
