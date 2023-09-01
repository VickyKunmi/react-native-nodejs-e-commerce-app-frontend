import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { API_ENDPOINT } from "../config";

const AddToCart = async (productId, quantity) => {
    
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const endpoint = `${API_ENDPOINT}/api/carts`;

    const data = {
      cartItem: productId,
      quantity: quantity,
    }
    const headers = {
      "Content-Type": "application/json",
      'token': "Bearer " + JSON.parse(token),
    };
    await axios.post(endpoint, data, { headers });
  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
};

export default AddToCart;
