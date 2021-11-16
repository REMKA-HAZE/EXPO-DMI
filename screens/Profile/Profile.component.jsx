import React, { useRef, useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/core";
import { InfoContainer, Header, AccountImage, LogoutButton, TextButton, DrawerText, DrawerButton } from '../Profile/Profile.style';
import { auth, db, storage} from "../../firebase";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-root-toast';

const ProfileComponent = ({user}) =>  {
  alert(user.uid)
 const modalizeRef = useRef(null);
   const navigation = useNavigation();
   const [userImage, setUserImage] = useState('')
  const [image, setImage] = useState('')

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  useEffect(() => {
    downloadImage(image)
  }, [image])
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true
    });

    console.log(result);

    if (!result.cancelled) {
      let uploadUri = Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri;
      let imageName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);    
      await uploadImage(imageName,uploadUri);
    }
    } catch (error) {
      console.error(error);
       Toast.show("An error has ocurred!", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      containerStyle: { marginTop: 50 },
    });
    }
  };
  const takePicture = async () => {

    try {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true
    });
    console.log(result);
    if (!result.cancelled) {
      let uploadUri = Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri;
      let imageName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);    
      await uploadImage(imageName,uploadUri);
    }
    } catch (error) {
      console.error(error);
       Toast.show("An error has ocurred!", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      containerStyle: { marginTop: 50 },
    });
    }
  }
  const uploadImage = async (imageName,uploadUri) => {
    try {
      const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uploadUri, true);
      xhr.send(null);
    });
        
     await storage.child(imageName).put(blob).then((result) => {
          
      db.collection('userImage').doc().set({
      task: inputValue,
      completed: false,
      idUser: user.uid
      }).then((resp) => {
        Toast.show("Uploaded image correctly!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        containerStyle: { marginTop: 50 },
      });
      setImage(imageName);
      }).catch((error) => {
          console.log(error);
          Toast.show("An error has ocurred!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        containerStyle: { marginTop: 50 },
        });
        })
        }).catch((error) => {
          console.log(error);
          Toast.show("An error has ocurred!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        containerStyle: { marginTop: 50 },
      });
        })
    } catch (error) {
      console.log(error);
      Toast.show("An error has ocurred!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        containerStyle: { marginTop: 50 },
      });
    }
}
  const downloadImage = async (imageName) => {
    console.log(imageName);
    storage.child(imageName).getDownloadURL().then((url) => {
      console.log(url);
      setUserImage(url)
    }).catch((err) => {
      console.log(err);
    });
  }

   useEffect(() => {
     console.log(user.uid);
   ((async ()=> {
     try {
       await db.collection('userImages').where("idUser", "==", user.uid).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setUserImage(doc.data()?.uri)
        });

    }).catch((err) => {
      console.log(err)
    })
     } catch (error) {
        console.error(error);
      Toast.show("An error has ocurred!", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      containerStyle: { marginTop: 50 },
    });
     }
     
   }) ())

  }, [])

  return (

    <InfoContainer>
      <TouchableOpacity onPress={() => modalizeRef.current?.open()}>
        <AccountImage source={{ uri: userImage? userImage : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}} />
      </TouchableOpacity>
      <Header> {auth.currentUser?.email} </Header>
      <LogoutButton onPress={handleSignOut}>
        <TextButton>Sign out</TextButton>
      </LogoutButton>
      <Modalize ref={modalizeRef} modalHeight={150} >

    <DrawerButton onPress={pickImage}><DrawerText><Ionicons name="cloud-upload-outline" size={30} color='black'/> Upload Image</DrawerText></DrawerButton>
    <DrawerButton onPress={takePicture}><DrawerText><Ionicons name="camera-outline" size={30} color='black'/> Take photo</DrawerText></DrawerButton>


      </Modalize>
    </InfoContainer>


  );
};

export default ProfileComponent