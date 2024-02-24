import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import back from 'react-native-vector-icons/AntDesign'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { db } from "../database"

export default function LoginScreen() {
  const navigation = useNavigation();

  const login = (testEmail, testPassword) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ADMIN',
        [],
        (tx, results) => {
          for (let i = 0; i < results.rows.length; i++) {
            console.log(results.rows.item(i).email + ' ' + results.rows.item(i).password);
          }
        },
        (error) => {
          console.error('Error fetching bursary records:', error);
        }
      );
    });
    getAdmin(testEmail, testPassword);
  }

  const getAdmin = (testEmail, testPassword) => {
    console.log(testEmail + testPassword);
    db.transaction((tx) => {
      console.log("in")
      tx.executeSql(
        'SELECT * FROM ADMIN WHERE email = ?',
        [testEmail],
        (tx, results) => {
          if (results.rows.length > 0) {
            const password = results.rows.item(0).password;
            console.log(password)
            if (password === testPassword) {
              console.log("Successs")
              navigation.navigate("Admin");
            } else {
              console.log("Fail")
            }
          } else {
            console.log("User not found")
          }
        }
      )
    })
  }; 
  
  const [testEmail, setTestEmail] = useState('admin@gmail.com');
  const [testPassword, setTestPassword] = useState('admin123');

  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView  className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity  
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            
          </TouchableOpacity>
        </View>
        <View  className="flex-row justify-center">
          <Image source={require('../assets/witslogo.png')} 
          style={{width: 200, height: 200}} />
        </View>
        
        
      </SafeAreaView>
      <View 
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
        className="flex-1 bg-white px-8 pt-8">
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="email"
              value={testEmail}
              onChangeText={testEmail => setTestEmail(testEmail)} 
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              placeholder="password"
              value={testPassword}
              onChangeText={testPassword => setTestPassword(testPassword)}  
            />
            <TouchableOpacity className="flex items-end">
              <Text className="text-gray-700 mb-5">Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="py-3 bg-yellow-400 rounded-xl" onPress={()=> login(testEmail, testPassword)}>
                <Text 
                    className="text-xl font-bold text-center text-gray-700"
                >
                        Login
                </Text>
             </TouchableOpacity>
            
          </View>
          
          
      </View>
    </View>
    
  )
}