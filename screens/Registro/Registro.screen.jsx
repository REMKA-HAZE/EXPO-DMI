import React from "react";
import { Button, View } from 'react-native';

export const Registro = ({ navigation }) =>{
 return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Estamos en el registro"
        onPress={() => navigation.navigate('Login')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};
export default Registro;