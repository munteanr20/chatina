import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    avatar: {
        width: 60,
        height: 60,
        marginRight: 20,
        borderRadius: 50,
    },
    container: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        padding: 15,
    },
    leftContainer: {
        flexDirection: 'row',
    },
    midContainer: {
        justifyContent: 'space-around',
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    status: {
        color: 'grey',
        fontSize: 15,
    },
});

export default styles;