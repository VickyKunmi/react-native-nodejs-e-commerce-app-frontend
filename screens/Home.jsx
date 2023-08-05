import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './home.style'
import { Fontisto, Ionicons } from '@expo/vector-icons'


const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name='location-outline' size={24} />
          <Text style={styles.location}>Sunyani, Ghana</Text>
          <View style={{alignItems: "flex-end"}}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>6</Text>
            </View>
            
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home

