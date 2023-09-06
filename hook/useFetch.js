import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../config";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const Server = process.env.REACT_APP_SERVER_URL;
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/api/products/`
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
    finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
