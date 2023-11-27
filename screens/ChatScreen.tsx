import * as React from 'react';
import { StyleSheet } from 'react-native';
import ChatListItem from '../components/ChatListItem';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import chatRooms from '../data/ChatRooms';
import { FlatList } from 'react-native-gesture-handler';
import NewMessageButton from '../components/NewMessageButton';
import {
  API,
  graphqlOperation,
  Auth,
} from 'aws-amplify';

import { getUser } from './queries';
import { useEffect, useState } from 'react';
import InteractiveMap from '../components/InteractiveMap';

export default function ChatScreen({ navigation }: RootTabScreenProps<'Chat'>) {

  const [chatRooms, setChatRooms] = useState([]);


  useEffect(() => {

    const fetchChatRooms = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();

        const userData = await API.graphql(
          graphqlOperation(
            getUser, {
            id: userInfo.attributes.sub,
          }
          )
        )
        setChatRooms(userData.data.getUser.chatRoomUser.items)


      } catch (e) {
        console.log(e);
      }

    }
    fetchChatRooms();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
      />

      <InteractiveMap />
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
