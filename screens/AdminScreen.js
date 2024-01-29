import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import back from 'react-native-vector-icons/AntDesign'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function AdminScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white justify-center" >
      <SafeAreaView  className="flex ">
        <SafeAreaView>

        <View className="flex-row justify-start">
          <TouchableOpacity  
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            
          </TouchableOpacity>
        </View>

            <Text>
                Admin Page
            </Text>
            <TouchableOpacity className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[5rem] px-4 rounded ml-4 mt-4" onPress={()=> navigation.navigate("Add")}>
                 <Text>ADD BURSARY</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[5rem] px-4 rounded ml-4 mt-4" onPress={()=> navigation.navigate("Bursaries")}>
                 <Text>VIEW BURSARIES</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[5rem] px-4 rounded ml-4 mt-4">
                 <Text>VIEW STUDENTS</Text>
            </TouchableOpacity>
        </SafeAreaView>
        </SafeAreaView>
    </View>
  )
}