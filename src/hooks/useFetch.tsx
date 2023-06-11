import React, { useState, useEffect } from 'react';

const useFetch = <T,>(url: string, initState: T) => {
  const [data, setData] = useState<T>(initState);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false);
      });
  }, [url]);
  return [data, loading];
};

export default useFetch;
