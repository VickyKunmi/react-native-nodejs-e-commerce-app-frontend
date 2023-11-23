import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../config";
import axios from "axios";

const FetchCart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [unauthorizedError, setUnauthorizedError] = useState(false); // New state


  const fetchData = async () => {
    setLoader(true);
    const token = await AsyncStorage.getItem("token");

    try {
      const endpoint = `${API_ENDPOINT}/api/carts/find`;

      const headers = {
        "Content-Type": "application/json",
        token: "Bearer " + JSON.parse(token),
      };

      const response = await axios.get(endpoint, { headers });

      if (response.status === 200 && response.data.message === "Cart is empty") {
        
        setData(null);
        setCartCount(0);
      }  else if (response.status === 200) {
        const cartProducts = response.data.products;
        setData(cartProducts);
        setCartCount(cartProducts.length);
      }

      setLoader(false);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      if (error.response && error.response.status === 403) {
        setUnauthorizedError(true);
      } else{
        setError(error);
      }
      // setError(error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const refetch = () => {
    setUnauthorizedError(false);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch, cartCount, unauthorizedError };
};

export default FetchCart;

