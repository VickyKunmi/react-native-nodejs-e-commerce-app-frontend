import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackBtn, Button } from "../components";
import { Image } from "react-native";
import styles from "./LoginPage.style";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { Alert } from "react-native";
import axios from "axios";
import { API_ENDPOINT } from "../config";



const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Pasword must be 8 characters or more")
    .required("Required"),
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Required"),
  location: Yup.string()
    .min(3, "Provide a valid location")
    .required("Required"),
  username: Yup.string()
    .min(8, "Username should contain a minimum of 8 charcters")
    .required("Required"),
});
const SignUp = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [absecureText, setAbsecureText] = useState(false);

  const invalidForm = () => {
    Alert.alert("Invalid form", "Please provide all required fields", [
      { defaultIndex: 1 },
    ]);
  };

  const registerUser = async(values) => {
    setLoader(true);
    try {
      const endpoint = `${API_ENDPOINT}/api/register`;
      const data = values;
      const response = await axios.post(endpoint, data);
      if (response.status === 201) {
        navigation.replace("Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require("../assets/images/bac.png")}
            style={{
              height: SIZES.height / 4,
              width: SIZES.width - 60,
              resizeMode: "contain",
              marginBottom: SIZES.large,
            }}
          />
          <Text
            style={{
              fontFamily: "bold",
              fontSize: SIZES.large,
              color: COLORS.primary,
              alignItems: "center",
              textAlign: "center",
              marginBottom: SIZES.large,
            }}
          >
            Glamour Female Collection
          </Text>

          <Formik
            initialValues={{
              email: "",
              password: "",
              location: "",
              username: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => registerUser(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldTouched,
              touched,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Username</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.username ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="face-woman-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter username"
                      onFocus={() => {
                        setFieldTouched("username");
                      }}
                      onBlur={() => {
                        setFieldTouched("username", "");
                      }}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.username}
                      onChangeText={handleChange("username")}
                    />
                  </View>
                  {touched.username && errors.username && (
                    <Text style={styles.errormsg}>{errors.username}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter email"
                      onFocus={() => {
                        setFieldTouched("email");
                      }}
                      onBlur={() => {
                        setFieldTouched("email", "");
                      }}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.email}
                      onChangeText={handleChange("email")}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errormsg}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Location</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.location ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter location"
                      onFocus={() => {
                        setFieldTouched("location");
                      }}
                      onBlur={() => {
                        setFieldTouched("location", "");
                      }}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.location}
                      onChangeText={handleChange("location")}
                    />
                  </View>
                  {touched.location && errors.location && (
                    <Text style={styles.errormsg}>{errors.location}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter password"
                      onFocus={() => {
                        setFieldTouched("password");
                      }}
                      onBlur={() => {
                        setFieldTouched("password", "");
                      }}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      secureTextEntry={absecureText}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setAbsecureText(!absecureText);
                      }}
                    >
                      <MaterialCommunityIcons
                        name={absecureText ? "eye-outline" : "eye-off-outline"}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errormsg}>{errors.password}</Text>
                  )}
                </View>
                <Button
                  title={"S I G N U P"}
                  onPress={isValid ? handleSubmit : invalidForm}
                  isValid={isValid}
                  loader={loader}
                />
                {/* <Text
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                  style={styles.registration}
                >
                  {" "}
                  Login{" "}
                </Text> */}
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;
