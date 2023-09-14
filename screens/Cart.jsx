import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import styles from "./Cart.style";
import FetchCart from "../hook/fetchCart";
import CartTile from "../components/cart/cartTile";
import { Button } from "../components";
import { API_ENDPOINT } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";

const Cart = ({ navigation }) => {
  const { data, loading, error, refetch} = FetchCart();
  const [selected, setSelected] = useState(null);
  const [select, setSelect] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentUrl, setPaymentUrl] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  

 
  useEffect(() => {
    if (data) {
      const cartTotalPrice = data.reduce((accumulator, item) => {
        const itemPrice = parseFloat(item.cartItem.price);
        if (!isNaN(itemPrice)) {
          return accumulator + itemPrice;
        }
        return accumulator;
      }, 0);
      setTotalPrice(cartTotalPrice);
    }
    checkUser();
  }, [data]);

  const checkUser = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      if (id !== null) {
        setIsLoggedin(true);
        console.log(isLoggedin);
      } else {
        console.log("User not logged in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  
 
  const handleBuy = async () => {
    if (!isLoggedin) {
      navigation.navigate("Login");
    } else {
      createCheckOut();
    }
  };


  const createCheckOut = async () => {
    const id = await AsyncStorage.getItem("id");

    const cartTotalPrice = data.reduce((accumulator, item) => {
      const itemPrice = parseFloat(item.cartItem.price);
      if (!isNaN(itemPrice)) {
        return accumulator + itemPrice;
      }
      return accumulator;
    }, 0);

    const response = await fetch(
      "https://e-commercepayment-production.up.railway.app/stripe/create-checkout-session",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: JSON.parse(id),
          cartItems: data.map((item) => ({
            name: item.cartItem.title,
            id: item.cartItem._id,
            price: item.cartItem.price,
            cartQuantity: item.quantity,
          })),
          totalPrice: cartTotalPrice,
        }),
      }
    );

    const { url } = await response.json();
    setPaymentUrl(url);
    console.log("set Url", url);
  };
  const onNavigationStateChange = (webViewState) => {
    const { url, loading, title } = webViewState;

    if (url && url.includes("checkout-success")) {
      navigation.navigate("Orders");
    } else if (url && url.includes("cancel")) {
      navigation.goBack();
    }
  };
  

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/api/carts/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        refetch();
      } else {
        console.error("Failed to delete item from cart");
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  if (!data) {
    console.log("No data");
  }
  
  return (
    <View style={styles.container}>
      {paymentUrl ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <WebView
            source={{ uri: paymentUrl }}
            onNavigationStateChange={onNavigationStateChange}
          />
        </SafeAreaView>
      ) : (
        <>
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-circle"
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <Text style={styles.titleText}>Cart</Text>
          </View>

          {loading ? (
            <ActivityIndicator />
          ) : data && data.length > 0 ? (
            <FlatList
              data={data}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <CartTile
                  item={item}
                  onPress={() => {
                    setSelect(!select), setSelected(item);
                  }}
                  select={select}
                  onDelete={handleDeleteItem}
                />
              )}
            />
          ) : (
            <Text>{isLoggedin ? "Your cart is empty." : "Please login to view your cart."}</Text>
          )}
          {select === false ? (
            <View></View>
          ) : (
            <Button
              title={"Checkout"}
              isValid={select}
              loader={loading}
              totalPrice={totalPrice}
              showTotalPrice={true}
              onPress={() => handleBuy()}
            />
          )}
      </View>
        </>
      )}
    </View>
  );
};

export default Cart;
