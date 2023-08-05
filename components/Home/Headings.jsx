import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "./headings.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";

const Headings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTittle}>On-Trend Styles</Text>
        <TouchableOpacity>
            <Ionicons name="ios-grid" size={24} color={COLORS.primary}/>

        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Headings;
