import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";

import {
    API,
    Auth,
    graphqlOperation,
} from 'aws-amplify';

import {
    createMessage,
    updateChatRoom,
} from '../../src/graphql/mutations';

const InputBox = (props) => {

    const { chatRoomId } = props;

    const [message, setMessage] = useState('')
    const [myUserId, setMyUserId] = useState(null);

    useEffect(() => {

        const fetchUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyUserId(userInfo.attributes.sub);

        }
        fetchUser();
    }, [])

    const updateChatRoomLastMessage = async (messageId: string) => {

        try {
            await API.graphql(
                graphqlOperation(
                    updateChatRoom, {
                    input: {
                        id: chatRoomId,
                        lastMessageID: messageId,
                    }
                }
                )
            )

        } catch (e) {
            console.log(e);
        }
    }
    //send message to backend
    const onSendPress = async () => {

        try {
            const newMessageData = await API.graphql(
                graphqlOperation(
                    createMessage, {
                    input: {
                        content: message,
                        userID: myUserId,
                        chatRoomID: chatRoomId,
                    }
                }
                )
            )
            await updateChatRoomLastMessage(newMessageData.data.createMessage.id);
        } catch (e) {
            console.log(e)
        }

        setMessage('');
    }

    const onPress = () => {
        if (message) { onSendPress(); }
    }

    return (
        <View style={styles.container}>
            <View style={styles.maincontainer}>
                <TextInput
                    placeholder={"Scrie un mesaj..."}
                    multiline
                    value={message}
                    onChangeText={setMessage}
                />
            </View>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.buttonContainer}>
                    {
                        !message
                            ? <AntDesign name="message1" size={24} color="white" />
                            : <MaterialIcons name="send" size={28} color="white" />
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default InputBox;