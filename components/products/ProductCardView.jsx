import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./ProductCardView.style";
import pic1 from "../../assets/images/d1.jpg";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddToCart from "../../hook/addToCart";

const ProductCardView = React.memo(({ item }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [count, setCount] = useState(1);

  const navigation = useNavigation();

  useEffect(() => {
    checkUser();
  }, []);

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

  const handleCart = async () => {
    if (!isLoggedin) {
      navigation.navigate("Login");
    } else {
      AddToCart(item._id, count);

      Alert.alert("Add to cart", "Item added to cart!", [
        {
          text: "Ok",
        },
      ]);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { item })}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item.supplier}
          </Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <TouchableOpacity style={styles.addbtn} onPress={() => handleCart()}>
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

export default ProductCardView;
