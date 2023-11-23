import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./home.style";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { Welcome } from "../components";
import Carousel from "../components/Home/Carousel";
import Headings from "../components/Home/Headings";
import ProductRow from "../components/products/ProductRow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FetchCart from "../hook/fetchCart";



const Home = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const {data, refetch, unauthorizedError} = FetchCart();
  const [isAuthorized, setIsAuthorized] = useState(true);


  useEffect(() => {
    if (unauthorizedError) {
      setIsAuthorized(false);
    } else{
      setIsAuthorized(true);
    }
  }, [unauthorizedError]);


  useEffect(() => {
    checkExistingUser();
    const unsubscribe = navigation.addListener("focus", () => {
      refetch();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    const itemCount = data ? data.length : 0;
    setCartItemCount(itemCount);
  }, [data]);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id')
    const useId = `user${JSON.parse(id)}`;
    try {
      const currentUser = await AsyncStorage.getItem(useId);
      if(currentUser !== null){
        const parsedData = JSON.parse(currentUser)
        setUserData(parsedData)
        setUserLogin(true)
      }
    } catch (error) {
      console.log("Error retrieving the data: ", error)
    }
  }





  return(
  <SafeAreaView style={{flex: 1}}>
    <View style={styles.appBarWrapper}>
      <View style={styles.appBar}>
        <Ionicons name="location-outline" size={24} />
        <Text style={styles.location}>{userData ? userData.location : 'Ghana'}</Text>
        <View style={{ alignItems: "flex-end" }}>
          <View style={styles.cartCount}>
            <Text style={styles.cartNumber}>{userLogin ? cartItemCount : 0}</Text>
          </View>
          <TouchableOpacity>
            <Fontisto name="shopping-bag" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <ScrollView>
      
        <Welcome />
        <Carousel />
        <Headings />
        <ProductRow />
      
    </ScrollView>
  </SafeAreaView>
  )
  
};


export default Home;
