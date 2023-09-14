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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ENDPOINT } from "../config";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Pasword must be 8 characters or more")
    .required("Required"),
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Required"),
});

const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [absecureText, setAbsecureText] = useState(false);

  const invalidForm = () => {
    Alert.alert("Invalid form", "Please provide all required fields", [
      { defaultIndex: 1 },
    ]);
  };






  const login = async (values) => {
    setLoader(true);
    try {
      const endpoint = `${API_ENDPOINT}/api/login`;
      const data = values;
  
      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        setResponseData(response.data);
        await AsyncStorage.setItem(`user${response.data._id}`, JSON.stringify(response.data));
        await AsyncStorage.setItem("id", JSON.stringify(response.data._id));
        await AsyncStorage.setItem("token", JSON.stringify(response.data.token));
        navigation.replace("Bottom Navigation");
      } else {
        Alert.alert("Error logging in", "Please provide valid credentials", [{ defaultIndex: 1 }]);
      }
    } catch (error) {
      Alert.alert("Error", "Oops error logging in try again with correct credentials!", [{ defaultIndex: 1 }]);
    } finally {
      setLoader(false);
    }
  };
 

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require("../assets/images/bac.png")}
            style={styles.cover}
          />
          <Text style={styles.title}>Glamour Female Collection</Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
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
                  loader={loader}
                  title={"L O G I N"}
                  onPress={isValid ? handleSubmit : invalidForm}
                  isValid={isValid}
                  showTotalPrice={false}
                />
                <Text
                  onPress={() => {
                    navigation.navigate("Signup");
                  }}
                  style={styles.registration}
                >
                  Sign Up
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginPage;
