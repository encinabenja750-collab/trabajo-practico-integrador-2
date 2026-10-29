import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  const getFetch = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const resp = await fetch(url, { credentials: "include" });

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} ${resp.statusText}`);
      }

      const data = await resp.json();

      setState({
        data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error.message || "Ocurrió un error al cargar los datos",
      });
    }
  };

  useEffect(() => {
    getFetch();
  }, [url]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
  };
};
