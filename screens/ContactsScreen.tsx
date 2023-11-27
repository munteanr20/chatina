import * as React from 'react';
import { StyleSheet } from 'react-native';
import ContactListItem from '../components/ContactListItem';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { FlatList } from 'react-native-gesture-handler';
import NewMessageButton from '../components/NewMessageButton';
import { useEffect, useState } from 'react';
import { graphqlOperation, API } from 'aws-amplify';
import { listUsers } from '../src/graphql/queries'

export default function ContactsScreen({ navigation }: RootTabScreenProps<'Chat'>) {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(
          graphqlOperation(
            listUsers,
          )
        )
        setUsers(usersData.data.listUsers.items);
      } catch (e) {
        console.log(e);
      }
    }
    fetchUsers();
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
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
