import React from "react";
import { View, Text, useColorScheme, Image, TouchableWithoutFeedback, TouchableOpacityBase } from "react-native";
import { User } from "../../types";
import { Link } from "@react-navigation/native";
import { UserInterfaceIdiom } from "expo-constants";
import styles from "./styles"
import { useNavigation } from "@react-navigation/native";


const DepartamentListItems = (props: ContactListItemProps) => {
    return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{ uri: user.imageUri }} style={styles.avatar} />
                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{user.name}</Text>
                        <Text numberOfLines={1} style={styles.status}>{user.status}</Text>
                    </View>
                </View>
            </View>
    )
};
export default DepartamentListItems;