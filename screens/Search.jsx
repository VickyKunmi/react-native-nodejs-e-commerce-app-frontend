import {
  FlatList,
  Image,
  SafeAreaView,
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
import SearchTile from "../components/products/SearchTile";
import { API_ENDPOINT } from "../config";
// import { FlatList } from "react-native-gesture-handler";

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  console.log(searchResult);
  // http://localhost:3000/api/products/search/${searchKey}
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/api/products/search/${searchKey}`
      );
      setSearchResult(response.data);
    } catch (error) {
      console.log("failed to get product", error);
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
            onPress={() => handleSearch()}
          >
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResult.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/images/Pose23.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          style={{ marginHorizontal: 12 }}
          data={searchResult}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SearchTile item={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
