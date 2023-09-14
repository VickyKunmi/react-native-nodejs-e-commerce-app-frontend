import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "../../screens/Cart.style";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../constants";

const CartTile = ({ item, onPress, select, onDelete }) => {
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.favContainer(!select ? "#FFF" : COLORS.secondary)}
    >
      <View style={styles.imgContainer}>
        <Image source={{ uri: item.cartItem.image }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productTxt} numberOfLines={1}>
          {item.cartItem.title}
        </Text>
        <Text style={styles.productSupplier} numberOfLines={1}>
          {item.cartItem.supplier}
        </Text>
        <Text style={styles.productSupplier} numberOfLines={1}>
          {item.quantity} item(s)
        </Text>
        <Text style={styles.productTxt} numberOfLines={1}>
          ${(item.cartItem.price * item.quantity).toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        style={{ paddingBottom: 20, paddingLeft: 75 }}
        onPress={() => onDelete(item._id)}
      >
        <AntDesign name="delete" size={18} color={COLORS.red} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CartTile;
