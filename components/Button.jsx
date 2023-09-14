import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../constants";

const Button = ({ title, onPress, isValid, loader,showTotalPrice, totalPrice }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnstyle(isValid === false ? COLORS.gray : COLORS.primary)}
    >
      {loader === false ? (
        <Text style={styles.btnText}>{title} {showTotalPrice ? `($${totalPrice})` : ''}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnText: {
    fontFamily: "bold",
    color: COLORS.lightWhite,
    fontSize: 18,
  },
  btnstyle: (backgroundColor) => ({
    height: 50,
    width: "100%",
    marginVertical: 20,
    backgroundColor: backgroundColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  }),
});
