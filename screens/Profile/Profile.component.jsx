import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { InfoContainer, Header, AccountImage } from '../Profile/Profile.style'

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
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'papayawhip',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <InfoContainer>
          <Header>Leticia Guadalupe Moreno </Header>
          <AccountImage source={{ uri: "https://i.postimg.cc/fbsPPxLD/yo.jpg" }} />
          <Header> leticiagpemoreno@gmail.com </Header>
        </InfoContainer>

      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </>
  );
}
