import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { SliderBox } from "react-native-image-slider-box";


const Carousel = () => {
  const sliders = [
    "https://t3.ftcdn.net/jpg/04/73/89/54/240_F_473895460_Wb36aXG0XJoxSnoRjLskgdv6JQ65DIm6.jpg",
    "https://t4.ftcdn.net/jpg/04/39/24/85/240_F_439248572_7wD0ducK2bvWo4nhJ9dB6LcO31p2XEUV.jpg",
    "https://t3.ftcdn.net/jpg/01/72/82/26/240_F_172822677_FntpGmBxYWHsNEAT0VxBGW20ugKaKblP.jpg",
    "https://t4.ftcdn.net/jpg/03/61/90/35/240_F_361903554_yKvvwbYZW7QG6gdeJWIGbbG6tYev5CMt.jpg",
  ];
  return (
    <View style={styles.carouselContainer}>
      <SliderBox
        images={sliders}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        autoplay
        circleLoop
        ImageComponentStyle={{ borderRadius: 15, width: "93%", marginTop: 15 }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: "center",
  },
});
