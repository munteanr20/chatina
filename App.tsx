import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import {
  Auth,
  API,
  graphqlOperation,
} from 'aws-amplify';

import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';

import { withAuthenticator } from 'aws-amplify-react-native'

import Amplify from 'aws-amplify'
import config from './src/aws-exports'
Amplify.configure(config)

const randomImages = [
  'https://avatarfiles.alphacoders.com/968/thumb-1920-968.jpg',
  'https://avatarfiles.alphacoders.com/114/thumb-1920-1143.jpg',
  'https://avatarfiles.alphacoders.com/148/thumb-1920-1483.jpg',
  'https://avatarfiles.alphacoders.com/968/thumb-1920-968.jpg',
]


function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)]
  }

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
      console.log(userInfo);

      if (userInfo) {
        const userData = await API.graphql(
          graphqlOperation(
            getUser, { id: userInfo.attributes.sub }
          )
        )

        if (userData.data.getUser) {
          console.log("User is already registered in database");
          return;
        }

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: 'Hi, I am new here! ',
        }

        console.log(newUser);

        await API.graphql(
          graphqlOperation(
            createUser,
            { input: newUser }
          )
        )
      }
    }
    fetchUser();
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App)
