import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/Home/Home.screen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from '../styles/colors.styles';

const Tab = createBottomTabNavigator();

export const TabsComponent = ({ user }) => {
    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "HomeScreen") {
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
                <Tab.Screen name="HomeScreen" options={{
                    title: 'My tasks',
                    headerStyle: {
                        backgroundColor: colors.primary
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    tabBarActiveTintColor: colors.primary
                }}  >
                    {() => <HomeScreen user={user} />}
                </Tab.Screen>

            </Tab.Navigator>
        </>
    )

}
