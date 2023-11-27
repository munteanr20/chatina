/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import { TabBarIndicator } from 'react-native-tab-view';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import TabTwoScreen from '../screens/InteractiveMap';
import { RootStackParamList, MainTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ContactsScreen from '../screens/ContactsScreen';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.light.tint,
      },
      headerShadowVisible: false,
      headerTintColor: Colors.light.background,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 25,
      },
    }}>

      <Stack.Screen
        name="Root" component={BottomTabNavigator}
        options={{
          title: "I N A",
        }}
      />

      <Stack.Screen
        name="ChatRoom" component={ChatRoomScreen}
        options={({ route }) => ({ title: route.params.name })}
      />

      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
      />

      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oopss' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

function BottomTabNavigator({ navigation }: RootTabScreenProps<'MainTab'>) {
  const colorScheme = useColorScheme();

  return (
    <MainTab.Navigator
      initialRouteName="Chat"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].background,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].tint,
          elevation: 7,
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors[colorScheme].background,
          height: 3.5,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
      }}>
      <MainTab.Screen
        name="Chat"
        component={ChatScreen}
      />
      <MainTab.Screen
        name="Map"
        component={TabTwoScreen}
      />

      <MainTab.Screen
        name="Contacts"
        component={ContactsScreen}
      />

    </MainTab.Navigator>
  );
}




/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
