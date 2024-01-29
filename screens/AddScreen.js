import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import back from 'react-native-vector-icons/AntDesign'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function AdminScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white " >
      <SafeAreaView  className="flex ">
      <View className="flex-row justify-start">
          <TouchableOpacity  onPress={()=> navigation.goBack()}
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            
          </TouchableOpacity>
        </View>
        
        <Text>Add new bursary</Text>

        <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Bursary name</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Enter bursary name" 
            />
            <Text className="text-gray-700 ml-4">Bursor</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              placeholder="Enter bursor name"
            />
            <Text className="text-gray-700 ml-4">Description</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              placeholder="What's covered,requirements etc"
            />
            <Text className="text-gray-700 ml-4">Date</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              placeholder="Date"
            />

            <TouchableOpacity 
              className="py-3 bg-yellow-400 rounded-xl" onPress={()=> navigation.navigate("Admin")}>
                <Text 
                    className="text-xl font-bold text-center text-gray-700"
                >
                        Verify
                </Text>
             </TouchableOpacity>
            
          </View>

        </SafeAreaView>
    </View>
  )
}