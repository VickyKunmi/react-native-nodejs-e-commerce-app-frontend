import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './ProductCardView.style'
import pic1 from "../../assets/images/d1.jpg";

const ProductCardView = () => {
  return (
    <TouchableOpacity >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={pic1} style={styles.image}/>
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>Product</Text>
          <Text style={styles.title}>Product</Text>
          <Text style={styles.title}>Product</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCardView

