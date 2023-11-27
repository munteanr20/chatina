import React from "react";
import { View } from "../Themed";
import { FontAwesome } from '@expo/vector-icons';
import styles from "./style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Map from "../../screens/InteractiveMap";

const InteractiveMap = () => {

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Map');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <FontAwesome
                    name="sitemap"
                    size={28}
                    color="white"
                />
            </TouchableOpacity>
        </View>
    );
}

export default InteractiveMap;