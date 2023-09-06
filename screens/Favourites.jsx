import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Favourites.style";
import { TouchableOpacity } from "react-native";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { FlatList } from "react-native";
import { Image } from "react-native";


const Favourites = ({ navigation }) => {
  const [favData, setFavData] = useState([]);

  useEffect(() => {
    checkFavourite();
  }, []);

  const checkFavourite = async () => {
    const id = await AsyncStorage.getItem("id");
    const favouriteId = `favourites${JSON.parse(id)}`;
    console.log(favouriteId);

    try {
      const favouritesObj = await AsyncStorage.getItem(favouriteId);
      if (favouritesObj !== null) {
        const favourites = JSON.parse(favouritesObj);
        const favList = Object.values(favourites);
        setFavData(favList);
        console.log(favList.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFavourites = async (product) => {
    const id = await AsyncStorage.getItem("id");
    const favouriteId = `favourites${JSON.parse(id)}`;

    let productId = product;

    try {
      const existingItem = await AsyncStorage.getItem(favouriteId);
      let favouriteObj = existingItem ? JSON.parse(existingItem) : {};
      if (favouriteObj[productId]) {
        delete favouriteObj[productId];
        checkFavourite();
       
      }
      await AsyncStorage.setItem(favouriteId, JSON.stringify(favouriteObj));
    } catch (error) {
      console.log(error);
    }
  };

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
        <Text style={styles.titleText}>Favourites</Text>
      </View>
      <FlatList
        data={favData}
        renderItem={({ item }) => (
          <View style={styles.favContainer}>
            <View style={styles.imgContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.fav}>{item.title}</Text>
              <Text style={styles.supplier}>{item.supplier}</Text>
              <Text style={styles.price}>GH₵{item.price}</Text>
            </View>

            
              <SimpleLineIcons onPress={() => deleteFavourites(item.id)} name='trash' size={24} color={COLORS.red}/>
            
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default Favourites;
