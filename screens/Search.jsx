import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import styles from "./search.style";
import axios from "axios";

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [serachResult, setSearchResult] = useState([]);
  // http://localhost:3000/api/products/search/${searchKey}
  const handleSearch = async() => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products/search/${searchKey}`
      );
      console.log("=============================");
      console.log(response.data);
      console.log("=============================");
    } catch (error) {
      console.log("failed to get product");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons
            name="camera-outline"
            size={SIZES.xLarge}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="Find your fashion inspiration..."
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchbtn}
            onPress={() => handleSearch}
          >
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
