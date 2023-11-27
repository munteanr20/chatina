import React, { useEffect, useState } from "react";
import { Text } from "../components/Themed";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native";
import ChatMessage from "../components/ChatMessage/indesx";
import { ImageBackground } from "react-native";
import BG from '../assets/images/BG.jpg';
import InputBox from "../components/InputBox";
import {
    API,
    graphqlOperation,
    Auth,
} from 'aws-amplify';

import { messagesByChatRoom } from '../src/graphql/queries';
import { onCreateMessage } from '../src/graphql/subscriptions';

const ChatRoomScreen = () => {


    const [messages, setMessages] = useState([]);
    const [myId, setMyId] = useState(null);


    const route = useRoute();


    useEffect(() => {
        const fetchMessages = async () => {
            const messagesData = await API.graphql(
                graphqlOperation(
                    messagesByChatRoom, {
                    chatRoomID: route.params.id,
                    sortDirection: "DESC",
                }
                )
            )

            setMessages(messagesData.data.messagesByChatRoom.items);
        }
        fetchMessages();

    }, [])

    useEffect(() => {
        const getMyId = async () => {
            try {
                const userInfo = await Auth.currentAuthenticatedUser();
                setMyId(userInfo.attributes.sub);

            }
            catch (e) {
                console.log(e);
            }
        }
        getMyId();
    }, [])

    // useEffect(() => {
    //     const subscripition = API.graphql(
    //         graphqlOperation(onCreateMessage)
    //     ).subscribe({
    //         next: (data) => {
    //             console.log(data);
    //         }
    //     });

    //     return () => subscripition.unsubscribe();
    // }, [])

    return (
        <ImageBackground style={{ width: '100%', height: '100%' }} source={BG}>
            <FlatList
                style={{ height: '100%' }}
                data={messages}
                renderItem={({ item }) => <ChatMessage myId={myId} message={item} />}
                inverted
            />

            <InputBox chatRoomId={route.params.id} />
        </ImageBackground>
    );
}

export default ChatRoomScreen;