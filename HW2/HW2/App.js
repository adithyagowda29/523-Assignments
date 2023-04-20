// Import all components and libraries to be used
import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  // Define all required state variables
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [galleryPermission, requestGalleryPermission] = MediaLibrary.usePermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  // Waiting for Camera permission here
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  // Waiting for granting of Camera permission here
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  
  // Waiting for Storage permission here
  if (!galleryPermission) {
    // Gallery permissions are still loading
    return <View />;
  }
  
  // Waiting for granting of Storage permission here
  if (!galleryPermission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to store the captured pictures from camera</Text>
        <Button onPress={requestGalleryPermission} title="grant permission" />
      </View>
    );
  }

  // Function to handle event when user clicks on Flip Camera button
  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  // Function to handle event when user clicks on Take Photo button
  async function takePicture() {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setPhoto(data.uri);
      const asset = await MediaLibrary.createAssetAsync(data.uri);
    }
  }

  // Function to handle event when user clicks on Import Photo button
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    console.log(result);

    // If User selects photo, store its data in state variable
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
    {/* When User takes photo or selects photo from storage */}
    {photo && 
      (<View style={styles.container2}>
        <Text style={styles.text}>Image</Text>
        <Image source={{ uri: photo }} style={styles.image} /> 
      </View>)}
      <Text style={styles.text}>Camera</Text>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
      </Camera>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={takePicture}>
            <Text style={styles.text}> Take Photo </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={pickImage}>
            <Text style={styles.text}> Import Photo </Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

// Styles for all components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 75,
    backgroundColor: 'lightgray',
  },
  container2:{
    flex: 1,
    justifyContent: 'center',
    paddingTop: 175,
    backgroundColor: 'lightgray',
  },
  camera: {
    marginTop: 20,
    height: 350,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightblue',
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 350,
    marginTop: 20,
    marginBottom: 20,
  },
});
