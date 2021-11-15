import { StyleSheet, Text, View } from 'react-native';
import ProfileComponent from './screens/Profile/Profile.component';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './screens/Login/Login.screen'
import { Registro } from './screens/Registro/Registro.screen'
import { TabsComponent } from './components/Tabs.component';
import { StatusBar } from 'expo-status-bar';
const Stack = createStackNavigator();


export default function App() {

  const [user, setUser] = useState({});

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" options={{ headerShown: false }} >
          {() => <Login setUser={setUser} />}
        </Stack.Screen>
        <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {() => <TabsComponent user={user} />}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}
