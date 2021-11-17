import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { auth, db } from "../../firebase";
import PressableButton from "../Registro/Button";
import styled from "styled-components";
import StyledInput from "../Registro/Input";


const LogoImage = styled.Image`
  width: 200px;
  height: 200px;
  align-self: center;
  border-radius: 50px;
  bottom: 10%;
`
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
        db.collection('userImages').where("idUser", "==", user.uid).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data())
          })

        }).catch((err) => {
          console.log(err)
        })
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
    <KeyboardAvoidingView style={{ flex: 1, alignItems: "center", justifyContent: "center" }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <LogoImage source={{ uri: 'https://i.ibb.co/Fz555Jq/logo.png' }} />
      <View>

        <StyledInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <StyledInput
          placeholder="Password"
          value={pwd}
          onChangeText={(text) => setPwd(text)}
          secureTextEntry
        />

        <PressableButton title="Login" color="white" bgColor="darkorange" onPress={handleLogin} />
        <PressableButton title="No Account? Sign Up" color="darkorange" bgColor="white" onPress={() => navigation.navigate('Registro')} />

      </View>
    </KeyboardAvoidingView>
  );
};
export default Login;