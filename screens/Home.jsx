import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import styles from "./home.style";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { Welcome } from "../components";
import Carousel from "../components/Home/Carousel";
import Headings from "../components/Home/Headings";
import ProductRow from "../components/products/ProductRow";


const Home = () => (
  <SafeAreaView style={{flex: 1}}>
    <View style={styles.appBarWrapper}>
      <View style={styles.appBar}>
        <Ionicons name="location-outline" size={24} />
        <Text style={styles.location}>Sunyani, Ghana</Text>
        <View style={{ alignItems: "flex-end" }}>
          <View style={styles.cartCount}>
            <Text style={styles.cartNumber}>6</Text>
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
);

export default Home;
