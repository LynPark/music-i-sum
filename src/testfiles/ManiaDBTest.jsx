import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const ManiaDBTest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const maniaAPI = import.meta.env.VITE_APP_MANIADB_API_KEY;
        const response = await axios.get(
          `/api/mania/search/newjeans/?sr=album&display=5&key=${maniaAPI}&v=0.5`
        );
        const parser = new XMLParser(response.data);
        const parsedData = parser.parse(response.data);
        setData(parsedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>API Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ManiaDBTest;
