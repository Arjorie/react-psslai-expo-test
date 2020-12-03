import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult;
    try {
      permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    } catch (error) {
      console.error(error);
    }

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  }

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  let clearSelected = () => {
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: (selectedImage !== null) ? selectedImage.localUri : "https://i.imgur.com/TkIrScD.png" }} 
        style={styles.thumbnail} />
      {(selectedImage != null) && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
            <Text style={styles.buttonText}>Share this photo</Text>
          </TouchableOpacity>
          <View style={{width: 20}}></View>
          <TouchableOpacity onPress={clearSelected} style={styles.button}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{height: 20}}></View>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Open Gallery</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  thumbnail: {
    width: 200,
    height: 200,
    backgroundColor: '#ddd',
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    width: '50%',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  }, 
});
