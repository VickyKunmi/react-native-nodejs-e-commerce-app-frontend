import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import styles from "./Cart.style";
import FetchCart from "../hook/fetchCart";
import CartTile from "../components/cart/cartTile";
import { Button } from "../components";
import { API_ENDPOINT } from "../config";

const Cart = ({ navigation }) => {
  const { data, loading, error, refetch } = FetchCart();
  const [selected, setSelected] = useState(null);
  const [select, setSelect] = useState(false);

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
    <SafeAreaView style={styles.container}>
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
        <Text>No data available</Text>
      )}

      {select === false ? (
        <View></View>
      ) : (
        <Button
          title={"Checkout"}
          isValid={select}
          loader={loading}
          onPress={() => {}}
        />
      )}
    </SafeAreaView>
  );
};

export default Cart;
