import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { Ionicons } from "@expo/vector-icons";
import { InfoContainer, Header, AccountImage, LogoutButton, TextButton } from '../Profile/Profile.style';
import { auth } from "../../firebase";
import { colors } from "../../styles/colors.styles";

export default function ProfileComponent() {
  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}
    >
      <Text>Swipe down to close</Text>
    </View>
  );

  const sheetRef = React.useRef(null);

  return (

    <InfoContainer>
      <AccountImage source={{ uri: "https://i.postimg.cc/fbsPPxLD/yo.jpg" }} />
      <Header> {auth.currentUser?.email} </Header>
      <LogoutButton>
        <TextButton>Sign out</TextButton>
      </LogoutButton>
    </InfoContainer>


  );
}
