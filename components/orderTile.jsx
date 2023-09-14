import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "../screens/Cart.style";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../constants";

const OrderTile = ({ item }) => {
  return (
    <TouchableOpacity style={styles.favContainer(COLORS.secondary)}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: item.productId.image }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productTxt} numberOfLines={1}>
          {item.productId.title}
        </Text>
        <Text style={styles.productSupplier} numberOfLines={1}>
          {item.productId.supplier}
        </Text>
        <Text style={styles.productSupplier} numberOfLines={1}>
          {item.quantity} item(s)
        </Text>
        <Text style={styles.productTxt} numberOfLines={1}>
          ${(item.productId.price * item.quantity).toFixed(2)}
        </Text>
      </View>
      <View style={styles.orders}>
        <Text style={styles.productTxt}>{item.payment_status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderTile;
