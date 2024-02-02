import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const FilePickerComponent = () => {
    const getPermission = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access files denied');
          return false;
        }
        return true;
      };      

    const pickDocument = async () => {
      const permissionGranted = await getPermission();
      if (!permissionGranted) {
        return;
      }
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: '*/*', // You can specify the MIME type of the files you want to allow
        });
  
        if (result.type === 'success') {
          console.log(result);
          // Handle the selected file (e.g., upload to server, process, etc.)
        } else {
          console.log(result.output);
          console.log('File picker was cancelled');
        }
      } catch (err) {
        console.error('Error picking document:', err);
      }
    };
  
    return (
      <View>
        <TouchableOpacity onPress={pickDocument}>
          <Text>Choose File</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default FilePickerComponent;
  