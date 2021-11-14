import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/Home/Home.screen"
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();

export const TabsComponent = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Home") {
                            iconName = focused
                                ? "list-circle"
                                : "list-circle-outline";
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "black",
                    tabBarInactiveTintColor: "grey",
                })}
            >
                <Tab.Screen name="Home" options={{
                    title: 'My tasks'
                }} component={HomeScreen} />
            </Tab.Navigator>
            <StatusBar style='auto' />
        </NavigationContainer>
    )
}
