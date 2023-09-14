import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../config";
import axios from "axios";

const FetchOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(null);
  


  const fetchData = async () => {
    setLoader(true);
    const token = await AsyncStorage.getItem("token");

    try {
      const endpoint = `${API_ENDPOINT}/api/orders`;

      const headers = {
        "Content-Type": "application/json",
        token: "Bearer " + JSON.parse(token),
      };

      const response = await axios.get(endpoint, { headers });

    //   const cartProducts = response.data.products;

      setData(response.data);
      
      
      setLoader(false);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError(error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setLoader(true)
    fetchData();
  };


  return { data, loading, error, refetch };
};
export default FetchOrders;