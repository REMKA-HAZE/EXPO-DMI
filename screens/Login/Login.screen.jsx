import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { auth } from "../../firebase";
import PressableButton from "../Registro/Button";

export const Login = ({ setUser }) => {

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    // We call the function onAuthStateChanged which is a listener that will be checking for changes on the current
    // state of authentiation.
    const unsuscribe = auth.onAuthStateChanged((user) => {
    
      if (user) {
        setUser(user)
        // if there is a valid user we will replace the current screen for the Home one.
        navigation.replace("Home");
      }
    });
   return unsuscribe;
  }, []);
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, pwd)
      .then((userCredentials) => {
        // console.log(userCredentials)r
        // then is a fullfilled promise
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => {
        // catch is a rejected promise
        alert(error.message);
      });
  };
  return (
    <KeyboardAvoidingView style={{flex:1, alignItems:"center", justifyContent:"center"}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View>
        
       <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={pwd}
          onChangeText={(text) => setPwd(text)}
          style={styles.input}
          secureTextEntry
        />

         <PressableButton title="Login" color="white" bgColor="darkorange" onPress={handleLogin}/>
         <PressableButton title="No Account? Sign Up" color="darkorange" bgColor="white" onPress={()=> navigation.navigate('Registro')}/>
   
      </View>
    </KeyboardAvoidingView>
  );
};
export default Login;

const styles = StyleSheet.create({

  
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical:10
  },

});