import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        margin: 10,

    },
    maincontainer:{
        backgroundColor: 'white',
        padding: 13,
        borderRadius: 40,
        marginRight: 10,
        flex: 1,
    }, 
    buttonContainer:{
        backgroundColor: Colors.light.tint,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default styles;