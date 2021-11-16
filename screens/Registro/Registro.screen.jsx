

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { View,
KeyboardAvoidingView,
  StyleSheet,
Image,
  TextInput,

  Platform
   } from 'react-native';
import { auth,db } from "../../firebase";
import PressableButton from "./Button";
import { AccountImage } from "../Profile/Profile.style";
import styled from "styled-components";


const LogoImage = styled.Image`
  width: 200px;
  height: 200px;
  align-self: center;
  border-radius: 50px;
  bottom: 10%;
`
export const Registro = () =>{
   const [email, setEmail] = useState("");
   const [pwd, setPwd] = useState("");
   const [name, setName] = useState("");
   const navigation = useNavigation();
   
   const handleSignup = () => {
    if(!email || !name || !pwd){
      alert('Fill the complete form first!')
    } else {
      auth.createUserWithEmailAndPassword(email, pwd).then((userCredentials) => {
       const user = userCredentials.user;
       console.log(user.email);
       db.collection('userImages').add({
         idUser: user.uid,
         uri: ''
       }).then((result) => {
         console.log('ImageUser created')
       }).catch((err) => {
         alert('Error adding user default image')
       });
        db.collection('person').add({
         idUser: user.uid,
         fullName: name
       }).then((result) => {
         console.log('ImageUser created')
       }).catch((err) => {
         alert('Error adding user default image')
       });
      }).catch((error) => {
       alert(error.message);
      });
    }
  };

 return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1, alignItems:"center", justifyContent: "center"}}>
    
      <LogoImage source={{uri: 'https://i.ibb.co/Fz555Jq/logo.png'}}/>
      {/* <LogoImage source={{uri: 'https://i.ibb.co/MVmD8PY/logo2.png'}}/> */}
      <View>
        <TextInput
          placeholder="Full name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
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