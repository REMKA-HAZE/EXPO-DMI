import React from "react";
import { Button, View } from 'react-native';
export const Login = ({ navigation }) =>{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Estamos en el Login"
        onPress={() => navigation.navigate('Registro')}
      />
    </View>
  );
};
export default Login;