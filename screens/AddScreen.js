import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import back from 'react-native-vector-icons/AntDesign'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { db } from '../database'
import FilePickerComponent from '../FilePickerComponent'
// import * as Network from 'expo-network'

// const student = {
//   email: 'tctembedza@gmail.com',
//   name: 'Taku'
// }
// const bursary = {
//   criteria:'Computer Science', 
//   level:'Bachelor\'s', 
//   bName:'Shaquille Oatmeal', 
//   bursor:'NSFAS', 
//   detail:'Allowance and tuition payment', 
//   sDate:'2024-01-01',
//   eDate: '2024-12-30'
// }

// Put bursary and student strings together as content to email
function createContent(studentO, bursaryO) {
  return {
      email: studentO.email,
      subject: studentO.subject,
      subtitle: studentO.subtitle,
      content: bursaryO.content
  }
}

// Format student details, ready to send
function createStudentStringObject(student) {
  return {
    email: student.email,
    subject: `${student.name}, does this bursary interest you? `,
    subtitle: `Good day, ${student.name}, you are eligible to apply to the following bursary.`
  }
}

// Format bursary details, ready to send
function createBursaryStringObject(bursary) {
  return {
    content: `<h3>${bursary.bName} offered by ${bursary.bursor}</h3>\n
    Criteria: ${bursary.criteria}\n
    Level: ${bursary.level}\n
    
    << Additional Information >>\n
    ${bursary.detail}\n\n

    ${bursary.sDate.length > 0 ? `Start Date of Bursary: ${bursary.sDate}` : `Starting date not specified`}\n
    ${bursary.eDate.length > 0 ? `End Date of Bursary: ${bursary.eDate}` : `End date not specified`}`
  };
}

// perform request to NEXT server to send email using created content
async function sendEmail(content) {
  await fetch("http://10.0.0.107:3000/api/test", {
    method: 'POST',
    body: JSON.stringify(content)
  })
  .catch(function(error) {
    console.log("error: " + error.message);
  });
}

// add bursary to database and therefore notify students
async function addBursary(bursor, bName, detail, criteria, level, bDate, eDate) {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM BURSARIES'),
    [],
    (tx, results) => {
      
    }
  })
}

// right function to read spreadsheet once selected here
async function readSpreadsheet() {

}

export default function AddScreen() {
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
             <FilePickerComponent/>
            
          </View>

        </SafeAreaView>
    </View>
  )
}