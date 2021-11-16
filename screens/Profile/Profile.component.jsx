import React, { useRef, useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/core";
import { ImagePressable, InfoContainer, Header, AccountImage, LogoutButton, TextButton, DrawerText, DrawerButton } from '../Profile/Profile.style';
import { auth, db, storage} from "../../firebase";
import { Modalize } from 'react-native-modalize';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-root-toast';
import { ActivityIndicator } from 'react-native-paper';

const ProfileComponent = ({user}) =>  {
 const modalizeRef = useRef(null);
   const navigation = useNavigation();
   const [userImage, setUserImage] = useState('')
   const [userImageId, setUserImageId] = useState('')
   const [name, setName] = useState('')
  const [uploading, setUploading] = useState(true);
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
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
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
      setUploading(true);
    modalizeRef.current?.close()
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
            Toast.show("Uploaded image correctly!", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            containerStyle: { marginTop: 50 },
          });

            downloadImage(imageName)
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
    if(imageName){
      storage.child(imageName).getDownloadURL().then(async (url) => {
      console.log(url);
      setUserImage(url)
      setUploading(false);
        await db.collection('userImages').doc(userImageId).set({
      uri: url,
      idUser: user.uid
      }).catch(err => {
        console.log(err)
      });
    }).catch((err) => {
      console.log(err);
      Toast.show("An error has ocurred!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        containerStyle: { marginTop: 50 },
        });
    });
    } else {
     Toast.show("Not found image name!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        containerStyle: { marginTop: 50 },
        });
    }
  }

   useEffect(() => {
   ((async ()=> {
     try {
       await db.collection('userImages').where("idUser", "==", user.uid).get().then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
            setUserImage(doc.data()?.uri)
            setUserImageId(doc.id)
            setUploading(false)
        }); 
    }).catch((err) => {
      console.log(err)
    })
    await db.collection('person').where("idUser", "==", user.uid).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setName(doc.data()?.fullName)
        });
      });
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
      <ImagePressable onPress={() => modalizeRef.current?.open()}>
        { uploading ? <ActivityIndicator size='large' /> : <AccountImage source={{ uri: userImage? userImage : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}} />}
        </ImagePressable>
      <Header> {name} </Header>
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