import { Text, SafeAreaView, View, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./NewArrival.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import ProductList from "../components/products/ProductList";

const NewArrival = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Products</Text>
        </View>
        <ProductList />
      </View>
    </SafeAreaView>
  );
};

export default NewArrival;
