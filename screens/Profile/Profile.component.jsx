import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';

const ProfileComponent = () => {
  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <>
      <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity>

      <Modalize ref={modalizeRef}><Text>Hola</Text></Modalize>
    </>
  );
};

export default ProfileComponent