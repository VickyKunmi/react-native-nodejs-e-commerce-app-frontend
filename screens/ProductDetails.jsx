import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import styles from "./ProductDetails.style";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import pic1 from "../assets/images/d1.jpg";

const ProductDetails = ({ navigation }) => {
  const [count, setCount] = useState(1);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="heart" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <Image source={pic1} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>product</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>GH₵30</Text>
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
            <Text> {count} </Text>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.desText}>
            Introducing our enchanting Pink Fashionable Flowing Dress, the
            epitome of elegance and grace, designed to make you feel like a true
            princess on your special night! This breathtaking Flying Prom Gown
            is the ultimate embodiment of sophistication, ensuring you'll steal
            the spotlight as you glide across the dance floor. Designed to
            flatter all body types, our Pink Fashionable Flowing Dress embraces
            your unique beauty, making you feel confident and empowered
            throughout the night. Whether you're attending a prom, formal ball,
            or any other special occasion, this gown is your ticket to a truly
            unforgettable evening.
          </Text>
          <View style={{marginBottom: SIZES.small}}>
            <View style={styles.location}>
                <Ionicons name="location-outline" size={20}/>
            </View>

          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;
