import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfileComponent from './screens/Profile/Profile.component';
export default function App() {
  return (
    <ProfileComponent />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
