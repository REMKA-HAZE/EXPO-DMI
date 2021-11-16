

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { View,
KeyboardAvoidingView,
  StyleSheet,

  TextInput,

  Platform
   } from 'react-native';
import { auth } from "../../firebase";
import PressableButton from "./Button";



export const Registro = () =>{
   const [email, setEmail] = useState("");
   const [pwd, setPwd] = useState("");
   const navigation = useNavigation();
   
   const handleSignup = () => {
    auth.createUserWithEmailAndPassword(email, pwd).then((userCredentials) => {
       const user = userCredentials.user;
       console.log(user.email);
      }).catch((error) => {
       alert(error.message);
      });
  };

 return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1, alignItems:"center", justifyContent:"center"}}>


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
   

        <PressableButton title="Sign Up" color="darkorange"  bgColor="white" onPress={handleSignup}/>
    
      </View>
      {/* We have 2 buttons that will execute the functions above) */}
      
    </KeyboardAvoidingView>
  );
};
export default Registro;

const styles = StyleSheet.create({

  input: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop:10
  },



});