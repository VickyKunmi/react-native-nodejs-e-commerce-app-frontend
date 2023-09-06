import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../config";
import axios from "axios";

const FetchCart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(null);

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

      const cartProducts = response.data.products;

      setData(cartProducts);

      setLoader(false);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError(error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch };
};
export default FetchCart;

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect, useState } from "react";
// import { API_ENDPOINT } from "../config";
// import axios from "axios";

// const FetchCart = async () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoader] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     setLoader(true);
//     const token = await AsyncStorage.getItem("token");
//     // console.log("Token retrieved from AsyncStorage:", token);
//     try {
//       const response = await axios.get(`${API_ENDPOINT}/api/carts/find`);
//       const newData = JSON.stringify(response.data)
//       const parsedCartData = JSON.parse(newData);
//       const products = parsedCartData[0].products;
//       setData(products);
//       setLoader(false)
//     } catch (error) {
//       setError(error);
//     }finally{
//       setLoader(false)
//     }

//   }
//   useEffect(() => {
//     fetchData();
//     // console.log("data from fetch", data)
//   }, []);
//     const refetch =  () => {
//     fetchData();
//   };

//   return { data, loading, error, refetch };
// };
// export default FetchCart;
