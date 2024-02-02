import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const FilePickerComponent = () => {     
    const pickDocument = async () => {
      const result = await DocumentPicker.getDocumentAsync({
        //type: '*/*', // You can specify the MIME type of the files you want to allow
      });

      return result.assets[0].uri;
    };
  
    return (
      <View>
        <TouchableOpacity onPress={() => pickDocument()}>
          <Text>Choose File</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default FilePickerComponent;
  