import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        padding: 13,
        backgroundColor: '#e5e5e5',
    },
    messageBox: {
        borderRadius: 7,
        padding: 13,
        marginBottom: 7.5,
        marginTop: 7.5,
        marginHorizontal: 4,
    },
    time: {
        alignSelf: "flex-end",
        fontSize: 8,
        color:'grey'
    },
    name: {
        color: Colors.light.tint,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    message: {
        fontSize: 15,
    },

});

export default styles;