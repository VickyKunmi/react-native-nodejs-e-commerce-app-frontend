import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";


const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
        marginHorizontal: 12,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerTittle: {
        fontFamily: "semibold",
        fontSize: SIZES.xLarge -4,
        color: COLORS.gray,

    },
})

export default styles;