import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.style";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Fontisto,
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import pic1 from "../assets/images/d1.jpg";
import { useRoute } from "@react-navigation/native";
import AddToCart from "../hook/addToCart";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const [count, setCount] = useState(1);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [favourites, setFavourite] = useState(false);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    checkUser();
    checkFavourite();
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

  const addToFavourites = async () => {
    const id = await AsyncStorage.getItem("id");
    const favouriteId = `favourites${JSON.parse(id)}`;

    let productId = item._id;

    let productObj = {
      title: item.title,
      id: item._id,
      supplier: item.supplier,
      price: item.price,
      image: item.image,
      product_location: item.product_location,
    };

    try {
      const existingItem = await AsyncStorage.getItem(favouriteId);
      let favouriteObj = existingItem ? JSON.parse(existingItem) : {};
      if (favouriteObj[productId]) {
        delete favouriteObj[productId];
        console.log("deleted");
        setFavourite(false);
      } else {
        favouriteObj[productId] = productObj;
        console.log("added to fav");
        setFavourite(true);
      }
      await AsyncStorage.setItem(favouriteId, JSON.stringify(favouriteObj));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = async () => {
    if (!isLoggedin) {
      navigation.navigate("Login");
    } else {
      addToFavourites();
    }
  };

  const handleBuy = async () => {
    if (!isLoggedin) {
      navigation.navigate("Login");
    } else {
      console.log("pressesdBuy");
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

  const checkFavourite = async () => {
    const id = await AsyncStorage.getItem("id");
    const favouriteId = `favourites${JSON.parse(id)}`;
    console.log(favouriteId);

    try {
      const favouritesObj = await AsyncStorage.getItem(favouriteId);
      if (favouritesObj !== null) {
        const favourites = JSON.parse(favouritesObj);
        if (favourites[item._id]) {
          console.log(item._id);
          setFavourite(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress()}>
          <Ionicons
            name={favourites ? "heart" : "heart-outline"}
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>GH₵{item.price}</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
            <Text> (4.9)</Text>
          </View>
          <View style={styles.rating}>
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
            <Text style={styles.ratingText}> {count} </Text>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.desText}>{item.description}</Text>
          <View style={{ marginBottom: SIZES.small }}>
            <View style={styles.location}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons name="location-outline" size={20} />
                <Text> {item.product_location}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={20}
                />
                <Text> Free Delivery</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.cartRow}>
          <TouchableOpacity style={styles.cartBtn} onPress={() => handleBuy()}>
            <Text style={styles.cartTitle}>Buy now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addCart} onPress={() => handleCart()}>
            <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;
