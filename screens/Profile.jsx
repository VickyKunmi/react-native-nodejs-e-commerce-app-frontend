import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Profile.style";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants";
import { Image } from "react-native";
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);


  useEffect(() => {
    checkExistingUser();
  }, []);
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

  const userLogout = async()=> {
    const id = await AsyncStorage.getItem('id')
    const useId = `user${JSON.parse(id)}`;
    try {
      await AsyncStorage.multiRemove([useId, 'id']);
      navigation.replace("Bottom Navigation")
    } catch (error) {
      console.log("Error login out this user: ", error)
       
    }
  }




  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?",
    [
      { 
        text: "Cancel", onPress: ()=> console.log("cancel pressed")
      },
      {
        text: "Continue", onPress: ()=> userLogout()
      },
      // {defaultIndex : 1}
    ]
    )
  }

  const clearCache = () => {
    Alert.alert("Clear cache", "Are you sure you want to delete saved data on your device?",
    [
      {
        text: "Cancel", onPress: ()=> console.log("cancel clear cache")
      },
      {
        text: "Continue", onPress: ()=> console.log("Clear cache")
      },
      {defaultIndex : 1}
    ]
    )
  }
  const deleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure you want to delete this account?",
    [
      {
        text: "Cancel", onPress: ()=> console.log("cancel pressed")
      },
      {
        text: "Continue", onPress: ()=> console.log("continue")
      },
      {defaultIndex : 1}
    ]
    )
  }



  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.lightWhite} />
        <View style={{ width: "100%" }}>
          <Image
            source={require("../assets/images/fashion.jpg")}
            style={styles.cover}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/images/Fprofile.png")}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {userLogin === true ? userData.username : "Please login into your account"}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <View style={styles.loginbtn}>
                <Text style={styles.menuText}>L O G I N     </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginbtn}>
              <Text style={styles.menuText}>{userData.email} </Text>
            </View>
          )}

          {userLogin === false ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate("Favourites")}>
                <View style={styles.menuItem(0.5)}>
                  <MaterialCommunityIcons 
                  name="heart-outline"
                  size={24}
                  color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Favourites</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
                <View style={styles.menuItem(0.5)}>
                  <MaterialCommunityIcons 
                  name="truck-delivery-outline"
                  size={24}
                  color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <View style={styles.menuItem(0.5)}>
                  <SimpleLineIcons 
                  name="bag"
                  size={24}
                  color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => clearCache()}>
                <View style={styles.menuItem(0.5)}>
                  <MaterialCommunityIcons 
                  name="cached"
                  size={24}
                  color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Clear cache</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteAccount()}>
                <View style={styles.menuItem(0.5)}>
                  <AntDesign 
                  name="deleteuser"
                  size={24}
                  color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logout()}>
                <View style={styles.menuItem(0.5)}>
                  <AntDesign 
                  name="logout"
                  size={24}
                  color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;
