import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import styles from "./Cart.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { OrderTile } from "../components";
import FetchOrders from "../hook/fetchOrders";

const Orders = ({ navigation }) => {
  const { data, loading, error, refetch } = FetchOrders();
  console.log(data, "data");
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
        <Text style={styles.titleText}>Orders</Text>
      </View>

      {loading ? (
        <ActivityIndicator />
      ) : data && data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <OrderTile item={item} />}
        />
      ) : (
        <Text>No data available</Text>
      )}
    </SafeAreaView>
  );
};

export default Orders;
