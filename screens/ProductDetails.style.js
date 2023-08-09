import { Dimensions, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    // marginTop: SIZES.xxLarge,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    zIndex: 999,
    width: SIZES.width - 44,
  },
  image: {
    aspectRatio: 1.5,
    width: SIZES.width,
    resizeMode: "cover",
    // borderRadius: SIZES.medium,
  },
  details: {
    marginTop: -SIZES.small,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
    top: 20,
  },
  ratingRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 10,
    top: 5,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  price: {
    paddingHorizontal: 10,
    fontFamily: "semibold",
    fontSize: SIZES.large,
  },
  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },
  rating: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
  },
  descriptionWrapper: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },
  description: {
    fontFamily: "medium",
    fontSize: SIZES.large - 2,
  },
  desText: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    padding: 5,
    borderRadius: SIZES.large,
    // marginHorizontal: 12,
  },
  ratingText: {
    color: COLORS.gray,
    fontFamily: "medium",
    paddingHorizontal: SIZES.xSmall,
  },
  cartRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width,
  },
  cartBtn: {
    width: SIZES.width*0.7,
    backgroundColor: COLORS.black,
    padding: SIZES.small/2,
    borderRadius: SIZES.large,
    marginLeft: SIZES.large,
  },
  cartTitle: {
    color: COLORS.lightWhite,
    fontSize: SIZES.medium,
    fontFamily: "bold",
    marginLeft: SIZES.small,
  },
  addCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default styles;
