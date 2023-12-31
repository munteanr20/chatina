import React from "react";
import { View, Text, useColorScheme, Image, TouchableWithoutFeedback, TouchableOpacityBase } from "react-native";
import { User } from "../../types";
import { Link } from "@react-navigation/native";
import { UserInterfaceIdiom } from "expo-constants";
import styles from "./style"
import { useNavigation } from "@react-navigation/native";

import {
    API,
    graphqlOperation,
    Auth,
} from "aws-amplify";

import {
    createChatRoom,
    createChatRoomUser
} from '../../src/graphql/mutations';


export type ContactListItemProps = {
    user: User;
}

const ContactListItem = (props: ContactListItemProps) => {
    const { user } = props;

    const navigation = useNavigation();

    const onClick = async () => {

        try {
            //1. Create a new chat room
            const newChatRoomData = await API.graphql(
                graphqlOperation(
                    createChatRoom, {
                    input: {}
                }
                )
            )

            if (!newChatRoomData.data) {
                console.log("Failed to create a chat room");
                return;
            }

            const newChatRoom = newChatRoomData.data.createChatRoom;

            //2. Add user to the chat room
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                    input: {
                        userID: user.id,
                        chatRoomID: newChatRoom.id,
                    }

                }
                )
            )

            //3. Add authenticated user to the chat room
            const userInfo = await Auth.currentAuthenticatedUser();
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                    input: {
                        userID: userInfo.attributes.sub,
                        chatRoomID: newChatRoom.id,
                    }
                }
                )
            )

            navigation.navigate('ChatRoom', {
                id: newChatRoom.id,
                name: user.name,
            })
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{ uri: user.imageUri }} style={styles.avatar} />
                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{user.name}</Text>
                        <Text numberOfLines={1} style={styles.status}>{user.status}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default ContactListItem;