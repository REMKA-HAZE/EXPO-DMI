import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './screens/Login/Login.screen'
import { Registro } from './screens/Registro/Registro.screen'
import Home from './screens/Home/Home.screen'
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login} options={{ headerShown:false }} />
      <Stack.Screen name="Registro" component={Registro} options={{ headerShown:false }} />
      <Stack.Screen name="Home">
        {(props) => <Home {...props} />}
        </Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
  );
}
