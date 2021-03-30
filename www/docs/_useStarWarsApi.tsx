import { useEffect, useState, useRef } from "react";

export default function useStarWarsApi(term?: string) {
  const [loading, setLoading] = useState(!!term);
  const [result, setResult] = useState([]);
  const ref = useRef<any>();

  useEffect(() => {
    return () => {
      clearTimeout(ref.current);
    };
  }, []);

  useEffect(() => {
    if (!term?.trim()) return;

    setLoading(true);

    ref.current = setTimeout(async () => {
      const resp = await fetch(
        `https://swapi.dev/api/people/?search=${encodeURIComponent(
          term
        )}`
      );

      const json = await resp.json();
      setResult(
        json.results ? json.results.slice(0, 10) : []
      );
      setLoading(false);
    }, 100);

    return () => {
      clearTimeout(ref.current);
    };
  }, [term]);

  return [result, loading];
}
